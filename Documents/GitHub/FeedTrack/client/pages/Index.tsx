import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSolutionSection } from "@/components/landing/ProblemSolutionSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { SampleVideoSection } from "@/components/landing/SampleVideoSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import UserTypeModal from "@/components/UserTypeModal";

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStartedClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-music-purple-600 to-music-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="text-xl font-bold text-foreground">FeedTrack</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </a>
              <Link to="/browse-artist" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse Artists
              </Link>
              <a href="#join-as-pro" className="text-muted-foreground hover:text-foreground transition-colors">
                Join As a Pro
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </button>
              <button onClick={handleGetStartedClick} className="bg-gradient-to-r from-music-purple-600 to-music-pink-600 text-white px-4 py-2 rounded-lg hover:from-music-purple-700 hover:to-music-pink-700 transition-all">
                Get Started
              </button>
              <Link to="/pro-dashboard">
                <button className="bg-music-blue-600 text-white px-4 py-2 rounded-lg hover:bg-music-blue-700 transition-all">
                  Pro Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <SampleVideoSection />
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
        <FinalCTASection />
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-music-purple-600 to-music-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                  F
                </div>
                <span className="text-xl font-bold text-foreground">FeedTrack</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Transform expert music feedback into viral social media content. 
                Built by creators, for creators.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">TikTok</span>
                  🎵
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">YouTube</span>
                  📺
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">How it Works</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Examples</a></li>
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © 2024 FeedTrack. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              Made with 💜 for music creators worldwide
            </p>
          </div>
        </div>
      </footer>

      {/* User Type Modal */}
      <UserTypeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
