import React, { useMemo, useState } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const DOGE = 'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg';

const demo = [
  { id:'1', name:'Nike', tagline:'Just Do It.', amount:1250, clicks:1200, url:'https://nike.com', logoImage:'https://cdn.simpleicons.org/nike/000000' },
  { id:'2', name:'Red Bull', tagline:'Gives You Wings.', amount:980, clicks:842, url:'https://redbull.com', logoImage:'https://cdn.simpleicons.org/redbull/DB0A40' },
  { id:'3', name:'Apple', tagline:'Think Different.', amount:760, clicks:620, url:'https://apple.com', logoImage:'https://cdn.simpleicons.org/apple/000000' },
  { id:'4', name:"McDonald’s", tagline:"I’m Lovin’ It.", amount:540, clicks:540, url:'https://mcdonalds.com', logoImage:'https://cdn.simpleicons.org/mcdonalds/FFC72C' },
  { id:'5', name:'Samsung', tagline:"Do What You Can’t.", amount:430, clicks:430, url:'https://samsung.com', logoImage:'https://cdn.simpleicons.org/samsung/1428A0' },
  { id:'6', name:'Coca-Cola', tagline:'Real Magic.', amount:420, clicks:420, url:'https://coca-cola.com', logoImage:'https://cdn.simpleicons.org/cocacola/F40009' },
  { id:'7', name:'BMW', tagline:'The Ultimate Driving Machine.', amount:380, clicks:380, url:'https://bmw.com', logoImage:'https://cdn.simpleicons.org/bmw/0066B1' },
];

const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0);
const compact = n => new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(n||0);

function CrownLogo(){return <span className="crown-logo"><span>♛</span></span>}
function BrandLogo({item,small=false}){return <span className={`brand-logo ${small?'small':''}`}>{item.logoImage?<img src={item.logoImage} alt=""/>:<b>{item.name.slice(0,2).toUpperCase()}</b>}</span>}
function QrMock(){return <div className="qr-code"><div className="qr-grid">{Array.from({length:169},(_,i)=><i key={i} className={((i*7)%11<5||(i%13===0))?'on':''}/>)}</div><span>₮</span></div>}

