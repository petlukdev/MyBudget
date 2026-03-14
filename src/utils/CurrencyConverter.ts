import { Currency } from "../types/Currency";

export class CurrencyConverter {
    
    private base: Currency = Currency.EUR;
    private rates: Record<string, number> = {};
    
    public constructor() {
        let lsBase = JSON.parse(localStorage.getItem("base")!);
        let lsRates = localStorage.getItem("rates");

        if (lsBase) {
            this.base = lsBase;
        } else {
            switch (navigator.language) {
                case "cs":
                    this.base = Currency.CZK;
                    break;
                case "en-US":
                    this.base = Currency.USD;
                    break;
                case "en-EU":
                    this.base = Currency.EUR;
                    break;
                default:
                    this.base = Currency.EUR;
                    break;
            }
            localStorage.setItem("base", JSON.stringify(this.base));
        }

        if (lsRates) {
            this.rates = JSON.parse(lsRates);
        }
        
        // Always tries to update rates
        this.getRates();
    }

    public async getRates() {
        try {
            const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${this.base}&symbols=EUR,USD,CZK`);
            if (!response.ok) throw new Error("API is not responding.");
            
            const data = await response.json();
            this.rates = data.rates;
            localStorage.setItem("rates", JSON.stringify(this.rates));
            return this.rates;
        } catch (err) {
            console.log(err);
            console.log("Loading cached rates...");
            const cachedRates = localStorage.getItem("rates");
            if (cachedRates) {
                this.rates = JSON.parse(cachedRates);
            }
            return this.rates;
        }
    }

    public async convert(amount: number, from: Currency, to: Currency): Promise<number> {
        if (from === to) return amount;
        
        const fromRate = from === this.base ? 1 : this.rates[from];
        const toRate = to === this.base ? 1 : this.rates[to];

        if (fromRate && toRate) {
            return amount * (toRate / fromRate);
        }
        
        console.warn("Exchange rates does not exist!");
        return amount;
    }

    public getBase(): Currency {
        return this.base;
    }

    public async setBase(base: Currency) {
        this.base = base;
        localStorage.setItem("base", JSON.stringify(this.base));
        await this.getRates();
    }
}