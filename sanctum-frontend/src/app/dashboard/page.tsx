"use client";
import { getTokenIconUrl } from "@/utils/util";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [wsolIconUrl, setWsolIconUrl] = useState("");
  const [usdcIconUrl, setUsdcIconUrl] = useState("");

  const wsolAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
  const usdcAddress = "So11111111111111111111111111111111111111112";
  const usdcTokenPubkey = new PublicKey(wsolAddress);
  const wsolTokenPubkey = new PublicKey(usdcAddress);

  const router = useRouter();

  const poolData = (tokens: Array<string>) => {
    const jsonStringToken = JSON.stringify(tokens);
    const base64Str = Buffer.from(jsonStringToken).toString("base64");
    router.push("/pool/" + base64Str);
  };

  useEffect(() => {
    const tokenWsolUrl = getTokenIconUrl(wsolTokenPubkey.toString());
    tokenWsolUrl.then((url) => setWsolIconUrl(url as string));
    const tokenUsdcUrl = getTokenIconUrl(usdcTokenPubkey.toString());
    tokenUsdcUrl.then((url) => setUsdcIconUrl(url as string));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <table className="w-full">
        <thead className="w-full">
          <tr className="w-full flex-row border-b-[1px] border-black">
            <th className="w-[500px]" align="center">
              Pool
            </th>
            <th className="w-[100px]" align="center">
              Your Deposit
            </th>
            <th className="w-[100px]" align="center">
              TVL
            </th>
            <th className="w-[200px]" align="center">
              24H Vol
            </th>
            <th className="w-[200px]" align="center">
              24hr Fee/TVL
            </th>
            <th>LM APR</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="border-b-[1px] hover:cursor-pointer"
            onClick={() => poolData([wsolAddress, usdcAddress])}
          >
            <td
              className="flex text-center justify-center align-middle m-auto"
              align="center"
            >
              <Image
                src={wsolIconUrl}
                alt=""
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <Image
                src={usdcIconUrl}
                alt=""
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <span className="align-middle m-auto ml-2 mr-2">WSOL-USDC</span>
            </td>
            <td align="center">$12.75m</td>
            <td align="center">$18,575,854.21</td>
            <td align="center">10.8%</td>
            <td align="center">N/A</td>
            <td align="center">N/A</td>
          </tr>
          <tr
            className="border-b-[1px]"
            onClick={() => poolData([wsolIconUrl, usdcIconUrl])}
          >
            <td
              className="flex text-center justify-center align-middle m-auto"
              align="center"
            >
              <Image
                src={wsolIconUrl}
                alt=""
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <Image
                src={usdcIconUrl}
                alt=""
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
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
