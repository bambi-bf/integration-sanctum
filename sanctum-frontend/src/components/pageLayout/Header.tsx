import React, { FC, useEffect } from "react";
import { SolanaIcon, SoundOn } from "../svgIcons";

import ConnectButton from "../ConnectButton";
import { useWallet } from "@solana/wallet-adapter-react";
import useSolBalance from "@/hooks/useSolBalance";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import { WHITE_LIST } from "@/constants";

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title = "" }) => {
  const { publicKey, disconnect, connected } = useWallet();
  const router = useRouter();
  useEffect(() => {
    console.log(publicKey)
    if (publicKey) {
      if (WHITE_LIST.some((item) => item.pubKey == publicKey.toString())) {
        console.log("success");
        router.push("/");
      } else {
        router.push("/error");
        disconnect();
      }
    }
  }, [publicKey,connected]);
  return (
    <header className="hidden lg:block font-sans border-b border-gray-700 bg-gray-800 relative z-[999]">
      <div className="py-2 px-3 md:px-4 flex items-center justify-between">
        <div className="flex items-center gap-3"></div>
        <div className="flex items-center gap-3">
          <BalanceBox />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;

const BalanceBox: FC = () => {
  const { publicKey } = useWallet();
  const { balance } = useSolBalance(publicKey);
  if (balance)
    return (
      <div className="border p-2 flex items-center gap-3 rounded-md border-gray-500 bg-gray-800">
        <SolanaIcon className="w-4 h-4" />
        <span className="text-yellow-400 text-sm font-bold leading-[1]">
          {balance ? (balance / LAMPORTS_PER_SOL).toFixed(2) : 0}
        </span>
      </div>
    );
  else {
    return <></>;
  }
};
