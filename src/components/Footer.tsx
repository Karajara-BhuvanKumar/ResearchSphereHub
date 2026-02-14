import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 bg-card rotate-45"></div>
              </div>
              <span className="text-lg font-bold text-foreground">ResearchSphere</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your gateway to global research opportunities.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/conferences" className="text-muted-foreground hover:text-primary">Conferences</Link></li>
              <li><Link to="/journals" className="text-muted-foreground hover:text-primary">Journals</Link></li>
              <li><Link to="/publications" className="text-muted-foreground hover:text-primary">Publications</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 ResearchSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
