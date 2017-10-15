export class TicketSummary {
  totalPriceWithTax: number;
  totalPriceWithoutTax: number;
  totalTaxDrink: number;
  totalTaxFood: number;
  totalTaxTakeway: number;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.totalPriceWithTax = 0;
    this.totalPriceWithoutTax = 0;
    this.totalTaxDrink = 0;
    this.totalTaxFood = 0;
    this.totalTaxTakeway = 0;
  }
}
