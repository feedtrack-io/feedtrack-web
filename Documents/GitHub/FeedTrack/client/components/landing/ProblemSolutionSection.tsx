import { AlertCircle, CheckCircle, Clock, Share2, BarChart3, Zap } from "lucide-react";

export function ProblemSolutionSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Problem with Traditional Music Feedback
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Current feedback methods are killing your momentum and limiting your reach
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Problem Side */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 text-destructive rounded-2xl mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Traditional Feedback Sucks</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-destructive/20 text-destructive rounded-full flex items-center justify-center mt-1">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Slow & Boring</h4>
                  <p className="text-muted-foreground">Written reviews take forever to read and don't capture the energy of your music</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-destructive/20 text-destructive rounded-full flex items-center justify-center mt-1">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Not Shareable</h4>
                  <p className="text-muted-foreground">PDF reviews and long emails won't go viral or help you build your audience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-destructive/20 text-destructive rounded-full flex items-center justify-center mt-1">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Zero Marketing Value</h4>
                  <p className="text-muted-foreground">Traditional feedback doesn't help you create content or promote your music</p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">FeedTrack Changes Everything</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mt-1">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Engaging Video Format</h4>
                  <p className="text-muted-foreground">Expert reviews delivered as dynamic, social-ready videos that capture attention</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mt-1">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Built for Social</h4>
                  <p className="text-muted-foreground">Perfect dimensions and duration for TikTok, Instagram Reels, and YouTube Shorts</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center mt-1">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Instant Content Creation</h4>
                  <p className="text-muted-foreground">Turn feedback into marketing content that builds your brand and grows your following</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call-out box */}
        <div className="mt-16 bg-black rounded-3xl p-8 text-center border border-gray-800">
          <h4 className="text-xl font-bold text-foreground mb-2">
            Why settle for feedback that sits in your email?
          </h4>
          <p className="text-muted-foreground">
            Get expert reviews that help you improve AND promote your music at the same time.
          </p>
        </div>
      </div>
    </section>
  );
}
