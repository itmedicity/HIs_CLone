// @ts-nocheck
import React, {memo, useEffect, useState} from "react";
import ContentMain from "../Components/ContentMain";
import ContentSecondary from "../Components/ContentSecondary";
import ContentPaper from "../Components/ContentPaper";
import ContentNavLink from "../Components/ContentNavLink";

import {top_officials} from "../../Routes/routes_mis";
import {getMenuSlno, usergroupid} from "../../HomeComponents/MenuRights/menuRights";
import {topOfficilasMenu} from "../../Menu/MISBillingMenu";

const Mis = () => {
  const user = usergroupid();
  const [menuList, setmenuList] = useState({
    topOff: [],
    topOff_new: [],
    topOff_old: [],
    topOff_RMT: [],
    regCons: [],
    gstRep: [],
  });
  // const [topoff, setTopOff] = useState();
  useEffect(() => {
    getMenuSlno(user).then((val) => {
      const menuSlno = val.map((value) => {
        return value.menuname_id;
      });
      // const topoffcmenu = topOfficilasMenu.filter((val) => menuSlno.includes(val.slno));
      // setTopOff(topoffcmenu);
      setmenuList((prev) => ({
        ...prev,
        topOff: topOfficilasMenu.filter((val) => menuSlno.includes(val.slno)).filter((e) => e.module === 1),
        topOff_new: topOfficilasMenu.filter((val) => menuSlno.includes(val.slno)).filter((e) => e.module === 3),
        topOff_old: topOfficilasMenu.filter((val) => menuSlno.includes(val.slno)).filter((e) => e.module === 4),
        topOff_RMT: topOfficilasMenu.filter((val) => menuSlno.includes(val.slno)).filter((e) => e.module === 5),
        regCons: [],
        gstRep: topOfficilasMenu.filter((val) => menuSlno.includes(val.slno)).filter((e) => e.module === 2),
      }));
    });
  }, [user]);

  // console.log(menuList);

  return (
    <ContentMain>
      <ContentSecondary name="MIS">
        <ContentPaper name="Top Officials -New MIS">
          {menuList?.topOff_new?.map((val) => (
            <ContentNavLink name={val.name} route={val.path} key={`topOff_new${val.slno}`} />
          ))}
        </ContentPaper>
        <ContentPaper name="Top Officials">
          {menuList?.topOff?.map((val) => (
            <ContentNavLink name={val.name} route={val.path} key={val.slno} />
          ))}
        </ContentPaper>
        <ContentPaper name="Top Officials - Old MIS">
          {menuList?.topOff_old?.map((val) => (
            <ContentNavLink name={val.name} route={val.path} key={`topOff_old${val.slno}`} />
          ))}
        </ContentPaper>
        <ContentPaper name="Top Officials - RMT">
          {menuList?.topOff_RMT?.map((val) => (
            <ContentNavLink name={val.name} route={val.path} key={`topOff_RMT${val.slno}`} />
          ))}
        </ContentPaper>
        <ContentPaper name="Reg. Cons.">
          <ContentNavLink name="Query Add/Edit" route="" />
        </ContentPaper>
        <ContentPaper name="Gst Reports">
          {menuList?.gstRep?.map((val) => (
            <ContentNavLink name={val.name} route={val.path} key={`GstRep${val.slno}`} />
          ))}
        </ContentPaper>
      </ContentSecondary>
    </ContentMain>
  );
};

export default memo(Mis);
