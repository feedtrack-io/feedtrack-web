import { Play, Volume2, Heart, MessageCircle, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SampleVideoSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See FeedTrack in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how expert feedback transforms into engaging, shareable content
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video mockup */}
          <div className="relative">
            <div className="aspect-[9/16] max-w-sm mx-auto bg-black rounded-3xl p-1 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-music-purple-900 via-music-pink-900 to-music-blue-900 rounded-3xl relative overflow-hidden">
                {/* Video content mockup */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Header */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-music-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">ProducerMike</p>
                      <p className="text-xs opacity-75">Verified Expert</p>
                    </div>
                  </div>
                  <div className="text-xs bg-black/30 px-2 py-1 rounded-full">
                    2:34
                  </div>
                </div>

                {/* Center play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/50">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </Button>
                </div>

                {/* Waveform visualization */}
                <div className="absolute bottom-20 left-4 right-4">
                  <div className="bg-black/30 rounded-full p-3">
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 bg-music-purple-400 rounded-full ${
                            i < 8 ? 'h-8' : i < 12 ? 'h-6' : 'h-4'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom overlay with engagement */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium mb-2">
                    "Your melody has great potential, but let's talk about that drop..."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        <span className="text-sm">2.4K</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">156</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share className="w-5 h-5" />
                        <span className="text-sm">89</span>
                      </div>
                    </div>
                    <Volume2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-4 shadow-lg transform rotate-12">
              <div className="text-center">
                <p className="text-2xl mb-1">🔥</p>
                <p className="text-xs font-medium">Viral Ready</p>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-4 shadow-lg transform -rotate-12">
              <div className="text-center">
                <p className="text-2xl mb-1">⚡</p>
                <p className="text-xs font-medium">Expert Review</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Professional Feedback That Actually Engages
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                This sample shows how traditional written feedback transforms into dynamic, 
                visual content that your audience wants to watch and share.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-music-purple-500/10 text-music-purple-600 rounded-lg flex items-center justify-center">
                  🎵
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Audio-Visual Sync</h4>
                  <p className="text-muted-foreground">Expert commentary synced perfectly with your track's key moments</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-music-pink-500/10 text-music-pink-600 rounded-lg flex items-center justify-center">
                  💡
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Actionable Insights</h4>
                  <p className="text-muted-foreground">Specific, timestamped feedback you can immediately apply</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-music-blue-500/10 text-music-blue-600 rounded-lg flex items-center justify-center">
                  📱
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Social Optimization</h4>
                  <p className="text-muted-foreground">Perfect format and timing for maximum social media engagement</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button size="lg" className="bg-gradient-to-r from-music-purple-600 to-music-pink-600 hover:from-music-purple-700 hover:to-music-pink-700">
                Get Your Video Review
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="relative bg-gradient-to-br from-music-blue-500/20 to-music-purple-500/20 border border-music-blue-500/30 rounded-2xl p-6 mb-3 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-music-blue-500/10 via-music-purple-500/10 to-music-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-music-blue-400/5 to-transparent animate-pulse"></div>
              <p className="text-3xl font-bold text-foreground relative z-10">2.5x</p>
            </div>
            <p className="text-sm text-muted-foreground">More Engagement</p>
          </div>
          <div>
            <div className="relative bg-gradient-to-br from-music-purple-500/20 to-music-pink-500/20 border border-music-purple-500/30 rounded-2xl p-6 mb-3 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-music-purple-500/10 via-music-pink-500/10 to-music-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-music-purple-400/5 to-transparent animate-pulse"></div>
              <p className="text-3xl font-bold text-foreground relative z-10">85%</p>
            </div>
            <p className="text-sm text-muted-foreground">Share Rate</p>
          </div>
          <div>
            <div className="relative bg-gradient-to-br from-music-pink-500/20 to-music-blue-500/20 border border-music-pink-500/30 rounded-2xl p-6 mb-3 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-music-pink-500/10 via-music-blue-500/10 to-music-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-music-pink-400/5 to-transparent animate-pulse"></div>
              <p className="text-3xl font-bold text-foreground relative z-10">3.2M</p>
            </div>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>
          <div>
            <div className="relative bg-gradient-to-br from-music-blue-500/20 to-music-purple-500/20 border border-music-blue-500/30 rounded-2xl p-6 mb-3 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-music-blue-500/10 via-music-purple-500/10 to-music-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-music-blue-400/5 to-transparent animate-pulse"></div>
              <p className="text-3xl font-bold text-foreground relative z-10">4.9★</p>
            </div>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
