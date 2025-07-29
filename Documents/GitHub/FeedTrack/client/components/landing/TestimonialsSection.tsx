import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Rivers",
      role: "Electronic Producer",
      avatar: "🎧",
      rating: 5,
      content: "FeedTrack's video reviews are a game-changer. I got actionable feedback that actually helped my track go viral on TikTok. The expert was spot-on about the drop timing.",
      platform: "TikTok",
      metrics: "2.3M views"
    },
    {
      name: "Maya Chen",
      role: "Singer-Songwriter",
      avatar: "🎤",
      rating: 5,
      content: "Finally, feedback I can actually use for marketing! The video format makes it so easy to share with my audience. My engagement has tripled since using FeedTrack.",
      platform: "Instagram",
      metrics: "45K followers"
    },
    {
      name: "Jordan beats",
      role: "Hip-Hop Producer",
      avatar: "🥁",
      rating: 5,
      content: "The expert matched to my style perfectly. Instead of boring written notes, I got a video that my fans loved watching. It's like having a producer react to my beat in real-time.",
      platform: "YouTube",
      metrics: "890K views"
    },
    {
      name: "Luna Storm",
      role: "Indie Artist",
      avatar: "🌙",
      rating: 5,
      content: "I was skeptical at first, but the video review format is brilliant. The producer gave me specific feedback while my track played, and it became content I could post immediately.",
      platform: "TikTok",
      metrics: "1.7M views"
    },
    {
      name: "Rico Martinez",
      role: "Latin Trap Artist",
      avatar: "🔥",
      rating: 5,
      content: "FeedTrack helped me understand what was missing from my mix. The video went viral and brought so many new listeners to my music. Two birds, one stone!",
      platform: "Reels",
      metrics: "3.1M views"
    },
    {
      name: "Sophie K",
      role: "Pop Artist",
      avatar: "✨",
      rating: 5,
      content: "The expert feedback was incredibly detailed and the video format made it shareable content. My label was impressed by both the improvement in my music and the social buzz.",
      platform: "Shorts",
      metrics: "1.2M views"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Creators Love FeedTrack
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how artists are turning expert feedback into viral content
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="bg-black border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-music-purple-500 to-music-pink-500 rounded-full flex items-center justify-center text-white text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-music-purple-500/20" />
                <p className="text-muted-foreground italic pl-4">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Metrics */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-music-purple-500/10 text-music-purple-600 rounded flex items-center justify-center text-xs">
                    📱
                  </div>
                  <span className="text-sm text-muted-foreground">{testimonial.platform}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{testimonial.metrics}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="bg-black rounded-3xl p-8 border border-gray-800">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">500+</div>
              <div className="text-muted-foreground">Happy Creators</div>
              <div className="flex justify-center mt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-music-purple-500 rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-music-pink-500 rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-music-blue-500 rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-music-purple-600 rounded-full border-2 border-background flex items-center justify-center text-white text-xs">
                    +
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">50M+</div>
              <div className="text-muted-foreground">Total Video Views</div>
              <div className="text-sm text-music-purple-600 mt-2">From FeedTrack reviews</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">4.9/5</div>
              <div className="text-muted-foreground">Average Rating</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            Join hundreds of creators who've transformed their feedback into viral content
          </p>
          <div className="inline-flex items-center space-x-2 text-sm text-music-purple-600 bg-music-purple-50 px-4 py-2 rounded-full">
            <span>✨</span>
            <span>New testimonials added daily</span>
          </div>
        </div>
      </div>
    </section>
  );
}
