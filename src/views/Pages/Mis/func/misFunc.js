export const getMisGroupMasterList = async (misGroupState, misGroupMaster) => {
    if (misGroupState.status === true && misGroupMaster.status === true) {
        return await misGroupState?.data?.map((val) => {
            return {
                groupDesc: val.DM_GRDESC,
                groupOrder: val.DM_ORDER,
                groupCode: val.DM_GRCODE,
                groupList: misGroupMaster?.data
                    .map((ele) => val.DM_GRCODE === ele.DM_GRCODE ? ele : null)
                    .filter((val) => val !== null)
            }
        }).sort((firstItem, secondItem) => firstItem.groupOrder - secondItem.groupOrder)

    }
}

export const getIncomeReportList = async (incomeArrayData, misGroupLst) => {

    // console.log(incomeArrayData)

    const firstArray = incomeArrayData?.find((val) => val !== null);

    console.log(firstArray)

    if (firstArray !== undefined && (misGroupLst !== undefined)) {
        return await misGroupLst?.map((val) => {
            // console.log(val)
            return {
                groupCode: val.groupCode,
                groupDesc: val.groupDesc,
                groupList: val.groupList?.map((e) => {
                    return {
                        groupName: e.DG_DESC,
                        groupNet: incomeArrayData?.filter((ele) => ele?.CODE === e?.DG_GRCODE)
                            .reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0),
                        groupDiscnt: incomeArrayData?.filter((ele) => ele?.CODE === e?.DG_GRCODE)
                            .reduce((accumulator, currentValue) => accumulator + currentValue.DISCOUNT, 0),
                        groupTax: incomeArrayData?.filter((ele) => ele?.CODE === e?.DG_GRCODE)
                            .reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0),
                        groupGross: incomeArrayData?.filter((ele) => ele?.CODE === e?.DG_GRCODE)
                            .reduce((accumulator, currentValue) => accumulator + currentValue.GROSSAMT, 0)
                    }
                    // @ts-ignore
                }).filter((val, idx) => val.groupGross !== 0),
            }
        })
    }
}

//CALCULATE PHARMACY INCOME
export const getPhamracyIncome = async (pharmacyIncome) => {
    const phaIncome = Object.values(pharmacyIncome);
    const pharma = phaIncome?.map((val) => val.data).filter((val) => val !== undefined).flat();
    if (pharma?.length !== 0) {
        return {
            netAmount: pharma.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0),
            tax: pharma.reduce((accumulator, currentValue) => accumulator + currentValue.TAX, 0),
            discount: pharma.reduce((accumulator, currentValue) => accumulator + currentValue.DISCOUNT, 0) ?? 0,
            grossAmount: pharma.reduce((accumulator, currentValue) => accumulator + currentValue.GROSSAMT, 0)
        }
    }
}

//CALCULATE GRAND TOTAL
export const getGrandTotal = async (misReortList) => {
    return misReortList?.map((val) => val.groupList).flat()
}

