import React, { useState } from "react";
import { X, Upload, Clock, Video, Star, Music, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const genreOptions = [
  "House", "EDM", "Hip Hop", "R&B", "Pop", "Trap", "Indie", "Synthwave",
  "Techno", "Trance", "Dubstep", "Deep House", "Progressive", "Melodic",
  "Club", "Festival", "Ambient", "Experimental"
];

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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist;
}

export default function PaymentModal({ isOpen, onClose, artist }: PaymentModalProps) {
  const [trackFile, setTrackFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTrackFile(file);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Here you would integrate with Stripe to process payment
    console.log("Processing payment...", {
      artist: artist.name,
      price: artist.price,
      trackFile,
      trackTags: selectedTags,
      email,
      payment: { cardNumber, expiryDate, cvc, cardholderName }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-950 border border-gray-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Artist Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-800">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {artist.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-500 text-xs font-bold">✓</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {artist.genres.map((genre) => (
                  <span key={genre} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Music className="w-3 h-3" />
                    {genre}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{artist.name}</h2>
              <div className="flex items-center gap-2">
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
                <span className="text-gray-400 text-sm">({artist.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-gray-400 text-sm mb-1">Price per feedback</p>
              <p className="text-2xl font-bold text-white">${artist.price}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
          {/* Expected Delivery */}
          <div className="flex items-center gap-3 text-gray-300">
            <Clock className="w-5 h-5 text-music-purple-400" />
            <span className="font-medium">Expected Delivery: 3-5 days</span>
          </div>

          {/* What you'll get */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Video className="w-5 h-5 text-music-purple-400" />
              <span className="font-medium text-white">What you'll get:</span>
            </div>
            <div className="ml-8 space-y-2 text-gray-300 text-sm">
              <p>A video of {artist.name} listening to your track (reactions + commentary)</p>
              <p>Personalized, actionable feedback</p>
              <p>Delivered straight to your email</p>
              <p>Raw, authentic and unedited</p>
            </div>
          </div>

          {/* Your track */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Music className="w-5 h-5 text-music-purple-400" />
              <span className="font-medium text-white">Your track*</span>
            </div>
            <div className="relative">
              <input
                type="file"
                accept=".wav,.mp3"
                onChange={handleFileUpload}
                className="hidden"
                id="track-upload"
                required
              />
              <label
                htmlFor="track-upload"
                className="block w-full p-4 border-2 border-dashed border-gray-700 rounded-lg text-center cursor-pointer hover:border-music-purple-500 transition-colors"
              >
                {trackFile ? (
                  <div className="text-white">
                    <Upload className="w-6 h-6 mx-auto mb-2" />
                    <p>{trackFile.name}</p>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <Upload className="w-6 h-6 mx-auto mb-2" />
                    <p>Please upload your WAV or MP3</p>
                  </div>
                )}
              </label>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Please upload your track here. Note that the review session will auto-complete at 10 minutes.
            </p>
          </div>

          {/* Tag Your Track */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-music-purple-400 font-bold">#</span>
              <span className="font-medium text-white">Tag Your Track</span>
            </div>

            <div className="relative">
              <button
                type="button"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-left text-white focus:outline-none focus:border-music-purple-500 flex items-center justify-between"
                onClick={() => setShowTagDropdown(!showTagDropdown)}
              >
                <span className={selectedTags.length === 0 ? "text-gray-400" : "text-white"}>
                  {selectedTags.length === 0
                    ? "Select up to 3 genres..."
                    : `${selectedTags.length} genre${selectedTags.length > 1 ? 's' : ''} selected`
                  }
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showTagDropdown && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 max-h-48 overflow-y-auto">
                  <div className="p-2">
                    {genreOptions.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                          selectedTags.includes(genre)
                            ? 'bg-music-purple-600 text-white'
                            : selectedTags.length >= 3
                              ? 'text-gray-500 cursor-not-allowed'
                              : 'text-gray-300 hover:bg-gray-700'
                        }`}
                        onClick={() => toggleTag(genre)}
                        disabled={selectedTags.length >= 3 && !selectedTags.includes(genre)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{genre}</span>
                          {selectedTags.includes(genre) && (
                            <span className="text-xs">✓</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedTags.map((tag) => (
                  <div key={tag} className="bg-music-purple-500/20 text-music-purple-400 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-music-purple-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-gray-500 text-sm mt-2">
              Add up to 3 tags to help {artist.name} focus their feedback
            </p>
          </div>

          {/* Your Email */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-music-purple-400">✉</span>
              <span className="font-medium text-white">Your Email*</span>
            </div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Where should we send your feedback video?"
              className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                emailError
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-gray-700 focus:border-music-purple-500'
              }`}
              required
            />
            {emailError && (
              <p className="text-red-400 text-sm mt-2">{emailError}</p>
            )}
          </div>

          {/* Payment */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-music-purple-400">💳</span>
              <span className="font-medium text-white">Payment</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white font-semibold">Amount</p>
                <p className="text-2xl font-bold text-music-purple-400">${artist.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Secure checkout</span>
                <div className="flex gap-1">
                  <div className="w-8 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">VISA</div>
                  <div className="w-8 h-5 bg-red-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">MC</div>
                  <div className="w-8 h-5 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">AE</div>
                  <div className="w-8 h-5 bg-orange-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">DC</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card number"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-music-purple-500"
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-music-purple-500"
                  required
                />
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="CVC"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-music-purple-500"
                  required
                />
              </div>
              
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="Cardholder name"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-music-purple-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-music-purple-600 hover:bg-music-purple-700 text-white py-4 rounded-lg font-semibold text-lg"
          >
            Submit & Pay ${artist.price}
          </Button>
        </form>
      </div>
    </div>
  );
}
