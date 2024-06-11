"use client";
import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';
import { solConnection } from "@/utils/util";

const useTokenBalance = (walletPublicKey: PublicKey | null, mintAddress: string | null) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (walletPublicKey === null) {
      setBalance(0);
      setError(null);
      setLoading(false);
      return;
    }
    const fetchBalance = async () => {
      setLoading(true);
      setError(null);
      try {
        const tokenAccounts = await solConnection.getTokenAccountsByOwner(walletPublicKey, {
            programId: TOKEN_PROGRAM_ID,
        });

        let wSolBalance = 0;
        tokenAccounts.value.forEach((tokenAccountInfo) => {
            const accountData = AccountLayout.decode(tokenAccountInfo.account.data);
            console.log("accountData",accountData)
            const tokenMint = new PublicKey(accountData.mint);
            if (tokenMint && tokenMint.toBase58() === mintAddress) {
                wSolBalance += Number(accountData.amount);
            }
        });
        setBalance(wSolBalance);
    } catch (error) {
        console.error('Error getting wSOL balance:', error);
        return null;
    } finally {
        setLoading(false);
      }
    };

    // Fetch the initial balance
    fetchBalance();

    // Set up the account change listener
    const accountChangeListenerId = solConnection.onAccountChange(
      walletPublicKey,
      async (accountInfo) => {
        setBalance(accountInfo.lamports);
      }
    );

    // Cleanup the subscription on component unmount or walletPublicKey change
    return () => {
      solConnection.removeAccountChangeListener(accountChangeListenerId);
    };
  }, [mintAddress, walletPublicKey]);

  return { balance, loading, error };
};

export default useTokenBalance;
