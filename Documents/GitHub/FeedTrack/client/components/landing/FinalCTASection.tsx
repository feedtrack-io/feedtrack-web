import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Users, Zap } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3e%3cdefs%3e%3cpattern id=\"grid\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"%3e%3cpath d=\"m 100 0 l 0 100 l -100 0 l 0 -100 z\" fill=\"none\" stroke=\"%23ffffff\" stroke-width=\"1\" opacity=\"0.1\"/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\"100%25\" height=\"100%25\" fill=\"url(%23grid)\"/%3e%3c/svg%3e')] opacity-30"}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Viral Video Guarantee */}
          <div className="mb-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                🎯 Viral Video Guarantee
              </h3>
              <p className="text-white/80 mb-6">
                If your FeedTrack video doesn't get at least 1,000 views in 30 days, we'll create another one for free.
                We're that confident in our format.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <span>💳</span>
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <span>🔄</span>
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <span>🛡️</span>
                  <span>30-day money back</span>
                </div>
              </div>
            </div>
          </div>

          {/* Urgency element */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-red-500/30">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
              <span>Only 47 free spots remaining</span>
            </div>
          </div>

          {/* Trust signals */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">Secure Signup</h3>
              <p className="text-white/70 text-sm">Bank-level encryption protects your data</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-white/70 text-sm">We never share your email or music</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Verified Experts</h3>
              <p className="text-white/70 text-sm">Only vetted industry professionals</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">Instant Access</h3>
              <p className="text-white/70 text-sm">Get started immediately after signup</p>
            </div>
          </div>

          {/* Social proof */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-white/70">Creators joined</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">50M+</div>
                <div className="text-white/70">Video views generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">4.9★</div>
                <div className="text-white/70">Average rating</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-white/80 font-medium mb-4">
                "The most game-changing tool for music creators in 2024"
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-white/60">
                <span>🎵 TechCrunch</span>
                <span>🎧 Billboard</span>
                <span>🚀 Music Business Worldwide</span>
              </div>
            </div>
          </div>

          {/* Main CTA */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Turn Your Music into 
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Viral Content?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
              Join the first 100 creators getting expert video feedback for FREE. 
              Transform your music career with content that actually converts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-music-purple-900 hover:bg-white/90">
                Join the Waitlist - FREE
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-white/30 text-white hover:bg-white/10">
                See Pricing Plans
              </Button>
            </div>

            {/* Urgency indicator */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">47 spots remaining</span>
              <span className="text-white/60">•</span>
              <span className="text-white/80">Free tier ends soon</span>
            </div>
          </div>



          {/* Final push */}
          <div className="mt-12">
            <p className="text-white/60 text-sm max-w-2xl mx-auto">
              By joining FeedTrack, you agree to our Terms of Service and Privacy Policy. 
              Cancel anytime with just one click. No hidden fees or commitments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
