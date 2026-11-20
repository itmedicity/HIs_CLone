import {useQuery} from "@tanstack/react-query";
import moment from "moment";
import {useMemo} from "react";
import {axiosinstance} from "../controllers/AxiosConfig";

// Column order matches the "User Wise Collection" table header exactly (IP# through
// UnsettledAmt) — CollectionTableCellCmp renders one cell per entry, in this order.
const toColumns = (row) => [
  {"IP#": row.IP_COUNT ?? 0},
  {"IP Amt": row.IP_AMT ?? 0},
  {"OP#": row.OP_COUNT ?? 0},
  {"OP Amt": row.OP_AMT ?? 0},
  {"POS#": row.POS_COUNT ?? 0},
  {"POS Amt": row.POS_AMT ?? 0},
  {Total: row.REVENUE_TOTAL ?? row.TOTAL_AFTER_ADV ?? 0},
  {"Adv#": row.ADV_COUNT ?? 0},
  {"Adv Colld": row.ADV_COLLD ?? 0},
  {"Adv Settld": row.ADV_SETTLD ?? 0},
  {Total_2: row.TOTAL_AFTER_ADV ?? 0},
  {Cash: row.CASH ?? 0},
  {"Cr.Card": row.CR_CARD ?? 0},
  {Cheque: row.CHEQUE ?? 0},
  {"Credit/Insurance": row.CREDIT_INSURANCE ?? 0},
  {"Bank Transfer": row.BANK_TRANSFER ?? 0},
  {Total_3: row.COLLECTION_TOTAL ?? 0},
  {"Prev Collection": row.PREV_COLLECTION ?? 0},
  {UnsettledAmt: row.UNSETTLED_AMT ?? 0},
];

// True if every numeric field on the row is 0 — a cashier with no activity that period. The
// Summary section's base list is every active user regardless of whether they did anything that
// day, so most rows are all-zero; those aren't worth a line in the report.
const hasActivity = (row) =>
  Object.entries(row).some(([key, value]) => key !== "US_CODE" && key !== "USC_NAME" && typeof value === "number" && value !== 0);

const toRows = (rows) =>
  (rows ?? [])
    .filter(hasActivity)
    .map((row) => ({USC_NAME: row.USC_NAME, US_CODE: row.US_CODE, data: toColumns(row)}));

// Restricts a section's raw rows to the checked-off cashiers from the filter page. `codes`
// undefined/null means "no filter" (every cashier selected) — pass every row through unchanged.
const filterByUserCodes = (rows, codes) => {
  if (!codes) return rows ?? [];
  const codeSet = new Set(codes);
  return (rows ?? []).filter((row) => codeSet.has(row.US_CODE));
};

// Sums every section's rows into one totals row of the same 19-column shape, for the section
// footer ("Total Amount", "Credit Bill Collection Total", "Refund Total").
const sumColumns = (rows) => {
  const total = (rows ?? []).reduce(
    (acc, row) => ({
      IP_COUNT: acc.IP_COUNT + (row.IP_COUNT ?? 0),
      IP_AMT: acc.IP_AMT + (row.IP_AMT ?? 0),
      OP_COUNT: acc.OP_COUNT + (row.OP_COUNT ?? 0),
      OP_AMT: acc.OP_AMT + (row.OP_AMT ?? 0),
      POS_COUNT: acc.POS_COUNT + (row.POS_COUNT ?? 0),
      POS_AMT: acc.POS_AMT + (row.POS_AMT ?? 0),
      REVENUE_TOTAL: acc.REVENUE_TOTAL + (row.REVENUE_TOTAL ?? row.TOTAL_AFTER_ADV ?? 0),
      ADV_COUNT: acc.ADV_COUNT + (row.ADV_COUNT ?? 0),
      ADV_COLLD: acc.ADV_COLLD + (row.ADV_COLLD ?? 0),
      ADV_SETTLD: acc.ADV_SETTLD + (row.ADV_SETTLD ?? 0),
      TOTAL_AFTER_ADV: acc.TOTAL_AFTER_ADV + (row.TOTAL_AFTER_ADV ?? 0),
      CASH: acc.CASH + (row.CASH ?? 0),
      CR_CARD: acc.CR_CARD + (row.CR_CARD ?? 0),
      CHEQUE: acc.CHEQUE + (row.CHEQUE ?? 0),
      CREDIT_INSURANCE: acc.CREDIT_INSURANCE + (row.CREDIT_INSURANCE ?? 0),
      BANK_TRANSFER: acc.BANK_TRANSFER + (row.BANK_TRANSFER ?? 0),
      COLLECTION_TOTAL: acc.COLLECTION_TOTAL + (row.COLLECTION_TOTAL ?? 0),
      PREV_COLLECTION: acc.PREV_COLLECTION + (row.PREV_COLLECTION ?? 0),
      UNSETTLED_AMT: acc.UNSETTLED_AMT + (row.UNSETTLED_AMT ?? 0),
    }),
    {
      IP_COUNT: 0,
      IP_AMT: 0,
      OP_COUNT: 0,
      OP_AMT: 0,
      POS_COUNT: 0,
      POS_AMT: 0,
      REVENUE_TOTAL: 0,
      ADV_COUNT: 0,
      ADV_COLLD: 0,
      ADV_SETTLD: 0,
      TOTAL_AFTER_ADV: 0,
      CASH: 0,
      CR_CARD: 0,
      CHEQUE: 0,
      CREDIT_INSURANCE: 0,
      BANK_TRANSFER: 0,
      COLLECTION_TOTAL: 0,
      PREV_COLLECTION: 0,
      UNSETTLED_AMT: 0,
    },
  );
  return total;
};

