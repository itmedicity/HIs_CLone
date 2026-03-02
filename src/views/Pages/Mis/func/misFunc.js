export const getMisGroupMasterList = (misList) => {
  if (!misList?.misGroup || !misList?.misGroupMast) return [];
  // console.log(misList);
  const {misGroup, misGroupMast} = misList;
  return misGroupMast
    ?.map((val) => {
      return {
        groupDesc: val.DM_GRDESC,
        groupOrder: val.DM_ORDER,
        groupCode: val.DM_GRCODE,
        groupList: misGroup?.map((ele) => (val.DM_GRCODE === ele.DM_GRCODE ? ele : null)).filter((val) => val !== null),
      };
    })
    .sort((firstItem, secondItem) => firstItem.groupOrder - secondItem.groupOrder);
  // }
};

export const getIncomeReportList = (incomeArrayData = [], misGroupLst = []) => {
  // Build lookup map once
  // console.log(misGroupLst, "misGroupLst");
  const incomeMap = {};

  incomeArrayData.forEach((item) => {
    if (!item?.CODE) return;

    if (!incomeMap[item.CODE]) {
      incomeMap[item.CODE] = {
        groupNet: 0,
        groupDiscnt: 0,
        groupTax: 0,
        groupGross: 0,
      };
    }

    incomeMap[item.CODE].groupNet += item.AMT || 0;
    incomeMap[item.CODE].groupDiscnt += item.DISCOUNT || 0;
    incomeMap[item.CODE].groupTax += item.TAX || 0;
    incomeMap[item.CODE].groupGross += item.GROSSAMT || 0;
  });

  return misGroupLst.map((group) => ({
    groupCode: group.groupCode,
    groupDesc: group.groupDesc,
    groupList: group.groupList
      ?.map((e) => ({
        groupName: e.DG_DESC,
        ...(incomeMap[e.DG_GRCODE] || {
          groupNet: 0,
          groupDiscnt: 0,
          groupTax: 0,
          groupGross: 0,
        }),
      }))
      .filter((val) => val.groupGross !== 0),
  }));
};

//CALCULATE PHARMACY INCOME
export const getPhamracyIncome = (pharmacyIncome = {}) => {
  const pharma = Object.values(pharmacyIncome).flat();

  if (!pharma.length) {
    return {netAmount: 0, tax: 0, discount: 0, grossAmount: 0};
  }

  return pharma.reduce(
    (acc, curr) => {
      acc.netAmount += curr.AMT || 0;
      acc.tax += curr.TAX || 0;
      acc.discount += curr.DISCOUNT || 0;
      acc.grossAmount += curr.GROSSAMT || 0;
      return acc;
    },
    {netAmount: 0, tax: 0, discount: 0, grossAmount: 0},
  );
};

//CALCULATE GRAND TOTAL
export const getGrandTotal = (misReortList) => {
  return misReortList?.map((val) => val.groupList).flat();
};
