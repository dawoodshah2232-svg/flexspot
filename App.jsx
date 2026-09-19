import React, { useState } from 'react';

export default function RankRushApp() {
  const [activeTab, setActiveTab] = useState('all');

  const leaderboard = [
    { rank: 1, name: "Nike", tagline: "Just Do It.", url: "https://nike.com", logo: "⚡", amount: 1250, clicks: 1200, isPodium: true },
    { rank: 2, name: "Red Bull", tagline: "Gives You Wings.", url: "https://redbull.com", logo: "🐂", amount: 980, clicks: 842, isPodium: true },
    { rank: 3, name: "Apple", tagline: "Think Different.", url: "https://apple.com", logo: "🍎", amount: 760, clicks: 620, isPodium: true },
    { rank: 4, name: "McDonald's", tagline: "I'm Lovin' It.", url: "https://mcdonalds.com", logo: "🍟", amount: 540, clicks: 540, isPodium: false },
    { rank: 5, name: "Samsung", tagline: "Do What You Can't.", url: "https://samsung.com", logo: "📱", amount: 430, clicks: 430, isPodium: false },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans">
      {/* Top Live Metrics Ticker Bar */}
      <div className="bg-[#1A1A1A] text-white px-6 py-2 text-xs font-semibold flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
            142 currently online
          </span>
          <span>|</span>
          <span>Total Volume: <strong className="text-emerald-400">$4,820</strong></span>
          <span>|</span>
          <span>All-time visitors: 89K</span>
        </div>
        <div className="hidden md:block text-purple-300 font-medium">
          ✨ REAL BRANDS. REAL BIDS. REAL EXPOSURE.
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="text-2xl font-black tracking-tighter text-[#7C3AED]">
            FlexSpot<span className="text-pink-500">.lol</span>
          </span>
          <nav className="hidden md:flex space-x-6 text-sm font-bold text-gray-600">
            <a href="#" className="text-[#7C3AED]">Home</a>
            <a href="#" className="hover:text-purple-600">Leaderboard</a>
            <a href="#" className="hover:text-purple-600">How It Works</a>
            <a href="#" className="hover:text-purple-600">Rewards</a>
          </nav>
        </div>
        <button className="bg-gradient-to-r from-[#7C3AED] to-pink-500 text-white font-extrabold px-5 py-2.5 rounded-2xl shadow-lg shadow-purple-500/25">
          Donate $1 to Join →
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <div className="inline-block bg-purple-100 text-purple-700 font-bold text-xs px-3.5 py-1.5 rounded-full mb-4">
            BRANDS COMPETE. EVERYONE WINS.
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            BIG BRAND VISIBILITY. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-pink-500">
              START FROM JUST $1.
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mb-8">
            Get your brand on top. Outbid others, climb the ranks and get massive exposure. Simple. Fun. Viral.
          </p>
          <button className="bg-[#7C3AED] text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg">
            Start with $1 →
          </button>
        </div>

        {/* Mascot Showcase Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative bg-gradient-to-b from-purple-100 to-pink-50 border-3 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center max-w-sm">
            <div className="absolute -top-4 -right-4 bg-yellow-300 border-2 border-black font-black text-xs px-3 py-1 rounded-full rotate-12">
              👑 CROWN HOLDER
            </div>
            <div className="w-32 h-32 mx-auto bg-amber-200 rounded-2xl border-2 border-black flex items-center justify-center text-6xl mb-4">
              🐶👑
            </div>
            <h3 className="font-black text-xl mb-1">TURN BRANDS INTO BUZZ</h3>
            <p className="text-xs text-gray-600">Small bids. Big reach. Memes make brands famous.</p>
          </div>
        </div>
      </main>

      {/* Leaderboard Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏆</span>
            <h2 className="text-2xl font-black">Live Leaderboard</h2>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold">
              ● Updates live
            </span>
          </div>
        </div>

        {/* Top 3 Podium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaderboard.map((item) => (
            <a 
              key={item.rank} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border-2 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl font-black text-amber-500">#{item.rank}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {item.rank === 1 ? '👑 Current Leader' : '▲ Active'}
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl border border-black flex items-center justify-center text-2xl">
                  {item.logo}
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.tagline}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400">👁️ {item.clicks} clicks</span>
                <span className="text-xl font-black text-[#7C3AED]">${item.amount}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
