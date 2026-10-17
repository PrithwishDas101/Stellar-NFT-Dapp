# StellarCanvas Client

The client is the Next.js frontend for StellarCanvas, an NFT gallery powered by a Soroban smart contract on Stellar Testnet.

## Requirements

- Node.js and npm
- Freighter browser extension for wallet interactions
- A Stellar Testnet account to sign transactions

## Getting Started

From this directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Main Areas

- `app/page.tsx` — landing page and application layout
- `app/globals.css` — global theme, motion, and responsive styling
- `components/Navbar.tsx` — wallet navigation and connection controls
- `components/Contract.tsx` — gallery, NFT actions, and transaction states
- `hooks/contract.ts` — Freighter and Soroban contract helpers

The frontend is configured for Stellar Testnet. Its RPC, Horizon, network passphrase, and contract address are defined in `hooks/contract.ts`.

For the full project overview, smart contract information, and repository setup, see the [root README](../README.md).
