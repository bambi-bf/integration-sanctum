export type TokenKey = "wsol" | "bsol";

export const tokenAddress: Record<TokenKey, string> = {
  wsol: "So11111111111111111111111111111111111111112",
  bsol: "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
//   usdc: "2tWC4JAdL4AxEFJySziYJfsAnW2MHKRo98vbAPiRDSk8"
};

export const TabMenu = [
    { title: 'Your Positions', link: '?activeTab=yours', param: 'yours' },
    { title: 'Add Position', link: '?activeTab=add', param: 'add' },
    { title: 'Swap', link: '?activeTab=swap', param: 'swap' },
]

export const FeeLabels = [
    { title: "Normal", value: "1" },
    { title: "High", value: "2" },
    { title: "Turbo", value: "5" }
]

export const Slippage = [
    { value: "0.1" },
    { value: "0.5" },
    { value: "1.0" },
    { value: "1.5" }
]