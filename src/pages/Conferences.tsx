import { useState } from "react";
import { Search, MapPin, Calendar, Clock, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Conferences = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const conferences = [
    {
      title: "International Conference on Artificial Intelligence",
      host: "Institute for Advanced Studies",
      location: "London, UK / Online",
      dates: "October 15-18, 2024",
      deadline: "August 31, 2024",
    },
    {
      title: "Biotechnology Symposium",
      host: "National Biotech Association",
      location: "San Francisco, USA",
      dates: "November 5-7, 2024",
      deadline: "September 15, 2024",
    },
    {
      title: "Mechanical Engineering Summit",
      host: "Society of Mechanical Engineers",
      location: "Online",
      dates: "December 1-3, 2024",
      deadline: "October 20, 2024",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1">
        <div className="bg-card border-b border-border py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">Conferences</h1>
            <p className="text-muted-foreground mb-8">
              Explore upcoming conferences in various research domains.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="w-64 flex-shrink-0">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Filters</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Search conferences...
                      </label>
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Domain
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="ai">Artificial Intelligence</SelectItem>
                          <SelectItem value="biotech">Biotechnology</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Region
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="americas">Americas</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Date
                      </label>
                      <Input type="date" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Submission Deadline
                      </label>
                      <Input type="date" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Conferences List */}
            <div className="flex-1">
              <div className="space-y-6">
                {conferences.map((conf, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {conf.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Hosted by {conf.host}
                          </p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{conf.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{conf.dates}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-destructive">
                              <Clock className="h-4 w-4" />
                              <span>Deadline: {conf.deadline}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button>View Details</Button>
                            <Button variant="outline" size="icon">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">...</Button>
                <Button variant="outline">10</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Conferences;
