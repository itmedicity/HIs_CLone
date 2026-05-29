import React from "react";
import {Route, Routes} from "react-router-dom";
import CreditInsuranseBillDetl from "../Modals/tmch/CreditInsuranseBillDetl";
import TmchCreditInsuranceBill from "../Modals/tmch/TmchCreditInsuranceBill";
import CreditInsuranceBill from "../Modals/tssh/CreditInsuranceBill";
import CreditInsuranceBillCollection from "../Modals/tssh/CreditInsuranceBillCollection";
import CreditInsuranceBillGrouped from "../Modals/grouped/CreditInsuranceBill";
import CreditInsurnaceCollectionGrouped from "../Modals/grouped/CreditInsurnaceCollection";
import QmtCreditInsuranceBill from "../Modals/qmt/CreditInsuranceBill";
import QmtCreditInsuranceBillCollection from "../Modals/qmt/CreditInsuranceBillCollection";
import UnsettledAmount from "../Modals/qmt/UnsettledAmount";
import AdvanceCollection from "../Modals/qmt/AdvanceCollection";
import UnsettledGrouped from "../Modals/grouped/UnsettledGrouped";
import AdvanceCollectionGrouped from "../Modals/grouped/AdvanceCollectionGrouped";

const LayoutRouts = () => {
  return (
    <Routes>
      {/* tmch */}
      <Route path="/CreditInsuranseBillModal" element={<CreditInsuranseBillDetl />} />
      <Route path="/TmchCreditInsuranceBillModal" element={<TmchCreditInsuranceBill />} />
      {/* tssh */}
      <Route path="/TsshCreditInsuranseBillCollectionModal" element={<CreditInsuranceBillCollection />} />
      <Route path="/TsshCreditInsuranceBillModal" element={<CreditInsuranceBill />} />
      {/* grouped */}
      <Route path="/GroupedCreditInsuranseBillCollectionModal" element={<CreditInsurnaceCollectionGrouped />} />
      <Route path="/GroupedCreditInsuranceBillModal" element={<CreditInsuranceBillGrouped />} />
      <Route path="/GroupedUnsettledAmountlModal" element={<UnsettledGrouped />} />
      <Route path="/GroupedAdvanceCollectionModal" element={<AdvanceCollectionGrouped />} />
      {/* qmt */}
      <Route path="/QmtCreditInsuranseBillCollectionModal" element={<QmtCreditInsuranceBillCollection />} />
      <Route path="/QmtCreditInsuranceBillModal" element={<QmtCreditInsuranceBill />} />
      <Route path="/QmtUnsettledAmountlModal" element={<UnsettledAmount />} />
      <Route path="/QmtAdvanceCollectionModal" element={<AdvanceCollection />} />
    </Routes>
  );
};

export default LayoutRouts;
