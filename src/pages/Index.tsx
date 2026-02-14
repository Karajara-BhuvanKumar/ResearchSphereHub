import { useState } from "react";
import { Search, TrendingUp, BookOpen, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import conference1 from "@/assets/conference-1.jpg";
import conference2 from "@/assets/conference-2.jpg";
import conference3 from "@/assets/conference-3.jpg";
import conference4 from "@/assets/conference-4.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredConferences = [
    {
      title: "International Conference on Advanced Materials",
      location: "New York, NY",
      date: "March 15-18, 2024",
      image: conference1,
      category: "Materials Science",
    },
    {
      title: "Global Symposium on Sustainable Technologies",
      location: "Amsterdam, NL",
      date: "April 22-24, 2024",
      image: conference2,
      category: "Sustainability",
    },
    {
      title: "Annual Meeting of the Society for Behavioral Sciences",
      location: "Chicago, IL",
      date: "December 5-8, 2024",
      image: conference3,
      category: "Behavioral Sciences",
    },
    {
      title: "International Conference on Advanced Materials",
      location: "New York, NY",
      date: "March 15-18, 2024",
      image: conference4,
      category: "Advanced Materials",
    },
  ];

  const latestJournals = [
    { title: "Journal of Applied Physics", impact: "3.8", publisher: "AIP Publishing" },
    { title: "International Journal of Environmental Science", impact: "4.2", publisher: "Springer" },
    { title: "The Quarterly Review of Economics", impact: "5.1", publisher: "Oxford Press" },
  ];

  const recentPublications = [
    { title: "The Impact of AI on Education", author: "Dr. Maria Garcia", year: "2023" },
    { title: "Climate Change and Global Health", author: "Dr. James Lee", year: "2023" },
    { title: "Advances in Biotechnology", author: "Dr. Sophia Chen", year: "2023" },
  ];

  const callsForPapers = [
    { title: "Special Issue on Renewable Energy", deadline: "December 30, 2024" },
    { title: "Call for Papers: Nanotechnology", deadline: "January 15, 2025" },
    { title: "Submit to the Journal of Social Sciences", deadline: "February 28, 2025" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-hero text-hero-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Explore Global Research Opportunities
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Conferences, Journals, and Calls for Papers in One Place
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <Input
                placeholder="Search for conferences, journals, publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-card text-foreground"
              />
              <Button size="lg">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Links */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="conferences" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="conferences">Conferences</TabsTrigger>
              <TabsTrigger value="journals">Journals</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="calls">Calls for Papers</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Featured Conferences */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Conferences</h2>
            <Link to="/conferences">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredConferences.map((conf, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={conf.image}
                  alt={conf.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-badge-blue text-badge-blue-foreground">
                    {conf.category}
                  </Badge>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {conf.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{conf.location}</p>
                  <p className="text-sm text-muted-foreground">{conf.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Journals */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Latest Journals</h2>
            <Link to="/journals">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestJournals.map((journal, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{journal.title}</h3>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{journal.publisher}</span>
                    <Badge variant="secondary">Impact: {journal.impact}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Recent Publications</h2>
            <Link to="/publications">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPublications.map((pub, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{pub.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {pub.author}, {pub.year}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calls for Papers */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Calls for Papers</h2>
            <Link to="/publications">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {callsForPapers.map((call, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{call.title}</h3>
                  <p className="text-sm text-destructive">Deadline: {call.deadline}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
