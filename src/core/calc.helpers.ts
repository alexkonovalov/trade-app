
export const toBtcString = (priceInUsd: number , btcPrice: number) =>
  (priceInUsd / btcPrice).toPrecision(8)