import { SANCTUM_URI } from "@/config";
import axios from "axios";
import bs58 from "bs58";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { solConnection } from "./util";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";

export const getQuote = async (
  inputMint: string,
  outputLstMint: string,
  amount: number
): Promise<number | undefined> => {
  try {
    const res = await axios.create({ baseURL: SANCTUM_URI }).get("swap/quote", {
      params: {
        input: inputMint,
        outputLstMint: outputLstMint,
        amount: amount.toString(),
      },
    });
    return res.data.outAmount;
  } catch (error) {
    return undefined;
  }
};

export const swapLstMint = async (
  wallet: WalletContextState,
  input: string,
  outputLisMint: string,
  signer: string | undefined,
  quotedAmount: number | undefined,
  amount: number
) => {
  try {
    const res = await axios.create({ baseURL: SANCTUM_URI }).post("swap", {
      amount: amount.toString(),
      dstLstAcc: null,
      input: input,
      mode: "ExactIn",
      outputLstMint: outputLisMint,
      priorityFee: {
        Auto: {
          max_unit_price_micro_lamports: 5_000_000,
          unit_limit: 200_000,
        },
      },
      quotedAmount: quotedAmount,
      signer: signer,
      srcAcc: null,
      swapSrc: "Stakedex",
    });
    const rawTransaction = Buffer.from(res.data.tx, "base64");

    const versionedTransaction =
      VersionedTransaction.deserialize(rawTransaction);

    try {
      const { blockhash } = await solConnection.getLatestBlockhash();
      const transactionV0 = new VersionedTransaction(
        versionedTransaction.message
      );

      transactionV0.message.recentBlockhash = blockhash;
      const sig = await solConnection.simulateTransaction(transactionV0);
      console.log(sig)
      if (wallet.signTransaction) {
        const signedTx = await wallet.signTransaction(transactionV0);
        // const signature = await solConnection.sendTransaction(transactionV0);
        const signature = await solConnection.sendRawTransaction(
          signedTx.serialize(),
          {
            skipPreflight: true,
            maxRetries: 3,
            preflightCommitment: "confirmed",
          }
        );
        const tx = await solConnection.confirmTransaction(signature);
        
        if(tx) {
            toast.success("LST swap is success");   
        }
      }
    } catch (error) {
        console.log(error)
      toast.error(error as string);
    }
  } catch (error) {
    console.log(error);
  }
};
