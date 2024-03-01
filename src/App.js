import React from "react";
import { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who won the latest Novel Peace Prize?",
    "Where does pizza come from?",
    "Who do you make a BLT sandwich?",
  ];

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("https://gemini-backend.vercel.app/gemini", options);
      const data = await response.text();
      console.log(data);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: data,
        },
      ]);
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong! Please try again later.");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  return (
    <div className="app">
      <h2 style={{ fontSize: "20px", text: "center" }}>
        Gemini-pro model{" "}
        {/* <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            style={{ marginTop: "1px"}}
            fill="currentColor"
            class="bi bi-lightning-charge-fill"
            viewBox="0 0 16 16"
          >
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
          </svg>
        </span> */}
      </h2>
      <p></p>
      <div className="input-container">
        <input
          value={value}
          placeholder=" What do want to know ?"
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && (
          <button
            onClick={getResponse}
            style={{ background: "#808080", color: "white", fontSize: "18px" }}
          >
            Ask me
          </button>
        )}
        {/* {error && <button onClick={clear}>Clear</button>} */}
      </div>
      {error && <p>{error}</p>}
      <div style={{ marginTop: "30px" }}>
        <button
          className="surprise"
          style={{ fontSize: "15px", padding: "9px" }}
          onClick={surprise}
          disabled={!chatHistory}
        >
          Surprise me
        </button>
        <button
          className="surprise"
          style={{ fontSize: "15px", padding: "9px" }}
          onClick={clear}
        >
          Clear
        </button>
      </div>
      <div className="search-result">
        {chatHistory.map((chatItem, _index) => (
          <div key={_index}>
            <p className="answer">
              {chatItem.role}: {chatItem.parts}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;