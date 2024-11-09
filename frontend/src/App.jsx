import "./App.css";
import Image from "./quotebook.png";
import { useEffect, useState } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const submitQuote = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);

    try {
      const response = await fetch("http://localhost:5173/api/quote", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Quote submitted successfully");
        setName("");
        setMessage("");
        fetchQuotes();
      } else {
        const errorData = await response.json();
        console.error("Error submitting quote:", errorData);
      }
    } catch (error) {
      console.error("Error adding quote:", error);
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`http://localhost:5173/api/quote?max_age=${time}`);
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const data = await response.json();
	  const sortedData = data.sort((a, b) => new Date(b.time) - new Date(a.time));
      setQuotes(sortedData);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const resetQuotes = () => {
    setQuotes([]); // Reset the quotes state
  };

  useEffect(() => {
    if (time) {
      fetchQuotes();
    } else {
      fetchQuotes();
    }
  }, [time]);

  const parseTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  return (
    <div className="App">
      <img src={Image} width="100px" alt="quote book" />
      <h1>Hack at UCI Tech Deliverable</h1>

      <h2>Submit a quote</h2>
      <form onSubmit={submitQuote}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Quote
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter time (e.g., 2024-11-08T19:00:00)"
        />
      </label>
	  
      <h3>Submitted Quotes:</h3>
      <button onClick={resetQuotes}>Reset Quotes</button>
      <ul>
        {quotes.map((quote, index) => (
          <li key={index}>
            "{quote.message}" - {quote.name} {parseTime(quote.time)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
