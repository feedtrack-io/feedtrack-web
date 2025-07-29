import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    twitter: "",
    soundcloud: "",
    youtube: "",
    bio: "",
    primaryGenre: "",
    website: "",
    agreeToTerms: false
  });

  const genres = [
    "Tech House",
    "Progressive House",
    "Deep House",
    "Techno",
    "Trance",
    "EDM",
    "Dubstep",
    "Drum & Bass",
    "Ambient",
    "Hip-Hop",
    "R&B",
    "Pop",
    "Rock",
    "Jazz",
    "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      primaryGenre: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Pro signup form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      
      {/* Sign up form */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-gray-950 border border-gray-800 rounded-3xl px-8 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-music-purple-600 to-music-pink-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                F
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-music-purple-200 transition-colors duration-300">FEEDTRACK</span>
            </Link>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              Tell Us About You
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              We're thrilled to have you join the FeedTrack community. To help fans discover you and make your experience seamless, please share a few details about yourself.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-sm font-medium">
                Your Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your stage name or producer alias"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-music-blue-500 focus:ring-music-blue-500/20"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-music-blue-500 focus:ring-music-blue-500/20"
              />
            </div>

            {/* Social Media Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-white text-sm font-medium">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  type="text"
                  placeholder="@yourhandle 📷"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-music-blue-500 focus:ring-music-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-white text-sm font-medium">
                  Twitter / X
                </Label>
                <Input
                  id="twitter"
                  name="twitter"
                  type="text"
                  placeholder="@yourhandle 🐦"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-music-blue-500 focus:ring-music-blue-500/20"
                />
              </div>
            </div>

            {/* Social Media Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="soundcloud" className="text-white text-sm font-medium">
                  SoundCloud
                </Label>
                <Input
                  id="soundcloud"
                  name="soundcloud"
                  type="text"
                  placeholder="soundcloud.com/yourname 🎵"
                  value={formData.soundcloud}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-music-blue-500 focus:ring-music-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube" className="text-white text-sm font-medium">
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  name="youtube"
                  type="text"
                  placeholder="youtube.com/yourchannel 📺"
                  value={formData.youtube}
                  onChange={handleInputChange}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-music-blue-500 focus:ring-music-blue-500/20"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-white text-sm font-medium">
                Short Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself, your sound, your story..."
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-music-blue-500 focus:ring-music-blue-500/20 resize-none"
              />
            </div>

            {/* Primary Genre */}
            <div className="space-y-2">
              <Label htmlFor="primaryGenre" className="text-white text-sm font-medium">
                Primary Genre
              </Label>
              <Select onValueChange={handleSelectChange} value={formData.primaryGenre}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white focus:border-music-blue-500 focus:ring-music-blue-500/20">
                  <SelectValue placeholder="Tech House" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website" className="text-white text-sm font-medium">
                Website / Linktree (optional)
              </Label>
              <Input
                id="website"
                name="website"
                type="text"
                placeholder="yourwebsite.com or linktr.ee"
                value={formData.website}
                onChange={handleInputChange}
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-music-blue-500 focus:ring-music-blue-500/20"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-music-blue-600 hover:bg-music-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-105 text-lg"
            >
              Create Pro Account
            </Button>

            {/* Terms */}
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                By joining FeedTrack, you agree to our{" "}
                <Link to="/terms" className="text-music-blue-400 hover:text-music-blue-300 underline">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-music-blue-400 hover:text-music-blue-300 underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
