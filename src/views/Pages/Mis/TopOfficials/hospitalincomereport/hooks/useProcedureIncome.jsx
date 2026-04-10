import {useMemo} from "react";

export const useProcedureIncome = (apiData) => {
  return useMemo(() => {
    if (!apiData?.data) return [];

    const income = apiData.data.income || {};
    const master = apiData.data.masterData || {};

    const groups = master.getMisincexpgroup || [];
    const heads = master.getMisincexpmast || [];

    const groupMap = new Map();
    const headMap = new Map();

    groups.forEach((g) => {
      if (g.DG_TYPE === "R") {
        groupMap.set(g.DG_GRCODE, g);
      }
    });

    heads.forEach((h) => {
      headMap.set(h.DM_GRCODE, h);
    });

    // ✅ Only income sections
    const flatIncome = Object.entries(income)
      .filter(([key]) => key.toLowerCase())
      .flatMap(([_, val]) => val || []);

    // console.log(flatIncome);

    const resultMap = new Map();

    for (const item of flatIncome) {
      if (!item?.CODE) continue;

      const group = groupMap.get(item.CODE);
      if (!group?.DM_GRCODE) continue;

      const head = headMap.get(group.DM_GRCODE);
      if (!head) continue;

      const groupKey = head.DM_GRCODE;

      if (!resultMap.has(groupKey)) {
        resultMap.set(groupKey, {
          groupHead: head.DM_GRDESC,
          groupData: new Map(),
          order: head.DM_ORDER || 999,
        });
      }

      const groupObj = resultMap.get(groupKey);
      const subName = group.DG_DESC;

      if (!groupObj.groupData.has(subName)) {
        groupObj.groupData.set(subName, {
          subGroupName: subName,
          collection: null,
          netAmount: 0,
          tax: 0,
          discount: 0,
          gross: 0,
          style: "N",
        });
      }

      const sub = groupObj.groupData.get(subName);

      sub.netAmount += item.AMT || 0;
      sub.tax += item.TAX || 0;
      sub.discount += item.DISCOUNT || 0;
      sub.gross += item.GROSSAMT || 0;
    }

    return Array.from(resultMap.values())
      .sort((a, b) => a.order - b.order)
      .map((group) => {
        const subGroups = Array.from(group.groupData.values());

        const total = subGroups.reduce(
          (acc, cur) => {
            acc.netAmount += cur.netAmount;
            acc.tax += cur.tax;
            acc.discount += cur.discount;
            acc.gross += cur.gross;
            return acc;
          },
          {netAmount: 0, tax: 0, discount: 0, gross: 0},
        );

        subGroups.push({
          subGroupName: "SubGroupTotal",
          collection: 0,
          netAmount: total.netAmount,
          tax: total.tax,
          discount: total.discount,
          gross: total.gross,
          style: "N",
        });

        return {
          groupHead: group.groupHead,
          groupData: subGroups,
        };
      });
  }, [apiData?.data?.income, apiData?.data?.masterData]);
};
