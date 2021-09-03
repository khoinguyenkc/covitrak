import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';
import { prettyPrintStat } from './util.js'
function InfoBox({title, cases, total, active, color, ...props}) {
    const cssColorClass = `infoBox__cases--${color}`
    return (
        <Card 
            onClick ={props.onClick}
            className={`infoBox ${active && "infoBox--selected"}`}
        >
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary">{title.toUpperCase()}</Typography>
                <h2 className={`infoBox__cases ${cssColorClass }`} >{prettyPrintStat(cases)} <span className="infoBox__cases_span">TODAY</span></h2>
                <Typography className="infoBox__total">{prettyPrintStat(total)} TOTAL</Typography>
            </CardContent>
        </Card>    )
}

export default InfoBox
