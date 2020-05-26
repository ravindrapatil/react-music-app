import React from 'react';
import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core/';

function CompanyInfo({ companyInfo }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="subtitle2">
                    {companyInfo.description}
                </Typography>
                <Typography variant="subtitle2" style={{marginTop: '25px'}}>
                    Website: <a href={companyInfo.website} target='blank'>{companyInfo.website}</a>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CompanyInfo
