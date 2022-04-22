import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import ApexCharts from "react-apexcharts";
import {getHeatMap} from "./store/action/index"

export default function ApexColumnAreaChart() {
  const dispatch = useDispatch();
  const heatmap = useSelector(state => state.heatmap);
    useEffect(() => {
      dispatch(getHeatMap());
    }, []);

    const series = [{
      name: 'Successful submissions',
      type: 'column',
      data: heatmap.solved
    }, {
      name: 'Total submissions',
      type: 'area',
      data: heatmap.attempted
    }];
    
    const chartSettings = {
      colors: ['#4D53E0', '#C7D0D9'],
      chart: {
        toolbar: {
          show: false,
        },
        height: 350,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 0],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      fill: {
        type: "solid",
        opacity: [1, 0.5],
      },
      labels: heatmap.labels,
      markers: {
        size: 0
      },
      xaxis: {
        type: 'category',
        labels: {
          style: {
            colors: "#6B859E",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["#6B859E"],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + "";
            }
            return y;
    
          }
        }
      }
    };

  return (
    <ApexCharts
      options={chartSettings}
      series={series}
      type="area"
      height={300}
    />
  );
}
