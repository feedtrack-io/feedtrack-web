import { Button } from "@/components/ui/button";
import { Play, Video, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black pt-20 pb-16">
      {/* Background decoration */}
      <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width=\"60\" height=\"60\" xmlns=\"http://www.w3.org/2000/svg\"%3e%3cdefs%3e%3cpattern id=\"grid\" width=\"60\" height=\"60\" patternUnits=\"userSpaceOnUse\"%3e%3cpath d=\"m 60 0 l 0 60 l -60 0 l 0 -60 z\" fill=\"none\" stroke=\"%23a855f7\" stroke-width=\"0.5\" opacity=\"0.1\"/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\"100%25\" height=\"100%25\" fill=\"url(%23grid)\"/%3e%3c/svg%3e')] opacity-30"}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between" style={{marginTop: '-4px', paddingTop: '53px'}}>
          <div className="lg:w-1/2 mb-10 lg:mb-0 flex flex-col justify-start items-start" style={{margin: '-2px 0 270px'}}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Early Access - First 100 Users Free
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Turn Expert 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-music-purple-600 to-music-pink-600"> Feedback</span> into 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-music-pink-600 to-music-blue-600"> Viral Videos</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              FeedTrack transforms boring song reviews into engaging, shareable videos perfect for TikTok, Reels, and YouTube Shorts. Get actionable feedback from vetted producers and engineers that your audience will actually watch.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-music-purple-600 to-music-pink-600 hover:from-music-purple-700 hover:to-music-pink-700">
                Join the Waitlist
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust signals */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-2">
                  <div className="w-8 h-8 rounded-full bg-music-purple-500"></div>
                  <div className="w-8 h-8 rounded-full bg-music-pink-500"></div>
                  <div className="w-8 h-8 rounded-full bg-music-blue-500"></div>
                </div>
                500+ creators signed up
              </div>
              <div>🔒 Privacy guaranteed</div>
            </div>
          </div>
          
          {/* Hero visual - Dashboard */}
          <div className="lg:w-1/2 lg:pl-12">
            <div className="relative">
              {/* Main dashboard mockup */}
              <div className="bg-black border border-gray-800 rounded-2xl shadow-2xl p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300" style={{marginBottom: '150px'}}>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 min-h-[500px]">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-music-purple-600 to-music-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        F
                      </div>
                      <h3 className="text-white font-semibold">Dashboard</h3>
                    </div>
                    <div className="text-xs text-gray-400">March 2024</div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-black/40 rounded-lg p-3 border border-gray-700">
                      <div className="text-orange-400 text-xs">Pending</div>
                      <div className="text-white font-bold">3</div>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 border border-gray-700">
                      <div className="text-green-400 text-xs">Completed</div>
                      <div className="text-white font-bold">12</div>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 border border-gray-700">
                      <div className="text-blue-400 text-xs">Views</div>
                      <div className="text-white font-bold">2.4M</div>
                    </div>
                  </div>

                  {/* Track List */}
                  <div className="space-y-3">
                    {/* Pending Track */}
                    <div className="bg-black/30 rounded-lg p-3 border border-orange-500/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-500/20 rounded flex items-center justify-center">
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Summer Vibes.mp3</div>
                            <div className="text-gray-400 text-xs">Pending review</div>
                          </div>
                        </div>
                        <div className="text-orange-400 text-xs">2h ago</div>
                      </div>
                    </div>

                    {/* Completed Track with Video */}
                    <div className="bg-black/30 rounded-lg p-3 border border-green-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                            <Video className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Night Drive.mp3</div>
                            <div className="text-gray-400 text-xs">Review complete</div>
                          </div>
                        </div>
                        <div className="text-green-400 text-xs">1d ago</div>
                      </div>
                      {/* Video preview */}
                      <div className="bg-gradient-to-br from-music-purple-900 to-music-pink-900 rounded-lg p-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Play className="w-4 h-4 text-white" />
                          <span className="text-white text-xs">Feedback Video</span>
                        </div>
                        <div className="flex space-x-1">
                          <button className="bg-white/20 rounded px-2 py-1 text-xs text-white">Edit</button>
                          <button className="bg-music-purple-600 rounded px-2 py-1 text-xs text-white">Share</button>
                        </div>
                      </div>
                    </div>

                    {/* Another Completed Track */}
                    <div className="bg-black/30 rounded-lg p-3 border border-green-500/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                            <Video className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Beats & Bass.mp3</div>
                            <div className="text-gray-400 text-xs">1.2M views • Shared</div>
                          </div>
                        </div>
                        <div className="text-green-400 text-xs">3d ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-black border border-gray-800 rounded-lg shadow-lg p-3 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Real-time Updates</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-black border border-gray-800 rounded-lg shadow-lg p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="text-sm font-medium">Track Analytics</p>
                    <p className="text-xs text-muted-foreground">Views • Shares • Engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
