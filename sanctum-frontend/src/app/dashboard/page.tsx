/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { tokenAddress } from "@/constants";
import { TokenDataProps } from "@/utils/type";
import { getTokenInfo,getTokenMetadataInfo } from "@/utils/util";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
    const [wsolInfo,setWsolInfo] = useState<TokenDataProps | null>(null);
    const [usdcInfo,setUsdcInfo] = useState<TokenDataProps | null>(null);

    const wsolAddress = tokenAddress.wsol;
    const usdcAddress = tokenAddress.usdc;
    const usdcTokenPubkey = new PublicKey(wsolAddress);
    const wsolTokenPubkey = new PublicKey(usdcAddress);
    
    const router = useRouter();

    const poolData = (tokens: Array<string>) => {
        const jsonStringToken = JSON.stringify(tokens);
        const base64Str = Buffer.from(jsonStringToken).toString("base64");
        router.push("/pool/" + base64Str);
    }

    useEffect(() => {
        const fetchTokenInfo = async () => {
            const tokenWsolInfo = await getTokenInfo(wsolTokenPubkey.toString());
            setWsolInfo(tokenWsolInfo);
            const tokenUsdcInfo = await getTokenInfo(usdcTokenPubkey.toString());
            setUsdcInfo(tokenUsdcInfo);
        }

        fetchTokenInfo();
    },[])

  return (
    <div>
      <table className="w-full">
        <thead className="w-full">
          <tr className="w-full flex-row border-b-[1px] border-black">
            <th className="w-[500px]" align="center">Pool</th>
            <th className="w-[100px]" align="center">Your Deposit</th>
            <th className="w-[100px]" align="center">TVL</th>
            <th className="w-[200px]" align="center">24H Vol</th>
            <th className="w-[200px]" align="center">24hr Fee/TVL</th>
            <th>LM APR</th>
          </tr>
        </thead>
        <tbody>
            <tr className="border-b-[1px] hover:cursor-pointer" onClick={() => poolData(['wsol','usdc'])}>
                <td className="flex text-center justify-center align-middle m-auto" align="center">
                    <img src={wsolInfo?.logoURI} alt="" width={40} height={40} className="rounded-full mr-2"/>
                    <img src={usdcInfo?.logoURI} alt="" width={40} height={40} className="rounded-full mr-2" />
                    <span className="align-middle m-auto ml-2 mr-2">WSOL-USDC</span>
                </td>
                <td align="center">$12.75m</td>
                <td align="center">$18,575,854.21</td>
                <td align="center">10.8%</td>
                <td align="center">N/A</td>
                <td align="center">N/A</td>
            </tr>
            <tr className="border-b-[1px]" onClick={() => poolData(['wsol','usdc'])}>
                <td className="flex text-center justify-center align-middle m-auto" align="center">
                    <img src={wsolInfo?.logoURI} alt="" width={40} height={40} className="rounded-full mr-2"/>
                    <img src={usdcInfo?.logoURI} alt="" width={40} height={40} className="rounded-full mr-2" />
                    <span className="align-middle m-auto ml-2 mr-2">WSOL-USDC</span>
                </td>
                <td align="center">$12.75m</td>
                <td align="center">$18,575,854.21</td>
                <td align="center">10.8%</td>
                <td align="center">N/A</td>
                <td align="center">N/A</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}
