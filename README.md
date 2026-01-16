# 🏢 RWA Real Estate Marketplace (Sepolia)

A decentralized application (dApp) demonstrating **Real World Asset (RWA)** tokenization on the Ethereum blockchain. Users can purchase fractional ownership of real estate assets using a stablecoin (MockUSDC).

Built with **Next.js**, **Hardhat**, and **Solidity**. Deployed on **Sepolia Testnet**.

---

## 🔗 Live Links

-   🌐 **Live Demo (Vercel):** [rwa-real-estate-demo.vercel.app]
-   📜 **Real Estate Contract (Verified):** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x9Fdf6a640f038288A10d3081452c2C582439626b)
-   💰 **Payment Token (MockUSDC):** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x1189C4C114a12EE300a0BE536857FADC984Be161)

---

## 🚀 Key Features

-   **Asset Tokenization:** Real estate properties represented as ERC-20 tokens.
-   **Stablecoin Payments:** Transactions are settled in MockUSDC (simulating real stablecoins).
-   **Secure Purchasing:** Implements the `Approve` -> `TransferFrom` pattern.
-   **Whitelist / KYC Simulation:** Only whitelisted addresses can purchase tokens (simulating regulatory compliance).
-   **Admin Panel:** Built-in dashboard for the owner to manage the whitelist.
-   **Faucet:** Integrated faucet to mint free test USDC for demonstration purposes.

---

## 🛠️ Tech Stack

### Frontend
-   **Framework:** Next.js (TypeScript)
-   **Styling:** Tailwind CSS
-   **Web3:** RainbowKit, Wagmi, Viem

### Backend (Smart Contracts)
-   **Language:** Solidity (v0.8.20)
-   **Framework:** Hardhat
-   **Standards:** ERC-20 (OpenZeppelin)
-   **Network:** Sepolia Testnet

---

## 📦 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone [https://github.com/botond1111/RWA-real-estate-demo.git](https://github.com/botond1111/RWA-real-estate-demo)
cd RWA-real-estate-demo
```
2. Frontend Setup
Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```
3. Run the Application
Start the development server:

```bash
npm run dev
Open http://localhost:3000 in your browser.
```
🛡️ Security Note
This project is for educational and demonstration purposes only. The contracts are deployed on the Sepolia Testnet and use mock tokens with no real value.

Created by Botond Csőgér
