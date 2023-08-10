import React, { memo, useEffect, useState } from 'react'
import ContentMain from '../Components/ContentMain';
import ContentSecondary from '../Components/ContentSecondary';
import ContentPaper from '../Components/ContentPaper';
import ContentNavLink from '../Components/ContentNavLink';
import { analysis_settings, stock_settings } from '../../Routes/routes.pharmacybilling';
import { analysisMenuName, stockMenuName } from '../../Menu/PharmacyBillingMenu';
import { getMenuSlno, usergroupid } from '../../HomeComponents/MenuRights/menuRights';

const PharmacyBilling = () => {

    const user = usergroupid()
    const [anaList, setanaList] = useState()
    const [stockList, setStockList] = useState()
    useEffect(() => {
        getMenuSlno(user).then((val) => {
            const menuSlno = val.map((value) => {
                return value.menuname_id
            })
            const analysisMenushow = analysisMenuName.filter(val => menuSlno.includes(val.slno));
            setanaList(analysisMenushow)


            const stockMenushow = stockMenuName.filter(val => menuSlno.includes(val.slno));
            setStockList(stockMenushow)
        })
    }, [user])

    return (
        <ContentMain>
            <ContentSecondary name="Pharmacy Billing">
                <ContentPaper name="Sales">

                </ContentPaper>
                <ContentPaper name="Sales Return">

                </ContentPaper>
                <ContentPaper name="Analysis Statement">
                    {
                        anaList && anaList.map((val) => {
                            return <ContentNavLink name={val.name} route={val.path} key={val.slno} />;
                        })
                    }
                    {/* {
                        analysis_settings.map((element, idx) => <ContentNavLink name={element.name} route={element.path} key={idx} />)
                    } */}
                </ContentPaper>
                <ContentPaper name="In Charge">

                </ContentPaper>
                <ContentPaper name="Stock">
                    {
                        stockList && stockList.map((val) => {
                            return <ContentNavLink name={val.name} route={val.path} key={val.slno} />;
                        })
                    }
                    {/* {
                        stock_settings.map((element, idx) => <ContentNavLink name={element.name} route={element.path} key={idx} />)
                    } */}
                </ContentPaper>
                <ContentPaper name="Expiry">

                </ContentPaper>

            </ContentSecondary>
        </ContentMain>
    )
}

export default memo(PharmacyBilling)