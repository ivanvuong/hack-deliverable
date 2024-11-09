import "./App.css";
import Image from "./quotebook.png";
import { useEffect, useState } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

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
      const response = await fetch('http://localhost:5173/api/quote');
	  console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };
  useEffect(() => {
    fetchQuotes(); 
  }, []);

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

      <h3>Submitted Quotes:</h3>
      <ul>
        {quotes.map((quote, index) => (
          <li key={index}>
            "{quote.message}" - {quote.name} at {quote.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
