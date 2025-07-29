import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  DollarSign,
  Settings,
  HelpCircle,
  LogOut,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
  Download,
  Play,
  Users,
  Bell,
  Shield,
  UserCheck,
  Mail,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const mockPendingReviews = [
  {
    id: 1,
    user: "Alex Martin",
    track: "Midnight Pulse",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    submittedDate: "2024-01-15",
    genre: "House",
    duration: "3:42"
  },
  {
    id: 2,
    user: "Sarah Chen",
    track: "Digital Dreams",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    submittedDate: "2024-01-14",
    genre: "EDM",
    duration: "4:15"
  },
  {
    id: 3,
    user: "Maya Johnson",
    track: "Ocean Waves",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    submittedDate: "2024-01-13",
    genre: "Ambient",
    duration: "5:22"
  },
  {
    id: 4,
    user: "David Rodriguez",
    track: "Bass Drop",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    submittedDate: "2024-01-12",
    genre: "Trap",
    duration: "2:58"
  },
  {
    id: 5,
    user: "Emily Wilson",
    track: "Sunset Vibes",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    submittedDate: "2024-01-11",
    genre: "Chill",
    duration: "4:33"
  },
  {
    id: 6,
    user: "Chris Thompson",
    track: "Electric Storm",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    submittedDate: "2024-01-10",
    genre: "Techno",
    duration: "6:12"
  }
];

const mockEarnings = [
  {
    id: 1,
    user: "Alex Martin",
    track: "Midnight Pulse",
    amount: 199,
    date: "2024-01-15",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    user: "Sarah Chen",
    track: "Digital Dreams",
    amount: 149,
    date: "2024-01-14",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    user: "Maya Johnson",
    track: "Ocean Waves",
    amount: 89,
    date: "2024-01-13",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    user: "David Rodriguez",
    track: "Bass Drop",
    amount: 199,
    date: "2024-01-12",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 5,
    user: "Emily Wilson",
    track: "Sunset Vibes",
    amount: 125,
    date: "2024-01-11",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 6,
    user: "Chris Thompson",
    track: "Electric Storm",
    amount: 175,
    date: "2024-01-10",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

const StatCard = ({ title, value, change, trend, icon: Icon, subtitle }: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  subtitle: string;
}) => (
  <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 hover:border-music-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-music-blue-500/10 group cursor-pointer">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-music-blue-500/20 flex items-center justify-center group-hover:bg-music-blue-500/30 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-4 h-4 text-music-blue-400 group-hover:text-music-blue-300 transition-colors duration-300" />
        </div>
        <CardTitle className="text-sm font-medium text-white group-hover:text-music-blue-100 transition-colors duration-300">{title}</CardTitle>
      </div>
      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-music-blue-400 group-hover:scale-110 transition-all duration-300" />
    </CardHeader>
    <CardContent>
      <div className="text-xs text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">{subtitle}</div>
      <div className="text-2xl font-bold text-white mb-2 group-hover:text-music-blue-100 transition-colors duration-300">{value}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-400 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-xs text-green-400 group-hover:text-green-300 transition-colors duration-300">{change}</span>
        </div>
        <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">from last month</span>
      </div>
      {/* Enhanced trend line with animations */}
      <div className="mt-4 h-[60px] relative overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 60">
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(0, 126, 167)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(0, 126, 167)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`line-gradient-${title}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(0, 126, 167)" />
              <stop offset="50%" stopColor="rgb(59, 130, 246)" />
              <stop offset="100%" stopColor="rgb(0, 126, 167)" />
            </linearGradient>
          </defs>
          <path
            d="M0,45 Q25,35 50,40 T100,30 T150,25 T200,20 L200,60 L0,60 Z"
            fill={`url(#gradient-${title})`}
            className="group-hover:opacity-80 transition-opacity duration-300"
          />
          <path
            d="M0,45 Q25,35 50,40 T100,30 T150,25 T200,20"
            fill="none"
            stroke="rgb(0, 126, 167)"
            strokeWidth="2"
            className="group-hover:stroke-[3] transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(0, 126, 167, 0.3))'
            }}
          />
          {/* Animated dot at the end */}
          <circle
            cx="200"
            cy="20"
            r="3"
            fill="rgb(0, 126, 167)"
            className="group-hover:r-4 transition-all duration-300 animate-pulse"
          />
        </svg>
        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-music-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
      </div>
    </CardContent>
  </Card>
);

