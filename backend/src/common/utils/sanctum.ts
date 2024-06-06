import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import axios from 'axios';
import { Buffer } from 'buffer';

const solConnection = new Connection(process.env.SOLANA_RPC as string);

export const convertVersionedTransaction = (versionedTx: string): Transaction => {
  const rawTransaction = Buffer.from(versionedTx, 'base64');

  const versionedTransaction = VersionedTransaction.deserialize(rawTransaction);

  const instructions = versionedTransaction.message.compiledInstructions;
  const recentBlockhash = versionedTransaction.message.recentBlockhash;

  const transaction = new Transaction({ recentBlockhash });

  instructions.forEach((instruction) => {
    console.log(instruction);
    // transaction.add({
    //   keys: instruction.accountKeyIndexes.map((key) => ({
    //     pubkey: new PublicKey(key.pubkey),
    //     isSigner: key.isSigner,
    //     isWritable: key.isWritable,
    //   })),
    //   programId: new PublicKey(instruction.programIdIndex),
    //   data: instruction.data,
    // });
  });

  // Optionally add signatures if needed
  versionedTransaction.signatures.forEach((signature) => {
    transaction.addSignature(new PublicKey(signature.publicKey), signature.signature);
  });

  return transaction;
};

export const swap = () => {
  axios
    .post('https://sanctum-s-api.fly.dev/v1/swap', {
      amount: '1100000000',
      dstLstAcc: null,
      input: 'So11111111111111111111111111111111111111112',
      mode: 'ExactIn',
      outputLstMint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
      priorityFee: {
        Auto: {
          max_unit_price_micro_lamports: 3000,
          unit_limit: 1000000,
        },
      },
      quotedAmount: '1000000000',
      signer: process.env.PUBLIC_KEY,
      srcAcc: null,
      swapSrc: 'Stakedex',
    })
    .then((res) => {
      const rawTransaction = Buffer.from(res.data.tx, 'base64');

      const versionedTransaction = VersionedTransaction.deserialize(rawTransaction);
      const fromKeypair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY));
      console.log(versionedTransaction);
      try {
        versionedTransaction.sign([fromKeypair]);
        const txId = solConnection.sendTransaction(versionedTransaction);
        console.log(txId);
      } catch (error) {}
    });
};
