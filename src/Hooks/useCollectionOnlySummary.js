import {useQuery} from "@tanstack/react-query";
import moment from "moment";
import {useMemo} from "react";
import {axiosinstance} from "../controllers/AxiosConfig";
import {buildCollectionOnlyReport} from "./collectionOnlyTransform";

// Same endpoints/bodies as the full User Wise Collection hooks (useUserWiseCollectionSummary*):
// the Collection-Only report is a different view of the same payload, so the IP-number
// split (Tmc = NOT IN, Tssh/Grouped = IN, Qmt = unfiltered) is inherited as-is.
// NOTE: "/collectionOnlyQmt" is mounted to the CollectionTmc router (see routes/index.js).
const API = {
  qmt: {method: "get", url: "/collectionReportsQmt/getUserWiseCollectionSummary"},
  tmch: {method: "post", url: "/collectionOnlyQmt/getUserWiseCollectionSummary", ipField: "ptno"},
  tssh: {method: "post", url: "/collectionReportsTssh/getUserWiseCollectionSummary", ipField: "rmIpNumber"},
  grouped: {method: "post", url: "/collectionReportsGrouped/getUserWiseCollectionSummary", ipField: "groupedPatient"},
};

/**
 * @param {object} options
 * @param {"qmt"|"tmch"|"tssh"|"grouped"} options.variant
 * @param {Date} options.fromDate
 * @param {Date} options.toDate
 * @param {string[]} [options.selectedUserCodes] - client-side cashier filter; undefined = everyone
 * @param {string[]} [options.ipNumbers] - IP list for the variant (ignored for qmt)
 * @param {string} [options.mhCode="00"]
 */
export const useCollectionOnlySummary = ({variant, fromDate, toDate, selectedUserCodes, ipNumbers = [], mhCode = "00"}) => {
  const request = useMemo(() => {
    const base = {
      fromDate: moment(fromDate).format("DD/MM/YYYY hh:mm:ss A"),
      toDate: moment(toDate).format("DD/MM/YYYY hh:mm:ss A"),
      mhCode,
    };
    const {ipField} = API[variant];
    return ipField ? {...base, [ipField]: ipNumbers} : base;
  }, [variant, fromDate, toDate, ipNumbers, mhCode]);

  const query = useQuery({
    queryKey: ["collection-only-summary", variant, request],
    queryFn: async () => {
      const {method, url} = API[variant];
      const {data} = method === "post" ? await axiosinstance.post(url, request) : await axiosinstance.get(url, {params: request});
      return data ?? {};
    },
    enabled: Boolean(fromDate && toDate),
  });

  const report = useMemo(() => buildCollectionOnlyReport(query.data, selectedUserCodes), [query.data, selectedUserCodes]);

  return {
    ...report,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    hasError: query.isError,
    errorMessage: query.error?.response?.data?.message || query.error?.message || null,
    refetch: query.refetch,
  };
};