export default function ProDashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Handle URL parameters for tab selection
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ['dashboard', 'pending', 'earnings', 'settings', 'support'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // Settings state
  const [isAvailable, setIsAvailable] = useState(true);
  const [replyTime, setReplyTime] = useState([3]);
  const [notifications, setNotifications] = useState({
    dailyDigest: true,
    instantNotifications: false,
    email: true,
    push: false
  });
  const [privacy, setPrivacy] = useState({
    showInSearch: false,
    displayEarnings: true,
    allowDirectMessages: false,
    autoApprove: true
  });

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Date,User,Track,Amount,Status\n" +
      mockEarnings.map(earning =>
        `${earning.date},${earning.user},${earning.track},$${earning.amount},${earning.status}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "earnings_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pending", label: "Pending Reviews", icon: Clock },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-music-purple-600 to-music-pink-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-music-purple-600/30">
              F
            </div>
            <span className="text-xl font-bold text-white group-hover:text-music-purple-200 transition-colors duration-300">FEEDTRACK</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 group hover:scale-105 ${
                  activeTab === item.id
                    ? "bg-music-blue-600 text-white shadow-lg shadow-music-blue-600/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-800/20"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-all duration-300 ${
                  activeTab === item.id
                    ? "scale-110"
                    : "group-hover:scale-110 group-hover:text-music-blue-400"
                }`} />
                <span className="font-medium transition-all duration-300">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer">
            <Avatar className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-music-blue-500/20">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium text-sm group-hover:text-music-blue-100 transition-colors duration-300">Roohi Koohi</p>
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
      <div className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Earnings"
                subtitle="All Time"
                value="7,850"
                change="6.2%"
                trend="up"
                icon={DollarSign}
              />
              <StatCard
                title="Tracks Reviewed"
                subtitle="Feedback delivered"
                value="128"
                change="4.5%"
                trend="up"
                icon={TrendingUp}
              />
              <StatCard
                title="Pending Reviews"
                subtitle="In your queue"
                value="6"
                change="3.2%"
                trend="up"
                icon={Clock}
              />
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pending Reviews */}
              <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 hover:border-music-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-music-blue-500/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Pending Reviews</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-music-blue-400 hover:text-music-blue-300 hover:bg-music-blue-500/10 transition-all duration-300"
                    onClick={() => setActiveTab("pending")}
                  >
                    Show More <MoreHorizontal className="w-4 h-4 ml-1 transition-transform duration-300 hover:scale-110" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPendingReviews.slice(0, 4).map((review) => (
                    <div key={review.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer hover:scale-[1.02]">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>AM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium text-sm group-hover:text-music-blue-100 transition-colors duration-300">{review.user}</p>
                          <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">Track: "{review.track}"</p>
                        </div>
                      </div>
                      <Link to={`/review/${review.id}`}>
                        <Button size="sm" className="bg-music-blue-600 hover:bg-music-blue-700 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-music-blue-600/20">
                          Review Now
                        </Button>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Total Earnings */}
              <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Total Earnings</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-music-blue-400 hover:text-music-blue-300 hover:bg-music-blue-500/10 transition-all duration-300"
                    onClick={() => setActiveTab("earnings")}
                  >
                    Show More <MoreHorizontal className="w-4 h-4 ml-1 transition-transform duration-300 hover:scale-110" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEarnings.slice(0, 4).map((earning) => (
                    <div key={earning.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer hover:scale-[1.02]">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                          <AvatarImage src={earning.avatar} />
                          <AvatarFallback>AM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium text-sm group-hover:text-green-100 transition-colors duration-300">{earning.user}</p>
                          <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">Track: "{earning.track}"</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-semibold group-hover:text-green-300 group-hover:scale-110 transition-all duration-300">+${earning.amount}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === "pending" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Pending Reviews</h1>
              <div className="text-sm text-gray-400">{mockPendingReviews.length} reviews pending</div>
            </div>

            <div className="grid gap-4">
              {mockPendingReviews.map((review) => (
                <Card key={review.id} className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 hover:border-music-blue-500/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-white font-semibold">{review.user}</h3>
                          <p className="text-gray-400 text-sm">Track: "{review.track}"</p>
                          <div className="flex gap-4 text-xs text-gray-500 mt-1">
                            <span>Genre: {review.genre}</span>
                            <span>Duration: {review.duration}</span>
                            <span>Submitted: {review.submittedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                          <Play className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Link to={`/review/${review.id}`}>
                          <Button size="sm" className="bg-music-blue-600 hover:bg-music-blue-700">
                            Start Review
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "earnings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Total Earnings</h1>
              <Button
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-4 text-gray-300 font-medium">Date</th>
                        <th className="text-left p-4 text-gray-300 font-medium">User</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Track</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Amount</th>
                        <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockEarnings.map((earning) => (
                        <tr key={earning.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                          <td className="p-4 text-gray-400">{earning.date}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={earning.avatar} />
                                <AvatarFallback>{earning.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="text-white">{earning.user}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-300">{earning.track}</td>
                          <td className="p-4 text-green-400 font-semibold">${earning.amount}</td>
                          <td className="p-4">
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                              {earning.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-8">
            <h1 className="text-3xl font-bold text-white">Settings</h1>

            {/* Availability Section */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-music-blue-400" />
                  <CardTitle className="text-white">Availability</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white text-sm font-medium">Status:</Label>
                  <div className="flex gap-3 mt-2">
                    <Button
                      variant={isAvailable ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsAvailable(true)}
                      className={isAvailable ? "bg-music-blue-600 hover:bg-music-blue-700" : "border-gray-600 text-gray-300 hover:bg-gray-800"}
                    >
                      Available
                    </Button>
                    <Button
                      variant={!isAvailable ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsAvailable(false)}
                      className={!isAvailable ? "bg-gray-600 hover:bg-gray-700" : "border-gray-600 text-gray-300 hover:bg-gray-800"}
                    >
                      Unavailable
                    </Button>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Set your status to 'Unavailable' if you don't want to receive feedback requests. You can change this at any time.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Reply Time Section */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-music-blue-400" />
                  <CardTitle className="text-white">Reply Time</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white text-sm font-medium">Maximum time to reply to track requests</Label>
                  <div className="mt-4 space-y-4">
                    <Slider
                      value={replyTime}
                      onValueChange={setReplyTime}
                      max={14}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">1 day</span>
                      <span className="text-music-blue-400 font-medium">{replyTime[0]} days</span>
                      <span className="text-gray-400">2 weeks</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Set the maximum number of days you'll take to respond. Producers see this on your profile.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-music-blue-400" />
                  <CardTitle className="text-white">Notifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="daily-digest"
                        checked={notifications.dailyDigest}
                        onCheckedChange={(checked) =>
                          setNotifications(prev => ({ ...prev, dailyDigest: checked as boolean }))
                        }
                      />
                      <Label htmlFor="daily-digest" className="text-white">Daily Digest</Label>
                    </div>
                    <span className="text-gray-400 text-sm">Get a summary of all activity once per day.</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="instant-notifications"
                        checked={notifications.instantNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications(prev => ({ ...prev, instantNotifications: checked as boolean }))
                        }
                      />
                      <Label htmlFor="instant-notifications" className="text-white">Instant Notifications</Label>
                    </div>
                    <span className="text-gray-400 text-sm">Get notified as soon as anything important happens.</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-music-blue-400" />
                      <Checkbox
                        id="email"
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                          setNotifications(prev => ({ ...prev, email: checked as boolean }))
                        }
                      />
                      <Label htmlFor="email" className="text-white">Email</Label>
                    </div>
                    <span className="text-gray-400 text-sm">Receive notifications via email.</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-music-blue-400" />
                      <Checkbox
                        id="push"
                        checked={notifications.push}
                        onCheckedChange={(checked) =>
                          setNotifications(prev => ({ ...prev, push: checked as boolean }))
                        }
                      />
                      <Label htmlFor="push" className="text-white">Push</Label>
                    </div>
                    <span className="text-gray-400 text-sm">Receive push notifications in browser/app.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile & Privacy Section */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-music-blue-400" />
                  <CardTitle className="text-white">Profile & Privacy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="show-search"
                        checked={privacy.showInSearch}
                        onCheckedChange={(checked) =>
                          setPrivacy(prev => ({ ...prev, showInSearch: checked as boolean }))
                        }
                      />
                      <Label htmlFor="show-search" className="text-white">Show profile in search</Label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="display-earnings"
                        checked={privacy.displayEarnings}
                        onCheckedChange={(checked) =>
                          setPrivacy(prev => ({ ...prev, displayEarnings: checked as boolean }))
                        }
                      />
                      <Label htmlFor="display-earnings" className="text-white">Display earnings publicly</Label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="direct-messages"
                        checked={privacy.allowDirectMessages}
                        onCheckedChange={(checked) =>
                          setPrivacy(prev => ({ ...prev, allowDirectMessages: checked as boolean }))
                        }
                      />
                      <Label htmlFor="direct-messages" className="text-white">Allow direct messages from producers</Label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="auto-approve"
                        checked={privacy.autoApprove}
                        onCheckedChange={(checked) =>
                          setPrivacy(prev => ({ ...prev, autoApprove: checked as boolean }))
                        }
                      />
                      <Label htmlFor="auto-approve" className="text-white">Auto-approve feedback requests</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Section */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-music-blue-400" />
                  <CardTitle className="text-white">Account</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button className="bg-music-blue-600 hover:bg-music-blue-700">
                    Change Password
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Mail className="w-4 h-4 mr-2" />
                    Update Email
                  </Button>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    Delete Account
                  </Button>
                  <p className="text-gray-400 text-sm mt-2">
                    This will permanently erase your account and data.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Save Changes Button */}
            <div className="flex justify-center pt-8">
              <Button size="lg" className="bg-music-blue-600 hover:bg-music-blue-700 px-8">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
