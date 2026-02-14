import { useState } from "react";
import { Search, Filter, DollarSign, Calendar, Building } from "lucide-react";
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

const ProjectCalls = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const allProjects = [
    { deadline: "Mar 1, 2025", title: "EU Horizon Europe - Green Energy Transition", organization: "European Commission", funding: "€2M - €5M", duration: "36 months", category: "Energy", eligibility: "EU-based institutions", image: conference1 },
    { deadline: "Mar 15, 2025", title: "NSF Innovation in Neuroscience Research", organization: "National Science Foundation", funding: "$500K - $1M", duration: "24 months", category: "Neuroscience", eligibility: "US institutions", image: conference2 },
    { deadline: "Apr 1, 2025", title: "UKRI Future Leaders Fellowship", organization: "UK Research and Innovation", funding: "£750K - £1.5M", duration: "48 months", category: "Multidisciplinary", eligibility: "UK-based researchers", image: conference3 },
    { deadline: "Apr 20, 2025", title: "NIH Precision Medicine Initiative", organization: "National Institutes of Health", funding: "$1M - $2M", duration: "36 months", category: "Medicine", eligibility: "Global partnerships", image: conference4 },
    { deadline: "May 5, 2025", title: "DFG Research Grant - Quantum Technologies", organization: "German Research Foundation", funding: "€800K - €1.2M", duration: "30 months", category: "Physics", eligibility: "Germany-based", image: conference1 },
    { deadline: "May 20, 2025", title: "Australian Research Council - AI Ethics", organization: "ARC", funding: "AUD $600K - $900K", duration: "36 months", category: "AI & Ethics", eligibility: "Australian institutions", image: conference2 },
    { deadline: "Jun 1, 2025", title: "Bill & Melinda Gates Foundation - Global Health", organization: "Gates Foundation", funding: "$2M - $5M", duration: "48 months", category: "Global Health", eligibility: "International", image: conference3 },
    { deadline: "Jun 15, 2025", title: "ERC Starting Grant - Climate Research", organization: "European Research Council", funding: "€1.5M - €2M", duration: "60 months", category: "Climate Science", eligibility: "EU researchers", image: conference4 },
    
    { deadline: "Jul 1, 2025", title: "JSPS Grants-in-Aid - Materials Science", organization: "Japan Society for Promotion of Science", funding: "¥30M - ¥50M", duration: "36 months", category: "Materials", eligibility: "Japan-based", image: conference1 },
    { deadline: "Jul 20, 2025", title: "SNSF Sinergia - Interdisciplinary Research", organization: "Swiss National Science Foundation", funding: "CHF 2M - 3.2M", duration: "48 months", category: "Interdisciplinary", eligibility: "Swiss institutions", image: conference2 },
    { deadline: "Aug 5, 2025", title: "Wellcome Trust - Infectious Diseases", organization: "Wellcome Trust", funding: "£1M - £3M", duration: "60 months", category: "Medicine", eligibility: "International", image: conference3 },
    { deadline: "Aug 20, 2025", title: "Canada Research Chairs - Digital Innovation", organization: "Government of Canada", funding: "CAD $1M - $2M", duration: "84 months", category: "Digital Tech", eligibility: "Canadian institutions", image: conference4 },
    { deadline: "Sep 1, 2025", title: "Marie Skłodowska-Curie Actions", organization: "European Commission", funding: "€1.5M - €2M", duration: "48 months", category: "Researcher Mobility", eligibility: "EU-wide", image: conference1 },
    { deadline: "Sep 15, 2025", title: "Singapore NRF - Smart Nation Initiative", organization: "National Research Foundation", funding: "SGD $2M - $4M", duration: "36 months", category: "Smart Cities", eligibility: "Singapore-based", image: conference2 },
    { deadline: "Oct 1, 2025", title: "NSF CAREER Award - Early Career Research", organization: "National Science Foundation", funding: "$400K - $500K", duration: "60 months", category: "Multidisciplinary", eligibility: "US early career", image: conference3 },
    { deadline: "Oct 20, 2025", title: "Leverhulme Trust Research Grant - Humanities", organization: "Leverhulme Trust", funding: "£250K - £500K", duration: "36 months", category: "Humanities", eligibility: "UK institutions", image: conference4 },
  ];

  const totalPages = Math.ceil(allProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = allProjects.slice(startIndex, endIndex);

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
            <h1 className="text-4xl font-bold text-foreground mb-4">Research Project Funding Calls</h1>
            <p className="text-muted-foreground mb-8">
              Discover funding opportunities from leading research organizations worldwide.
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
                  placeholder="Search project calls by title, organization, or field..."
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

          {/* Projects List */}
          <div className="space-y-6">
            {currentProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-3">
                        <Badge className="bg-primary text-primary-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          Deadline: {project.deadline}
                        </Badge>
                        <Badge variant="outline">{project.category}</Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {project.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <strong>Organization:</strong> {project.organization}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <strong>Funding:</strong> {project.funding}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Duration:</strong> {project.duration}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Eligibility:</strong> {project.eligibility}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button>Apply Now</Button>
                        <Button variant="outline">View Guidelines</Button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
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

export default ProjectCalls;