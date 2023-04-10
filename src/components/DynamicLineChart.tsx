import dynamic from "next/dynamic";

const DynamicLineChart = dynamic(() => import("./LineChart"), {
  ssr: false,
});

export default DynamicLineChart;
