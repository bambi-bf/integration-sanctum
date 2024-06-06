"use client";
import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { solConnection } from "@/utils/util";

const useSolBalance = (walletPublicKey: PublicKey | null) => {
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
        const solBalance = await solConnection.getBalance(walletPublicKey);
        setBalance(solBalance);
      } catch (err) {
        setError(err as Error);
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
  }, [walletPublicKey]);

  return { balance, loading, error };
};

export default useSolBalance;
