import React, { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  DollarSign,
  Settings,
  HelpCircle,
  LogOut,
  VideoOff,
  Music,
  Play,
  Square,
  Pause,
  Volume2,
  SkipBack,
  SkipForward,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewTrack {
  id: string;
  user: string;
  track: string;
  avatar: string;
  genre: string;
  duration: string;
}

// Mock data
const mockTracks: { [key: string]: ReviewTrack } = {
  "1": {
    id: "1",
    user: "Alex Martin",
    track: "Midnight Pulse",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    genre: "Progressive House",
    duration: "3:48"
  }
};

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "pending", label: "Pending Reviews", icon: Clock },
  { id: "earnings", label: "Earnings", icon: DollarSign },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "support", label: "Support", icon: HelpCircle },
];

export default function ReviewSession() {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const track = mockTracks[trackId || "1"];

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [cameraOn, setCameraOn] = useState(false);
  // Remove activeTab state as we'll navigate to different routes
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState<Blob | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const reviewVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  // Camera initialization function
  const initCamera = async () => {
    setIsInitializing(true);
    setCameraError(null);

    try {
      console.log("Requesting camera access...");

      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia not supported in this browser");
      }

      // Clean up any existing stream first
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
        setCameraOn(false);
      }

      // Try different constraint sets for better compatibility
      const constraintSets = [
        // First try: High quality
        {
          video: {
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 },
            facingMode: 'user',
            frameRate: { ideal: 30, min: 15 }
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true
          }
        },
        // Second try: Medium quality
        {
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: true
        },
        // Third try: Basic
        {
          video: true,
          audio: true
        },
        // Fourth try: Video only
        {
          video: { facingMode: 'user' },
          audio: false
        }
      ];

      let stream: MediaStream | null = null;
      let lastError: Error | null = null;

      for (let i = 0; i < constraintSets.length; i++) {
        try {
          console.log(`Trying constraints set ${i + 1}:`, constraintSets[i]);
          stream = await navigator.mediaDevices.getUserMedia(constraintSets[i]);
          console.log(`Success with constraints set ${i + 1}`);
          break;
        } catch (err) {
          console.log(`Failed with constraints set ${i + 1}:`, err);
          lastError = err as Error;
          continue;
        }
      }

      if (!stream) {
        throw lastError || new Error("Failed to access camera with all constraint sets");
      }

      console.log("Camera access granted, stream:", stream);
      setCameraStream(stream);

      // Set up video element
      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        // Wait for video to be ready and play
        const playVideo = () => {
          video.play()
            .then(() => {
              console.log("Video playing successfully");
              setCameraOn(true);
              setIsInitializing(false);
            })
            .catch(err => {
              console.error("Error playing video:", err);
              setCameraError("Failed to start video playback");
              setIsInitializing(false);
            });
        };

        if (video.readyState >= 2) {
          playVideo();
        } else {
          video.addEventListener('loadeddata', playVideo, { once: true });
          video.addEventListener('canplay', playVideo, { once: true });
        }
      }

    } catch (error) {
      console.error("Camera initialization failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown camera error";
      setCameraError(errorMessage);
      setCameraOn(false);
      setIsInitializing(false);
    }
  };

  // Enable demo mode with simulated camera feed
  const enableDemoMode = () => {
    setIsDemoMode(true);
    setCameraOn(true);
    setCameraError(null);
    setIsInitializing(false);

    // Create a canvas element for demo video
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d')!;

      // Create animated demo content
      let frame = 0;
      const drawFrame = () => {
        // Clear canvas
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw demo content
        ctx.fillStyle = '#374151';
        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

        // Animated circle
        ctx.fillStyle = '#007EA7';
        const centerX = canvas.width / 2 + Math.sin(frame * 0.05) * 50;
        const centerY = canvas.height / 2 + Math.cos(frame * 0.03) * 30;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20 + Math.sin(frame * 0.1) * 5, 0, 2 * Math.PI);
        ctx.fill();

        // Demo text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('DEMO MODE', canvas.width / 2, canvas.height / 2 + 80);
        ctx.font = '16px Arial';
        ctx.fillText('Simulated Camera Feed', canvas.width / 2, canvas.height / 2 + 110);

        frame++;
        requestAnimationFrame(drawFrame);
      };

      drawFrame();

      // Convert canvas to video stream
      const stream = (canvas as any).captureStream(30);
      videoRef.current.srcObject = stream;
      setCameraStream(stream);
    }
  };

  // Auto-initialize camera when page loads (with better error handling)
  useEffect(() => {
    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      initCamera();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (cameraStream) {
        console.log("Cleaning up camera stream");
        cameraStream.getTracks().forEach(track => {
          track.stop();
          console.log("Stopped track:", track.kind);
        });
      }
    };
  }, []); // Empty dependency array

  // Recording timer
  useEffect(() => {
    if (isRecording && !isPaused) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 600) { // 10 minutes
            finishRecording();
            return 600;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      playbackTimerRef.current = setInterval(() => {
        setPlaybackTime(prev => {
          const duration = 228; // 3:48 in seconds
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
    }

    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
    };
  }, [isPlaying]);

  // Static waveform - only redraws when playback time changes
  useEffect(() => {
    drawWaveform();
  }, [playbackTime]);

  // Load recorded video in review modal
  useEffect(() => {
    if (showReviewModal && recordedVideoBlob && reviewVideoRef.current) {
      const video = reviewVideoRef.current;

      if (isDemoMode) {
        // For demo mode, show a placeholder message
        video.style.display = 'none';
        const container = video.parentElement;
        if (container && !container.querySelector('.demo-placeholder')) {
          const placeholder = document.createElement('div');
          placeholder.className = 'demo-placeholder flex items-center justify-center h-[400px] bg-gray-800 rounded-lg';
          placeholder.innerHTML = `
            <div class="text-center">
              <div class="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">DEMO</span>
              </div>
              <p class="text-white font-medium mb-2">Demo Recording Complete</p>
              <p class="text-gray-400 text-sm">In demo mode, no actual video is recorded</p>
            </div>
          `;
          container.insertBefore(placeholder, video);
        }
      } else {
        const url = URL.createObjectURL(recordedVideoBlob);
        video.src = url;
        video.load(); // Ensure video is loaded
        video.style.display = 'block';

        // Remove demo placeholder if it exists
        const placeholder = video.parentElement?.querySelector('.demo-placeholder');
        if (placeholder) {
          placeholder.remove();
        }

        // Add event listeners for better debugging
        const handleLoadedData = () => console.log("Review video loaded");
        const handleError = (e: Event) => console.error("Review video error:", e);

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);

        return () => {
          video.removeEventListener('loadeddata', handleLoadedData);
          video.removeEventListener('error', handleError);
          URL.revokeObjectURL(url);
        };
      }
    }
  }, [showReviewModal, recordedVideoBlob, isDemoMode]);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, width, height);

    // SoundCloud-style dense waveform
    const barCount = 1000; // Much denser for SoundCloud look
    const barWidth = Math.max(1, width / barCount); // Ensure minimum 1px width
    const maxBarHeight = height * 0.7; // Smaller overall height
    const duration = 228; // 3:48 in seconds
    const progressRatio = playbackTime / duration;

    for (let i = 0; i < barCount; i++) {
      const x = i * barWidth;
      const normalizedX = i / barCount;

      // Generate more realistic audio waveform pattern
      const lowFreq = Math.sin(normalizedX * Math.PI * 8) * 0.3;
      const midFreq = Math.sin(normalizedX * Math.PI * 32) * 0.4;
      const highFreq = Math.sin(normalizedX * Math.PI * 64) * 0.2;
      const noise = (Math.sin(normalizedX * Math.PI * 156) + Math.sin(normalizedX * Math.PI * 234)) * 0.1;

      // Create more varied amplitudes like real audio
      let amplitude = Math.abs(lowFreq + midFreq + highFreq + noise);

      // Add some peaks and valleys for realism
      if (normalizedX > 0.1 && normalizedX < 0.3) amplitude *= 1.8; // Intro peak
      if (normalizedX > 0.4 && normalizedX < 0.6) amplitude *= 1.5; // Mid section
      if (normalizedX > 0.7 && normalizedX < 0.9) amplitude *= 2.2; // Climax
      if (normalizedX > 0.95) amplitude *= 0.3; // Fade out

      // Clamp amplitude
      amplitude = Math.min(amplitude, 1.0);
      amplitude = Math.max(amplitude, 0.05); // Minimum height

      const barHeight = amplitude * maxBarHeight;

      // SoundCloud colors: orange for played, light gray for unplayed
      const played = normalizedX <= progressRatio;
      ctx.fillStyle = played ? '#FF5500' : '#CCCCCC';

      // Draw thin vertical bar
      const roundedX = Math.round(x);
      const roundedBarHeight = Math.round(barHeight);

      ctx.fillRect(roundedX, centerY - roundedBarHeight / 2, Math.max(1, Math.round(barWidth)), roundedBarHeight);
    }
  };

  const startRecording = () => {
    if (!cameraStream) {
      console.error("No camera stream available");
      return;
    }

    try {
      recordedChunks.current = [];

      // In demo mode, create a mock recording
      if (isDemoMode) {
        // Create a simple mock blob for demo
        const mockVideoData = new Uint8Array(1024).fill(0);
        const mockBlob = new Blob([mockVideoData], { type: 'video/webm' });

        // Simulate recording behavior
        setIsRecording(true);
        setIsPaused(false);
        setRecordingTime(0);

        // Mock the media recorder behavior
        mediaRecorderRef.current = {
          start: () => console.log("Demo recording started"),
          stop: () => {
            console.log("Demo recording stopped");
            setRecordedVideoBlob(mockBlob);
          },
          pause: () => console.log("Demo recording paused"),
          resume: () => console.log("Demo recording resumed")
        } as any;

        console.log("Demo recording started");
        return;
      }

      mediaRecorderRef.current = new MediaRecorder(cameraStream, {
        mimeType: 'video/webm;codecs=vp9' // Try VP9 first
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        setRecordedVideoBlob(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      console.log("Recording started");
    } catch (error) {
      console.error("Error starting recording:", error);
      // Fallback to basic recording
      try {
        mediaRecorderRef.current = new MediaRecorder(cameraStream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.current.push(event.data);
          }
        };
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
          setRecordedVideoBlob(blob);
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setIsPaused(false);
        setRecordingTime(0);
      } catch (err) {
        console.error("Failed to start recording with fallback:", err);
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const finishRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);
      setShowReviewModal(true);
    }
  };

  const discardRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setRecordedVideoBlob(null);
    recordedChunks.current = [];
  };

  const sendRecording = () => {
    if (recordedVideoBlob) {
      // Here you would upload the video blob to your server
      console.log("Sending recording to producer...", recordedVideoBlob);
      alert("Recording sent to producer successfully!");
      setShowReviewModal(false);
      setRecordedVideoBlob(null);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && playbackTime >= 228) {
      setPlaybackTime(0);
    }
  };

  const skipBack = () => {
    setPlaybackTime(Math.max(0, playbackTime - 10));
  };

  const skipForward = () => {
    setPlaybackTime(Math.min(228, playbackTime + 10));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!track) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Track Not Found</h1>
          <Link to="/pro-dashboard" className="text-music-purple-400 hover:text-music-purple-300">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-music-purple-600 to-music-pink-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              F
            </div>
            <span className="text-xl font-bold text-white group-hover:text-music-purple-200 transition-colors duration-300">FEEDTRACK</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const getNavigationPath = (itemId: string) => {
                switch (itemId) {
                  case "dashboard":
                    return "/pro-dashboard";
                  case "pending":
                    return "/pro-dashboard?tab=pending";
                  case "earnings":
                    return "/pro-dashboard?tab=earnings";
                  case "settings":
                    return "/pro-dashboard?tab=settings";
                  case "support":
                    return "/pro-dashboard?tab=support";
                  default:
                    return "/pro-dashboard";
                }
              };

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(getNavigationPath(item.id))}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 group hover:scale-105 text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <item.icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:text-music-blue-400" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer">
            <Avatar className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-music-blue-500/20">
              <AvatarImage src="https://cdn.builder.io/api/v1/image/assets%2Fbfd24df18e5742829565b1b49cc47055%2Fdeb6a8666499447494646b26b5a60813" />
              <AvatarFallback>DG</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium text-sm group-hover:text-music-blue-100 transition-colors duration-300">Daniel Goldin</p>
              <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">Producer</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-orange-400 hover:text-orange-300 hover:bg-gray-800 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/10"
          >
            <LogOut className="w-4 h-4 mr-2 transition-transform duration-300 hover:scale-110" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 bg-black">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Review Track</h1>
            <div className="flex items-center gap-4">
              {/* Track Info */}
              <div className="text-right">
                <p className="text-white font-medium text-sm">"{track.track}"</p>
                <p className="text-gray-400 text-xs">{track.genre} • {track.duration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-2 gap-8 h-[calc(100vh-300px)]">
            {/* Left Panel - Camera */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl flex flex-col overflow-hidden hover:border-music-blue-500/50 transition-all duration-300">
              <div className="flex-1 relative bg-gray-800">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ display: cameraOn ? 'block' : 'none' }}
                  onCanPlay={() => {
                    console.log("Video can play event fired");
                  }}
                  onError={(e) => {
                    console.error("Video error event:", e);
                    setCameraOn(false);
                  }}
                  onLoadedData={() => {
                    console.log("Video loaded data event fired");
                  }}
                  onPlaying={() => {
                    console.log("Video playing event fired");
                    setCameraOn(true);
                  }}
                  onWaiting={() => {
                    console.log("Video waiting event fired");
                  }}
                />

                {!cameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="text-center max-w-md px-6">
                      <VideoOff className="w-24 h-24 text-gray-500 mx-auto mb-4" />

                      {isInitializing ? (
                        <>
                          <div className="w-8 h-8 border-2 border-music-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-400 font-medium">Initializing camera...</p>
                        </>
                      ) : cameraError ? (
                        <>
                          <p className="text-red-400 font-medium mb-4">Camera Access Failed</p>
                          <p className="text-gray-500 text-sm mb-4">{cameraError}</p>
                          <div className="flex flex-col gap-3">
                            <Button
                              onClick={initCamera}
                              className="bg-music-blue-600 hover:bg-music-blue-700 px-6 py-2 text-sm"
                            >
                              Try Again
                            </Button>
                            <Button
                              onClick={enableDemoMode}
                              variant="outline"
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 text-sm"
                            >
                              Use Demo Mode
                            </Button>
                          </div>
                          <p className="text-gray-600 text-xs mt-3">
                            Camera access may be restricted in preview environments. Use Demo Mode to test the interface.
                          </p>
                        </>
                      ) : cameraStream ? (
                        <p className="text-gray-400 font-medium">Loading camera...</p>
                      ) : (
                        <>
                          <p className="text-gray-400 font-medium mb-4">Camera Access Required</p>
                          <div className="flex flex-col gap-3">
                            <Button
                              onClick={initCamera}
                              className="bg-music-blue-600 hover:bg-music-blue-700 px-6 py-2"
                            >
                              Enable Camera
                            </Button>
                            <Button
                              onClick={enableDemoMode}
                              variant="outline"
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 text-sm"
                            >
                              Try Demo Mode
                            </Button>
                          </div>
                          <p className="text-gray-500 text-sm mt-3">
                            Click "Enable Camera" to use your webcam, or "Try Demo Mode" for a simulated feed
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Demo mode indicator */}
                {isDemoMode && cameraOn && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium">DEMO</span>
                  </div>
                )}

                {/* Recording indicator */}
                {isRecording && (
                  <div className={`absolute ${isDemoMode ? 'top-16' : 'top-4'} left-4 flex items-center gap-2 px-3 py-1 rounded-full ${
                    isPaused ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    <div className={`w-2 h-2 bg-white rounded-full ${!isPaused ? 'animate-pulse' : ''}`} />
                    <span className="text-white text-sm font-medium">
                      {isPaused ? 'PAUSED' : 'REC'}
                    </span>
                  </div>
                )}

                {/* Timer */}
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(recordingTime)} / 10:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Waveform */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-2xl flex flex-col overflow-hidden hover:border-music-blue-500/50 transition-all duration-300">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-medium">"{track.track}"</h3>
                    <p className="text-gray-400 text-sm">{track.genre}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{formatTime(playbackTime)} / {track.duration}</p>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={skipBack}
                    className="text-gray-400 hover:text-white"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlayback}
                    className="text-white hover:text-music-blue-400"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={skipForward}
                    className="text-gray-400 hover:text-white"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Waveform */}
              <div className="flex-1 p-4">
                <canvas
                  ref={canvasRef}
                  width={1200}
                  height={120}
                  className="w-full h-full cursor-pointer rounded-lg"
                  onClick={(e) => {
                    const rect = canvasRef.current?.getBoundingClientRect();
                    if (rect) {
                      const x = e.clientX - rect.left;
                      const clickRatio = x / rect.width;
                      setPlaybackTime(Math.floor(clickRatio * 228));
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Instructions and Controls */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Your webcam and screen will be recorded for the feedback session. You will be able to
              review your video prior to sending it.
            </p>

            <div className="flex items-center justify-center gap-4">
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  className="bg-music-blue-600 hover:bg-music-blue-700 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Recording Session
                </Button>
              ) : (
                <div className="flex gap-4">
                  <Button
                    onClick={pauseRecording}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                  >
                    {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                  <Button
                    onClick={finishRecording}
                    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                  >
                    <Square className="w-5 h-5 mr-2" />
                    Finish & Review
                  </Button>
                  <Button
                    onClick={discardRecording}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                  >
                    Discard
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && recordedVideoBlob && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 border border-gray-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Review Your Recording</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Video Player */}
            <div className="p-6">
              <div className="bg-black rounded-lg overflow-hidden mb-6">
                <video
                  ref={reviewVideoRef}
                  className="w-full h-[400px] object-cover"
                  controls
                  preload="auto"
                  playsInline
                  onLoadedData={() => console.log("Review video loaded and ready")}
                  onError={(e) => console.error("Review video error:", e)}
                  onCanPlay={() => console.log("Review video can play")}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewModal(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3"
                >
                  Cancel
                </Button>
                <Button
                  onClick={sendRecording}
                  className="bg-music-blue-600 hover:bg-music-blue-700 px-8 py-3 font-semibold"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
