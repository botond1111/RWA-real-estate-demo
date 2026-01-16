import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { RWA_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS, RWA_ABI, USDC_ABI } from '../constants';

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  
  // --- WRITE HOOKS ---
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // --- READ HOOKS ---
  // 1. Check User's MockUSDC Balance
  const { data: usdcBalance } = useReadContract({
    address: USDC_CONTRACT_ADDRESS,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: [address],
  });

  // 2. Property Price (Fixed at 1000 USDC for this demo)
  const propertyPrice = parseUnits('1000', 18); 

  // --- ACTIONS ---
  
  // A. Faucet: Mint free MockUSDC for testing
  const mintTokens = async () => {
    writeContract({
      address: USDC_CONTRACT_ADDRESS,
      abi: USDC_ABI,
      functionName: 'mint',
      args: [address, parseUnits('5000', 18)], 
    });
  };

  // B. Approve: Allow RealEstate contract to spend USDC
  const approveSpender = async () => {
    writeContract({
      address: USDC_CONTRACT_ADDRESS,
      abi: USDC_ABI,
      functionName: 'approve',
      args: [RWA_CONTRACT_ADDRESS, propertyPrice], 
    });
  };

  // C. Whitelist: Add user to whitelist (Demo / Owner only feature)
  const addToWhitelist = async () => {
    writeContract({
      address: RWA_CONTRACT_ADDRESS,
      abi: RWA_ABI,
      functionName: 'updateWhitelist',
      args: [address, true], // true = enable
    });
  };

  // D. Buy: Purchase the RWA Token
  const buyProperty = async () => {
    writeContract({
      address: RWA_CONTRACT_ADDRESS,
      abi: RWA_ABI,
      functionName: 'buyToken', 
      args: [BigInt(1)], // Buying 1 unit
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">
      <Head>
        <title>RWA Real Estate Marketplace</title>
        <meta name="description" content="Tokenized Real Estate on Sepolia" />
      </Head>

      {/* HEADER */}
      <header className="px-8 py-5 flex justify-between items-center bg-slate-800/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🏢</span>
          <h1 className="text-xl font-bold tracking-wide text-blue-400">RWA <span className="text-white">Marketplace</span></h1>
        </div>
        <ConnectButton showBalance={false} />
      </header>

      <main className="max-w-5xl mx-auto mt-12 p-6">
        
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
            <h2 className="text-3xl font-bold text-slate-200">Welcome to the Future of Real Estate</h2>
            <p className="text-slate-400">Please connect your wallet to view available properties.</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* --- DEV TOOLS / DEMO PANEL --- */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">🛠️ Developer Demo Panel</h3>
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Current Balance:</p>
                  <p className="text-2xl font-mono text-emerald-400">
                    {usdcBalance ? formatUnits(usdcBalance as bigint, 18) : '0'} <span className="text-sm text-slate-500">MockUSDC</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={mintTokens}
                    disabled={isPending}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    💧 Mint Test USDC
                  </button>
                  <button 
                    onClick={addToWhitelist}
                    disabled={isPending}
                    className="px-4 py-2 bg-indigo-900/50 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 rounded-lg text-sm font-medium transition hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    🔓 Self-Whitelist (Demo)
                  </button>
                </div>
              </div>
            </div>

            {/* --- PROPERTY LISTING --- */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl hover:shadow-blue-900/20 transition duration-500 max-w-md mx-auto md:mx-0">
                
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop" 
                    alt="Luxury Villa"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    8.5% APY
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">Budapest Hills Villa</h3>
                      <p className="text-slate-400 text-sm">District XII, Budapest</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 uppercase">Price</p>
                      <p className="text-xl font-bold text-blue-400">1,000 USDC</p>
                    </div>
                  </div>

                  <div className="my-6 h-px bg-slate-700/50"></div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button 
                      onClick={approveSpender} 
                      disabled={isPending}
                      className="w-full py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition active:scale-95 disabled:opacity-50"
                    >
                      Step 1: Approve USDC
                    </button>
                    
                    <button 
                      onClick={buyProperty} 
                      disabled={isPending}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold shadow-lg shadow-blue-900/50 transition transform active:scale-95 disabled:opacity-50"
                    >
                      Step 2: Invest Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* --- STATUS TOAST --- */}
            {isConfirming && (
              <div className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-pulse z-50">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Transaction Processing...
              </div>
            )}
            {isConfirmed && (
              <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50">
                <span>✅</span> Transaction Successful!
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
};

export default Home;