import { Connection, PublicKey } from "@solana/web3.js";
import { getMint, getAccount } from '@solana/spl-token';
import { SOLANA_RPC } from "@/config";

export const solConnection = new Connection(SOLANA_RPC);

export const getTokenInfo = async (tokenPubkey: PublicKey) => {
    try {
        // Fetch token mint information
        const mintInfo = await getMint(solConnection, tokenPubkey);
        console.log('Mint Info:', mintInfo);

        // Fetch token accounts by token mint
        const tokenAccounts = await solConnection.getParsedTokenAccountsByOwner(
            tokenPubkey,
            { mint: tokenPubkey }
        );
        console.log(tokenAccounts);

    } catch (error) {
        console.error('Error fetching token info:', error);
    }
};

