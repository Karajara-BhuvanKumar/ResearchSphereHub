import { useState, useEffect } from "react";
import { Search, Filter, Calendar, MapPin, Users, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { searchAllAPIs, ArxivPaper, CrossRefWork, OpenAlexWork, DBLPPublication } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import conference1 from "@/assets/conference-1.jpg";
import conference2 from "@/assets/conference-2.jpg";
import conference3 from "@/assets/conference-3.jpg";
import conference4 from "@/assets/conference-4.jpg";

const GeneralFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [apiResults, setApiResults] = useState<{
    arxiv: ArxivPaper[];
    crossref: CrossRefWork[];
    openalex: OpenAlexWork[];
    dblp: DBLPPublication[];
  } | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const results = await searchAllAPIs(searchQuery);
      setApiResults(results);
      toast({
        title: "Search completed!",
        description: `Found ${results.arxiv.length + results.crossref.length + results.openalex.length + results.dblp.length} results across all sources.`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const allResults = [
    { type: "Conference", title: "International AI Summit 2024", location: "New York, USA", date: "Dec 15-17, 2024", category: "Computer Science", image: conference1 },
    { type: "Journal", title: "Nature Machine Intelligence", publisher: "Nature Publishing Group", impact: "25.898", category: "AI & ML", image: conference2 },
    { type: "Call for Papers", title: "Special Issue on Quantum Computing", deadline: "Jan 30, 2025", host: "Quantum Journal", category: "Physics", image: conference3 },
    { type: "Book Chapter", title: "Advances in Neural Networks - Call for Chapters", deadline: "Feb 15, 2025", publisher: "Springer", category: "Computer Science", image: conference4 },
    { type: "Project Call", title: "EU Horizon Research Grant - Green Energy", funding: "€2M-5M", deadline: "Mar 1, 2025", category: "Energy", image: conference1 },
    { type: "Collaboration", title: "Multi-Institution Cancer Research Initiative", partners: "5 Universities", location: "Europe", category: "Medicine", image: conference2 },
    { type: "Conference", title: "Global Climate Change Symposium", location: "Geneva, Switzerland", date: "Jan 20-22, 2025", category: "Environmental Science", image: conference3 },
    { type: "Journal", title: "IEEE Transactions on Robotics", publisher: "IEEE", impact: "6.835", category: "Robotics", image: conference4 },
    { type: "Call for Papers", title: "Sustainable Materials Conference", deadline: "Feb 28, 2025", host: "Materials Society", category: "Materials Science", image: conference1 },
    { type: "Book Chapter", title: "Handbook of Biomedical Engineering", deadline: "Mar 15, 2025", publisher: "Elsevier", category: "Biomedical", image: conference2 },
    { type: "Project Call", title: "NSF Innovation in Neuroscience", funding: "$500K-1M", deadline: "Apr 1, 2025", category: "Neuroscience", image: conference3 },
    { type: "Collaboration", title: "International Space Research Consortium", partners: "12 Institutions", location: "Global", category: "Space Science", image: conference4 },
  ];

  // Convert API results to unified format
  const unifiedResults = apiResults ? [
    ...apiResults.arxiv.map(paper => ({
      type: "Research Paper (arXiv)",
      title: paper.title,
      category: paper.category,
      authors: paper.authors.join(", "),
      published: new Date(paper.published).toLocaleDateString(),
      link: paper.link,
      image: conference1,
      summary: paper.summary.slice(0, 200) + "...",
      venue: undefined as string | undefined,
      journal: undefined as string | undefined,
      publisher: undefined as string | undefined,
      doi: undefined as string | undefined,
      url: undefined as string | undefined,
    })),
    ...apiResults.crossref.map(work => ({
      type: "Journal Article (CrossRef)",
      title: work.title?.[0] || "Untitled",
      category: work.type || "Article",
      authors: work.author?.map(a => `${a.given || ""} ${a.family || ""}`).join(", ") || "Unknown",
      published: work.published?.['date-parts']?.[0]?.[0]?.toString() || "N/A",
      publisher: work.publisher || "Unknown",
      doi: work.DOI,
      image: conference2,
      journal: work['container-title']?.[0] || "N/A",
      link: undefined as string | undefined,
      summary: undefined as string | undefined,
      venue: undefined as string | undefined,
      url: undefined as string | undefined,
    })),
    ...apiResults.openalex.map(work => ({
      type: "Publication (OpenAlex)",
      title: work.title,
      category: work.type,
      authors: work.authorships.map(a => a.author.display_name).join(", "),
      published: work.publication_year?.toString() || "N/A",
      venue: work.host_venue?.display_name || "N/A",
      doi: work.doi,
      image: conference3,
      link: undefined as string | undefined,
      summary: undefined as string | undefined,
      journal: undefined as string | undefined,
      publisher: undefined as string | undefined,
      url: undefined as string | undefined,
    })),
    ...apiResults.dblp.map(pub => ({
      type: "CS Publication (DBLP)",
      title: pub.title,
      category: pub.type || "Publication",
      authors: Array.isArray(pub.authors?.author) 
        ? pub.authors.author.join(", ") 
        : pub.authors?.author || "Unknown",
      published: pub.year || "N/A",
      venue: pub.venue || "N/A",
      url: pub.url,
      image: conference4,
      link: undefined as string | undefined,
      summary: undefined as string | undefined,
      journal: undefined as string | undefined,
      publisher: undefined as string | undefined,
      doi: undefined as string | undefined,
    })),
  ] : [];

  const filteredResults = activeTab === "all" 
    ? unifiedResults 
    : activeTab === "arxiv" 
    ? unifiedResults.filter(r => r.type.includes("arXiv"))
    : activeTab === "crossref"
    ? unifiedResults.filter(r => r.type.includes("CrossRef"))
    : activeTab === "openalex"
    ? unifiedResults.filter(r => r.type.includes("OpenAlex"))
    : activeTab === "dblp"
    ? unifiedResults.filter(r => r.type.includes("DBLP"))
    : unifiedResults;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Computer Science": "bg-badge-blue text-badge-blue-foreground",
      "AI & ML": "bg-badge-purple text-badge-purple-foreground",
      "Physics": "bg-badge-orange text-badge-orange-foreground",
      "Energy": "bg-badge-green text-badge-green-foreground",
      "Medicine": "bg-badge-blue text-badge-blue-foreground",
      "Environmental Science": "bg-badge-green text-badge-green-foreground",
      "Robotics": "bg-badge-purple text-badge-purple-foreground",
      "Materials Science": "bg-badge-orange text-badge-orange-foreground",
      "Biomedical": "bg-badge-blue text-badge-blue-foreground",
      "Neuroscience": "bg-badge-purple text-badge-purple-foreground",
      "Space Science": "bg-badge-orange text-badge-orange-foreground",
    };
    return colors[category] || "bg-badge-blue text-badge-blue-foreground";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1">
        <div className="bg-gradient-to-br from-hero to-hero/60 text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Universal Research Finder</h1>
            <p className="text-xl mb-2 text-white/90">
              Search across arXiv, CrossRef, OpenAlex & DBLP
            </p>
            <p className="text-sm mb-8 text-white/80">
              Real-time search of millions of research papers, journals, and publications
            </p>
            
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search research papers: machine learning, quantum computing, etc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 border-0 focus-visible:ring-0 text-foreground"
                    disabled={loading}
                  />
                </div>
                <Button size="lg" onClick={handleSearch} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="arxiv">arXiv Papers</TabsTrigger>
              <TabsTrigger value="crossref">CrossRef Journals</TabsTrigger>
              <TabsTrigger value="openalex">OpenAlex</TabsTrigger>
              <TabsTrigger value="dblp">DBLP (CS)</TabsTrigger>
            </TabsList>
          </Tabs>

          {!apiResults && !loading && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start Your Research</h3>
              <p className="text-muted-foreground">
                Enter a search query above to discover research papers from multiple sources
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <Loader2 className="h-16 w-16 mx-auto text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Searching across all research databases...</p>
            </div>
          )}

          {apiResults && filteredResults.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredResults.length} results
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">arXiv: {apiResults.arxiv.length}</Badge>
                  <Badge variant="outline">CrossRef: {apiResults.crossref.length}</Badge>
                  <Badge variant="outline">OpenAlex: {apiResults.openalex.length}</Badge>
                  <Badge variant="outline">DBLP: {apiResults.dblp.length}</Badge>
                </div>
              </div>

              <div className="space-y-4">
                {filteredResults.map((result, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="outline">{result.type}</Badge>
                              <Badge className={getCategoryColor(result.category)}>
                                {result.category}
                              </Badge>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {result.title}
                          </h3>
                          
                          <div className="space-y-2 mb-4">
                            <p className="text-sm text-muted-foreground">
                              <strong>Authors:</strong> {result.authors || "N/A"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <strong>Published:</strong> {result.published}
                            </p>
                            {result.venue && (
                              <p className="text-sm text-muted-foreground">
                                <strong>Venue:</strong> {result.venue}
                              </p>
                            )}
                            {result.journal && (
                              <p className="text-sm text-muted-foreground">
                                <strong>Journal:</strong> {result.journal}
                              </p>
                            )}
                            {result.publisher && (
                              <p className="text-sm text-muted-foreground">
                                <strong>Publisher:</strong> {result.publisher}
                              </p>
                            )}
                            {result.doi && (
                              <p className="text-sm text-muted-foreground">
                                <strong>DOI:</strong> {result.doi}
                              </p>
                            )}
                            {result.summary && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {result.summary}
                              </p>
                            )}
                          </div>
                          
                          <Button asChild>
                            <a 
                              href={result.link || result.url || (result.doi ? `https://doi.org/${result.doi}` : '#')} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              View Paper
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GeneralFinder;