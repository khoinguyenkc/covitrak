import numeral from "numeral";

/*if i set maitnainaspect ratio false, for some reason the chart stretches forever. */
export const lineGraphOptions = {
    // legend: {
    //   display: false,
    //   labels: {
    //     fontColor: 'rgb(39, 82, 48)'
    // }

    // },
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
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
          format: "MM/YY",

          time: {
            // tooltipFormat: "ll",
          //   displayFormats: {
          //     month: 'MM YYYY'
          // },


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
