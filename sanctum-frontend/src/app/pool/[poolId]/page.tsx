/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-img-element */
"use client";
import TabsTip from "@/components/TabsTip";
import { TokenKey, tokenAddress } from "@/constants";
import useTokenBalance from "@/hooks/useTokenBalance";
import { TokenDataProps } from "@/utils/type";
import { getTokenInfo } from "@/utils/util";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { usePathname, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useMemo, useState } from "react";

export default function PoolPage() {
  const pathname = usePathname();
  const tokenStrings = pathname.split("/pool/")[1];

  const tokens: Array<string> = JSON.parse(
    Buffer.from(tokenStrings, "base64").toString("utf-8")
  );
  const searchParam = useSearchParams();
  const search = searchParam.get("activeTab") || "yours";

  const { publicKey } = useWallet();

  const [tokenInfos, setTokenInfos] = useState<
    Record<string, TokenDataProps | null>
  >({});

  useEffect(() => {
    const fetchTokenIcons = async () => {
      try {
        const newTokenInfos: Record<string, TokenDataProps | null> = {
          ...tokenInfos,
        };
        for (const token of tokens) {
          if (token) {
            const tokenInfo = await getTokenInfo(
              tokenAddress[token as TokenKey]
            );
            newTokenInfos[token] = tokenInfo;
          }
        }

        setTokenInfos(newTokenInfos);
      } catch (error) {
        console.error("Error fetching token icons:", error);
      }
    };
    fetchTokenIcons();
  }, []);

  return (
    <div className="container m-auto">
      <div className="flex justify-between">
        <div className="gap-3 ml-10">
          <h1 className="font-bold text-5xl">
            {tokens.map((token, index) => (
              <span key={index}>{token + "  "} </span>
            ))}
          </h1>
        </div>
        <div className="gap-3 flex justify-end">
          <div className="flex flex-col">
            <span className="border-black border px-3 py-1 text-[20px] font-bold">
              10.90%
            </span>
            <span className="text-[12px] text-center">365d yield / TVL</span>
          </div>
          <div className="flex flex-col">
            <span className="border-black border px-3 py-1 text-[20px] font-bold">
              9.39%
            </span>
            <span className="text-[12px] text-center">Base APY</span>
          </div>
          <div className="flex flex-col">
            <span className="border-black border px-3 py-1 text-[20px] font-bold">
              N/A
            </span>
            <span className="text-[12px] text-center">LM APR</span>
          </div>
        </div>
      </div>
      <div className="flex bg-white p-5 gap-20">
        <div className="flex flex-col w-3/5">
          <div className="flex-col border-b py-5">
            <span>Total Value Locked</span>
            <h2 className="text-[25px] font-bold">$12,816,919.85</h2>
            <span>0.00024453% permanently locked</span>
          </div>
          <div className="flex-col border-b py-5 ">
            <span>Liquidity Allocation</span>
            {tokens.map((token, index) => (
              <div key={index} className="flex text-[10px] items-end mt-4">
                <img
                  src={tokenInfos[token as TokenKey]?.logoURI}
                  width={30}
                  height={30}
                  className="rounded-full"
                  alt=""
                />
                <span className="text-[20px] mx-2">
                  {tokenInfos[token as TokenKey]?.symbol + " "}
                </span>
                <span className="pb-[7px]">
                  {tokenAddress[token as TokenKey] &&
                    tokenAddress[token as TokenKey].slice(0, 4)}
                  ...
                  {tokenAddress[token as TokenKey] &&
                    tokenAddress[token as TokenKey].slice(-4)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex-col border-b py-5 ">
            <div className="flex justify-between py-3">
              <h2>Bin Step</h2>
              <span>1</span>
            </div>
            <div className="flex justify-between py-3">
              <h2>Base Fee</h2>
              <span>1</span>
            </div>
            <div className="flex justify-between py-3">
              <h2>Max Fee</h2>
              <span>10%</span>
            </div>
            <div className="flex justify-between py-3">
              <h2>Protocol Fee</h2>
              <span>1%</span>
            </div>
            <div className="flex justify-between py-3">
              <h2>Dynamic Fee</h2>
              <span>0.01%</span>
            </div>
            <div className="flex justify-between py-3">
              <h2>24h Fee</h2>
              <span>$700</span>
            </div>
          </div>
        </div>
        <div className="w-2/5">
          <h4 className="text-[20px] font-bold">Your Deposit</h4>
          <div className="flex border-b py-5 w-full">
            <div className="flex flex-col w-1/2">
              <h2>Current Balance</h2>
              {tokens.map((token, index) => (
                <div key={index} className="flex text-[10px] items-end mt-4">
                  <img
                    src={tokenInfos[token as TokenKey]?.logoURI}
                    width={30}
                    height={30}
                    className="rounded-full"
                    alt=""
                  />
                  <BalanceBox token={token as TokenKey} />
                  <span className="text-[20px] mx-2">
                    {tokenInfos[token as TokenKey]?.symbol + " "}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-1/2">
              <h2>Your Uniclaimed Swap Fee</h2>
              {tokens.map((token, index) => {
                return (
                  <div key={index} className="flex text-[10px] items-end mt-4">
                    <img
                      src={tokenInfos[token as TokenKey]?.logoURI}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt=""
                    />
                    <span className="text-[20px] mx-2">
                      {tokenInfos[token as TokenKey]?.symbol + " "}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <TabsTip />
          <div
            className={`${
              search == "yours" || search == null ? "block" : "hidden"
            }`}
          >
            yours
          </div>
          <div className={`${search == "add" ? "block" : "hidden"}`}>
            <h2 className="text-[20px] font-bold">Enter deposit amount:</h2>
            <div className="flex w-full gap-5">
              {tokens.map((token, index) => (
                <div className={`flex border border-gray-300 w-1/${tokens.length} p-2`} key={index}>
                  <img
                    src={tokenInfos[token as TokenKey]?.logoURI}
                    width={30}
                    height={30}
                    className="rounded-full"
                    alt=""
                  />
                  <span className="text-[20px] mx-3">{tokenInfos[token as TokenKey]?.symbol}</span>
                  <input type="text" className="border-none focus:outline-none w-full text-right" placeholder="0.00" inputMode="decimal" />
                </div>
              ))}
            </div>
          </div>
          <div className={`${search == "swap" ? "block" : "hidden"}`}>swap</div>
        </div>
      </div>
    </div>
  );
}

type TokenProps = {
  token: TokenKey;
};

const BalanceBox: FC<TokenProps> = (tokenProps) => {
  const { publicKey } = useWallet();
  const { balance } = useTokenBalance(
    publicKey,
    tokenAddress[tokenProps.token]
  );
  if (balance)
    return (
      <div className="flex items-center gap-3">
        <span className=" text-sm font-bold leading-[1]">
          {balance ? (balance / LAMPORTS_PER_SOL).toFixed(2) : 0}
        </span>
      </div>
    );
  else {
    return <span className="text-[20px] mx-3"> 0.00 </span>;
  }
};
