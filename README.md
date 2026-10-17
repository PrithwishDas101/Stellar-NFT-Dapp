# StellarCanvas — NFT Gallery on Stellar

StellarCanvas is a browser-based NFT gallery built on the Stellar network and Soroban smart contracts. It lets users connect a Freighter wallet, mint digital collectibles, browse the collection, update metadata, and transfer NFTs between accounts.

The project combines a Next.js frontend with a Rust smart contract. It is currently configured for Stellar Testnet.

## Live Demo

[Open StellarCanvas](https://stellar-nft-dapp-u6d8.vercel.app/)

The demo uses the Stellar Testnet. Wallet interactions require the Freighter browser extension and a testnet account.

## Features

- **Mint NFTs:** create a collectible with a name, description, and image URL.
- **Browse the gallery:** view NFTs recorded by the smart contract.
- **Manage owned NFTs:** view collectibles associated with the connected wallet.
- **Edit metadata:** update an NFT's name, description, and image URL when authorized as its owner.
- **Transfer ownership:** send an NFT to another Stellar account.
- **On-chain records:** NFT metadata, ownership, and owner indexes are managed by the Soroban contract.
- **Freighter integration:** connect a wallet and sign contract transactions directly from the browser.

## Technology

| Layer | Technologies |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Wallet | Freighter |
| Stellar client | Stellar JavaScript SDK |
| Smart contract | Rust, Soroban SDK |
| Network | Stellar Testnet |

## Project Structure

```text
Stellar-NFT-Dapp/
├── client/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── Contract.tsx
│   │   └── Navbar.tsx
│   ├── hooks/
│   │   └── contract.ts
│   └── package.json
└── contract/
    ├── contracts/
    │   └── contract/
    │       └── src/
    │           ├── lib.rs
    │           └── test.rs
    └── Cargo.toml
```

## Run the Frontend Locally

### Requirements

- Node.js and npm
- Freighter browser extension
- A Stellar Testnet account for signing transactions

### Installation

From the repository root:

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To create a production build:

```bash
npm run build
npm run start
```

## Smart Contract

The contract source is in `contract/contracts/contract/src/lib.rs`. It exposes methods for minting NFTs, transferring them, updating owner-controlled metadata, reading a specific NFT, listing all NFTs, retrieving an owner's NFTs, and fetching a paginated list.

Run the contract tests from the repository root:

```bash
cd contract
cargo test
```

Building or deploying the contract also requires the Rust toolchain and Stellar CLI/Soroban tooling configured for your environment.

## Network Configuration

The frontend's current network settings are defined in `client/hooks/contract.ts`:

- **Network:** Stellar Testnet
- **Soroban RPC:** `https://soroban-testnet.stellar.org`
- **Horizon:** `https://horizon-testnet.stellar.org`
- **Contract address configured by the client:** `CCZYBHDQMYUV5WAMJODBDVH7OEH2W7JQDEYGX6RZRICVGA26LORKSHBJ`

Keep the frontend's contract address in sync with the contract deployment you intend to use. Use a Testnet account and test XLM for test transactions; do not use a mainnet wallet balance for this project.

## Notes

- NFT image URLs are stored as metadata references; the contract does not upload image files.
- The application is intended for Testnet experimentation and learning, not production asset custody.
- Transaction signing is performed through Freighter. Never share a wallet's secret key or recovery phrase.

## Author

Built by [Prithwish Das](https://github.com/PrithwishDas101).