export default function App(){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({name:'',tagline:'',url:'',amount:'1'});
  const [state,setState]=useState({loading:false,msg:''});
  const ranked=useMemo(()=>demo.map((x,i)=>({...x,rank:i+1})),[]);
  const leader=ranked[0];
  const podium=[ranked[1],ranked[0],ranked[2]];
  const topRows=ranked.slice(3,7);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  async function submit(e){
    e.preventDefault();
    if(!SUPABASE_URL||!SUPABASE_ANON_KEY){setState({loading:false,msg:'Saved for preview. Payment setup is the next step.'});return}
    setState({loading:true,msg:''});
    try{
      const r=await fetch(`${SUPABASE_URL}/functions/v1/create-submission`,{method:'POST',headers:{'Content-Type':'application/json',apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`},body:JSON.stringify({name:form.name.trim(),tagline:form.tagline.trim(),url:form.url.trim(),amount:Number(form.amount||1)})});
      const p=await r.json(); if(!r.ok) throw new Error(p.error||'Submission failed');
      setState({loading:false,msg:'Saved. Crypto payment is the next step.'});
    }catch(err){setState({loading:false,msg:err.message||'Submission failed'})}
  }

  return <div className="screen-bg">
    <div className="app-window">
      <header className="header">
        <a className="brand" href="#home"><CrownLogo/><span><strong>FlexSpot<span>.lol</span></strong><small>REAL BRANDS. REAL SUPPORT. REAL EXPOSURE.</small></span></a>
        <nav className="menu"><a className="active" href="#home">Home</a><a href="#leaderboard">Leaderboard</a><a href="#how">How It Works</a><a href="#rewards">Rewards</a><a href="#faq">FAQs</a></nav>
        <div className="head-actions"><button className="icon-btn">⌕</button><button className="purple-btn nav-cta" onClick={()=>setModal(true)}>Donate $1 to Join →</button><button className="user-btn">●</button></div>
      </header>

      <div className="ticker"><div><span className="green-dot"/> <b>142</b> currently online <i/> Total Volume: <b>$4,820</b> <i/> All-time visitors: <b>89K</b></div><strong>⚡ REAL BRANDS. REAL SUPPORT. REAL EXPOSURE.</strong></div>

      <main id="home">
        <section className="hero-reference">
          <div className="hero-copy-ref">
            <div className="kicker">BRANDS COMPETE. THE INTERNET WINS.</div>
            <h1>BIG BRAND VISIBILITY.<span>START FROM JUST $1.</span></h1>
            <p>Donate to climb the ranks, get massive visibility, drive real traffic, and be part of a community that loves great brands.</p>
            <div className="cta-row"><button className="purple-btn big" onClick={()=>setModal(true)}>Start donating from $1 →</button><a className="how-btn" href="#leaderboard"><b>▶</b> How It Works</a></div>
            <div className="feature-row"><span>⚡ <b>Live Leaderboard</b></span><span>👥 <b>Instant Exposure</b></span><span>▥ <b>Real People. Real Brands.</b></span><span>◎ <b>Open to Everyone</b></span></div>
          </div>

          <div className="dog-stage">
            <div className="dog-aura"/>
            <img className="dog-img" src={DOGE} alt="Meme dog"/>
            <div className="crown-overlay">♛</div><div className="glasses-overlay"><span/><span/></div>
            <div className="meme-note note-a">SMALL<br/>DONATIONS<br/><b>BIG REACH</b><em>↙</em></div>
            <div className="meme-note note-b">BRANDS<br/><b>GO VIRAL</b><em>↘</em></div>
            <div className="leader-float"><div className="leader-head"><span>Current Leader Spotlight</span><b>#1</b></div><div className="leader-body"><BrandLogo item={leader}/><div><strong>{leader.name}</strong><span>{leader.tagline}</span></div></div><small>The #1 brand gets premium visibility on our homepage.</small></div>
          </div>

          <aside className="crypto-card"><button className="x-btn">×</button><h3>Donate from <span>$1</span></h3><p>Support your favorite brand and help them climb the ranks. Crypto only.</p><QrMock/><label>Choose Network</label><button className="chain active" onClick={()=>setModal(true)}><span className="trx">◈</span><b>USDT (TRC20)</b><i>◉</i></button><button className="chain" onClick={()=>setModal(true)}><span className="bnb">◆</span><b>USDT (BEP20)</b><i>○</i></button><small className="scan">Scan the QR code or copy the address to make your donation.</small><button className="copy-address" onClick={()=>setModal(true)}>▣ Copy Address</button><small className="minimum">Minimum donation: $1 (= 1 USDT)</small><div className="thank-box">Every donation fuels brand visibility.<br/><b>Thank you! ♥</b></div></aside>
        </section>

        <section className="leaderboard-ref" id="leaderboard">
          <div className="leaderboard-title"><div><span className="cup">🏆</span><h2>Live Leaderboard</h2><span className="live-ball">●</span><small>Updates every few seconds</small></div><div className="filters"><button className="active">All Brands</button><button>Top Gainers</button><button>Newest</button></div></div>
          <div className="podium-grid-ref">{podium.map(item=><a key={item.id} href={item.url} target="_blank" rel="noreferrer" className={`winner-card rank${item.rank}`}><span className="rank-chip">#{item.rank}</span>{item.rank===1&&<span className="mini-crown">♛</span>}<div className="winner-main"><BrandLogo item={item}/><div><h3>{item.name}</h3><p>{item.tagline}</p></div></div><div className="winner-meta"><span>◉ {compact(item.clicks)} clicks</span><b>▲ +{item.rank===1?'28':item.rank===2?'12':'9'}%</b></div><div className="winner-money">{money(item.amount)}</div><div className="winner-status">{item.rank===1?'🏆 Current Leader':item.rank===2?'🔒 Locked In':'🔒 Top Sponsored'}</div></a>)}</div>
          <div className="top10-line"><h3>Top 10 Brands</h3><a href="#leaderboard">View Full Leaderboard →</a></div>
          <div className="top10-ref">{topRows.map(item=><a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="mini-row"><span className="num">{item.rank}</span><BrandLogo item={item} small/><span className="mini-copy"><b>{item.name}</b><small>{item.tagline}</small></span><span className="mini-click">◉ {compact(item.clicks)} clicks</span><strong>{money(item.amount)}</strong><span className="up">▲ +{item.rank===4?'6':item.rank===5?'8':item.rank===6?'5':'3'}%</span></a>)}</div>
          <div className="metrics"><span>♙ <b>89K</b><small>All-time Visitors</small></span><span>◉ <b>4.2M</b><small>Total Page Views</small></span><span>▥ <b>100</b><small>Brands Featured</small></span><span>◎ <b>Global</b><small>Open to All Brands</small></span><blockquote>“A simple donation. A massive opportunity.”<small>— FlexSpot.lol</small></blockquote></div>
        </section>
      </main>
    </div>

    <div className="mobile-donate-strip" onClick={()=>setModal(true)}><span>₮</span><div><b>Donate with Crypto</b><small>From $1 · USDT (TRC20 / BEP20)</small></div><strong>▦ ›</strong></div>
    <button className="mobile-bottom" onClick={()=>setModal(true)}>⚡ Dethrone #1</button>

    {modal&&<div className="modal-backdrop"><div className="modal-card"><button className="modal-x" onClick={()=>setModal(false)}>×</button><div className="modal-step">STEP 1 OF 2</div><h2>Claim your FlexSpot.</h2><p>Submit your public profile first. Crypto payment comes next.</p><form onSubmit={submit}><label>Company / profile name<input required value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your brand name"/></label><label>Short tagline<input value={form.tagline} onChange={e=>set('tagline',e.target.value)} placeholder="One short line"/></label><label>Website or social profile<input required value={form.url} onChange={e=>set('url',e.target.value)} placeholder="https://yourwebsite.com"/></label><label>Donation amount<div className="amount-line"><span>$</span><input type="number" min="1" step="1" value={form.amount} onChange={e=>set('amount',e.target.value)}/></div></label>{state.msg&&<div className="form-message">{state.msg}</div>}<button className="purple-btn submit-btn" disabled={state.loading}>{state.loading?'Saving…':'Continue to payment →'}</button></form></div></div>}
  </div>
}
