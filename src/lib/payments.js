// FlexSpot manual USDT payment destinations (owner wallets).
// Shown on the Claim page payment step: network tabs, QR code, copyable address.
// Amount: user-chosen, minimum $1.

export const USDT_NETWORKS = [
  {
    id: 'bsc',
    label: 'BSC',
    name: 'BNB Smart Chain (BEP20)',
    address: '0x65eed7da0004ac129a264376a061273dcbdc32e6',
    minDeposit: 0.01,
    note: 'Send only USDT on BNB Smart Chain (BEP20) to this address.',
  },
  {
    id: 'sol',
    label: 'SOL',
    name: 'Solana',
    address: '3pUKQXYAEsV7jhEqHcvFLYuo8AXTsFnqR7fp9mB2Ar7G',
    minDeposit: 0.001,
    note: 'Send only USDT on Solana to this address. SOL addresses are case sensitive.',
  },
  {
    id: 'trx',
    label: 'TRX',
    name: 'Tron (TRC20)',
    address: 'TCtBCmDJFMxFEAbm4GfW8uBgwoAJT85JLr',
    minDeposit: 0.01,
    note: 'Send only USDT on Tron (TRC20) to this address.',
  },
];

export const MIN_SPOT_AMOUNT = 1;
