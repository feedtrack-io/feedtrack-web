import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronDown, Filter, X, Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentModal from "@/components/PaymentModal";
import UserTypeModal from "@/components/UserTypeModal";

interface Artist {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  genres: string[];
  reviewCount: number;
  verified: boolean;
}

const mockArtists: Artist[] = [
  {
    id: 1,
    name: "Alex Wright",
    image: "https://images.pexels.com/photos/8714500/pexels-photo-8714500.png?w=400&h=400&fit=crop",
    rating: 4.9,
    price: 149,
    genres: ["House", "Electronic"],
    reviewCount: 102,
    verified: true
  },
  {
    id: 2,
    name: "Marcus Rivera",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face",
    rating: 4.8,
    price: 89,
    genres: ["Hip Hop", "R&B"],
    reviewCount: 89,
    verified: true
  },
  {
    id: 3,
    name: "Maya Chen",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    rating: 4.7,
    price: 65,
    genres: ["Pop", "Indie"],
    reviewCount: 203,
    verified: false
  },
  {
    id: 4,
    name: "DJ Storm",
    image: "https://images.pexels.com/photos/2240772/pexels-photo-2240772.jpeg?w=400&h=400&fit=crop",
    rating: 5.0,
    price: 199,
    genres: ["EDM", "Trap"],
    reviewCount: 67,
    verified: true
  },
  {
    id: 5,
    name: "Luna Blake",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    rating: 4.6,
    price: 125,
    genres: ["EDM", "Synthwave"],
    reviewCount: 145,
    verified: true
  },
  {
    id: 6,
    name: "Jordan Keys",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    price: 175,
    genres: ["Pop", "R&B"],
    reviewCount: 178,
    verified: true
  }
];

const genres = ["Hip Hop", "EDM", "R&B", "Pop", "Trap", "House", "Indie", "Synthwave"];
const sortOptions = [
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "price-low", label: "Price: Low to High" }
];

