import React, { useEffect, useState } from 'react';
import './App.css';
import Image from './quotebook.png';
import QuoteList from './components/QuoteList';  // Import QuoteList component

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
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    if (time) {
      fetchQuotes();
    } else {
      fetchQuotes();
    }
  }, [time]);

  const stringTime = (time) => {
    const datetime = time.split(" ");
    if (datetime.length === 2) {
      return `${datetime[0]}T${datetime[1]}`;
    }
    return time; 
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTime(stringTime(value));
  };

  return (
    <div className="App">
      <img src={Image} width="100px" alt="quote book" />
      <div>
        <div className="text-center">
          <h1 className="text-2xl">Hack at UCI Quotebook</h1>
        </div>
      </div>

      <h2>Submit a quote:</h2>
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
          onChange={handleChange}
          placeholder="Enter time (e.g., 2024-11-08 19:00:00)"
          style={{
            width: '350px',
            height: '40px',
            fontSize: '18px',
            padding: '10px',
          }}
        />
      </label>

      <h3>Submitted Quotes:</h3>
      <QuoteList quotes={quotes} />
    </div>
  );
}

export default App;
