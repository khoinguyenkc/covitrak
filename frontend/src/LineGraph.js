import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import { lineGraphOptions } from "./linegraphoptions";



  

function LineGraph({casesType}) {
    const [ data, setData ] = useState({})
    // curl -X GET "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

    const buildChartData = (data) => { /* */
        /*explaination: raw data only gives u total cases count for each day. but we want to get how many NEW cases, so we have to take today and subtract yesterday
        */
       /*input: { 
           10/25/2020: 35000, 
         10/26/2020: 36500
        } */
       /* end result: an array of objects, each object represents a "point", contains an x key and y key
         [ {x: 10/25/2020, y: 20}, {x: 10/26/2020, y: 10} ] */
        let chartData = [];



        let lastDataPoint; 

        for ( let date in data[casesType] ) {
            /* data.cases is an object of key and values. each "date" is a key. like 09/20/21. value is how many cases. confusing i know */
            /*first iteration will skip this if loop, the rest always go thru it */
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }

            /*update latest datapoint */
            lastDataPoint = data[casesType][date];
        }

        return chartData;
    }


    useEffect( () => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then( resp => resp.json())
            .then( thedata => {
                setData(buildChartData(thedata))
            }) 
        }

        fetchData()
        
    }, [casesType] )

    {}

                //  style={{height:"100px"}}

    return (
        <div class="linegraph--section">
            <h2>Worldwide</h2>
            <div class="linegraph-container">
            { data && data.length > 0 && (
                 <Line
                 style={{height:"200px"}}
                data={{
                    datasets: [
                        {
                            label: casesType.toUpperCase(),
                            data: data,
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034"}
                    ]
                }}
                options={lineGraphOptions}            
            />
            )
            
            }

            </div>
            

        </div>
    )
}

export default LineGraph