export default function ExploreArtists() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(250);
  const [sortBy, setSortBy] = useState("rating");
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const genreDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const removeGenre = (genre: string) => {
    setSelectedGenres(selectedGenres.filter(g => g !== genre));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (genreDropdownRef.current && !genreDropdownRef.current.contains(event.target as Node)) {
        setShowGenreDropdown(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredArtists = mockArtists
    .filter(artist => {
      const genreMatch = selectedGenres.length === 0 ||
        selectedGenres.some(genre => artist.genres.includes(genre));
      const priceMatch = artist.price <= maxPrice;
      return genreMatch && priceMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

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

            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </Link>
              <Link to="/browse-artist" className="text-music-purple-400 hover:text-music-purple-300 transition-colors font-medium">
                Browse Artists
              </Link>
              <a href="#join-as-pro" className="text-muted-foreground hover:text-foreground transition-colors">
                Join As a Pro
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <button className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </button>
              <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-music-purple-600 to-music-pink-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:from-music-purple-700 hover:to-music-pink-700 transition-all text-sm lg:text-base">
                Get Started
              </button>
              <Link to="/pro-dashboard">
                <button className="hidden sm:block bg-music-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-music-blue-700 transition-all text-sm lg:text-base">
                  Pro Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border">
            <div className="px-4 py-2 space-y-2">
              <Link
                to="/#how-it-works"
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                How it Works
              </Link>
              <Link
                to="/browse-artist"
                className="block py-2 text-music-purple-400 hover:text-music-purple-300 transition-colors font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                Browse Artists
              </Link>
              <a
                href="#join-as-pro"
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Join As a Pro
              </a>
              <a
                href="#faq"
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                FAQ
              </a>
              <button className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </button>
              <Link
                to="/pro-dashboard"
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Pro Dashboard
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-music-purple-600 to-music-pink-600">Expert Artists</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover vetted producers and engineers ready to transform your music into viral content
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
          {/* Genre Dropdown */}
          <div className="relative w-full sm:w-auto" ref={genreDropdownRef}>
            <button
              className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all w-full sm:w-auto min-w-[140px]"
              onClick={() => setShowGenreDropdown(!showGenreDropdown)}
            >
              <span className="text-sm truncate">
                {selectedGenres.length === 0
                  ? "All Genres"
                  : selectedGenres.length === 1
                    ? selectedGenres[0]
                    : `${selectedGenres.length} Genres`
                }
              </span>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>

            {/* Genre Dropdown Menu */}
            {showGenreDropdown && (
              <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-20 min-w-48">
                <div className="p-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                      selectedGenres.length === 0
                        ? 'bg-music-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => {
                      setSelectedGenres([]);
                      setShowGenreDropdown(false);
                    }}
                  >
                    All Genres
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                        selectedGenres.includes(genre)
                          ? 'bg-music-purple-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      onClick={() => toggleGenre(genre)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{genre}</span>
                        {selectedGenres.includes(genre) && (
                          <span className="text-xs">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Genres Tags */}
            {selectedGenres.length > 0 && (
              <div className="absolute top-full mt-12 left-0 right-0 sm:right-auto flex flex-wrap gap-1">
                {selectedGenres.map((genre) => (
                  <div key={genre} className="bg-music-purple-500/20 text-music-purple-400 px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                    <span>{genre}</span>
                    <button onClick={() => removeGenre(genre)}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 w-full sm:w-auto">
            <span className="text-white text-sm font-medium">Price:</span>
            <span className="text-music-purple-400 text-sm">$50</span>
            <div className="relative flex-1 sm:w-32">
              <input
                type="range"
                min="50"
                max="299"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #007EA7 0%, #007EA7 ${((maxPrice - 50) / (299 - 50)) * 100}%, #374151 ${((maxPrice - 50) / (299 - 50)) * 100}%, #374151 100%)`
                }}
              />
              <style dangerouslySetInnerHTML={{
                __html: `
                  input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #007EA7;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                  }
                  input[type="range"]::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #007EA7;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                    border: none;
                  }
                `
              }} />
            </div>
            <span className="text-music-purple-400 text-sm">${maxPrice}</span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto" ref={sortDropdownRef}>
            <button
              className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all w-full sm:w-auto min-w-[160px]"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm truncate">
                  {sortOptions.find(option => option.value === sortBy)?.label || "Sort By"}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>

            {/* Sort Dropdown Menu */}
            {showSortDropdown && (
              <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-20 min-w-48">
                <div className="p-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                        sortBy === option.value
                          ? 'bg-music-purple-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.label}</span>
                        {sortBy === option.value && (
                          <span className="text-xs">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredArtists.length} of {mockArtists.length} artists
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="bg-gray-900/50 border border-gray-700 rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-music-purple-500/50 group"
            >
              {/* Artist Image */}
              <div className="relative">
                <div className="aspect-square w-full bg-gray-800">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face";
                    }}
                  />
                </div>
                {artist.verified && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Artist Info */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-white mb-2">{artist.name}</h3>
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
                    <span className="text-xs text-gray-400 ml-1 whitespace-nowrap">
                      {artist.rating} ({artist.reviewCount} Ratings)
                    </span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex gap-2 mb-4">
                  {artist.genres.slice(0, 2).map((genre) => (
                    <span key={genre} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Price and Buttons */}
                <div className="space-y-3">
                  <div className="text-base font-bold text-white">
                    ${artist.price}/track
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/artist/${artist.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-music-purple-500 text-music-purple-400 hover:bg-music-purple-500/10 px-3 py-2 rounded-lg transition-all text-sm"
                      >
                        View Profile
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedArtist(artist);
                        setShowPaymentModal(true);
                      }}
                      className="bg-music-purple-600 hover:bg-music-purple-700 text-white px-4 py-2 rounded-lg transition-all text-sm"
                    >
                      Get Feedback
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-2 border-music-purple-500 text-music-purple-400 hover:bg-music-purple-500/10">
            Load More Artists
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedArtist && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedArtist(null);
          }}
          artist={selectedArtist}
        />
      )}

      {/* User Type Modal */}
      <UserTypeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
