import React, { useRef, useEffect } from "react";

interface Data {
  confidence: number;
  content: string;
  date: string;
  days: { day: number; value: number }[];
  id: number;
  likes: number;
  price_at_tweet: number;
  retweets: number;
  sentiment: string;
  twitter_handle: string;
}

interface HeatMapProps {
  data: Data[];
}

let ApexCharts;

const HeatMap: React.FC<HeatMapProps> = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      ApexCharts = require("apexcharts");
      const parsedData = JSON.parse(JSON.stringify(data));

      const sentimentValues = {
        Bullish: 1,
        Bearish: -1,
        Neutral: 0,
      };

      const heatmapData = [];
      parsedData.forEach((datum) => {
        const sentimentCorrect =
          (datum.sentiment === "Bullish" && datum.price > datum.price_at_tweet) ||
          (datum.sentiment === "Bearish" && datum.price < datum.price_at_tweet);

        heatmapData.push({
          x: new Date(datum.date).getTime(),
          y: sentimentValues[datum.sentiment],
          value: datum.confidence,
          sentimentCorrect: sentimentCorrect,
        });
      });

      new ApexCharts(chartRef.current, {
        series: [
          {
            name: "Sentiment",
            data: heatmapData,
          },
        ],
        chart: {
          type: "heatmap",
          height: 350,
        },
        xaxis: {
          type: "datetime",
        },
        plotOptions: {
          heatmap: {
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 0.4,
                  color: "#FF0000",
                  name: "low",
                },
                {
                  from: 0.4,
                  to: 0.8,
                  color: "#FFFF00",
                  name: "medium",
                },
                {
                  from: 0.8,
                  to: 1,
                  color: "#00FF00",
                  name: "high",
                },
              ],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "Sentiment Heatmap",
        },
      }).render();
    }
  }, [data]);

  return (
    <div id="chart">
      <div ref={chartRef} />
    </div>
  );
};

export default HeatMap;
