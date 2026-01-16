import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting RWA Real Estate deployment...");

  // 1. LÉPÉS: A Fizetőeszköz (Payment Token)
  // Először kitesszük a MockUSDC-t, hogy legyen mivel fizetni az ingatlanért.
  console.log("----------------------------------------------------");
  console.log("Deploying Payment Token (MockUSDC)...");
  
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  
  console.log(`💲 Payment Token deployed to: ${usdc.target}`);

  // 2. LÉPÉS: Az Ingatlan Token (RWA)
  // A konstruktornak átadjuk az előbb létrehozott USDC címét.
  console.log("----------------------------------------------------");
  console.log("Deploying Real Estate Token...");

  const RealEstateToken = await ethers.getContractFactory("RealEstateToken");
  
  // ITT ADJUK ÁT A FIZETŐESZKÖZ CÍMÉT (constructor argumentum)
  const rwa = await RealEstateToken.deploy(usdc.target);
  
  await rwa.waitForDeployment();

  console.log(`🏠 RealEstateToken deployed to: ${rwa.target}`);
  
  console.log("----------------------------------------------------");
  console.log("✅ Deployment Complete!");
  console.log("\nHasználd ezeket a címeket a Frontend 'constants.ts' fájljában:");
  console.log(`export const RWA_ADDRESS = "${rwa.target}";`);
  console.log(`export const USDC_ADDRESS = "${usdc.target}";`);
  console.log("----------------------------------------------------");
  
  // Tipp a verifikációhoz
  console.log("Verifikáláshoz futtasd ezt:");
  console.log(`npx hardhat verify --network sepolia ${rwa.target} ${usdc.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});