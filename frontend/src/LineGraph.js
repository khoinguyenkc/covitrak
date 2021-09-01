import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import numeral from "numeral";

/*if i set maitnainaspect ratio false, for some reason the chart stretches forever. */
const options = {
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(39, 82, 48)'
    }

    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: true,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
  



  

function LineGraph() {
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

        for ( let date in data.cases ) {
            /* data.cases is an object of key and values. each "date" is a key. like 09/20/21. value is how many cases. confusing i know */
            /*first iteration will skip this if loop, the rest always go thru it */
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data.cases[date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }

            /*update latest datapoint */
            lastDataPoint = data.cases[date];
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
        
    }, [] )

    {}


    return (
        <div>
            <h2>Worldwide</h2>
            { data && data.length > 0 && (
                 <Line
                 style={{height:"200px"}}
                data={{
                    datasets: [
                        {data: data,
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034"}
                    ]
                }}
                options={options}            
            />)
            
            }
            

        </div>
    )
}

export default LineGraph
