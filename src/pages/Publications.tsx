import { useState } from "react";
import { Search, Filter, Calendar, FileText } from "lucide-react";
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

const Publications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const allCalls = [
    // Page 1
    { deadline: "July 31, 2024", title: "International Conference on Advanced Materials", type: "Conference", host: "Materials Research Society", image: conference1 },
    { deadline: "August 15, 2024", title: "Journal of Applied Physics - Special Issue on Nanotechnology", type: "Journal", host: "American Institute of Physics", image: conference2 },
    { deadline: "September 30, 2024", title: "Global Symposium on Sustainable Energy", type: "Conference", host: "International Energy Association", image: conference3 },
    { deadline: "October 1, 2024", title: "Advances in Biomedical Engineering - Call for Papers", type: "Journal", host: "Biomedical Engineering Society", image: conference4 },
    { deadline: "November 15, 2024", title: "Annual Conference on Artificial Intelligence", type: "Conference", host: "Association for the Advancement of AI", image: conference1 },
    { deadline: "December 1, 2024", title: "Journal of Environmental Science - Special Issue on Climate Change", type: "Journal", host: "Environmental Science Publications", image: conference2 },
    { deadline: "December 15, 2024", title: "International Workshop on Machine Learning", type: "Conference", host: "ML Research Institute", image: conference3 },
    { deadline: "January 10, 2025", title: "Computational Biology and Bioinformatics", type: "Journal", host: "BioCompute Press", image: conference4 },
    
    // Page 2
    { deadline: "January 20, 2025", title: "World Conference on Quantum Computing", type: "Conference", host: "Quantum Research Alliance", image: conference1 },
    { deadline: "January 31, 2025", title: "Neuroscience Today - Special Issue on Brain Mapping", type: "Journal", host: "Brain Research Publications", image: conference2 },
    { deadline: "February 14, 2025", title: "Symposium on Renewable Materials", type: "Conference", host: "Materials Innovation Society", image: conference3 },
    { deadline: "February 28, 2025", title: "Journal of Chemical Engineering - Process Optimization", type: "Journal", host: "Chemistry International", image: conference4 },
    { deadline: "March 10, 2025", title: "International Conference on Robotics and Automation", type: "Conference", host: "Robotics Society", image: conference1 },
    { deadline: "March 25, 2025", title: "Medical Imaging and Diagnostics Journal", type: "Journal", host: "Medical Insights", image: conference2 },
    { deadline: "April 5, 2025", title: "Global Summit on Cybersecurity", type: "Conference", host: "InfoSec Alliance", image: conference3 },
    { deadline: "April 20, 2025", title: "Renewable Energy Research - Wind and Solar", type: "Journal", host: "Green Tech Press", image: conference4 },
    
    // Page 3
    { deadline: "May 1, 2025", title: "Conference on Data Science and Analytics", type: "Conference", host: "Data Science Institute", image: conference1 },
    { deadline: "May 15, 2025", title: "Journal of Business Strategy - Digital Transformation", type: "Journal", host: "Business Publications", image: conference2 },
    { deadline: "May 30, 2025", title: "International Psychology and Mental Health Conference", type: "Conference", host: "Mental Health Association", image: conference3 },
    { deadline: "June 10, 2025", title: "Climate Science Quarterly - Arctic Research", type: "Journal", host: "Eco Press", image: conference4 },
    { deadline: "June 25, 2025", title: "Symposium on Space Exploration", type: "Conference", host: "Space Science Society", image: conference1 },
    { deadline: "July 5, 2025", title: "Materials Science and Technology - Nanomaterials", type: "Journal", host: "Materials Press", image: conference2 },
    { deadline: "July 20, 2025", title: "World Conference on Education Technology", type: "Conference", host: "EdTech International", image: conference3 },
    { deadline: "August 1, 2025", title: "Genetics and Genomics - CRISPR Applications", type: "Journal", host: "Gene Research Press", image: conference4 },
  ];

  const totalPages = Math.ceil(allCalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCalls = allCalls.slice(startIndex, endIndex);

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
            <h1 className="text-4xl font-bold text-foreground mb-4">Calls for Papers</h1>
            <p className="text-muted-foreground mb-8">
              Explore upcoming publication deadlines and opportunities.
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
                  placeholder="Search for calls for papers..."
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

          {/* Calls List */}
          <div className="space-y-6">
            {currentCalls.map((call, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <Badge className="mb-3 bg-primary text-primary-foreground">
                        Deadline: {call.deadline}
                      </Badge>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {call.title}
                      </h3>
                      <div className="space-y-1 mb-4">
                        <p className="text-sm text-muted-foreground">
                          Type: {call.type} | Host: {call.host}
                        </p>
                      </div>
                      <Button>View Details</Button>
                    </div>
                    <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
                      <img
                        src={call.image}
                        alt={call.title}
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

export default Publications;
