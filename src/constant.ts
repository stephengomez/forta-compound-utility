export const C_AAVE = '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c';
export const C_BAT = '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e';
export const C_COMP = '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4';
export const C_DAI = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643';
export const C_ETH = '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5';
export const C_LINK = '0xface851a4921ce59e912d19329929ce6da6eb0c7';
export const C_MKR = '0x95b4ef2869ebd94beb4eee400a99824bf5dc325b';
export const C_REP = '0x158079ee67fce2f58472a96584a73c7ab9ac95c1';
export const C_SAI = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
export const C_SHUSHI = '0x4b0181102a0112a2ef11abee5563bb4a3176c9d7';
export const C_TUSD = '0x12392f67bdf24fae0af363c24ac620a2f67dad86';
export const C_UNI = '0x35a18000230da775cac24873d00ff85bccded550';
export const C_USDC = '0x39aa39c021dfbae8fac545936693ac917d5e7563';
export const C_USDT = '0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9';
export const C_WBTC = '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4';
export const C_WBTC2 = '0xccf4429db6322d5c611ee964527d42e5d685dd6a';
export const C_YFI = '0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946';
export const C_ZRX = '0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407';

type address = string | null;

export const C_TOKENS: address[] = [
  C_AAVE,
  C_BAT,
  C_COMP,
  C_DAI,
  C_ETH,
  C_LINK,
  C_MKR,
  C_REP,
  C_SAI,
  C_SHUSHI,
  C_TUSD,
  C_UNI,
  C_USDC,
  C_USDT,
  C_WBTC,
  C_WBTC2,
  C_YFI,
  C_ZRX,
];

export const MINT_SIG = 'Mint(address,uint256,uint256)';
export const REDEEM_SIG = 'Redeem(address,uint256,uint256)';
export const BORROW_SIG = 'Borrow(address,uint256,uint256,uint256)';
export const REPAY_BORROW_SIG = 'RepayBorrow(address,address,uint256,uint256,uint256)';

export const ALERT_ID = 'COMPOUND-5';
export const AGENT_NAME = 'Compound Utilization Rate';
export const AGENT_DESCRIPTION = 'Utilization Rate change out of range';
