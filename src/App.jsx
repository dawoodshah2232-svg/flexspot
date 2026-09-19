import React, { useEffect, useMemo, useState } from 'react';

const SUPABASE_URL = 'https://nffiijlpjbjljoidlfbv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mZmlpamxwamJqbGpvaWRsZmJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MzY1NjAsImV4cCI6MjEwNTQxMjU2MH0.Qaz_vApZ4QlAP1SFD8AgcX3ARYwTsJhjpY9DVFCEn_0';
const DOGE = 'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg';

const demos = [
  { id:'d1', name:'Pixel Potato', tagline:'Small tools. Serious usefulness.', amount:125, clicks:1200, logo:'PP', movement:28, demo:true, url:'#' },
  { id:'d2', name:'Cloud Burrito', tagline:'Wrap your workflow in the cloud.', amount:98, clicks:842, logo:'CB', movement:12, demo:true, url:'#' },
  { id:'d3', name:'Spreadsheet Goblin', tagline:'Making cells behave.', amount:76, clicks:620, logo:'SG', movement:9, demo:true, url:'#' },
  { id:'d4', name:'Monday Escape', tagline:'Tools for busy people.', amount:54, clicks:540, logo:'ME', movement:6, demo:true, url:'#' },
  { id:'d5', name:'Tiny Rocket', tagline:'Launch faster.', amount:43, clicks:430, logo:'TR', movement:8, demo:true, url:'#' },
  { id:'d6', name:'Inbox Ninja', tagline:'Less email. More work.', amount:42, clicks:420, logo:'IN', movement:5, demo:true, url:'#' },
  { id:'d7', name:'Pixel Taxi', tagline:'Design that arrives.', amount:38, clicks:380, logo:'PT', movement:3, demo:true, url:'#' },
];

function money(v){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:Number(v)%1?2:0}).format(v||0)}
function compact(v){return new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1}).format(v||0)}
function initials(name=''){return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'FS'}
function network(url=''){const u=url.toLowerCase();if(u.includes('instagram.com'))return['Instagram','◎'];if(u.includes('linkedin.com'))return['LinkedIn','in'];if(u.includes('x.com')||u.includes('twitter.com'))return['X','𝕏'];if(u.includes('tiktok.com'))return['TikTok','♪'];if(u.includes('youtube.com'))return['YouTube','▶'];return['Website','↗']}

function Logo({item,small=false}){
  return <div className={`brand-logo ${small?'brand-logo--small':''}`}>{item.logoImage?<img src={item.logoImage} alt=""/>:<span>{item.logo||initials(item.name)}</span>}</div>
}

export default function App(){
  const [modal,setModal]=useState(false);
  const [board,setBoard]=useState('all_time');
  const [rows,setRows]=useState([]);
  const [loading,setLoading]=useState(true);
  const [form,setForm]=useState({name:'',tagline:'',url:'',amount:'1',logoPreview:''});
  const [submit,setSubmit]=useState({loading:false,error:'',result:null});

  async function loadBoard(selected=board){
    setLoading(true);
    try{
      const r=await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_leaderboard`,{method:'POST',headers:{'Content-Type':'application/json',apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`},body:JSON.stringify({p_board:selected})});
      if(!r.ok) throw new Error('load failed');
      const data=await r.json();
      setRows(data.map(x=>({id:x.id,name:x.name,tagline:x.tagline,url:x.destination_url,logoImage:x.logo_url,logo:initials(x.name),amount:Number(x.total_cents||0)/100,clicks:0,movement:0,rank:x.rank})));
    }catch(e){setRows([])}finally{setLoading(false)}
  }

  useEffect(()=>{loadBoard(board);const t=setInterval(()=>loadBoard(board),15000);return()=>clearInterval(t)},[board]);

  const source=rows.length?rows:demos;
  const ranked=useMemo(()=>[...source].sort((a,b)=>b.amount-a.amount).map((x,i)=>({...x,rank:x.rank||i+1})),[source]);
  const champion=ranked[0];
  const podium=ranked.slice(0,3);
  const top10=ranked.slice(3,10);
  const total=rows.reduce((a,b)=>a+b.amount,0);
  const usingDemo=!rows.length;

  const update=(k,v)=>setForm(s=>({...s,[k]:v}));
  const onLogo=(e)=>{const f=e.target.files?.[0];if(!f)return;if(f.size>2*1024*1024){setSubmit({loading:false,error:'Logo must be 2 MB or smaller.',result:null});return}const reader=new FileReader();reader.onload=()=>update('logoPreview',reader.result);reader.readAsDataURL(f)};

  async function handleSubmit(e){
    e.preventDefault();setSubmit({loading:true,error:'',result:null});
    try{
      const r=await fetch(`${SUPABASE_URL}/functions/v1/create-submission`,{method:'POST',headers:{'Content-Type':'application/json',apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`},body:JSON.stringify({name:form.name.trim(),tagline:form.tagline.trim(),url:form.url.trim(),amount:Number(form.amount||1),logo_data_url:form.logoPreview||null})});
      const p=await r.json();if(!r.ok)throw new Error(p.error||'Submission failed');setSubmit({loading:false,error:'',result:p});
    }catch(err){setSubmit({loading:false,error:err.message||'Submission failed',result:null})}
  }

  function close(){setModal(false);setSubmit({loading:false,error:'',result:null});setForm({name:'',tagline:'',url:'',amount:'1',logoPreview:''})}

  return <div className="site-shell">
    <div className="page-frame">
      <header className="nav-row">
        <a className="site-brand" href="#top"><span className="crown-mark">♛</span><span><b>FlexSpot<span>.lol</span></b><small>REAL BRANDS. REAL SUPPORT. REAL EXPOSURE.</small></span></a>
        <nav><a href="#top">Home</a><a href="#leaderboard">Leaderboard</a><a href="#how">How It Works</a><a href="#rewards">Rewards</a><a href="#faq">FAQs</a></nav>
        <div className="nav-actions"><button className="search-btn">⌕</button><button className="primary compact" onClick={()=>setModal(true)}>Donate $1 to Join →</button><button className="avatar-btn">●</button></div>
      </header>

      <div className="stats-strip">
        <span><i></i>{rows.length?`${rows.length} verified brands`:'142 currently online'}</span><b>|</b><span>Total Volume: <strong>{rows.length?money(total):'$4,820'}</strong></span><b>|</b><span>All-time visitors: <strong>89K</strong></span><em>⚡ REAL BRANDS. REAL SUPPORT. REAL EXPOSURE.</em>
      </div>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">BRANDS COMPETE. THE INTERNET WINS.</div>
            <h1>BIG BRAND VISIBILITY.<span>START FROM JUST $1.</span></h1>
            <p>Donate to climb the ranks, get massive visibility, drive real traffic, and be part of a community that loves great brands.</p>
            <div className="hero-actions"><button className="primary hero-btn" onClick={()=>setModal(true)}>Start donating from $1 →</button><a className="secondary" href="#how">▶ <span>How It Works</span></a></div>
            <div className="mini-features"><span>⚡ Live Leaderboard</span><span>◉ Instant Exposure</span><span>▥ Real People. Real Brands.</span><span>◎ Open to Everyone</span></div>
          </div>

          <div className="hero-visual">
            <div className="doge-wrap">
              <img src={DOGE} alt="Crowned meme dog mascot"/>
              <div className="doge-crown">♛</div>
              <div className="doge-glasses">▰▰</div>
            </div>
            <div className="scribble one">SMALL<br/>DONATIONS<br/><b>BIG REACH</b> ↙</div>
            <div className="scribble two">BRANDS<br/><b>GO VIRAL</b> ↘</div>
            <div className="champion-float">
              <div><small>Current Leader Spotlight</small><b>#{champion?.rank||1}</b></div>
              <div className="champion-row"><Logo item={champion||demos[0]}/><span><strong>{champion?.name||'The crown is waiting'}</strong><small>{champion?.tagline||'Be the first real leader.'}</small></span></div>
              <p>The #1 brand gets premium visibility on our homepage.</p>
            </div>
          </div>
        </section>

        <section id="leaderboard" className="leaderboard-wrap">
          <div className="leaderboard-head"><div><span className="trophy">🏆</span><h2>Live Leaderboard</h2><small><i></i>{loading?'Updating…':'Updates every few seconds'}</small></div><div className="board-tabs"><button className={board==='all_time'?'active':''} onClick={()=>setBoard('all_time')}>All Brands</button><button className={board==='today'?'active':''} onClick={()=>setBoard('today')}>Top Gainers</button><button className={board==='week'?'active':''} onClick={()=>setBoard('week')}>Newest</button></div></div>

          {usingDemo&&<div className="demo-note">Demo arena — sample brands and amounts. Real payments will replace these automatically.</div>}

          <div className="podium-grid">
            {podium.map(item=>{const first=item.rank===1;const [label,icon]=network(item.url);return <a key={item.id} href={item.demo?'#':item.url} onClick={e=>item.demo&&e.preventDefault()} target={item.demo?undefined:'_blank'} rel="noreferrer" className={`podium-card rank-${item.rank}`}>
              <div className="rank-badge">#{item.rank}</div>{first&&<div className="card-crown">♛</div>}
              <div className="brand-main"><Logo item={item}/><div><h3>{item.name}</h3><p>{item.tagline}</p></div></div>
              <div className="card-stats"><span>◉ {compact(item.clicks)} clicks</span><span className="green">▲ +{item.movement||0}%</span></div>
              <div className="amount">{money(item.amount)}</div><small>Current Highest Donation</small>
              <div className={`rank-status ${first?'leader':''}`}>{first?'🏆 Current Leader':item.rank===2?'🔒 Locked In':'🔒 Top Sponsored'}</div>
              <span className="destination">{icon} {label}</span>
            </a>})}
          </div>

          <div className="top10-block">
            <div className="top10-head"><h3>Top 10 Brands</h3><a href="#all">View Full Leaderboard →</a></div>
            <div className="top10-grid">
              {top10.map(item=><a key={item.id} href={item.demo?'#':item.url} onClick={e=>item.demo&&e.preventDefault()} className="top-row"><span className="small-rank">{item.rank}</span><Logo item={item} small/><span className="brand-text"><b>{item.name}</b><small>{item.tagline}</small></span><span className="clicks">◉ {compact(item.clicks)} clicks</span><strong>{money(item.amount)}</strong><span className="rise">▲ +{item.movement||0}%</span></a>)}
            </div>
          </div>

          <div className="metric-row"><span>♙ <b>89K</b><small>All-time Visitors</small></span><span>◉ <b>4.2M</b><small>Total Page Views</small></span><span>▥ <b>100</b><small>Brands Featured</small></span><span>◎ <b>Global</b><small>Open to All Brands</small></span><blockquote>“A simple donation. A massive opportunity.”<small>— FlexSpot.lol</small></blockquote></div>
        </section>

        <section id="how" className="info-section"><h2>How it works</h2><div className="steps"><div><b>01</b><h3>Submit your brand</h3><p>Add your logo, company name and website or social link.</p></div><div><b>02</b><h3>Donate from $1</h3><p>After the form, choose the supported crypto network and complete payment.</p></div><div><b>03</b><h3>Climb automatically</h3><p>Verified donations increase your total and update your live rank.</p></div></div></section>

        <section id="rewards" className="info-section split"><div><span className="eyebrow">#1 GETS MORE</span><h2>Win the homepage.</h2><p>The current all-time leader appears beside the FlexSpot logo, in the champion spotlight and at the top of the leaderboard until somebody passes them.</p></div><div className="reward-card"><span>♛</span><b>Current #1 perks</b><small>Header placement · champion spotlight · first card · direct outbound link · share-worthy bragging rights</small></div></section>

        <section id="faq" className="info-section"><h2>FAQ</h2><div className="faq-grid"><div><b>Do I need an account?</b><p>No. Submit directly and keep your private management link.</p></div><div><b>Can I use Instagram or another social profile?</b><p>Yes. Website and supported social destinations are allowed.</p></div><div><b>How is rank calculated?</b><p>By total verified eligible donations. Higher total ranks higher.</p></div><div><b>Is $1 enough to join?</b><p>$1 is the product target. Real payment availability depends on the configured crypto rail and its minimums.</p></div></div></section>
      </main>
    </div>

    <button className="mobile-sticky" onClick={()=>setModal(true)}>⚡ Dethrone #1</button>

    {modal&&<div className="modal-backdrop"><div className="donation-modal"><button className="close" onClick={close}>×</button>{!submit.result?<><small className="step-label">STEP 1 OF 2</small><h2>Donate from $1</h2><p>List your brand or profile first. Payment comes on the next step.</p><form onSubmit={handleSubmit}>
      <div className="form-grid"><label className="logo-upload">{form.logoPreview?<img src={form.logoPreview} alt=""/>:<span>Upload<br/>logo</span>}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={onLogo}/></label><div><label>Company / profile name<input required value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Your brand name"/></label><label>Tagline<input value={form.tagline} onChange={e=>update('tagline',e.target.value)} placeholder="Short tagline"/></label></div></div>
      <label>Website or social profile<input required value={form.url} onChange={e=>update('url',e.target.value)} placeholder="https://yourwebsite.com or social profile"/></label>
      <label>Donation amount<div className="amount-pills">{['1','5','10','25'].map(v=><button type="button" className={form.amount===v?'active':''} onClick={()=>update('amount',v)} key={v}>${v}</button>)}</div><input type="number" min="1" step="0.5" value={form.amount} onChange={e=>update('amount',e.target.value)}/></label>
      {submit.error&&<div className="error-box">{submit.error}</div>}<button className="primary full" disabled={submit.loading}>{submit.loading?'Saving…':'Continue to payment →'}</button>
    </form></>:<div className="payment-stage"><small className="step-label">STEP 2 OF 2</small><h2>Submission saved</h2><div className="payment-icon">₮</div><p>Your brand profile and order are stored. Real crypto checkout will activate when the approved wallet/provider details are connected.</p><div className="order-box"><span>Order</span><b>{submit.result.order_id||submit.result.orderId||'Created'}</b><span>Amount</span><b>{money(Number(form.amount||1))}</b></div><button className="primary full" onClick={close}>Done</button></div>}</div></div>}
  </div>
}
