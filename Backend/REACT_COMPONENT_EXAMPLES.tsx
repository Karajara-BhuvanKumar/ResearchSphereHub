// Example React Components using the Backend API

// File: src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData.email, formData.password);

      // Store token and user in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect to dashboard
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}

// File: src/pages/SearchPapers.tsx

import { useState, useEffect } from 'react';
import { researchService, ResearchPaper } from '@/services/researchService';
import { bookmarkService } from '@/services/bookmarkService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function SearchPapersPage() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Set<string>>(new Set());

  // Search papers on query change
  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch();
    }
  }, [searchQuery, selectedType]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await researchService.searchPapers(
        searchQuery,
        selectedType || undefined
      );
      setPapers(response.data);

      // Check which papers are bookmarked
      const bookmarkedSet = new Set<string>();
      for (const paper of response.data) {
        const isBookmarked = await bookmarkService.isBookmarked(paper.id);
        if (isBookmarked) {
          bookmarkedSet.add(paper.id);
        }
      }
      setBookmarkedPapers(bookmarkedSet);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBookmark = async (paperId: string) => {
    try {
      await bookmarkService.addBookmark(paperId);
      setBookmarkedPapers(prev => new Set(prev).add(paperId));
    } catch (error) {
      console.error('Failed to add bookmark:', error);
    }
  };

  const handleRemoveBookmark = async (paperId: string) => {
    try {
      await bookmarkService.removeBookmark(paperId);
      setBookmarkedPapers(prev => {
        const newSet = new Set(prev);
        newSet.delete(paperId);
        return newSet;
      });
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Search Research Papers</h1>

      {/* Search Form */}
      <div className="mb-6 space-y-4">
        <Input
          placeholder="Search papers, journals, or conferences..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Types</option>
          <option value="PAPER">Paper</option>
          <option value="JOURNAL">Journal</option>
          <option value="CONFERENCE">Conference</option>
        </select>
      </div>

      {/* Results */}
      {loading && <p>Searching...</p>}

      <div className="grid gap-4">
        {papers.map((paper) => (
          <Card key={paper.id} className="p-4">
            <h3 className="text-xl font-bold">{paper.title}</h3>
            <p className="text-gray-600 text-sm">{paper.authors.join(', ')}</p>
            <p className="text-gray-700 my-2">{paper.content.substring(0, 200)}...</p>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {paper.type}
              </span>
              <Button
                onClick={() =>
                  bookmarkedPapers.has(paper.id)
                    ? handleRemoveBookmark(paper.id)
                    : handleAddBookmark(paper.id)
                }
              >
                {bookmarkedPapers.has(paper.id) ? '★ Bookmarked' : '☆ Bookmark'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// File: src/pages/MyBookmarks.tsx

import { useState, useEffect } from 'react';
import { bookmarkService } from '@/services/bookmarkService';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MyBookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const response = await bookmarkService.getUserBookmarks();
      setBookmarks(response.data);
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (paperId: string) => {
    try {
      await bookmarkService.removeBookmark(paperId);
      setBookmarks(bookmarks.filter(b => b.paper.id !== paperId));
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet. Start bookmarking papers!</p>
      ) : (
        <div className="grid gap-4">
          {bookmarks.map((bookmark: any) => (
            <Card key={bookmark.id} className="p-4">
              <h3 className="text-xl font-bold">{bookmark.paper.title}</h3>
              <p className="text-gray-600 text-sm">{bookmark.paper.authors.join(', ')}</p>
              <div className="mt-4">
                <Button
                  variant="destructive"
                  onClick={() => handleRemove(bookmark.paper.id)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// File: src/pages/UploadPaper.tsx

import { useState } from 'react';
import { researchService } from '@/services/researchService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

export default function UploadPaperPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    type: 'PAPER',
    content: '',
    source: '',
    publishDate: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await researchService.createPaper(
        formData.title,
        formData.authors.split(',').map(a => a.trim()),
        formData.type,
        formData.content,
        formData.source,
        formData.publishDate || undefined,
        formData.tags ? formData.tags.split(',').map(t => t.trim()) : undefined
      );

      // Redirect to search page
      navigate('/search');
    } catch (err: any) {
      setError(err.message || 'Failed to upload paper');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Upload Research Paper</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Authors (comma separated)</label>
          <Input
            type="text"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            placeholder="John Smith, Jane Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="PAPER">Paper</option>
            <option value="JOURNAL">Journal</option>
            <option value="CONFERENCE">Conference</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content/Abstract</label>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={5}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Source URL</label>
          <Input
            type="url"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Publish Date (optional)</label>
          <Input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
          <Input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="ai, machine-learning, research"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Uploading...' : 'Upload Paper'}
        </Button>
      </form>
    </div>
  );
}
