"use client"
import { getTokenInfo } from "@/utils/util";
import { PublicKey } from "@solana/web3.js";
import React, { useEffect } from "react";

export default function Dashboard() {
    const wsolTokenPubkey = new PublicKey('So11111111111111111111111111111111111111112');
    const usdcTokenPubkey = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    useEffect(() => {
        console.log(wsolTokenPubkey);
        getTokenInfo(wsolTokenPubkey);
    },[])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pool</th>
            <th>Your Deposit</th>
            <th>TVL</th>
            <th>24H Vol</th>
            <th>24hr Fee/TVL</th>
            <th>LM APR</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  );
}
