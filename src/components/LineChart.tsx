import React, { useRef, useEffect } from "react";

import withClientSideRendering from "./withClientSideRendering";

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

interface LineChartProps {
  data: Data[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      const ApexCharts = require("apexcharts");
      const parsedData = JSON.parse(JSON.stringify(data));
      const charting = {};
      parsedData.forEach((datum) => {
        if (datum.sentiment === "Bullish" || datum.sentiment === "Bearish") {
          datum.days.forEach((day) => {
            if (!charting[day.day]) {
              charting[day.day] = 0;
            }

            if (datum.sentiment === "Bullish") {
              charting[day.day] += day.value;
            } else {
              charting[day.day] -= day.value;
            }
          });
        }
      });

      const chartData = [];
      Object.keys(charting).forEach((day) => {
        chartData.push({
          day: day,
          value: charting[day],
        });
      });

      new ApexCharts(chartRef.current, {
        chart: {
          type: "bar",
          width: "100%",
          height: "400",
        },
        xaxis: {
          categories: chartData.map((datum) => datum.day),
        },
        series: [
          {
            name: "Score",
            data: chartData.map((datum) => (datum.value >= 0 ? datum.value : 0)),
            color: "#00B150",
          },
          {
            name: "Score",
            data: chartData.map((datum) => (datum.value < 0 ? -datum.value : 0)),
            color: "#D00000",
          },
        ],
      }).render();
    }
  }, [data, isMounted]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div ref={chartRef} style={{ width: "100%" }} />
    </div>
  );
};

export default withClientSideRendering(LineChart);
