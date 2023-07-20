import React, { memo } from 'react'
import ContentMain from '../Components/ContentMain';
import ContentSecondary from '../Components/ContentSecondary';
import ContentPaper from '../Components/ContentPaper';
import ContentNavLink from '../Components/ContentNavLink';
import { analysis_settings, stock_settings } from '../../Routes/routes.pharmacybilling';

const PharmacyBilling = () => {
    return (
        <ContentMain>
            <ContentSecondary name="Pharmacy Billing">
                <ContentPaper name="Sales">

                </ContentPaper>
                <ContentPaper name="Sales Return">

                </ContentPaper>
                <ContentPaper name="Analysis Statement">
                    {
                        analysis_settings.map((element, idx) => <ContentNavLink name={element.name} route={element.path} key={idx} />)
                    }
                </ContentPaper>
                <ContentPaper name="In Charge">

                </ContentPaper>
                <ContentPaper name="Stock">
                    {
                        stock_settings.map((element, idx) => <ContentNavLink name={element.name} route={element.path} key={idx} />)
                    }
                </ContentPaper>
                <ContentPaper name="Expiry">

                </ContentPaper>

            </ContentSecondary>
        </ContentMain>
    )
}

export default memo(PharmacyBilling)