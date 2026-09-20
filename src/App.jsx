import React, { useEffect, useMemo, useState } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const DOGE = 'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg';

const demo = [
  { id:'1', name:'Nike', tagline:'Just Do It.', amount:1250, clicks:0, url:'https://nike.com', logoImage:'https://cdn.simpleicons.org/nike/000000', isDemo:true },
  { id:'2', name:'Red Bull', tagline:'Gives You Wings.', amount:980, clicks:0, url:'https://redbull.com', logoImage:'https://cdn.simpleicons.org/redbull/DB0A40', isDemo:true },
  { id:'3', name:'Apple', tagline:'Think Different.', amount:760, clicks:0, url:'https://apple.com', logoImage:'https://cdn.simpleicons.org/apple/000000', isDemo:true },
  { id:'4', name:"McDonald’s", tagline:"I’m Lovin’ It.", amount:540, clicks:0, url:'https://mcdonalds.com', logoImage:'https://cdn.simpleicons.org/mcdonalds/FFC72C', isDemo:true },
  { id:'5', name:'Samsung', tagline:"Do What You Can’t.", amount:430, clicks:0, url:'https://samsung.com', logoImage:'https://cdn.simpleicons.org/samsung/1428A0', isDemo:true },
  { id:'6', name:'Coca-Cola', tagline:'Real Magic.', amount:420, clicks:0, url:'https://coca-cola.com', logoImage:'https://cdn.simpleicons.org/cocacola/F40009', isDemo:true },
  { id:'7', name:'BMW', tagline:'The Ultimate Driving Machine.', amount:380, clicks:0, url:'https://bmw.com', logoImage:'https://cdn.simpleicons.org/bmw/0066B1', isDemo:true },
];

const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0);
const compact = n => new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(n||0);

function CrownLogo(){return <span className="crown-logo"><span>♛</span></span>}
function BrandLogo({item,small=false}){return <span className={`brand-logo ${small?'small':''}`}>{item.logoImage?<img src={item.logoImage} alt=""/>:<b>{item.name.slice(0,2).toUpperCase()}</b>}</span>}
function QrMock(){return <div className="qr-code"><div className="qr-grid">{Array.from({length:169},(_,i)=><i key={i} className={((i*7)%11<5||(i%13===0))?'on':''}/>)}</div><span>₮</span></div>}

