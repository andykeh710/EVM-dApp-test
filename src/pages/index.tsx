import { Web3ReactProvider } from "@web3-react/core";
import React, { useEffect, useState } from "react";

import Demo, { getLibrary } from "../components/Demo";
import LineChart from "../components/DynamicLineChart";
import Header from "../components/Header";
import HeatMap from "../components/HeatMap";
import PieChart from "../components/PieChartSentimentDist";
import Form from "../components/TweetCost";
import useLocalStorage from "../hooks/useLocalStorage";

const App = function () {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("theme", "dark");
  const [data, setData] = useState<any>(null);
  // const handleFormSubmit = async (formData) => {
  //   try {
  //     const response = await fetch("http://localhost:5001/submit", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      document.documentElement.setAttribute("data-theme", prevTheme === "dark" ? "light" : "dark");
      return prevTheme === "dark" ? "light" : "dark";
    });
  };
  return (
    <>
      <div className="fixed top-0 right-0 mt-2 mr-4">
        <button type="button" onClick={toggleTheme} className="btn">
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="container mx-auto min-h-screen">
          <Demo />
          <div>
            <Form onSubmit={setData} />
            {data && <LineChart data={data} />}
            {data && <PieChart data={data} />}
            {data && <HeatMap data={data} />}
          </div>
        </div>
        <footer className="p-10 footer bg-base-200 text-base-content"></footer>
      </Web3ReactProvider>
    </>
  );
};

export default App;
