import {useQueries} from "@tanstack/react-query";
import {axiosinstance} from "../controllers/AxiosConfig";
import {useMemo} from "react";

const API_ENDPOINTS = {
  unsettledAmountUserWise: "/collectionOnlyQmt/getUnsettledAmountUserWise",
};

// Generic fetcher
const fetchApiData = async (endpoint) => {
  const {data} = await axiosinstance.get(endpoint);
  return data ?? {};
};

export const useCollectionReportsCollectionOnly = () => {
  const results = useQueries({
    queries: Object.entries(API_ENDPOINTS).map(([key, endpoint]) => ({
      queryKey: ["collection-reports-collection-only", key],
      queryFn: () => fetchApiData(endpoint),
    })),
  });

  // ── Derived states ────────────────────────────────────────
  const isLoading = results.some((q) => q.isLoading);
  const isFetching = results.some((q) => q.isFetching);
  const isSuccess = results.every((q) => q.isSuccess);
  const isData = results.map((q) => q.data);
  const errors = results
    .map((q) => q.error)
    .filter(Boolean)
    .map((err) => err?.response?.data?.message || err.message || "Unknown error");

  const hasError = errors.length > 0;
  const errorMessage = hasError ? errors.join(" • ") : null;
  const refetch = async () => {
    await Promise.all(results.map((q) => q.refetch()));
  };
  // Map results back to keys
  // const data = Object.fromEntries(Object.keys(API_ENDPOINTS).map((key, index) => [key, results[index]?.data?.data ?? []]));
  const data = useMemo(() => {
    return Object.fromEntries(Object.keys(API_ENDPOINTS).map((key, index) => [key, results[index]?.data?.data ?? []]));
  }, [results]);

  /* ---------------- Calculation ---------------- */

  const userWiseCollection = useMemo(() => {
    const allRows = [...(data.unsettledAmountUserWise ?? [])];

    const userMap = {};

    for (const row of allRows) {
      const key = row.US_CODE;

      if (!userMap[key]) {
        userMap[key] = {
          USC_NAME: row.USC_NAME,
          US_CODE: row.US_CODE,
          CASH_TOTAL: 0,
          CRCARD_TOTAL: 0,
          CHEQU_TOTAL: 0,
          BANK_TOTAL: 0,
          TOTAL: 0,
          CREDIT_INSURANCE_TOTAL: 0,
          PREV_COLLECTION_TOTAL: 0,
          UNSTLD_TOTAL: 0,
        };
      }

      userMap[key].CASH_TOTAL += row.CASH ?? 0;
      userMap[key].CRCARD_TOTAL += row.CARD ?? 0;
      userMap[key].CHEQU_TOTAL += row.CHEQU ?? 0;
      userMap[key].BANK_TOTAL += row.BANK ?? 0;
      userMap[key].TOTAL += row.BANK ?? 0;
      userMap[key].CREDIT_INSURANCE_TOTAL += row.CREDIT_INSURANCE ?? 0;
      userMap[key].PREV_COLLECTION_TOTAL += row.PREV_COLLECTION ?? 0;
      userMap[key].UNSTLD_TOTAL += row.UNSTLD ?? 0;
    }

    return Object.values(userMap).map((u) => ({
      USC_NAME: u.USC_NAME,
      US_CODE: u.US_CODE,
      data: [
        {CASH_TOTAL: u.CASH_TOTAL},
        {CARD_TOTAL: u.CRCARD_TOTAL},
        {CHEQU_TOTAL: u.CHEQU_TOTAL},
        {BANK_TOTAL: u.BANK_TOTAL},
        {TOTAL: u.CASH_TOTAL + u.CRCARD_TOTAL + u.CHEQU_TOTAL + u.BANK_TOTAL},
        {CREDIT_INSURANCE_TOTAL: u.CREDIT_INSURANCE_TOTAL},
        {PREV_COLLECTION_TOTAL: u.PREV_COLLECTION_TOTAL},
        {UNSTLD_TOTAL: u.UNSTLD_TOTAL},
      ],
    }));
  }, [data]);

  return {
    // Data
    userWiseCollection,

    // States
    isLoading,
    isFetching,
    isSuccess,
    hasError,
    errors,
    errorMessage,

    // Actions
    refetch,

    // Advanced usage
    queries: results,
  };
};
