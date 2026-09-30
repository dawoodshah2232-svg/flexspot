// Author bios for FlexSpot blog article pages (visible byline box + prerender
// + BlogPosting JSON-LD). Both bylines are the site's own in-house team, so
// the bios describe the team truthfully — no invented people, credentials,
// or publication history.
export const AUTHOR_BIOS = {
  'FlexSpot Editorial':
    'FlexSpot Editorial is the in-house team behind FlexSpot.LOL — the live leaderboard where brands bid for attention from $1. We write practical guides on creator marketing, small-business advertising and buying attention online.',
  'FlexSpot Team':
    'The FlexSpot team builds and runs FlexSpot.LOL, the live leaderboard where brands, creators and meme pages compete for attention. We publish hands-on guides to getting noticed on a small budget.',
};

export const DEFAULT_AUTHOR_BIO =
  'Written by the FlexSpot team — the crew behind FlexSpot.LOL, the live leaderboard where brands bid for attention from $1.';

export function authorBio(name) {
  return AUTHOR_BIOS[name] || DEFAULT_AUTHOR_BIO;
}
