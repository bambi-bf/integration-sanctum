import { Connection, PublicKey } from "@solana/web3.js";
import { getMint, getAccount } from "@solana/spl-token";
import { SOLANA_RPC } from "@/config";
import { findMetadataPda } from "@metaplex-foundation/js";

export const solConnection = new Connection(SOLANA_RPC);
const TOKEN_LIST_URL = 'https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json';

export const getTokenIconUrl = async (mintAddress: string): Promise<string | undefined> => {
    try {
        const response = await fetch(TOKEN_LIST_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch token list: ${response.statusText}`);
        }

        const tokenList = await response.json();
        const tokenInfo = tokenList.tokens.find((token: any) => token.address === mintAddress);

        if (tokenInfo) {
            return tokenInfo.logoURI;
        } else {
            throw new Error(`Token with mint address ${mintAddress} not found in token list.`);
        }
    } catch (error) {
        console.error('Error fetching token icon URL:', error);
        return undefined;
    }
};
