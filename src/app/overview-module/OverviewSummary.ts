export class OverviewSummary {
  total = 0;
  totalWithoutTax = 0;
  totalTax = 0;
  totalTaxLv1 = 0;
  totalTaxLv2 = 0;
  totalTaxLv3 = 0;
  totalCash = 0;
  totalCard = 0;

  reset() {
    this.total = 0;
    this.totalWithoutTax = 0;
    this.totalTax = 0;
    this.totalTaxLv1 = 0;
    this.totalTaxLv2 = 0;
    this.totalTaxLv3 = 0;
    this.totalCard = 0;
    this.totalCash = 0;
  }
}
