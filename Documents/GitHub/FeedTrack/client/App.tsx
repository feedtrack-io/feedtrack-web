import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ExploreArtists from "./pages/ExploreArtists";
import ArtistProfile from "./pages/ArtistProfile";
import ProDashboard from "./pages/ProDashboard";
import ReviewSession from "./pages/ReviewSession";
import SignUp from "./pages/SignUp";
import ProSignUp from "./pages/ProSignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse-artist" element={<ExploreArtists />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          <Route path="/pro-dashboard" element={<ProDashboard />} />
          <Route path="/review/:trackId" element={<ReviewSession />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pro-signup" element={<ProSignUp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
