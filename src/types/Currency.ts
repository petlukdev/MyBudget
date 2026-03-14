export const Currency = {
    CZK: "CZK",
    EUR: "EUR",
    USD: "USD"
} as const;

export type Currency = typeof Currency[keyof typeof Currency];