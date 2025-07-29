import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Music, Star } from "lucide-react";

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserTypeModal({ isOpen, onClose }: UserTypeModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleArtistSignup = () => {
    navigate("/signup");
    onClose();
  };

  const handleProSignup = () => {
    navigate("/pro-signup");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-music-purple-600 to-music-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome!</h2>
          <p className="text-gray-400">How Can We Help?</p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Artist Option */}
          <button
            onClick={handleArtistSignup}
            className="w-full p-6 border border-gray-700 rounded-xl hover:border-music-blue-500 hover:bg-gray-800/50 transition-all duration-300 group text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-music-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-music-blue-600/30 transition-colors">
                <Music className="w-6 h-6 text-music-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1 group-hover:text-music-blue-100 transition-colors">
                  I'm an Emerging Artist Looking to Get Feedback
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  Upload your tracks and receive professional feedback from experienced producers
                </p>
              </div>
            </div>
          </button>

          {/* Pro Option */}
          <button
            onClick={handleProSignup}
            className="w-full p-6 border border-gray-700 rounded-xl hover:border-music-purple-500 hover:bg-gray-800/50 transition-all duration-300 group text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-music-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-music-purple-600/30 transition-colors">
                <Star className="w-6 h-6 text-music-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1 group-hover:text-music-purple-100 transition-colors">
                  I'm a Pro Looking to Give Feedback
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  Share your expertise and earn money by providing feedback to emerging artists
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            Choose the option that best describes you to get started
          </p>
        </div>
      </div>
    </div>
  );
}