// Net Amount = Total Amount + Credit Bill Collection Total - Refund Total, applied to the
// monetary columns only — the #-count columns (IP#/OP#/POS#/Adv#) carry over from Total Amount
// unchanged, matching the legacy report's own footer convention.
const netAmountRow = (summaryTotal, creditTotal, refundTotal) => ({
  IP_COUNT: summaryTotal.IP_COUNT,
  IP_AMT: summaryTotal.IP_AMT + creditTotal.IP_AMT - refundTotal.IP_AMT,
  OP_COUNT: summaryTotal.OP_COUNT,
  OP_AMT: summaryTotal.OP_AMT + creditTotal.OP_AMT - refundTotal.OP_AMT,
  POS_COUNT: summaryTotal.POS_COUNT,
  POS_AMT: summaryTotal.POS_AMT + creditTotal.POS_AMT - refundTotal.POS_AMT,
  REVENUE_TOTAL: summaryTotal.REVENUE_TOTAL + creditTotal.REVENUE_TOTAL - refundTotal.REVENUE_TOTAL,
  ADV_COUNT: summaryTotal.ADV_COUNT,
  ADV_COLLD: summaryTotal.ADV_COLLD,
  ADV_SETTLD: summaryTotal.ADV_SETTLD,
  TOTAL_AFTER_ADV: summaryTotal.TOTAL_AFTER_ADV + creditTotal.TOTAL_AFTER_ADV - refundTotal.TOTAL_AFTER_ADV,
  CASH: summaryTotal.CASH + creditTotal.CASH - refundTotal.CASH,
  CR_CARD: summaryTotal.CR_CARD + creditTotal.CR_CARD - refundTotal.CR_CARD,
  CHEQUE: summaryTotal.CHEQUE + creditTotal.CHEQUE - refundTotal.CHEQUE,
  CREDIT_INSURANCE: summaryTotal.CREDIT_INSURANCE + creditTotal.CREDIT_INSURANCE - refundTotal.CREDIT_INSURANCE,
  BANK_TRANSFER: summaryTotal.BANK_TRANSFER + creditTotal.BANK_TRANSFER - refundTotal.BANK_TRANSFER,
  COLLECTION_TOTAL: summaryTotal.COLLECTION_TOTAL + creditTotal.COLLECTION_TOTAL - refundTotal.COLLECTION_TOTAL,
  PREV_COLLECTION: summaryTotal.PREV_COLLECTION,
  UNSETTLED_AMT: summaryTotal.UNSETTLED_AMT + creditTotal.UNSETTLED_AMT - refundTotal.UNSETTLED_AMT,
});

// Round Off only exists on the Summary section (Credit Bill Collection / Refund don't track it).
// The backend combines IP/OP/POS rounding into a single figure rather than three separate ones,
// so — unlike the legacy report, which shows it per revenue type — this places the combined
// total under "Total" (Revenue Total) only; every other cell, including the #-count columns,
// stays zero.
const roundOffRow = (rows) => {
  const total = (rows ?? []).reduce((acc, row) => acc + (row.ROUND_OFF ?? 0), 0);
  return {
    IP_COUNT: 0,
    IP_AMT: 0,
    OP_COUNT: 0,
    OP_AMT: 0,
    POS_COUNT: 0,
    POS_AMT: 0,
    REVENUE_TOTAL: total,
    ADV_COUNT: 0,
    ADV_COLLD: 0,
    ADV_SETTLD: 0,
    TOTAL_AFTER_ADV: 0,
    CASH: 0,
    CR_CARD: 0,
    CHEQUE: 0,
    CREDIT_INSURANCE: 0,
    BANK_TRANSFER: 0,
    COLLECTION_TOTAL: 0,
    PREV_COLLECTION: 0,
    UNSETTLED_AMT: 0,
  };
};

