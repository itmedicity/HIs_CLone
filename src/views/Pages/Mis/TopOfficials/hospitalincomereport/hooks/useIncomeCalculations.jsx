import {useMemo} from "react";

export const useIncomeCalculations = (apiData, setLoading, grpval) => {
  return useMemo(() => {
    if (!apiData?.data) {
      return {
        pharmacyIncome: [],
        IpConsolidatedDiscountSection: [],
        CollectionAgainstSalesSection: [],
        CreditInsuranceBillSection: [],
        CounterCollection: 0,
        Patient_Type: [],
      };
    }
    const sum = (arr, key) => arr.reduce((acc, cur) => acc + (cur?.[key] || 0), 0);

    const data = apiData.data;
    const income = data.income || {};
    // console.log(data);
    // =========================
    // 🟢 GRAND TOTAL FROM API
    // =========================
    const flatIncome = Object.entries(income).flatMap(([_, val]) => val || []);

    // console.log(sum(flatIncome, "AMT"));

    const GrandIncomeTotal = {
      netAmount: sum(flatIncome, "AMT"),
      tax: sum(flatIncome, "TAX"),
      discount: sum(flatIncome, "DISCOUNT"),
      gross: sum(flatIncome, "GROSSAMT"),
    };

    // console.log(GrandIncomeTotal);

    // =========================
    // 🟢 PHARMACY
    // =========================
    const pharmacy = data.pharmacy || {};
    const pharma_netAmount = (pharmacy.getPharmacyCollection_One?.[0]?.AMT || 0) + (pharmacy.getPharmacyCollection_four?.[0]?.AMT || 0) + (pharmacy.getPharmacyReturnSection_three?.[0]?.AMT || 0);
    const pharmacy_tax = pharmacy.getPharmacyCollection_One?.[0]?.TAX || 0;
    const pharmacy_discount =
      (pharmacy.getPharmacyCollection_One?.[0]?.DISCOUNT || 0) + (pharmacy.getPharmacyCollection_four?.[0]?.DISCOUNT || 0) + (pharmacy.getPharmacyReturnSection_three?.[0]?.DISCOUNT || 0);
    const pharmacy_gross =
      (pharmacy.getPharmacyCollection_One?.[0]?.GROSSAMT || 0) + (pharmacy.getPharmacyCollection_four?.[0]?.GROSSAMT || 0) + (pharmacy.getPharmacyReturnSection_three?.[0]?.GROSSAMT || 0);

    const pharmacyIncome = [
      {
        subGroupName: "Pharmacy Medicine Sale",
        collection: null,
        netAmount: grpval !== 1 && pharma_netAmount,
        tax: grpval !== 1 && pharmacy_tax,
        discount: grpval !== 1 && pharmacy_discount,
        gross: grpval !== 1 && pharmacy_gross,
        style: "N",
      },
    ];

    // =========================
    // 🟢GROUPED PHARMACY - AMT
    // =========================

    const groupedPharmacy = data.groupedPharmacyService || {};
    const groupedPharmacyNetAmount =
      sum(groupedPharmacy.getGroupedPharmacyService_One || [], "AMT") +
      sum(groupedPharmacy.getGroupedPharmacyService_Three || [], "AMT") +
      sum(groupedPharmacy.getGroupedPharmacyService_Two || [], "AMT");

    // console.log(groupedPharmacyNetAmount);

    // =========================
    // 🟢 DISCOUNT
    // =========================
    const discount = data.discount || {};

    const ipConsolidatedDiscount = discount.IpConsolidated_Discount?.[0]?.DISCOUNT || 0;

    const IpConsolidatedDiscountSection = [
      {
        subGroupName: "Ip Consolidate Discount",
        netAmount: discount.IpConsolidated_Discount?.[0]?.DISCOUNT || 0,
        discount: discount.IpConsolidated_Discount?.[0]?.DISCOUNT || 0,
        style: "N",
      },
      {
        subGroupName: "Petty Cash Amount",
        netAmount: 0,
        style: "N",
      },
      {
        subGroupName: "Tax Amount",
        netAmount: pharmacyIncome[0].tax,
        style: "N",
      },
    ];

    const totalCollectedNetAmount = grpval === 1 ? GrandIncomeTotal?.netAmount - ipConsolidatedDiscount : GrandIncomeTotal?.netAmount + pharma_netAmount + pharmacy_tax - ipConsolidatedDiscount;
    // console.log(GrandIncomeTotal?.netAmount + pharma_netAmount + pharmacy_tax);
    // =========================
    // 🟢 COLLECTION AGAINST SALES
    // =========================
    const col1 = data.CollectionAgainstSales?.getCollectionAgainstSales_one || [];
    const col2 = data.CollectionAgainstSales?.getCollectionAgainstSales_two || [];

    const collectionA = sum(col1, "AMT") + sum(col2, "AMT");
    const taxTotal = sum(col2, "TAX");

    const advanceCollection = sum(data.AdvanceCollection?.getAdvanceCollection || [], "AMT");
    const advanceSettled = sum(data.AdvanceSettled?.getAdvanceSettled || [], "AMT");

    const creditInsuranceBill_collection1 = sum(data.Credit_Insurance_Bill?.Credit_Insurance_Bill_one || [], "AMT");
    const creditInsuranceBill_collection2 = sum(data.Credit_Insurance_Bill?.Credit_Insurance_Bill_two || [], "AMT");

    const creditInsuranceBill = creditInsuranceBill_collection1 + creditInsuranceBill_collection2;

    const creditInsuranceBill_tax1 = sum(data.Credit_Insurance_Bill?.Credit_Insurance_Bill_one || [], "TAX");
    const creditInsuranceBill_tax2 = sum(data.Credit_Insurance_Bill?.Credit_Insurance_Bill_two || [], "TAX");

    const creditInsuranceBill_tax = creditInsuranceBill_tax1 + creditInsuranceBill_tax2;

    const UnsettledAmount = sum(data.UnsettledAmount?.getUnsettledAmount || [], "AMT");
    const UnsettledAmount_tax = sum(data.UnsettledAmount?.getUnsettledAmount || [], "TAX");

    const totalCollectionAmount =
      grpval === 1
        ? collectionA - pharma_netAmount + advanceSettled + creditInsuranceBill + UnsettledAmount
        : collectionA + advanceSettled + creditInsuranceBill + UnsettledAmount + groupedPharmacyNetAmount;
    const roundOffAmount = totalCollectionAmount - totalCollectedNetAmount;

    const CollectionAgainstSalesSection = [
      {
        subGroupName: "Collection Against Sales (A)",
        collection: grpval === 1 ? collectionA - pharma_netAmount : collectionA + groupedPharmacyNetAmount,
        netAmount: null,
        tax: null,
        discount: null,
        gross: null,
        style: "N",
      },
      {
        subGroupName: "Advance Settled",
        collection: advanceSettled,
        netAmount: null,
        tax: null,
        discount: null,
        gross: null,
        style: "N",
      },
      {
        subGroupName: "Credit/Insurance Bill",
        collection: creditInsuranceBill,
        netAmount: null,
        tax: creditInsuranceBill_tax,
        discount: null,
        gross: null,
        style: "U",
      },
      {
        subGroupName: "UnSettled Amount",
        collection: UnsettledAmount,
        netAmount: null,
        tax: UnsettledAmount_tax,
        discount: null,
        gross: null,
        style: "U",
      },
      {
        subGroupName: "Round Off",
        collection: null,
        netAmount: roundOffAmount,
        tax: null,
        discount: null,
        gross: null,
        style: "N",
      },
      {
        subGroupName: "Grand Total",
        collection: totalCollectionAmount,
        netAmount: totalCollectedNetAmount + roundOffAmount,
        tax: grpval === 1 ? null : pharmacy_tax,
        discount: grpval === 1 ? GrandIncomeTotal?.discount + ipConsolidatedDiscount : GrandIncomeTotal?.discount + ipConsolidatedDiscount + pharmacy_discount,
        gross: grpval === 1 ? GrandIncomeTotal.gross : GrandIncomeTotal.gross + pharmacy_gross,
        style: "B",
      },
    ];

    // =========================
    // 🟢 ADVANCE / SETTLEMENT
    // =========================
    const advance = sum(data.AdvanceCollection?.getAdvanceCollection || [], "AMT");
    const settled = sum(data.CreditInSuranceBillCollection?.creditInsuranceBillCollection || [], "AMT");
    const ipPreviousDayCollection = sum(data.IpPreviousDayCollection?.getIpPreviousDayCollection || [], "AMT");
    const ipPreviousDayDiscount = sum(data.discount?.IpPreviousDayDicount || [], "DISCOUNT");
    const advanceRefund = 0;

    // =========================
    // 🟢 CREDIT INSURANCE
    // =========================
    // const credit = data.Credit_Insurance_Bill || {};

    // const creditTotal = sum(credit.Credit_Insurance_Bill_one || [], "AMT") + sum(credit.Credit_Insurance_Bill_two || [], "AMT");

    const CreditInsuranceBillSection = [
      {
        subGroupName: "Credit/Insurance Bill Discount",
        collection: 0,
        style: "N",
      },
      {
        subGroupName: "Credit/Insurance WriteOff Amount ",
        collection: 0,
        style: "N",
      },
      {
        subGroupName: "	Complimentary",
        collection: 0,
        style: "N",
      },
      {
        subGroupName: "IP Previous Day's  Discount",
        collection: ipPreviousDayDiscount,
        style: "N",
      },
      {
        subGroupName: "Advance Refund (B)",
        collection: advanceRefund,
        style: "N",
      },
      {
        subGroupName: "Advance Collection (C)",
        collection: advance,
        style: "U",
      },
      {
        subGroupName: "Credit/Insurance Bill Collection(D)",
        collection: settled,
        style: "U",
      },
      {
        subGroupName: "	IP Previous Day's  Collection(E)",
        collection: ipPreviousDayCollection,
        style: "N",
      },
    ];

    // =========================
    // 🟢 COUNTER COLLECTION
    // =========================
    const CounterCollection =
      grpval === 1
        ? collectionA + advance + settled + ipPreviousDayCollection - advanceRefund - pharma_netAmount
        : collectionA + advance + settled + ipPreviousDayCollection - advanceRefund + groupedPharmacyNetAmount;

    // =========================
    // 🟢 PATIENT TYPE
    // =========================
    const typeDiscount = data.discount?.getTypeDiscount || [];

    const Patient_Type = typeDiscount.map((item) => ({
      subGroupName: item.PTC_DESC || "Other",
      collection: item.DISCOUNT || 0,
      style: "N",
    }));

    const totalDiscount = Patient_Type.reduce((acc, cur) => acc + cur.collection, 0);

    Patient_Type.push({
      subGroupName: "Discount Total",
      collection: totalDiscount,
      style: "B",
    });
    setLoading(false);
    return {
      pharmacyIncome,
      IpConsolidatedDiscountSection,
      CollectionAgainstSalesSection,
      CreditInsuranceBillSection,
      CounterCollection,
      Patient_Type,
    };
  }, [apiData]);
};
