import $ from "jquery";
import React, { useState } from "react";

interface FormData {
  twitter_handle: string;
  token_name: string;
  token_ticker: string;
  start_date: string;
  end_date: string;
}

interface Props {
  onSubmit: (formData: FormData) => void;
}

const Form: React.FC<Props> = ({ onSubmit }) => {
  const [twitterHandle, setTwitterHandle] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenTicker, setTokenTicker] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          twitter_handle: twitterHandle,
          token_name: tokenName,
          token_ticker: tokenTicker,
          start_date: startDate,
          end_date: endDate,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Response not found: ${response.statusText}`);
      }

      const responseData = await response.json();
      onSubmit(responseData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="twitter_handle">Twitter Handle:</label>
        <input
          type="text"
          id="twitter_handle"
          value={twitterHandle}
          onChange={(event) => setTwitterHandle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="token_name">Token Name:</label>
        <input type="text" id="token_name" value={tokenName} onChange={(event) => setTokenName(event.target.value)} />
      </div>
      <div>
        <label htmlFor="token_ticker">Token Ticker:</label>
        <input
          type="text"
          id="token_ticker"
          value={tokenTicker}
          onChange={(event) => setTokenTicker(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="start_date">Start Date:</label>
        <input type="text" id="start_date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
      </div>
      <div>
        <label htmlFor="end_date">End Date:</label>
        <input type="text" id="end_date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
      </div>
      {loading ? <div className="loading-bar"></div> : <button type="submit">Submit</button>}
    </form>
  );
};

export default Form;
