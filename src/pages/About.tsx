import { BookOpen, Target, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To connect researchers worldwide with the best opportunities for publication, collaboration, and knowledge sharing.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Database",
      description: "Access thousands of conferences, journals, and publication opportunities across all academic disciplines.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a supportive community of researchers, academics, and institutions dedicated to advancing knowledge.",
    },
    {
      icon: Zap,
      title: "Always Updated",
      description: "Our platform is constantly updated with the latest opportunities, ensuring you never miss important deadlines.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-hero text-hero-foreground py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About ResearchSphere</h1>
            <p className="text-xl opacity-90">
              Your trusted platform for discovering global research opportunities and advancing academic excellence.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8">
              ResearchSphere is a comprehensive platform designed to help researchers, academics, and institutions 
              discover and connect with conferences, journals, and publication opportunities worldwide. We streamline 
              the research publication process by aggregating opportunities from diverse fields and providing powerful 
              search and filtering tools.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg mb-4">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Conferences Listed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-muted-foreground">Academic Journals</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-muted-foreground">Active Researchers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8">
              ResearchSphere is built and maintained by a dedicated team of researchers, developers, and academic 
              professionals who understand the challenges of navigating the research publication landscape. We're 
              committed to making research more accessible and connected.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
