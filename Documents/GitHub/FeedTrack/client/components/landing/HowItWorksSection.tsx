import { Upload, UserCheck, Video, Share2, ArrowRight, Users } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Users,
      title: "Choose Your Artist",
      description: "Browse our curated roster of expert producers and engineers. Find the perfect match for your genre and style, from hip-hop to EDM to indie rock.",
      color: "from-music-purple-500 to-music-blue-500"
    },
    {
      icon: Upload,
      title: "Upload Your Track",
      description: "Drop your song file and tell us what kind of feedback you're looking for. Specify your genre, goals, and target platforms.",
      color: "from-music-blue-500 to-music-blue-600"
    },
    {
      icon: UserCheck,
      title: "Expert Review",
      description: "Our vetted producers and engineers analyze your track and create detailed, actionable feedback tailored to your style and goals.",
      color: "from-music-purple-500 to-music-purple-600"
    },
    {
      icon: Video,
      title: "Video Generation",
      description: "AI transforms the expert feedback into an engaging, professional video optimized for social media platforms.",
      color: "from-music-pink-500 to-music-pink-600"
    },
    {
      icon: Share2,
      title: "Share & Grow",
      description: "Download your video and share it across TikTok, Reels, and YouTube Shorts to showcase your music and build your audience.",
      color: "from-music-blue-500 to-music-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How FeedTrack Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From artist selection to viral video in just 5 simple steps
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                      <step.icon className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 relative">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-black border-2 border-primary rounded-full flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-shrink-0 pt-6">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-black border border-gray-800 rounded-2xl">
            <div className="w-12 h-12 bg-music-blue-500/10 text-music-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              ⚡
            </div>
            <h4 className="font-bold text-foreground mb-2">48-Hour Turnaround</h4>
            <p className="text-sm text-muted-foreground">Get your video feedback faster than traditional reviews</p>
          </div>
          
          <div className="text-center p-6 bg-black border border-gray-800 rounded-2xl">
            <div className="w-12 h-12 bg-music-purple-500/10 text-music-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              🎯
            </div>
            <h4 className="font-bold text-foreground mb-2">Hand-Picked Artists</h4>
            <p className="text-sm text-muted-foreground">Choose from curated producers who specialize in your exact genre and sound</p>
          </div>
          
          <div className="text-center p-6 bg-black border border-gray-800 rounded-2xl">
            <div className="w-12 h-12 bg-music-pink-500/10 text-music-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              📱
            </div>
            <h4 className="font-bold text-foreground mb-2">Social-Ready Format</h4>
            <p className="text-sm text-muted-foreground">Optimized for maximum engagement on all platforms</p>
          </div>
        </div>
      </div>
    </section>
  );
}
