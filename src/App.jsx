import React, { useState } from 'react';

export default function FlexSpotApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, rank: 1, name: "Nike", tagline: "Just Do It.", url: "https://nike.com", logo: "⚡", amount: 1250, clicks: 1200, growth: "+28%" },
    { id: 2, rank: 2, name: "Red Bull", tagline: "Gives You Wings.", url: "https://redbull.com", logo: "🐂", amount: 980, clicks: 842, growth: "+12%" },
    { id: 3, rank: 3, name: "Apple", tagline: "Think Different.", url: "https://apple.com", logo: "🍎", amount: 760, clicks: 620, growth: "+9%" },
    { id: 4, rank: 4, name: "McDonald's", tagline: "I'm Lovin' It.", url: "https://mcdonalds.com", logo: "🍟", amount: 540, clicks: 540, growth: "+6%" },
    { id: 5, rank: 5, name: "Samsung", tagline: "Do What You Can't.", url: "https://samsung.com", logo: "📱", amount: 430, clicks: 430, growth: "+8%" },
  ]);

  const [formName, setFormName] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formAmount, setFormAmount] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formUrl) return;

    const newEntry = {
      id: Date.now(),
      name: formName,
      tagline: "New Challenger",
      url: formUrl.startsWith('http') ? formUrl : `https://${formUrl}`,
      logo: "🚀",
      amount: parseFloat(formAmount) || 1.0,
      clicks: 1,
      growth: "+15%"
    };

    const updated = [...leaderboard, newEntry].sort((a, b) => b.amount - a.amount);
    const ranked = updated.map((item, index) => ({ ...item, rank: index + 1 }));

    setLeaderboard(ranked);
    setIsModalOpen(false);
    setFormName('');
    setFormUrl('');
    setFormAmount('1');
  };

  const top3 = leaderboard.filter(item => item.rank <= 3);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans">
      {/* Top Ticker */}
      <div className="bg-[#1A1A1A] text-white px-6 py-2.5 text-xs font-bold flex justify-between items-center tracking-wide">
        <div className="flex items-center space-x-6">
          <span className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mr-2"></span>
            142 currently online
          </span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span className="hidden sm:inline">Total Volume: <strong className="text-emerald-400">$4,820</strong></span>
        </div>
        <div className="hidden md:block text-purple-300 font-extrabold tracking-wider animate-pulse">
          ⚡ REAL BRANDS. REAL BIDS. REAL EXPOSURE.
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <span className="text-2xl font-black tracking-tighter text-[#7C3AED]">
          FlexSpot<span className="text-pink-500">.lol</span>
        </span>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-[#7C3AED] to-pink-500 text-white font-black px-6 py-2.5 rounded-2xl shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 transition-transform"
        >
          Donate $1 to Join →
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="inline-block bg-purple-100 text-purple-700 font-extrabold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wider animate-bounce">
            🔥 BRANDS COMPETE. EVERYONE WINS.
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            BIG BRAND VISIBILITY. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-pink-500">
              START FROM JUST $1.
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mb-8 font-medium">
            Get your brand on top. Outbid others, climb the ranks and get massive exposure. Simple. Fun. Viral.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95 transition-transform"
          >
            Start with $1 →
          </button>
        </div>

        {/* Mascot Showcase Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative bg-gradient-to-b from-purple-100 to-pink-50 border-3 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center max-w-sm w-full hover:translate-y-[-4px] transition-transform">
            <div className="absolute -top-4 -right-4 bg-yellow-300 border-2 border-black font-black text-xs px-3.5 py-1.5 rounded-full rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-bounce">
              👑 CROWN HOLDER
            </div>
            <div className="w-36 h-36 mx-auto bg-amber-200 rounded-2xl border-2 border-black flex items-center justify-center text-7xl mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              🐶👑
            </div>
            <h3 className="font-black text-xl mb-1 tracking-tight">TURN BRANDS INTO BUZZ</h3>
            <p className="text-xs text-gray-600 font-medium">Small bids. Big reach. Memes make brands famous.</p>
          </div>
        </div>
      </main>

      {/* Leaderboard Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏆</span>
            <h2 className="text-2xl font-black tracking-tight">Live Leaderboard</h2>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-extrabold animate-pulse">
              ● Live Updates Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {top3.map((item) => {
            const isFirst = item.rank === 1;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white border-3 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-all block relative ${
                  isFirst ? 'ring-4 ring-amber-300 bg-gradient-to-b from-amber-50/50 to-white' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-2xl font-black ${isFirst ? 'text-amber-600 text-3xl' : 'text-amber-500'}`}>
                    #{item.rank}
                  </span>
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border border-black ${
                    isFirst ? 'bg-amber-300 text-black animate-bounce' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {isFirst ? '👑 Current Leader' : 'Top Sponsored'}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl border-2 border-black flex items-center justify-center text-3xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {item.logo}
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-gray-900 tracking-tight">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium truncate max-w-[180px]">{item.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t-2 border-gray-100 pt-4">
                  <span className="text-xs font-bold text-gray-400">👁️ {item.clicks} clicks</span>
                  <span className="text-2xl font-black text-[#7C3AED]">${item.amount}.00</span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-3 border-black rounded-3xl p-8 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-sm font-black bg-gray-100 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-200"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black mb-1">Claim Your Spot 🚀</h3>
            <p className="text-xs text-gray-600 mb-6 font-medium">Donate $1 or more to list your brand on the live leaderboard.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase mb-1">Brand Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Pixel Potato" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1">Destination URL</label>
                <input 
                  type="text" 
                  required
                  placeholder="https://yourwebsite.com" 
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1">Bid Amount ($ USD)</label>
                <input 
                  type="number" 
                  min="1" 
                  required
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-black text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black py-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all"
              >
                Submit & Dethrone! 👑
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}