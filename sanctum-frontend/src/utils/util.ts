import { Connection, PublicKey } from "@solana/web3.js";
import { SOLANA_RPC } from "@/config";
import { programs } from "@metaplex/js";
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';
import { TokenBalanceProps, TokenDataProps } from "./type";
import axios from "axios";

// Destructure the metadata program
const {
  metadata: { Metadata },
} = programs;

export const solConnection = new Connection(SOLANA_RPC);
const TOKEN_LIST_URL =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json";

export const getTokenInfo = async (
  mintAddress: string
): Promise<TokenDataProps | null> => {
  try {
    const response = await fetch(TOKEN_LIST_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch token list: ${response.statusText}`);
    }

    const tokenList = await response.json();
    const tokenInfo = tokenList.tokens.find((token: any) => token.address === mintAddress);
    // const tokenInfo = tokenList.tokens.find(
    //   (token: any) => token.address === mintAddress && token.chainId == 103
    // );

    if (tokenInfo) {
      return tokenInfo;
    } else {
      throw new Error(
        `Token with mint address ${mintAddress} not found in token list.`
      );
    }
  } catch (error) {
    console.error("Error fetching token icon URL:", error);
    return null;
  }
};

export const getTokenInfoBySolscan = async (tokenMint: string) => {
  try {
    const response = await axios.get(`https://api.solscan.io/v2/token/meta?token==${tokenMint}`);
    const tokenInfo = response.data.data;
    console.log(tokenInfo);
  } catch (error) {
    console.error('Error fetching token info:', error);
  }
};

export const getTokenMetadataInfo = async (mintAddress: PublicKey) => {
  try {
    // Derive the metadata account address from the token mint address
    const metadataPDA = await Metadata.getPDA(mintAddress);

    // Fetch the metadata account
    const metadataAccount = await Metadata.load(solConnection, metadataPDA);

    // Log the metadata
    console.log("Token Metadata:", metadataAccount.data);
  } catch (error) {
    console.error("Error fetching token metadata:", error);
  }
};

export const getTokenBalances = async (walletPublicKey: PublicKey, mintAddress: string): Promise<number | null> => {
  try {
    const tokenAccounts = await solConnection.getTokenAccountsByOwner(walletPublicKey, {
        programId: TOKEN_PROGRAM_ID,
    });

    let tokenBalance = 0;
    tokenAccounts.value.forEach((tokenAccountInfo) => {
        const accountData = AccountLayout.decode(tokenAccountInfo.account.data);
        const tokenMint = new PublicKey(accountData.mint);
        console.log(tokenMint.toBase58())
        if (tokenMint.toBase58() == mintAddress) {
            tokenBalance += Number(accountData.amount);
        }
    });
    console.log(tokenBalance);
    return tokenBalance;
} catch (error) {
    console.error('Error getting wSOL balance:', error);
    return null;
}
}