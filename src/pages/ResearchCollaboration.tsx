import { useState } from "react";
import { Search, Filter, Users, MapPin, Calendar, Building2 } from "lucide-react";
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

const ResearchCollaboration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const allCollaborations = [
    { title: "Multi-Institution Cancer Research Initiative", lead: "Harvard Medical School", partners: "5 Universities", location: "USA & Europe", field: "Oncology", duration: "5 years", status: "Open", image: conference1, openPositions: "3 Research Fellows" },
    { title: "International Space Research Consortium", lead: "NASA", partners: "12 Institutions", location: "Global", field: "Space Science", duration: "10 years", status: "Open", image: conference2, openPositions: "5 PostDocs" },
    { title: "Climate Change Adaptation Network", lead: "Max Planck Institute", partners: "8 Universities", location: "Europe & Africa", field: "Climate Science", duration: "4 years", status: "Open", image: conference3, openPositions: "2 Senior Researchers" },
    { title: "AI Ethics and Governance Consortium", lead: "MIT", partners: "15 Institutions", location: "North America", field: "AI & Ethics", duration: "3 years", status: "Open", image: conference4, openPositions: "4 PhD Students" },
    { title: "Global Infectious Disease Monitoring", lead: "WHO", partners: "20+ Institutions", location: "Global", field: "Epidemiology", duration: "Ongoing", status: "Open", image: conference1, openPositions: "6 Researchers" },
    { title: "Quantum Computing Alliance", lead: "IBM Research", partners: "7 Universities", location: "USA & Asia", field: "Quantum Physics", duration: "6 years", status: "Open", image: conference2, openPositions: "3 Research Scientists" },
    { title: "Sustainable Agriculture Research Network", lead: "CGIAR", partners: "18 Institutions", location: "Global", field: "Agriculture", duration: "5 years", status: "Open", image: conference3, openPositions: "5 Field Researchers" },
    { title: "Brain-Computer Interface Consortium", lead: "Stanford University", partners: "9 Institutions", location: "USA & Europe", field: "Neuroscience", duration: "4 years", status: "Open", image: conference4, openPositions: "2 PostDocs" },
    
    { title: "Marine Biodiversity Conservation Project", lead: "Woods Hole Oceanographic", partners: "11 Institutions", location: "Global", field: "Marine Biology", duration: "6 years", status: "Open", image: conference1, openPositions: "4 Marine Biologists" },
    { title: "Next-Gen Battery Technology Alliance", lead: "Tesla Research", partners: "6 Universities", location: "USA & Germany", field: "Materials Science", duration: "5 years", status: "Open", image: conference2, openPositions: "3 Materials Scientists" },
    { title: "Global Mental Health Research Network", lead: "Johns Hopkins", partners: "14 Institutions", location: "Global", field: "Psychology", duration: "4 years", status: "Open", image: conference3, openPositions: "5 Clinical Researchers" },
    { title: "Smart Cities Innovation Hub", lead: "Singapore NTU", partners: "10 Institutions", location: "Asia & Europe", field: "Urban Planning", duration: "5 years", status: "Open", image: conference4, openPositions: "3 Urban Planners" },
    { title: "Genomics and Personalized Medicine", lead: "Broad Institute", partners: "13 Institutions", location: "USA & UK", field: "Genomics", duration: "7 years", status: "Open", image: conference1, openPositions: "6 Bioinformaticians" },
    { title: "Renewable Energy Grid Optimization", lead: "TU Delft", partners: "8 Universities", location: "Europe", field: "Energy Systems", duration: "4 years", status: "Open", image: conference2, openPositions: "2 Energy Engineers" },
    { title: "Ancient Languages Digital Archive", lead: "Oxford University", partners: "12 Institutions", location: "Global", field: "Linguistics", duration: "8 years", status: "Open", image: conference3, openPositions: "4 Linguists" },
    { title: "Fusion Energy Development Consortium", lead: "ITER Organization", partners: "35 Countries", location: "Global", field: "Nuclear Physics", duration: "15 years", status: "Open", image: conference4, openPositions: "8 Physicists" },
  ];

  const totalPages = Math.ceil(allCollaborations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCollaborations = allCollaborations.slice(startIndex, endIndex);

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
            <h1 className="text-4xl font-bold text-foreground mb-4">Research Collaboration Opportunities</h1>
            <p className="text-muted-foreground mb-8">
              Connect with global research initiatives and collaborative projects.
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
                  placeholder="Search collaborations by field, institution, or location..."
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

          {/* Collaborations List */}
          <div className="space-y-6">
            {currentCollaborations.map((collab, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-3">
                        <Badge className="bg-badge-green text-badge-green-foreground">
                          {collab.status}
                        </Badge>
                        <Badge variant="outline">{collab.field}</Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {collab.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <strong>Lead Institution:</strong> {collab.lead}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <strong>Partner Institutions:</strong> {collab.partners}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <strong>Location:</strong> {collab.location}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <strong>Duration:</strong> {collab.duration}
                        </p>
                        <p className="text-sm text-primary font-medium">
                          <strong>Open Positions:</strong> {collab.openPositions}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button>Express Interest</Button>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
                      <img
                        src={collab.image}
                        alt={collab.title}
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

export default ResearchCollaboration;