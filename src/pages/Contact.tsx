import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import contactIllustration from "@/assets/contact-illustration.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1">
        <div className="bg-card border-b border-border py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-muted-foreground mb-8">
              Get in touch with our team. We're here to help with any questions or feedback.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name
                      </label>
                      <Input id="name" placeholder="Your full name" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg mb-3">
                      <Mail className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground mb-1">Email</h3>
                    <p className="text-xs text-muted-foreground">info@researchsphere.com</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg mb-3">
                      <Phone className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground mb-1">Phone</h3>
                    <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg mb-3">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground mb-1">Location</h3>
                    <p className="text-xs text-muted-foreground">Global Platform</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Illustration and Info */}
            <div className="flex flex-col justify-center">
              <img
                src={contactIllustration}
                alt="Academic research illustration"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-8"
              />
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">We'd Love to Hear From You</h3>
                <p className="text-muted-foreground">
                  Whether you have a question about features, partnerships, or anything else, 
                  our team is ready to answer all your questions.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Support Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Response Time:</strong> Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
