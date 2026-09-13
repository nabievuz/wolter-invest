// Company-supplied screenshot, received 2026-09-13.
// The owner confirmed currency = UZS and rentals = number of rental events.
// These are reported revenue figures, not independently audited results or net profit.
export const REVENUE = [
  {
    month: "may",
    rentals: 413,
    swaps: 3387,
    bikeRevenue: 162286732,
    swapRevenue: 76207500,
  },
  {
    month: "june",
    rentals: 577,
    swaps: 7085,
    bikeRevenue: 212472000,
    swapRevenue: 159412500,
  },
  {
    month: "july",
    rentals: 557,
    swaps: 8489,
    bikeRevenue: 213619000,
    swapRevenue: 191002500,
  },
  {
    month: "august",
    rentals: 540,
    swaps: 7920,
    bikeRevenue: 204186000,
    swapRevenue: 178200000,
  },
].map((row) => ({ ...row, total: row.bikeRevenue + row.swapRevenue }));