export default function App(){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({name:'',tagline:'',url:'',amount:'1',logo_data_url:''});
  const [state,setState]=useState({loading:false,msg:'',ok:false});
  const [liveRows,setLiveRows]=useState([]);
  const [leaderboardState,setLeaderboardState]=useState({loading:true,error:''});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  async function loadLeaderboard(){
    if(!SUPABASE_URL||!SUPABASE_ANON_KEY){
      setLeaderboardState({loading:false,error:'Live data is not connected on this deployment.'});
      return;
    }
    try{
      setLeaderboardState({loading:true,error:''});
      const r=await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_leaderboard`,{
        method:'POST',
        headers:{'Content-Type':'application/json',apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`},
        body:JSON.stringify({p_board:'all_time'})
      });
      const data=await r.json();
      if(!r.ok) throw new Error(data?.message||'Unable to load leaderboard');
      const mapped=(Array.isArray(data)?data:[]).map(row=>({
        id:row.id,
        name:row.name,
        tagline:row.tagline||'',
        amount:Number(row.total_cents||0)/100,
        clicks:0,
        url:row.destination_url,
        logoImage:row.logo_url||'',
        rank:Number(row.rank||0),
        isDemo:false,
      }));
      setLiveRows(mapped);
      setLeaderboardState({loading:false,error:''});
    }catch(err){
      setLeaderboardState({loading:false,error:err.message||'Unable to load leaderboard'});
    }
  }

  useEffect(()=>{ loadLeaderboard(); },[]);

  const usingDemo=liveRows.length===0;
  const ranked=useMemo(()=>{
    const source=usingDemo?demo:liveRows;
    return [...source].sort((a,b)=>(b.amount-a.amount)||(a.name.localeCompare(b.name))).map((x,i)=>({...x,rank:i+1}));
  },[liveRows,usingDemo]);
  const leader=ranked[0];
  const podium=[ranked[1],ranked[0],ranked[2]].filter(Boolean);
  const topRows=ranked.slice(3,10);
  const verifiedTotal=usingDemo?0:ranked.reduce((sum,item)=>sum+Number(item.amount||0),0);

  function handleLogo(file){
    if(!file){set('logo_data_url','');return}
    if(!['image/png','image/jpeg','image/webp'].includes(file.type)){setState({loading:false,msg:'Logo must be PNG, JPG or WebP.',ok:false});return}
    if(file.size>2*1024*1024){setState({loading:false,msg:'Logo must be 2 MB or smaller.',ok:false});return}
    const reader=new FileReader();
    reader.onload=()=>set('logo_data_url',String(reader.result||''));
    reader.onerror=()=>setState({loading:false,msg:'Could not read logo file.',ok:false});
    reader.readAsDataURL(file);
  }

  async function submit(e){
    e.preventDefault();
    if(!SUPABASE_URL||!SUPABASE_ANON_KEY){setState({loading:false,msg:'Submission backend is not connected on this deployment.',ok:false});return}
    setState({loading:true,msg:'',ok:false});
    try{
      const r=await fetch(`${SUPABASE_URL}/functions/v1/create-submission`,{
        method:'POST',
        headers:{'Content-Type':'application/json',apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`},
        body:JSON.stringify({name:form.name.trim(),tagline:form.tagline.trim(),url:form.url.trim(),amount:Number(form.amount||1),logo_data_url:form.logo_data_url||undefined})
      });
      const p=await r.json();
      if(!r.ok) throw new Error(p.error||'Submission failed');
      setState({loading:false,msg:p.message||'Submission saved. Payment setup is the next step.',ok:true});
      setForm({name:'',tagline:'',url:'',amount:'1',logo_data_url:''});
    }catch(err){setState({loading:false,msg:err.message||'Submission failed',ok:false})}
  }

  return <div className="screen-bg">
    <div className="app-window">
      <header className="header">
        <a className="brand" href="#home"><CrownLogo/><span><strong>FlexSpot<span>.lol</span></strong><small>REAL BRANDS. REAL SUPPORT. REAL EXPOSURE.</small></span></a>
        <nav className="menu"><a className="active" href="#home">Home</a><a href="#leaderboard">Leaderboard</a><a href="#how">How It Works</a><a href="#rewards">Rewards</a><a href="#faq">FAQs</a></nav>
        <div className="head-actions"><button className="icon-btn">⌕</button><button className="purple-btn nav-cta" onClick={()=>setModal(true)}>Donate $1 to Join →</button><button className="user-btn">●</button></div>
      </header>

      <div className="ticker"><div><span className="green-dot"/> <b>{usingDemo?'Preview':'Live'}</b> leaderboard <i/> Verified support: <b>{money(verifiedTotal)}</b> <i/> Featured brands: <b>{usingDemo?0:ranked.length}</b></div><strong>⚡ REAL BRANDS. REAL SUPPORT. REAL EXPOSURE.</strong></div>

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
            {leader&&<div className="leader-float"><div className="leader-head"><span>{usingDemo?'Preview Leader':'Current Leader Spotlight'}</span><b>#1</b></div><div className="leader-body"><BrandLogo item={leader}/><div><strong>{leader.name}</strong><span>{leader.tagline}</span></div></div><small>{usingDemo?'Live leaderboard activates after the first verified donation.':'The #1 brand gets premium visibility on our homepage.'}</small></div>}
          </div>

          <aside className="crypto-card"><button className="x-btn">×</button><h3>Donate from <span>$1</span></h3><p>Submit your brand first. Crypto checkout will activate after the payment provider is configured.</p><QrMock/><label>Planned Networks</label><button className="chain active" onClick={()=>setModal(true)}><span className="trx">◈</span><b>USDT (TRC20)</b><i>◉</i></button><button className="chain" onClick={()=>setModal(true)}><span className="bnb">◆</span><b>USDT (BEP20)</b><i>○</i></button><small className="scan">No payment address is shown until a real provider is connected.</small><button className="copy-address" onClick={()=>setModal(true)}>Join FlexSpot</button><small className="minimum">Minimum support: $1</small><div className="thank-box">Verified donations determine the ranking.<br/><b>No fake ranking. ♥</b></div></aside>
        </section>

        <section className="leaderboard-ref" id="leaderboard">
          <div className="leaderboard-title"><div><span className="cup">🏆</span><h2>{usingDemo?'Leaderboard Preview':'Live Leaderboard'}</h2><span className="live-ball">●</span><small>{leaderboardState.loading?'Loading live data…':leaderboardState.error?leaderboardState.error:usingDemo?'Waiting for first verified donation':'Verified database ranking'}</small></div><div className="filters"><button className="active">All Time</button></div></div>
          <div className="podium-grid-ref">{podium.map(item=><a key={item.id} href={item.url} target="_blank" rel="noreferrer" className={`winner-card rank${item.rank}`}><span className="rank-chip">#{item.rank}</span>{item.rank===1&&<span className="mini-crown">♛</span>}<div className="winner-main"><BrandLogo item={item}/><div><h3>{item.name}</h3><p>{item.tagline}</p></div></div><div className="winner-meta"><span>{usingDemo?'Preview brand':'Verified support'}</span></div><div className="winner-money">{usingDemo?'Preview':money(item.amount)}</div><div className="winner-status">{item.rank===1?'🏆 Current Leader':item.rank===2?'🔒 #2 Ranked':'🔒 #3 Ranked'}</div></a>)}</div>
          <div className="top10-line"><h3>Top Brands</h3><span>{usingDemo?'Preview data only':'Sorted by verified support'}</span></div>
          <div className="top10-ref">{topRows.map(item=><a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="mini-row"><span className="num">{item.rank}</span><BrandLogo item={item} small/><span className="mini-copy"><b>{item.name}</b><small>{item.tagline}</small></span><span className="mini-click">{item.destination_type||'Brand'}</span><strong>{usingDemo?'Preview':money(item.amount)}</strong><span className="up">#{item.rank}</span></a>)}</div>
          <div className="metrics"><span>✓ <b>{usingDemo?'—':money(verifiedTotal)}</b><small>Verified Support</small></span><span>▥ <b>{usingDemo?0:ranked.length}</b><small>Brands Featured</small></span><span>◎ <b>Global</b><small>Open to All Brands</small></span><blockquote>“A simple donation. A massive opportunity.”<small>— FlexSpot.lol</small></blockquote></div>
        </section>
      </main>
    </div>

    <div className="mobile-donate-strip" onClick={()=>setModal(true)}><span>₮</span><div><b>Join FlexSpot</b><small>From $1 · submit your brand</small></div><strong>▦ ›</strong></div>
    <button className="mobile-bottom" onClick={()=>setModal(true)}>⚡ Join the leaderboard</button>

    {modal&&<div className="modal-backdrop"><div className="modal-card"><button className="modal-x" onClick={()=>setModal(false)}>×</button><div className="modal-step">STEP 1 OF 2</div><h2>Claim your FlexSpot.</h2><p>Submit your public profile first. Verified payment will determine your rank.</p><form onSubmit={submit}><label>Company / profile name<input required minLength="2" maxLength="60" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your brand name"/></label><label>Short tagline<input maxLength="100" value={form.tagline} onChange={e=>set('tagline',e.target.value)} placeholder="One short line"/></label><label>Website or social profile<input required value={form.url} onChange={e=>set('url',e.target.value)} placeholder="https://yourwebsite.com"/></label><label>Logo (optional, max 2 MB)<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>handleLogo(e.target.files?.[0])}/></label><label>Donation amount<div className="amount-line"><span>$</span><input type="number" min="1" step="0.5" value={form.amount} onChange={e=>set('amount',e.target.value)}/></div></label>{state.msg&&<div className={`form-message ${state.ok?'success':''}`}>{state.msg}</div>}<button className="purple-btn submit-btn" disabled={state.loading}>{state.loading?'Saving…':'Save brand & continue →'}</button></form></div></div>}
  </div>
}
