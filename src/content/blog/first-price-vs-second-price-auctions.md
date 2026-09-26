---
title: "Who Sets the Price of an Ad? First-Price vs Second-Price Auctions Explained"
description: "In 2019, Google flipped online ad auctions from second-price to first-price — and the price of digital attention changed overnight. What the switch means for advertisers, and why bid shading exists."
date: 2026-09-26
author: "FlexSpot Editorial"
category: "Bidding Strategy"
keywords:
  - first-price auction
  - second-price auction
  - how ad auctions work
  - bid shading
  - programmatic advertising
  - google ad manager auction
  - bidding strategy small business
pillar: false
related:
  - auctions-fairest-way-to-buy-attention
  - what-is-bid-for-attention-marketing
  - cheapest-way-to-advertise-online-ranked
  - google-ads-vs-dollar-a-day-experiments
sample: false
image: "/blog/discover-first-second-price.jpg"
---

> **Key takeaways:**
> - Every online ad you see was sold in an auction that ran in under a tenth of a second. The rules of that auction decide what advertisers actually pay.
> - Second-price auctions (winner pays just above the runner-up's bid) made honest bidding the smart play — until hidden floor games and layered auctions broke the trust.
> - In 2019, Google moved its display and video auctions to first-price, where the winner pays their full bid. Advertisers saw CPMs jump 59% in early tests.
> - The industry's answer was "bid shading": algorithms that guess the lowest price likely to win. The result is a guessing game about everyone else's guesses.
> - Small advertisers lose most in opaque auctions. Visible auctions with fixed, known rules are where small budgets can actually learn and improve.

## The auction you never see

Before an ad appears on a page, an auction runs in the split second it takes the page to load. Billions of these auctions happen every day, and most advertisers will never look at one. But the rulebook those auctions run on quietly decides what every ad costs — and in 2019, the rulebook changed.

There are two rulebooks, and understanding both explains why your ad budget behaves the way it does.

## Second-price: the polite era

For years, the dominant rulebook was the second-price auction. Everyone submits a bid blind. The highest bidder wins — but pays only a little more than the second-highest bid.

Say three advertisers want the same impression and value it at $5, $3, and $1. The $5 bidder wins but pays about $3.01. The elegance of this design is what made it the industry standard: the smart move is to bid exactly what the impression is honestly worth to you. Bid more than your true value and you risk overpaying; bid less and you risk losing something you'd have happily bought. Honesty is the optimal strategy.

It also protected buyers from the "winner's curse" — that queasy feeling of winning an auction only to realize you overestimated what you were bidding on. Google's search ad auction still works on this logic today: the winner pays the minimum needed to beat the next competitor, weighted by ad quality.

So why would anyone change a system that made honesty the winning move?

## Why the industry walked away

The second-price system worked in theory. In practice, it got layered and gamed.

First, some exchanges started quietly raising their price floors *after* seeing the bids come in — capturing the gap between the top bid and the second-price clearing price for themselves. Second, a single bid could pass through a chain of ten or more auctions, each with different rules, before an ad was served. Google's own product manager admitted as much at the time. Buyers could end up paying far less than they bid — say, a $5 CPM bid clearing at $5 — but never knew why, or how much of the difference went to the publisher versus hidden fees.

Independent ad exchanges started abandoning second-price in 2017. Between December 2017 and March 2018, the share of impressions sold first-price jumped from 5.8% to 43.3%. But as one industry writer put it, it wasn't real until Google did it.

## The 2019 flip

On March 6, 2019, Google announced it would move Google Ad Manager — its publisher exchange and ad server — to a unified first-price auction. The winner of an auction would pay exactly what they bid. No hidden discounts, no last-look advantage where Google could peek at other bids before deciding. Search, YouTube, and AdSense for Search were explicitly left untouched; this was about display and video inventory.

The full rollout landed that September. Google reported the change had a neutral-to-positive effect on publisher revenue, and a bigger share of impressions started being won by third-party demand sources instead of Google's own.

The change made the math honest. It also made it brutal. An agency test cited by eMarketer found CPMs running 59% higher in first-price auctions than in second-price ones. The $5 bidder from our example now pays $5. And the old honest-bid playbook broke: if $3.10 would have won, bidding your true $5 value just handed the seller an extra $1.90.

## Bid shading: the market's answer

The buy side didn't sit still. Demand-side platforms built "bid shading" — algorithms that study historical auction data (clearing prices, floors, win rates, time of day, device) and estimate the minimum price likely to win, then submit that instead of your maximum bid. Instead of bidding your true $5, the algorithm bids $3.20. You still win. You keep the difference.

Nearly every major buying platform now includes bid shading: Google's own DV360 and The Trade Desk run equivalents, and some exchanges like PubMatic offer free shading tools. In that early agency test, shaded buying landed slightly below the unshaded first-price level — the discount is real, but so are the limits.

Critics argue shading is a band-aid: it papers over poorly designed buying algorithms by guessing at everyone else's guesses. Publishers, for their part, respond by raising their price floors — if buyers keep bidding just above the floor, the floor becomes the price anchor. The ecosystem settles into a new equilibrium, and the guessing game continues.

## What this means for a small advertiser

Step back from the machinery and the lesson for a small business is simple:

- **You're not just bidding against other small businesses.** You're bidding against real-time algorithms that adjust every bid in milliseconds. A flat bid in that environment leaks money.
- **Opacity is a tax.** When you can't see clearing prices, you can't learn what anything is worth. Every dollar teaches you nothing.
- **Simpler is cheaper.** Auctions with visible bids and fixed rules let a small budget actually improve over time — you see the price, you understand the game, you bid smarter next round.

That last point is the whole reason [FlexSpot's Spotlight Auction](/auction) exists. It's deliberately the opposite of programmatic opacity: every bid is on the page, the reserve is $25, every new bid must beat the current top by at least $5, and a real person verifies every bid. The winner pays their top bid — first-price logic, minus the black box. No floors get quietly raised after the fact, no bots goose the action. If the page shows a top bid, someone made it.

Yesterday we argued [auctions are the fairest way to buy attention](/blog/auctions-fairest-way-to-buy-attention). The auction-format wars are the proof of that argument: the industry spent years arguing over which auction rules are honest, and the fight never stopped mattering. The fairest auction isn't first-price or second-price. It's the one where you can see the bids.

*The [Spotlight Auction](/auction) runs weekly on FlexSpot. Bidding is open to any brand with a claimed spot — start with [how to claim your spot](/blog/how-to-claim-your-flexspot-spot), then come bid on something you can actually see.*
