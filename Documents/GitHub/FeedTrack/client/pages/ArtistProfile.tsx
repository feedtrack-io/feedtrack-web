import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, ArrowLeft, Play, ExternalLink, Music, Users, Calendar, Award, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentModal from "@/components/PaymentModal";

interface Artist {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  genres: string[];
  reviewCount: number;
  verified: boolean;
  bio: string;
  stats: {
    releasedTracks: number;
    totalStreams: string;
    supportedBy: string[];
    featuredOn: string[];
    headlineEvents: string[];
  };
  recentWorks: {
    id: number;
    title: string;
    platform: string;
    streams: string;
    artwork: string;
  }[];
}

const mockArtists: { [key: string]: Artist } = {
  "1": {
    id: 1,
    name: "Alex Wright",
    image: "https://images.pexels.com/photos/8714500/pexels-photo-8714500.png?w=400&h=400&fit=crop",
    rating: 4.9,
    price: 149,
    genres: ["House", "Electronic"],
    reviewCount: 102,
    verified: true,
    bio: "We're thrilled to have you join the FeedTrack community. To help fans discover you and make your experience seamless, please share a few details about yourself. We're thrilled to have you join the FeedTrack community. To help fans discover you and make your experience seamless, please share a few details about yourself.",
    stats: {
      releasedTracks: 45,
      totalStreams: "10M+",
      supportedBy: ["David Guetta", "Steve Aoki", "Don Diablo"],
      featuredOn: ["Ultra Music Festival", "Tomorrowland"],
      headlineEvents: ["EDC Vegas", "Ultra Miami"]
    },
    recentWorks: [
      {
        id: 1,
        title: "Sunset Mirage",
        platform: "Spotify",
        streams: "2.4M",
        artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
      },
      {
        id: 2,
        title: "Sunset Mirage",
        platform: "Spotify",
        streams: "2.4M",
        artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
      },
      {
        id: 3,
        title: "Sunset Mirage",
        platform: "Spotify",
        streams: "2.4M",
        artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
      },
      {
        id: 4,
        title: "Sunset Mirage",
        platform: "Spotify",
        streams: "2.4M",
        artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
      }
    ]
  },
  "2": {
    id: 2,
    name: "Marcus Rivera",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
    rating: 4.8,
    price: 89,
    genres: ["Hip Hop", "R&B"],
    reviewCount: 89,
    verified: true,
    bio: "Passionate hip hop producer with over 8 years of experience in the industry. I specialize in creating unique beats that blend classic hip hop elements with modern production techniques.",
    stats: {
      releasedTracks: 32,
      totalStreams: "5M+",
      supportedBy: ["Drake", "Kendrick Lamar", "J. Cole"],
      featuredOn: ["Rolling Loud", "Summer Jam"],
      headlineEvents: ["BET Hip Hop Awards", "SXSW"]
    },
    recentWorks: [
      {
        id: 1,
        title: "Urban Nights",
        platform: "Spotify",
        streams: "1.8M",
        artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
      },
      {
        id: 2,
        title: "City Vibes",
        platform: "Apple Music",
        streams: "950K",
        artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
      }
    ]
  }
};

export default function ArtistProfile() {
  const { id } = useParams();
  const artist = mockArtists[id || "1"];
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!artist) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Artist Not Found</h1>
          <Link to="/browse-artist" className="text-music-purple-400 hover:text-music-purple-300">
            Back to Browse Artists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-music-purple-600 to-music-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="text-xl font-bold text-foreground">FeedTrack</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link 
                to="/browse-artist" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Artists
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Artist Header */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-12">
          {/* Artist Image */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-gray-800">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            {artist.verified && (
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-black">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-500 text-xs font-bold">✓</span>
                </div>
              </div>
            )}
          </div>

          {/* Artist Info */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{artist.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(artist.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold text-sm">{artist.rating}</span>
                  <span className="text-gray-400 text-sm">({artist.reviewCount} Ratings)</span>
                </div>

                {/* Genres */}
                <div className="flex gap-2 mb-6">
                  {artist.genres.map((genre) => (
                    <span key={genre} className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col items-start lg:items-end gap-4">
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-1">Price per feedback</p>
                  <p className="text-3xl font-bold text-white">${artist.price}</p>
                </div>
                <Button
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-music-blue-600 hover:bg-music-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Get Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">About the Artist</h2>
          <p className="text-gray-300 leading-relaxed max-w-4xl">
            {artist.bio}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Music className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-white font-semibold mb-1">Released tracks</h3>
            <p className="text-gray-400 text-sm">Over {artist.stats.releasedTracks} Tracks Recorded and Armada Music</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Play className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-1">Over {artist.stats.totalStreams}</h3>
            <p className="text-gray-400 text-sm">Play Counts Recorded and Armada Music</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-1">Supported by</h3>
            <p className="text-gray-400 text-sm">David Guetta, Deadmau5 Write and DJs</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-1">Featured On</h3>
            <p className="text-gray-400 text-sm">Armada Deep and Tomorrowland artist</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Radio className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-white font-semibold mb-1">Headline at</h3>
            <p className="text-gray-400 text-sm">Tomorrowland and Ultra Music Festival</p>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 1,
                reviewer: "Mike Johnson",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                rating: 5,
                comment: "Absolutely incredible feedback! Alex really understood my vision and helped elevate my track to the next level. The turnaround was fast and the quality was outstanding.",
                date: "2 days ago",
                track: "Summer Nights"
              },
              {
                id: 2,
                reviewer: "Sarah Williams",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                rating: 5,
                comment: "Professional, detailed, and exactly what I needed. Alex's expertise in electronic music really shows. Highly recommend!",
                date: "1 week ago",
                track: "Digital Dreams"
              },
              {
                id: 3,
                reviewer: "David Chen",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                rating: 4,
                comment: "Great feedback with solid suggestions for improvement. Really helped me understand how to make my track more club-ready.",
                date: "2 weeks ago",
                track: "Bass Drop"
              },
              {
                id: 4,
                reviewer: "Emma Rodriguez",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                rating: 5,
                comment: "Alex went above and beyond! Not only did I get excellent feedback, but also learned so much about production techniques.",
                date: "3 weeks ago",
                track: "Midnight Pulse"
              }
            ].map((review) => (
              <div key={review.id} className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-music-purple-500/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                      <img
                        src={review.avatar}
                        alt={review.reviewer}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{review.reviewer}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                  <span className="text-gray-400 text-sm">{review.date}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{review.comment}</p>
                <div className="text-xs text-gray-500">
                  Track: <span className="text-music-purple-400">{review.track}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Works */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden hover:border-music-purple-500/50 transition-all">
                <iframe
                  src="https://open.spotify.com/embed/track/5P6R0oLKd2lCyo89VKhFRV?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-2xl"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        artist={artist}
      />
    </div>
  );
}
