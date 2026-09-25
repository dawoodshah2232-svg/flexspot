// Per-page Q&A sets for GEO (Generative Engine Optimization).
// Same data powers the visible <FaqSection/> on each page AND the
// per-route FAQPage JSON-LD emitted by PageHead. Keep answers short,
// plain-spoken, and strictly factual — no invented numbers or claims.
export const GEO_FAQS = {
  '/': [
    { q: 'What is FlexSpot?', a: 'FlexSpot is the internet\u2019s live spotlight competition: a public leaderboard where brands, startups, creators, and meme pages claim a spot from just $1 and outbid each other for attention. Spots are ranked by total boosts and the board updates live.' },
    { q: 'How much does it cost to get on the leaderboard?', a: 'Claiming starts at $1. Every extra dollar of boost moves you up, and 100% of your boost counts toward your rank. There are no hidden fees to join or appear on the leaderboard.' },
    { q: 'How does the ranking work?', a: 'Spots are ordered by total verified boosts. When your total passes another spot, you take its rank \u2014 live, in front of everyone.' },
    { q: 'What can I promote with a spot?', a: 'Almost anything with a link: your personal brand, company, website, social profile, startup, creator page, product, event, or community.' },
    { q: 'Do I need an account to claim a spot?', a: 'No. Claiming takes under a minute: enter your details, choose your boost starting at $1, and complete payment. You also get a member account (email login and an IB number like FS-XXXXXX) to manage your spot and referrals.' },
    { q: 'How do I get more people to see my spot?', a: 'Boost it, share your public profile link anywhere, and use your referral link \u2014 you earn 20% instant commission on every payment made by someone who joins through it.' },
    { q: 'Can I reserve my brand name before paying?', a: 'Yes \u2014 enter your brand name and email on the homepage and FlexSpot holds it free for 24 hours. Nobody else can take it while you decide. Complete your claim before the hold expires to lock it in.' },
    { q: 'How does the rank predictor work?', a: 'Type your brand name and pick a boost amount on the homepage, and FlexSpot shows the exact rank your spot would debut at \u2014 using the same live ranking rule as the real leaderboard.' },
  ],
  '/how-it-works': [
    { q: 'How do I claim a spot?', a: 'Enter your brand details, choose your starting boost from $1, and complete payment. Your public profile goes live and you appear on the leaderboard.' },
    { q: 'How do boosts work?', a: 'Anyone can add money to any spot. Every dollar raises its total and its rank \u2014 boost your own spot or back a brand you love.' },
    { q: 'What happens when I pass another spot?', a: 'You take its rank instantly. The leaderboard updates live, so rivalries and comebacks play out in public.' },
    { q: 'How do payments work right now?', a: 'We\u2019re in Phase 1: after claiming, you complete payment manually (USDT on TRC-20, BEP-20, or Solana) and our team verifies it, usually within a few hours. Automatic payment processing is coming soon.' },
    { q: 'What does the winner get?', a: 'The #1 spot holds the champion crown and the homepage spotlight \u2014 the most-viewed placement on the site. Bragging rights included.' },
  ],
  '/claim': [
    { q: 'What do I need to claim a spot?', a: 'A name, a link, and a starting boost from $1. No account needed \u2014 it takes under a minute.' },
    { q: 'How long until my spot is live?', a: 'You submit in under a minute; your spot goes live after payment verification, usually within a few hours.' },
    { q: 'Can I change my spot details later?', a: 'Yes \u2014 contact our team at support@flexspot.lol and we\u2019ll update it for you.' },
    { q: 'Are payments refundable?', a: 'Crypto payments are final once sent, so double-check the network and address before transferring.' },
  ],
  '/rewards': [
    { q: 'How do FlexSpot referrals work?', a: 'Every member gets a personal referral link (flexspot.lol/s/your-brand?ref=YOUR-CODE). You earn 20% instant commission on every payment made by someone who joins through your link, and your name climbs the public Top Referrers board.' },
    { q: 'How do I get my referral link?', a: 'Claim a spot and your link is created automatically \u2014 just your name, no extra signup.' },
    { q: 'How and when do I get paid?', a: 'Commissions land in your member wallet as they happen, and you withdraw to USDT from your dashboard.' },
    { q: 'Who are the top referrers?', a: 'The Top Referrers board ranks members by referred members and commission earned \u2014 real referral performance, updated live.' },
  ],
  '/auction': [
    { q: 'What is the FlexSpot Spotlight Auction?', a: 'A weekly auction for three homepage spotlight placements. The highest bidder on each slot owns that spotlight for 7 days. New rounds start every Monday 00:00 UTC.' },
    { q: 'How much does it cost to bid?', a: 'Each slot opens at a $25 reserve. Every new bid must beat the current top bid by at least $5.' },
    { q: 'How do I place a bid?', a: 'Enter your brand name, email, and bid amount on the auction page, then send the amount in USDT and upload a screenshot of the payment \u2014 exactly like claiming a spot.' },
    { q: 'Are bids verified?', a: 'Yes. A real person checks every bid\u2019s payment proof before it counts \u2014 no bots, no auto-approvals. You\u2019ll be emailed if someone outbids you.' },
    { q: 'What does the winner get?', a: 'The top bidder when the round ends holds the homepage spotlight for a full 7 days \u2014 the most-viewed placement on FlexSpot.' },
    { q: 'Are auction payments refundable?', a: 'Crypto payments are final once sent, so double-check the network and address before transferring.' },
  ],
  '/leaderboard': [
    { q: 'How is the FlexSpot leaderboard ranked?', a: 'By total verified boosts, highest first \u2014 updated live as money moves.' },
    { q: 'Can the rankings change?', a: 'Constantly. Every new boost can reshuffle the board. That\u2019s the whole game.' },
    { q: 'What does the crown mean?', a: 'The #1 spot holds the champion crown and the homepage spotlight \u2014 the most-viewed placement on FlexSpot.' },
  ],
  '/explore': [
    { q: 'What are FlexSpot categories?', a: 'Spots grouped by niche \u2014 startups, creators, gaming, food & drink, fintech, memes, and more.' },
    { q: 'How do I find a niche to conquer?', a: 'Browse the categories, see who leads each one, and claim a spot where your audience already hangs out.' },
    { q: 'Can I boost a spot in any category?', a: 'Yes \u2014 anyone can boost any public spot, in any category, to push it higher.' },
  ],
  '/compare': [
    { q: 'What does the Compare tool do?', a: 'Pick up to 3 spots and see rank, total boosts, views, clicks, click-through rate, and 7-day momentum side by side \u2014 with a live verdict on who leads.' },
    { q: 'Is the comparison data live?', a: 'Yes \u2014 Compare uses current board numbers, so the verdict changes as the battle moves.' },
  ],
  '/calculator': [
    { q: 'What does the visibility calculator estimate?', a: 'Slide your budget and campaign length to project your rank, profile views, clicks, and cost per 1,000 views \u2014 estimated from today\u2019s live board medians.' },
    { q: 'Are the calculator numbers guaranteed?', a: 'No \u2014 they\u2019re estimates only. Real results vary with competition on the board.' },
  ],
  '/top-referrers': [
    { q: 'How is the Top Referrers board ranked?', a: 'By referred members and commission earned \u2014 real referral performance, not vanity metrics.' },
    { q: 'How do I get on the Top Referrers board?', a: 'Share your personal referral link. Every payment from someone who joins through it earns you 20% instant commission and moves you up the board.' },
  ],
  '/spot': [
    { q: 'What is this page?', a: 'A public FlexSpot profile \u2014 one brand\u2019s claimed spotlight, showing its rank, total boosts, views, and momentum on the live leaderboard.' },
    { q: 'Can I boost this spot?', a: 'Yes \u2014 anyone can contribute to any public spot to push it higher on the leaderboard.' },
    { q: 'Does a high rank mean FlexSpot endorses this brand?', a: 'No. Spots are paid placements, not editorial endorsements. Rankings reflect bid amounts, not quality judgments.' },
  ],
};
