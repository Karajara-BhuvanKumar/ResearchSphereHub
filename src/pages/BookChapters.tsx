import { useState } from "react";
import { Search, Filter, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import conference1 from "@/assets/conference-1.jpg";
import conference2 from "@/assets/conference-2.jpg";
import conference3 from "@/assets/conference-3.jpg";
import conference4 from "@/assets/conference-4.jpg";

const BookChapters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const allChapters = [
    { deadline: "Feb 15, 2025", title: "Advances in Neural Networks and Deep Learning", publisher: "Springer", editor: "Dr. Sarah Johnson", category: "AI & Machine Learning", image: conference1, pages: "15-20 pages", compensation: "Book copy + discount" },
    { deadline: "Mar 1, 2025", title: "Handbook of Sustainable Energy Technologies", publisher: "Elsevier", editor: "Prof. Michael Chen", category: "Energy & Environment", image: conference2, pages: "20-25 pages", compensation: "Royalty sharing" },
    { deadline: "Mar 20, 2025", title: "Clinical Applications of CRISPR Technology", publisher: "Wiley", editor: "Dr. Emily Rodriguez", category: "Biotechnology", image: conference3, pages: "12-18 pages", compensation: "Book copy" },
    { deadline: "Apr 5, 2025", title: "Quantum Computing: Theory and Practice", publisher: "Cambridge University Press", editor: "Prof. James Wilson", category: "Physics & Computing", image: conference4, pages: "18-22 pages", compensation: "Royalty + book copy" },
    { deadline: "Apr 20, 2025", title: "Social Media Analytics and Big Data", publisher: "IGI Global", editor: "Dr. Amanda Lee", category: "Data Science", image: conference1, pages: "15-20 pages", compensation: "Book copy + discount" },
    { deadline: "May 1, 2025", title: "Nanotechnology in Medicine", publisher: "Academic Press", editor: "Prof. Robert Brown", category: "Nanomedicine", image: conference2, pages: "20-30 pages", compensation: "Royalty sharing" },
    { deadline: "May 15, 2025", title: "Climate Change Adaptation Strategies", publisher: "Springer Nature", editor: "Dr. Lisa Martinez", category: "Environmental Science", image: conference3, pages: "15-20 pages", compensation: "Book copy" },
    { deadline: "Jun 1, 2025", title: "Artificial Intelligence in Healthcare", publisher: "CRC Press", editor: "Prof. David Anderson", category: "Health Informatics", image: conference4, pages: "18-25 pages", compensation: "Royalty + book copy" },
    
    { deadline: "Jun 15, 2025", title: "Blockchain Technology and Applications", publisher: "Springer", editor: "Dr. Jennifer Kim", category: "Computer Science", image: conference1, pages: "15-20 pages", compensation: "Book copy + discount" },
    { deadline: "Jul 1, 2025", title: "Advanced Materials for 3D Printing", publisher: "Elsevier", editor: "Prof. Thomas White", category: "Materials Science", image: conference2, pages: "20-25 pages", compensation: "Royalty sharing" },
    { deadline: "Jul 20, 2025", title: "Cybersecurity in the IoT Era", publisher: "Wiley-IEEE Press", editor: "Dr. Mark Thompson", category: "Cybersecurity", image: conference3, pages: "15-18 pages", compensation: "Book copy" },
    { deadline: "Aug 5, 2025", title: "Machine Learning for Financial Markets", publisher: "Chapman & Hall", editor: "Prof. Anna Garcia", category: "FinTech", image: conference4, pages: "18-22 pages", compensation: "Royalty + book copy" },
    { deadline: "Aug 20, 2025", title: "Robotics and Automation in Industry 4.0", publisher: "Springer", editor: "Dr. Kevin Park", category: "Robotics", image: conference1, pages: "15-20 pages", compensation: "Book copy + discount" },
    { deadline: "Sep 1, 2025", title: "Gene Therapy: Current and Future Perspectives", publisher: "Academic Press", editor: "Prof. Rachel Cohen", category: "Genetics", image: conference2, pages: "20-30 pages", compensation: "Royalty sharing" },
    { deadline: "Sep 15, 2025", title: "Smart Cities and Urban Analytics", publisher: "Routledge", editor: "Dr. Daniel Lee", category: "Urban Planning", image: conference3, pages: "15-20 pages", compensation: "Book copy" },
    { deadline: "Oct 1, 2025", title: "Renewable Energy Systems Design", publisher: "Wiley", editor: "Prof. Maria Santos", category: "Renewable Energy", image: conference4, pages: "18-25 pages", compensation: "Royalty + book copy" },
  ];

  const totalPages = Math.ceil(allChapters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChapters = allChapters.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1">
        <div className="bg-card border-b border-border py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">Book Chapter Opportunities</h1>
            <p className="text-muted-foreground mb-8">
              Contribute to leading academic books and publications worldwide.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Bar */}
          <div className="bg-card p-4 rounded-lg border border-border mb-6 sticky top-16 z-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search book chapters by title, publisher, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Chapters List */}
          <div className="space-y-6">
            {currentChapters.map((chapter, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-3">
                        <Badge className="bg-primary text-primary-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          Deadline: {chapter.deadline}
                        </Badge>
                        <Badge variant="outline">{chapter.category}</Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {chapter.title}
                      </h3>
                      
                      <div className="space-y-1 mb-4">
                        <p className="text-sm text-muted-foreground">
                          <strong>Publisher:</strong> {chapter.publisher}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Editor:</strong> {chapter.editor}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Expected Length:</strong> {chapter.pages}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Compensation:</strong> {chapter.compensation}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button>Submit Proposal</Button>
                        <Button variant="outline">Download Guidelines</Button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
                      <img
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button 
              variant="outline" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
            
            <Button 
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookChapters;