// FlexSpot transactional + engagement email templates.
// Table-based, inline styles, dark premium theme with gold accents.
// Every template is a pure function of its data — no hardcoded names.
import { APP_URL } from './mail.js';

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

function wrap({ preheader = '', title, body }) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#0B0F19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E8EAF2;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F19;padding:28px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141A2E;border:1px solid #2A3350;border-radius:20px;overflow:hidden;">
<tr><td style="background:linear-gradient(135deg,#7C3AED 0%,#4F46E5 60%,#312E81 100%);padding:26px 30px;text-align:center;">
<div style="font-size:26px;font-weight:800;letter-spacing:-0.5px;color:#fff;">👑 Flex<span style="color:#F5C044;">Spot</span></div>
<div style="font-size:11px;letter-spacing:3px;color:#C9CDF2;margin-top:6px;font-weight:700;">BID FOR ATTENTION</div>
</td></tr>
<tr><td style="padding:32px 30px;">${body}</td></tr>
<tr><td style="padding:20px 30px;border-top:1px solid #232B45;text-align:center;">
<div style="font-size:12px;color:#8A91B5;line-height:1.7;">You're receiving this because of activity on your FlexSpot account.<br>
<a href="${APP_URL}" style="color:#F5C044;text-decoration:none;font-weight:700;">flexspot.lol</a> · Big brand visibility, start from $1.</div>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

const h1 = (t) => `<div style="font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.5px;margin:0 0 14px;">${t}</div>`;
const p = (t) => `<div style="font-size:15px;color:#C6CBE4;line-height:1.75;margin:0 0 14px;">${t}</div>`;
const cta = (href, label) => `<div style="text-align:center;margin:24px 0 8px;"><a href="${href}" style="display:inline-block;background:linear-gradient(135deg,#F5C044,#E8960C);color:#1A1206;font-weight:800;font-size:15px;text-decoration:none;padding:14px 34px;border-radius:14px;letter-spacing:0.2px;">${label}</a></div>`;
const statRow = (stats) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0;"><tr>${stats.map((s) => `
<td style="background:#1C2340;border:1px solid #2A3350;border-radius:14px;padding:14px 10px;text-align:center;width:${Math.floor(100 / stats.length)}%;">
<div style="font-size:11px;color:#8A91B5;font-weight:700;letter-spacing:1px;margin-bottom:6px;">${s.label}</div>
<div style="font-size:20px;color:#F5C044;font-weight:800;">${s.value}</div></td>`).join('')}
</tr></table>`;
const credBox = (email, password, ib) => `
<div style="background:#0E1428;border:1px dashed #F5C044;border-radius:14px;padding:18px;margin:18px 0;">
<div style="font-size:11px;color:#8A91B5;font-weight:700;letter-spacing:1.5px;margin-bottom:12px;">🔑 YOUR LOGIN CREDENTIALS</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="font-size:12px;color:#8A91B5;padding:5px 0;">Login ID (your email)</td><td style="font-size:14px;color:#fff;font-weight:700;text-align:right;word-break:break-all;">${esc(email)}</td></tr>
<tr><td style="font-size:12px;color:#8A91B5;padding:5px 0;">Password</td><td style="font-size:16px;color:#F5C044;font-weight:800;text-align:right;font-family:ui-monospace,Menlo,monospace;letter-spacing:1px;">${esc(password)}</td></tr>
<tr><td style="font-size:12px;color:#8A91B5;padding:5px 0;">IB / Member №</td><td style="font-size:14px;color:#fff;font-weight:800;text-align:right;font-family:ui-monospace,Menlo,monospace;">${esc(ib)}</td></tr>
</table>
<div style="font-size:12px;color:#8A91B5;margin-top:10px;line-height:1.6;">Keep this email safe — your password is only shown here once. You can change it anytime in your dashboard settings.</div>
</div>`;
const note = (t) => `<div style="background:#1C2340;border-left:3px solid #F5C044;border-radius:0 12px 12px 0;padding:14px 16px;font-size:13.5px;color:#C6CBE4;line-height:1.7;margin:16px 0;">${t}</div>`;