/**
 * Fetches the full three-section "User Wise Collection" report (Summary, Credit Bill
 * Collection, Refund) from GET /collectionReportsQmt/getUserWiseCollectionSummary, and shapes it
 * into the row/column format CollectionTableCellCmp and SectionWiseTotal expect.
 *
 * @param {Date} fromDate
 * @param {Date} toDate
 * @param {string[]} [selectedUserCodes] - restricts every section to these US_CODEs (the
 *   checkboxes on the filter page); omit/undefined shows every cashier the backend returns.
 * @param {string} [mhCode="00"]
 */
export const useUserWiseCollectionSummaryQmt = (fromDate, toDate, selectedUserCodes, mhCode = "00") => {
  const params = useMemo(
    () => ({
      fromDate: moment(fromDate).format("DD/MM/YYYY hh:mm:ss A"),
      toDate: moment(toDate).format("DD/MM/YYYY hh:mm:ss A"),
      mhCode,
    }),
    [fromDate, toDate, mhCode],
  );

  const query = useQuery({
    queryKey: ["user-wise-collection-summary-qmt", params],
    queryFn: async () => {
      const {data} = await axiosinstance.get("/collectionReportsQmt/getUserWiseCollectionSummary", {params});
      return data ?? {};
    },
    enabled: Boolean(fromDate && toDate),
  });

  // Filtered once here so every row list and every total below reflects only the checked-off
  // cashiers — the section footers ("Total Amount" etc.) must foot the filtered rows, not the
  // full unfiltered set.
  const filteredSummary = useMemo(() => filterByUserCodes(query.data?.data, selectedUserCodes), [query.data, selectedUserCodes]);
  const filteredCredit = useMemo(() => filterByUserCodes(query.data?.creditBillCollection, selectedUserCodes), [query.data, selectedUserCodes]);
  const filteredRefund = useMemo(() => filterByUserCodes(query.data?.refund, selectedUserCodes), [query.data, selectedUserCodes]);

  const summaryRows = useMemo(() => toRows(filteredSummary), [filteredSummary]);
  const creditBillCollectionRows = useMemo(() => toRows(filteredCredit), [filteredCredit]);
  const refundRows = useMemo(() => toRows(filteredRefund), [filteredRefund]);

  const summaryTotal = useMemo(() => sumColumns(filteredSummary), [filteredSummary]);
  const creditBillCollectionTotal = useMemo(() => sumColumns(filteredCredit), [filteredCredit]);
  const refundTotal = useMemo(() => sumColumns(filteredRefund), [filteredRefund]);
  const netAmount = useMemo(
    () => netAmountRow(summaryTotal, creditBillCollectionTotal, refundTotal),
    [summaryTotal, creditBillCollectionTotal, refundTotal],
  );
  const roundOff = useMemo(() => roundOffRow(filteredSummary), [filteredSummary]);
  // Revenue (after advance) should balance against Collection + Unsettled - PrevCollection;
  // whatever's left over is a small paisa-rounding gap, which the legacy report's footer calls
  // "Revenue And Collection Variation" rather than treating it as an error. Leaving out
  // UNSETTLED_AMT/PREV_COLLECTION here (as a prior version of this line did) instead computes the
  // full outstanding-patient-dues total and mislabels it as the variation.
  const revenueCollectionVariation =
    netAmount.TOTAL_AFTER_ADV - netAmount.COLLECTION_TOTAL - netAmount.UNSETTLED_AMT + netAmount.PREV_COLLECTION;

  return {
    summaryRows,
    creditBillCollectionRows,
    refundRows,
    summaryTotalColumns: toColumns(summaryTotal),
    creditBillCollectionTotalColumns: toColumns(creditBillCollectionTotal),
    refundTotalColumns: toColumns(refundTotal),
    netAmountColumns: toColumns(netAmount),
    roundOffColumns: toColumns(roundOff),
    revenueCollectionVariation,

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    hasError: query.isError,
    errorMessage: query.error?.response?.data?.message || query.error?.message || null,
    refetch: query.refetch,
  };
};
