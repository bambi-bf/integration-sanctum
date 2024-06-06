"use client";

import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { WalletIcon, ExitIcon, ArrowIcon } from "./svgIcons";
import { useRouter } from "next/navigation";
import { UserIcon } from "./svgIcons/UserIcon";

const ConnectButton: FC = () => {
  const { setVisible } = useWalletModal();
  const router = useRouter();
  const { publicKey, disconnect } = useWallet();

  return (
    <button className="rounded-lg border border-gray-500 bg-gray-800 shadow-btn-inner text-[#ffffff] py-2 px-2 w-[140px] lg:w-[160px] group relative">
      {publicKey ? (
        <>
          <div className="flex items-center justify-center text-sm">
            {publicKey.toBase58().slice(0, 4)}....
            {publicKey.toBase58().slice(-4)}
            <div className="rotate-90 w-4 h-4 grid place-content-center">
              <ArrowIcon />
            </div>
          </div>
          <div className="w-[160px] absolute right-0 top-9 hidden group-hover:block bg-gray-800 shadow-md">
            <ul className="border border-gray-500 rounded-lg bg-grayborder-gray-500 p-2 mt-1">
              <li>
                <div
                  className="flex gap-2 items-center mb-1 text-sm hover:text-yellow-400"
                  onClick={() => {
                    router.push(`/user/${publicKey?.toBase58()}`);
                  }}
                >
                  <UserIcon className="brightness-200 w-4 h-4" fill="#435854" />{" "}
                  Edit Profile
                </div>
              </li>
              <li>
                <div
                  className="flex gap-2 items-center mb-1 text-sm hover:text-yellow-400"
                  onClick={() => setVisible(true)}
                >
                  <WalletIcon className="brightness-200" /> Change Wallet
                </div>
              </li>
              <li>
                <div
                  className="flex gap-2 items-center text-sm hover:text-yellow-400 cursor-pointer"
                  onClick={disconnect}
                >
                  <ExitIcon className="brightness-200" /> Disconnect
                </div>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div
          className="flex items-center justify-center gap-1 text-sm hover:text-yellow-400"
          onClick={() => setVisible(true)}
        >
          Connect wallet <ArrowIcon />
        </div>
      )}
    </button>
  );
};

export default ConnectButton;