export const TEMPLATES = {
  // ── 1. Buyer: payment received, pending team verification ──────────────
  'payment-received': (d) => ({
    subject: `Payment received — ${d.brandName} is under review 👑`,
    html: wrap({
      title: 'Payment received', preheader: `We got your $${d.amount} payment for ${d.brandName}. Verification usually takes a few hours.`,
      body: `
        ${h1(`Thanks, ${esc(d.buyerName)}! 🙏`)}
        ${p(`We've received your <b style="color:#fff;">$${esc(d.amount)} USDT</b> payment for <b style="color:#fff;">${esc(d.brandName)}</b>. Our team is now verifying your transaction on-chain.`)}
        ${statRow([
          { label: 'BRAND', value: esc(d.brandName) },
          { label: 'AMOUNT', value: `$${esc(d.amount)}` },
          { label: 'REFERENCE', value: esc(d.claimRef) },
        ])}
        ${p(`Once verified, your brand goes <b style="color:#fff;">live on the leaderboard</b> — and we'll email your <b style="color:#F5C044;">login credentials</b> (your email is your login ID) plus your <b style="color:#F5C044;">IB / member number</b> right away.`)}
        ${note(`⏱️ Verification usually takes a few hours. You'll hear from us the moment your brand is live — no need to do anything else right now.`)}
        ${cta(`${APP_URL}/leaderboard`, 'Watch the live board 👀')}`,
    }),
  }),

  // ── 2. Admin: new payment needs verification ───────────────────────────
  'admin-payment-alert': (d) => ({
    subject: `💰 New payment: $${d.amount} — ${d.brandName} needs verification`,
    html: wrap({
      title: 'New payment', preheader: `${d.brandName} paid $${d.amount}. Review the proof and approve from /admin.`,
      body: `
        ${h1(`💰 New payment received`)}
        ${p(`<b style="color:#fff;">${esc(d.brandName)}</b> just paid <b style="color:#F5C044;">$${esc(d.amount)} USDT</b> (${esc(d.network)}). Verify the transaction, then approve it from the admin dashboard.`)}
        ${statRow([
          { label: 'AMOUNT', value: `$${esc(d.amount)}` },
          { label: 'NETWORK', value: esc(d.network) },
          { label: 'REF', value: esc(d.claimRef) },
        ])}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0E1428;border:1px solid #2A3350;border-radius:14px;margin:16px 0;">
        <tr><td style="padding:14px 18px;font-size:13.5px;color:#C6CBE4;line-height:2;">
        <b style="color:#8A91B5;">Buyer:</b> ${esc(d.buyerName)} &lt;${esc(d.buyerEmail)}&gt;<br>
        <b style="color:#8A91B5;">TX ID:</b> <span style="font-family:ui-monospace,Menlo,monospace;">${esc(d.txId || '—')}</span><br>
        <b style="color:#8A91B5;">Screenshot:</b> ${d.hasScreenshot ? '✅ attached in submission' : '—'}<br>
        <b style="color:#8A91B5;">Submitted:</b> ${esc(d.submittedAt)}
        </td></tr></table>
        ${note(`Approving auto-sends the buyer their live email with <b>rank, spot URL, login credentials and IB number</b>. Rejecting sends a polite rejection email with your note.`)}
        ${cta(`${APP_URL}/admin`, 'Open admin dashboard →')}`,
    }),
  }),

  // ── 3. Buyer: approved — you're LIVE + credentials ─────────────────────
  'member-approved': (d) => ({
    subject: `🎉 ${d.brandName} is LIVE at #${d.rank} — your login details inside`,
    html: wrap({
      title: 'You are live!', preheader: `${d.brandName} is live on FlexSpot at rank #${d.rank}. Your login credentials and IB number are inside.`,
      body: `
        ${h1(`🎉 You're live, ${esc(d.buyerName)}!`)}
        ${p(`Our team verified your payment — <b style="color:#fff;">${esc(d.brandName)}</b> is now on the FlexSpot leaderboard.`)}
        ${statRow([
          { label: 'YOUR RANK', value: `#${esc(d.rank)}` },
          { label: 'SPOT VALUE', value: `$${esc(d.amount)}` },
          { label: 'IB / MEMBER №', value: esc(d.ib) },
        ])}
        ${p(`👀 <b style="color:#fff;">Check your brand live here:</b><br><a href="${d.spotUrl}" style="color:#F5C044;font-weight:700;word-break:break-all;">${esc(d.spotUrl)}</a>`)}
        ${credBox(d.email, d.password, d.ib)}
        ${note(`🚀 <b style="color:#fff;">Want to climb higher?</b> Anyone can boost your brand from $1 — share your spot URL and every boost pushes you up the board. Plus you earn <b style="color:#F5C044;">20% instant commission</b> on every payment from people you refer.`)}
        ${cta(`${APP_URL}/dashboard`, 'Log in to your dashboard →')}`,
    }),
  }),

  // ── 4. Buyer: rejected ─────────────────────────────────────────────────
  'member-rejected': (d) => ({
    subject: `About your FlexSpot submission for ${d.brandName}`,
    html: wrap({
      title: 'Submission update', preheader: `Your submission for ${d.brandName} needs attention.`,
      body: `
        ${h1(`Quick update on ${esc(d.brandName)}`)}
        ${p(`Hi ${esc(d.buyerName)} — our team reviewed your submission, but we couldn't approve it this time.`)}
        ${d.reason ? note(`<b style="color:#fff;">Reason from our team:</b><br>${esc(d.reason)}`) : ''}
        ${p(`This is usually fixable — most often it's a missing or unclear payment screenshot. Reply to this email or submit again at <a href="${APP_URL}/claim" style="color:#F5C044;font-weight:700;">flexspot.lol/claim</a> and we'll get you live.`)}
        ${cta(`${APP_URL}/claim`, 'Try again →')}`,
    }),
  }),

  // ── 5. Engagement: welcome drip (day 1) ────────────────────────────────
  'welcome': (d) => ({
    subject: `Welcome to the spotlight, ${d.buyerName} 👑`,
    html: wrap({
      title: 'Welcome!', preheader: `3 moves to climb the FlexSpot board with ${d.brandName}.`,
      body: `
        ${h1(`Welcome to the spotlight 👑`)}
        ${p(`${esc(d.brandName)} is live — now let's make the internet look. Here are the 3 moves every climber makes:`)}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
        ${[
          ['📣', 'Share your spot URL', `Post <a href="${d.spotUrl}" style="color:#F5C044;font-weight:700;">your brand page</a> everywhere — every visitor counts.`],
          ['⚡', 'Get boosted', 'Fans can boost you from $1. One dollar more than the brand above you steals their rank.'],
          ['💰', 'Refer & earn 20%', 'Your referral link pays <b style="color:#F5C044;">20% instant commission</b> on every payment from people you bring.'],
        ].map(([e, t, x]) => `<tr><td style="padding:10px 0;vertical-align:top;font-size:22px;width:40px;">${e}</td><td style="padding:10px 0;"><div style="font-size:15px;color:#fff;font-weight:700;">${t}</div><div style="font-size:13.5px;color:#C6CBE4;line-height:1.6;">${x}</div></td></tr>`).join('')}
        </table>
        ${p(`Your IB / member number is <b style="color:#F5C044;font-family:ui-monospace,Menlo,monospace;">${esc(d.ib)}</b> — quote it anytime you talk to our team.`)}
        ${cta(d.spotUrl, 'View my brand page →')}`,
    }),
  }),

  // ── 6. Engagement: rank milestone ──────────────────────────────────────
  'rank-milestone': (d) => ({
    subject: `🏆 ${d.brandName} just hit #${d.rank} on FlexSpot!`,
    html: wrap({
      title: 'Rank up!', preheader: `${d.brandName} climbed to #${d.rank}. Keep the momentum going.`,
      body: `
        ${h1(`🏆 You climbed to #${esc(d.rank)}!`)}
        ${p(`Big news, ${esc(d.buyerName)} — <b style="color:#fff;">${esc(d.brandName)}</b> just moved up to <b style="color:#F5C044;">rank #${esc(d.rank)}</b> on the FlexSpot leaderboard.`)}
        ${statRow([
          { label: 'NEW RANK', value: `#${esc(d.rank)}` },
          { label: 'SPOT VALUE', value: `$${esc(d.amount)}` },
        ])}
        ${note(`The top 10 gets 80% of all clicks. One boost from a fan could take you even higher — share your page while you're hot 🔥`)}
        ${cta(d.spotUrl, 'See it live →')}`,
    }),
  }),

  // ── 7. Engagement: weekly digest ───────────────────────────────────────
  'weekly-digest': (d) => {
    const rankLabel = d.rank == null ? 'LIVE' : `#${d.rank}`;
    return {
    subject: d.rank == null ? `Your FlexSpot week: ${d.brandName} 📊` : `Your FlexSpot week: ${d.brandName} at #${d.rank} 📊`,
    html: wrap({
      title: 'Weekly digest', preheader: `How ${d.brandName} did this week on FlexSpot.`,
      body: `
        ${h1(`Your week on FlexSpot 📊`)}
        ${p(`Hi ${esc(d.buyerName)} — here's how <b style="color:#fff;">${esc(d.brandName)}</b> is doing:`)}
        ${statRow([
          { label: 'RANK', value: esc(rankLabel) },
          { label: 'SPOT VALUE', value: `$${esc(d.amount)}` },
          { label: 'PROFILE VIEWS', value: esc(d.views) },
        ])}
        ${p(d.rankUp ? `📈 You're <b style="color:#F5C044;">up ${esc(d.rankUp)} places</b> this week — the momentum is real.` : `💡 Tip: brands that share their spot URL weekly climb 3× faster. Your page: <a href="${d.spotUrl}" style="color:#F5C044;font-weight:700;word-break:break-all;">${esc(d.spotUrl)}</a>`)}
        ${cta(d.spotUrl, 'Check my rank →')}`,
    }),
  };},
};

export const TEMPLATE_IDS = Object.keys(TEMPLATES);
