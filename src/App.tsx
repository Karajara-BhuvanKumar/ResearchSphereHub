import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Conferences from "./pages/Conferences";
import Journals from "./pages/Journals";
import Publications from "./pages/Publications";
import GeneralFinder from "./pages/GeneralFinder";
import BookChapters from "./pages/BookChapters";
import ProjectCalls from "./pages/ProjectCalls";
import ResearchCollaboration from "./pages/ResearchCollaboration";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/conferences" element={<Conferences />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/general-finder" element={<GeneralFinder />} />
            <Route path="/book-chapters" element={<BookChapters />} />
            <Route path="/project-calls" element={<ProjectCalls />} />
            <Route path="/research-collaboration" element={<ResearchCollaboration />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
