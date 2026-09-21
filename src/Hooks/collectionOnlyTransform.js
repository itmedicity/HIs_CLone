// Pure helpers (no imports) that reshape the existing getUserWiseCollectionSummary payload
// ({data, creditBillCollection, refund}) into the "Collection Details only" report layout.
//
// Differences from the full User Wise Collection report, verified row by row against the live
// "User Wise Collection.xls" (QMT, 18-Sep-2026):
//  - "Total" is Cash + Cr.Card + Cheque + Bank Transfer. Credit/Insurance sits beside it, not
//    inside it (the full report's collection Total includes Credit/Insurance).
//  - There is no Refund section: each cashier's refunds are netted into their Summary row
//    (cash/card/cheque/bank/credit), so refund-only cashiers appear with negative figures.

const num = (v) => Number(v || 0);

const ZERO = {cash: 0, card: 0, cheque: 0, bank: 0, credit: 0, prev: 0, unsettled: 0};

const toValues = (row) => ({
  cash: num(row.CASH),
  card: num(row.CR_CARD),
  cheque: num(row.CHEQUE),
  bank: num(row.BANK_TRANSFER),
  credit: num(row.CREDIT_INSURANCE),
  prev: num(row.PREV_COLLECTION),
  unsettled: num(row.UNSETTLED_AMT),
});

const withTotal = (v) => ({...v, total: v.cash + v.card + v.cheque + v.bank});

// Same {label: value} entry shape CollectionTableCellCmp / SectionWiseTotal already consume.
const toColumns = (v) => [
  {Cash: v.cash},
  {"Cr.Card": v.card},
  {Cheque: v.cheque},
  {"Bank Transfer": v.bank},
  {Total: v.total},
  {"Credit/Insurance": v.credit},
  {"Prev Collection": v.prev},
  {UnsettledAmt: v.unsettled},
];

const hasActivity = (v) => Object.values(v).some((value) => value !== 0);

const sumValues = (list) =>
  withTotal(
    list.reduce(
      (acc, v) => ({
        cash: acc.cash + v.cash,
        card: acc.card + v.card,
        cheque: acc.cheque + v.cheque,
        bank: acc.bank + v.bank,
        credit: acc.credit + v.credit,
        prev: acc.prev + v.prev,
        unsettled: acc.unsettled + v.unsettled,
      }),
      ZERO,
    ),
  );

const subtractRefund = (v, refund) => ({
  ...v,
  cash: v.cash - refund.cash,
  card: v.card - refund.card,
  cheque: v.cheque - refund.cheque,
  bank: v.bank - refund.bank,
  credit: v.credit - refund.credit,
});

// `codes` undefined/null means no cashier filter — pass every row through unchanged.
const finishSection = (entries, codes) => {
  const codeSet = codes ? new Set(codes) : null;
  const shaped = entries
    .filter((entry) => !codeSet || codeSet.has(entry.US_CODE))
    .map((entry) => ({...entry, values: withTotal(entry.values)}))
    .filter((entry) => hasActivity(entry.values));
  return {
    rows: shaped.map((entry) => ({US_CODE: entry.US_CODE, USC_NAME: entry.USC_NAME, data: toColumns(entry.values)})),
    totals: sumValues(shaped.map((entry) => entry.values)),
  };
};

export const buildCollectionOnlyReport = (payload, selectedUserCodes) => {
  const refundByUser = new Map();
  for (const row of payload?.refund ?? []) refundByUser.set(row.US_CODE, {name: row.USC_NAME, values: toValues(row)});

  const summaryEntries = [];
  const seen = new Set();
  for (const row of payload?.data ?? []) {
    seen.add(row.US_CODE);
    const refund = refundByUser.get(row.US_CODE)?.values ?? ZERO;
    summaryEntries.push({US_CODE: row.US_CODE, USC_NAME: row.USC_NAME, values: subtractRefund(toValues(row), refund)});
  }
  // A cashier with refunds but no Summary row still has to show their negative figures.
  for (const [usCode, {name, values}] of refundByUser) {
    if (!seen.has(usCode)) summaryEntries.push({US_CODE: usCode, USC_NAME: name, values: subtractRefund(ZERO, values)});
  }

  const creditEntries = (payload?.creditBillCollection ?? []).map((row) => ({US_CODE: row.US_CODE, USC_NAME: row.USC_NAME, values: toValues(row)}));

  const summary = finishSection(summaryEntries, selectedUserCodes);
  const credit = finishSection(creditEntries, selectedUserCodes);

  // Net Amount = Total Amount + Credit Bill Collection Total; Prev Collection and UnsettledAmt
  // carry over from the Summary section (matches the live sheet's Net Amount row).
  const net = withTotal({
    cash: summary.totals.cash + credit.totals.cash,
    card: summary.totals.card + credit.totals.card,
    cheque: summary.totals.cheque + credit.totals.cheque,
    bank: summary.totals.bank + credit.totals.bank,
    credit: summary.totals.credit + credit.totals.credit,
    prev: summary.totals.prev,
    unsettled: summary.totals.unsettled,
  });

  return {
    summaryRows: summary.rows,
    creditBillCollectionRows: credit.rows,
    summaryTotalColumns: toColumns(summary.totals),
    creditBillCollectionTotalColumns: toColumns(credit.totals),
    netAmountColumns: toColumns(net),
  };
};
