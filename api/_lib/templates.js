// FlexSpot transactional + engagement email templates.
//
// ── Master layout ─────────────────────────────────────────────────────────
// One premium dark + gold layout shared by every email:
//  • Table-based, 100% inline styles — safe in Gmail, Outlook, Apple Mail.
//  • `color-scheme` meta tags + Outlook.com `[data-ogsc]` overrides so the
//    design stays readable in both light- and dark-mode inboxes.
//  • Mobile-first: 600px container, fluid tables, stat cards stack under
//    480px via a small media query.
//  • Every recipient-facing email greets the recipient by first name.
//  • Copy is professional, concise and honest — no hype, no invented stats,
//    no claims about followers, customers or performance.
//
// Data contract is UNCHANGED — api/email.js, src/lib/emailClient.js,
// api/cron/weekly-digest.js and src/pages/Admin.jsx call these with the
// same fields as before. Only layout + copy changed.
import { APP_URL } from './mail.js';

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

// Brand palette — dark navy + gold.
const C = {
  bg: '#0B0F19',
  card: '#131A30',
  cardAlt: '#0E1428',
  line: '#26304F',
  gold: '#F5C044',
  ink: '#FFFFFF',
  body: '#C9CDE6',
  muted: '#8A91B5',
};

const FONT = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;`;

function wrap({ preheader = '', title, body }) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(title)}</title>
<style>
@media only screen and (max-width:480px){
  .stat-cell{display:block !important;width:100% !important;box-sizing:border-box;margin-bottom:10px !important;}
  .pad{padding-left:20px !important;padding-right:20px !important;}
  .h1{font-size:22px !important;}
}
/* Outlook.com dark mode keeps our explicit colors readable */
[data-ogsc] .t1{color:#ffffff !important;}
[data-ogsc] .tp{color:#d3d8f0 !important;}
[data-ogsc] .tm{color:#a7aed6 !important;}
</style>
</head>
<body style="margin:0;padding:0;word-spacing:normal;background-color:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.bg};">
<tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${C.card};border:1px solid ${C.line};border-radius:20px;">
<tr><td class="pad" align="center" style="padding:30px 34px 24px;border-bottom:1px solid ${C.line};${FONT}">
<div class="t1" style="font-size:28px;font-weight:800;letter-spacing:-0.5px;color:${C.ink};">Flex<span style="color:${C.gold};">Spot</span></div>
<div style="margin-top:10px;font-size:10px;letter-spacing:4px;color:${C.gold};font-weight:700;">BID FOR ATTENTION</div>
</td></tr>
<tr><td class="pad" style="padding:30px 34px 6px;${FONT}">${body}</td></tr>
<tr><td class="pad" align="center" style="padding:22px 34px 30px;border-top:1px solid ${C.line};${FONT}">
<div class="tm" style="font-size:12px;color:${C.muted};line-height:1.8;">
You are receiving this email because of activity linked to your FlexSpot account.<br>
<a href="${APP_URL}" style="color:${C.gold};text-decoration:none;font-weight:700;">flexspot.lol</a><span style="color:${C.line};">&nbsp;&nbsp;·&nbsp;&nbsp;</span>Big brand visibility, from $1.<br>
<span style="font-size:11px;">Leaderboard rankings reflect verified payments only.</span>
</div>
</td></tr>
</table>
<div class="tm" style="font-size:11px;color:${C.muted};text-align:center;padding:16px 0 4px;${FONT}">© FlexSpot · flexspot.lol</div>
</td></tr>
</table>
</body></html>`;
}

const h1 = (t) => `<div class="h1 t1" style="font-size:24px;font-weight:800;color:${C.ink};letter-spacing:-0.3px;line-height:1.3;margin:0 0 12px;">${t}</div>`;
const greet = (name) => `<div class="tp" style="font-size:15px;color:${C.body};line-height:1.7;margin:0 0 14px;">Hi ${esc(name)},</div>`;
const p = (t) => `<div class="tp" style="font-size:15px;color:${C.body};line-height:1.75;margin:0 0 14px;">${t}</div>`;
const w = (t) => `<b style="color:${C.ink};">${t}</b>`;
const gold = (t) => `<b style="color:${C.gold};">${t}</b>`;

const cta = (href, label) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:24px auto 12px;"><tr>
<td align="center" bgcolor="${C.gold}" style="border-radius:14px;background-color:${C.gold};">
<a href="${href}" style="display:inline-block;padding:15px 38px;font-size:15px;font-weight:800;color:#1A1206;text-decoration:none;letter-spacing:0.2px;${FONT}">${label}</a>
</td></tr></table>`;

const statRow = (stats) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0;"><tr>${stats.map((s) => `
<td class="stat-cell" width="${Math.floor(100 / stats.length)}%" valign="top" style="background-color:${C.cardAlt};border:1px solid ${C.line};border-radius:14px;padding:14px 10px;text-align:center;">
<div class="tm" style="font-size:10px;color:${C.muted};font-weight:700;letter-spacing:1.5px;margin-bottom:6px;">${s.label}</div>
<div class="t1" style="font-size:20px;color:${C.gold};font-weight:800;word-break:break-word;">${s.value}</div></td>`).join('')}
</tr></table>`;

const credBox = (email, password, ib) => `
<div style="background-color:${C.cardAlt};border:1px dashed ${C.gold};border-radius:14px;padding:20px;margin:20px 0;">
<div class="tm" style="font-size:10px;color:${C.muted};font-weight:700;letter-spacing:2px;margin-bottom:12px;">YOUR LOGIN DETAILS</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td class="tm" style="font-size:12px;color:${C.muted};padding:6px 0;">Login email</td><td class="t1" style="font-size:14px;color:${C.ink};font-weight:700;text-align:right;word-break:break-all;">${esc(email)}</td></tr>
<tr><td class="tm" style="font-size:12px;color:${C.muted};padding:6px 0;">Password</td><td style="font-size:16px;color:${C.gold};font-weight:800;text-align:right;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:1px;">${esc(password)}</td></tr>
<tr><td class="tm" style="font-size:12px;color:${C.muted};padding:6px 0;">Member №</td><td class="t1" style="font-size:14px;color:${C.ink};font-weight:800;text-align:right;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;">${esc(ib)}</td></tr>
</table>
<div class="tm" style="font-size:12px;color:${C.muted};margin-top:12px;line-height:1.6;">Please keep this email somewhere safe — your password is shown here only once. You can change it at any time from your dashboard.</div>
</div>`;

const note = (t) => `<div class="tp" style="background-color:${C.cardAlt};border-left:3px solid ${C.gold};border-radius:0 12px 12px 0;padding:14px 16px;font-size:13.5px;color:${C.body};line-height:1.7;margin:16px 0;">${t}</div>`;

const steps = (items) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:16px 0;">${items.map(([t, x], i) => `
<tr><td valign="top" style="padding:10px 0;width:44px;">
<div style="width:30px;height:30px;border-radius:50%;background-color:${C.gold};color:#1A1206;font-weight:800;font-size:14px;text-align:center;line-height:30px;${FONT}">${i + 1}</div>
</td><td style="padding:10px 0 10px 4px;">
<div class="t1" style="font-size:15px;color:${C.ink};font-weight:700;margin-bottom:4px;">${t}</div>
<div class="tp" style="font-size:13.5px;color:${C.body};line-height:1.65;">${x}</div></td></tr>`).join('')}
</table>`;

