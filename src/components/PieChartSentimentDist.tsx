import React, { useRef, useEffect } from "react";

// Data interface that defines the structure of data to be passed as a prop
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
// PieChartProps interface that defines the structure of the props for the PieChart component
interface PieChartProps {
  data: Data[];
}

let ApexCharts;

// PieChart functional component that receives data as props and returns a pie chart
const PieChart: React.FC<PieChartProps> = ({ data }) => {
  // Create a reference to the chart DOM element
  const chartRef = useRef(null);

  // Use effect hook to render the chart
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the ApexCharts library dynamically only if the window object exists (i.e. not in the server)
      ApexCharts = require("apexcharts");

      // Parse the data received from props to a JSON object
      const parsedData = JSON.parse(JSON.stringify(data));

      // Create an object to store the sentiment counts
      const sentimentCounts = {
        Bullish: 0,
        Bearish: 0,
        Neutral: 0,
      };

      // Loop through the parsed data to count the number of tweets for each sentiment
      parsedData.forEach((datum) => {
        sentimentCounts[datum.sentiment]++;
      });

      // Extract the sentiments and tweet counts from the sentimentCounts object
      const sentiments = Object.keys(sentimentCounts);
      const tweetCounts = Object.values(sentimentCounts);

      // Create a new instance of the ApexCharts pie chart using the chartRef
      const chart = new ApexCharts(chartRef.current, {
        series: tweetCounts,
        labels: sentiments,
        chart: {
          type: "pie",
        },
        title: {
          text: "Sentiment Distribution",
        },
      });

      // Render the chart
      chart.render();
    }
  }, [data]);

  // Return the chartRef as the root element of the component
  return <div ref={chartRef} />;
};

export default PieChart;
