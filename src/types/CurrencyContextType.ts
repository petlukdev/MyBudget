import type { Currency } from "./Currency"

export type CurrencyContextType = {
    base: Currency,
    rates: Record<string, number>,
    setBase: (base: Currency) => Promise<void>,
    convert: (amount: number, from: Currency, to: Currency) => number
}