const kv = (rows) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.cardAlt};border:1px solid ${C.line};border-radius:14px;margin:16px 0;">
<tr><td style="padding:14px 18px;font-size:13.5px;color:${C.body};line-height:2;${FONT}">
${rows.map(([k, v]) => `<span class="tm" style="color:${C.muted};font-weight:700;">${k}:</span> ${v}<br>`).join('')}
</td></tr></table>`;

export const TEMPLATES = {
  // ── 1. Buyer: payment received, pending team verification ──────────────
  'payment-received': (d) => ({
    subject: `Payment received — ${d.brandName} is under review`,
    html: wrap({
      title: 'Payment received', preheader: `We received your $${d.amount} payment for ${d.brandName}. Verification usually takes a few hours.`,
      body: `
        ${h1('Payment received')}
        ${greet(d.buyerName)}
        ${p(`Thank you — we have received your ${gold(`$${esc(d.amount)} USDT`)} payment for ${w(esc(d.brandName))}. Our team is now verifying the transaction, which usually takes a few hours.`)}
        ${statRow([
          { label: 'BRAND', value: esc(d.brandName) },
          { label: 'AMOUNT PAID', value: `$${esc(d.amount)}` },
          { label: 'REFERENCE', value: esc(d.claimRef) },
        ])}
        ${p(`Once verified, ${w(esc(d.brandName))} goes live on the leaderboard. We will then email your login details — your email address is your login ID — together with your IB member number.`)}
        ${note(`There is nothing you need to do right now. We will write to you the moment your brand is live.`)}
        ${cta(`${APP_URL}/leaderboard`, 'View the leaderboard')}`,
    }),
  }),

  // ── 2. Admin: new payment needs verification ───────────────────────────
  'admin-payment-alert': (d) => ({
    subject: `Action needed — verify $${d.amount} payment from ${d.brandName}`,
    html: wrap({
      title: 'New payment to verify', preheader: `${d.brandName} paid $${d.amount}. Review the proof and decide from /admin.`,
      body: `
        ${h1('New payment to verify')}
        ${p(`${w(esc(d.brandName))} has submitted a ${gold(`$${esc(d.amount)} USDT`)} payment (${esc(d.network)}). Please review the transaction proof, then approve or reject it from the admin dashboard.`)}
        ${statRow([
          { label: 'AMOUNT', value: `$${esc(d.amount)}` },
          { label: 'NETWORK', value: esc(d.network) },
          { label: 'REFERENCE', value: esc(d.claimRef) },
        ])}
        ${kv([
          ['Buyer', `${esc(d.buyerName)} &lt;${esc(d.buyerEmail)}&gt;`],
          ['TX ID', `<span style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;">${esc(d.txId || '—')}</span>`],
          ['Screenshot', d.hasScreenshot ? 'Received with submission' : 'Not provided'],
          ['Submitted', esc(d.submittedAt)],
        ])}
        ${note(`Approving publishes the brand and sends the buyer their live email — rank, spot page, login details and IB number. Rejecting sends a polite email including your note.`)}
        ${cta(`${APP_URL}/admin`, 'Open admin dashboard')}`,
    }),
  }),

  // ── 3. Buyer: approved — you're LIVE + credentials (flagship) ──────────
  'member-approved': (d) => ({
    subject: `${d.brandName} is live on FlexSpot — rank #${d.rank}`,
    html: wrap({
      title: 'You are live on FlexSpot', preheader: `${d.brandName} is live at rank #${d.rank}. Your login details and member number are inside.`,
      body: `
        ${h1('You are live on FlexSpot')}
        ${greet(d.buyerName)}
        ${p(`Good news — your payment has been verified, and ${w(esc(d.brandName))} is now on the FlexSpot leaderboard.`)}
        ${statRow([
          { label: 'YOUR RANK', value: `#${esc(d.rank)}` },
          { label: 'SPOT VALUE', value: `$${esc(d.amount)}` },
          { label: 'MEMBER №', value: esc(d.ib) },
        ])}
        ${p(`Your brand page:<br><a href="${d.spotUrl}" style="color:${C.gold};font-weight:700;word-break:break-all;">${esc(d.spotUrl)}</a>`)}
        ${credBox(d.email, d.password, d.ib)}
        ${note(`Two ways to move up from here: share your brand page to bring in more visitors — every verified boost moves you up the board — and refer other brands: you earn ${gold('20% commission')} on every verified payment they make.`)}
        ${cta(`${APP_URL}/dashboard`, 'Log in to your dashboard')}`,
    }),
  }),

  // ── 4. Buyer: rejected ─────────────────────────────────────────────────
  'member-rejected': (d) => ({
    subject: `Update on your FlexSpot submission for ${d.brandName}`,
    html: wrap({
      title: 'Submission update', preheader: `Your submission for ${d.brandName} needs attention — details inside.`,
      body: `
        ${h1('An update on your submission')}
        ${greet(d.buyerName)}
        ${p(`Thank you for submitting ${w(esc(d.brandName))} to FlexSpot. After review, we were not able to approve it this time.`)}
        ${d.reason ? note(`${w('Feedback from our team:')}<br>${esc(d.reason)}`) : ''}
        ${p(`This is usually straightforward to resolve — most often it is a missing or unclear payment screenshot. You are welcome to submit again and we will review it promptly.`)}
        ${cta(`${APP_URL}/claim`, 'Submit again')}`,
    }),
  }),

  // ── 5. Engagement: welcome (day 1) ─────────────────────────────────────
  'welcome': (d) => ({
    subject: `Welcome to FlexSpot, ${d.buyerName} — three ways to climb`,
    html: wrap({
      title: 'Welcome to FlexSpot', preheader: `${d.brandName} is live. Here is how to make the most of your spot.`,
      body: `
        ${h1('Welcome to FlexSpot')}
        ${greet(d.buyerName)}
        ${p(`${w(esc(d.brandName))} is live on the leaderboard. Here are three simple ways to get the most from your spot:`)}
        ${steps([
          ['Share your page', `Your brand page is your stage: <a href="${d.spotUrl}" style="color:${C.gold};font-weight:700;word-break:break-all;">${esc(d.spotUrl)}</a>. Every visitor sees your brand on the board.`],
          ['Get boosted', 'Anyone can boost your brand from $1 — each verified boost moves you up the leaderboard.'],
          ['Refer and earn 20%', `Invite other brands with your referral link and earn ${gold('20% commission')} on every verified payment they make.`],
        ])}
        ${p(`Your member number is ${gold(`<span style="font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;">${esc(d.ib)}</span>`)} — please quote it in any message to our team so we can help you faster.`)}
        ${cta(d.spotUrl, 'View my brand page')}`,
    }),
  }),

  // ── 6. Engagement: rank milestone ──────────────────────────────────────
  'rank-milestone': (d) => ({
    subject: `${d.brandName} climbed to rank #${d.rank} on FlexSpot`,
    html: wrap({
      title: 'Rank up', preheader: `${d.brandName} is now rank #${d.rank}. Keep the momentum going.`,
      body: `
        ${h1(`You climbed to #${esc(d.rank)}`)}
        ${greet(d.buyerName)}
        ${p(`${w(esc(d.brandName))} just moved up to ${gold(`rank #${esc(d.rank)}`)} on the FlexSpot leaderboard — congratulations.`)}
        ${statRow([
          { label: 'NEW RANK', value: `#${esc(d.rank)}` },
          { label: 'SPOT VALUE', value: `$${esc(d.amount)}` },
        ])}
        ${note(`Momentum matters: brands that keep sharing their page bring in more visitors, and every verified boost can take you higher.`)}
        ${cta(d.spotUrl, 'See it live')}`,
    }),
  }),

  // ── 7. Engagement: weekly digest ───────────────────────────────────────
  'weekly-digest': (d) => {
    const rankLabel = d.rank == null ? 'LIVE' : `#${d.rank}`;
    return {
    subject: d.rank == null ? `Your week on FlexSpot: ${d.brandName}` : `Your week on FlexSpot: ${d.brandName} at #${d.rank}`,
    html: wrap({
      title: 'Weekly digest', preheader: `How ${d.brandName} performed this week on FlexSpot.`,
      body: `
        ${h1('Your week on FlexSpot')}
        ${greet(d.buyerName)}
        ${p(`Here is how ${w(esc(d.brandName))} is doing:`)}
        ${statRow([
          { label: 'RANK', value: esc(rankLabel) },
          { label: 'SPOT VALUE', value: `$${esc(d.amount)}` },
          { label: 'PROFILE VIEWS', value: esc(d.views) },
        ])}
        ${p(d.rankUp ? `You are ${gold(`up ${esc(d.rankUp)} places`)} this week — strong momentum.` : `A simple tip: sharing your brand page regularly is the easiest way to bring in more visitors. Your page: <a href="${d.spotUrl}" style="color:${C.gold};font-weight:700;word-break:break-all;">${esc(d.spotUrl)}</a>`)}
        ${cta(d.spotUrl, 'Check my rank')}`,
    }),
  };},
};

export const TEMPLATE_IDS = Object.keys(TEMPLATES);
