import { Connection, PublicKey } from "@solana/web3.js";
import { SOLANA_RPC } from "@/config";
import { programs } from '@metaplex/js';
import { TokenDataProps } from "./type";

// Destructure the metadata program
const { metadata: { Metadata } } = programs;

export const solConnection = new Connection(SOLANA_RPC);
const TOKEN_LIST_URL = 'https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json';

export const getTokenInfo = async (mintAddress: string): Promise<TokenDataProps | null> => {
    try {
        const response = await fetch(TOKEN_LIST_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch token list: ${response.statusText}`);
        }

        const tokenList = await response.json();
        const tokenInfo = tokenList.tokens.find((token: any) => token.address === mintAddress);
        if (tokenInfo) {
            return tokenInfo;
        } else {
            throw new Error(`Token with mint address ${mintAddress} not found in token list.`);
        }
    } catch (error) {
        console.error('Error fetching token icon URL:', error);
        return null;
    }
};

export const getTokenMetadataInfo = async (mintAddress: PublicKey) => {
    try {
        // Derive the metadata account address from the token mint address
        const metadataPDA = await Metadata.getPDA(mintAddress);

        // Fetch the metadata account
        const metadataAccount = await Metadata.load(solConnection, metadataPDA);

        // Log the metadata
        console.log('Token Metadata:', metadataAccount.data);
    } catch (error) {
        console.error('Error fetching token metadata:', error);
    }
};
