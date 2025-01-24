import React, {useState, ChangeEvent} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

type FrequencyOption = "Once" | "Daily" | "Weekly" | "Monthly";

const MessageScheduler: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<FrequencyOption>("Once");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addPhoneNumber = () => {
    if (phoneNumber && /^(\+1)?\d{10}$/.test(phoneNumber)) {
      if (!phoneNumbers.includes(phoneNumber)) {
        setPhoneNumbers([...phoneNumbers, phoneNumber]);
        setPhoneNumber("");
      } else {
        alert("This phone number is already in the list.");
      }
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  const removePhoneNumber = (number: string) => {
    setPhoneNumbers(phoneNumbers.filter((num) => num !== number));
  };

  const handleSubmit = async () => {
    if (!message) {
      alert("Please enter a message.");
      return;
    }
    if (phoneNumbers.length === 0) {
      alert("Please add at least one phone number.");
      return;
    }

    const payload = {
      message,
      phoneNumbers,
      frequency,
    };

    try {
      setIsLoading(true);
      // Replace with your backend endpoint
      const response = await axios.post("http://localhost:5000/api/schedule-message", payload);
      alert("Message scheduled successfully: " + response.data.message);
    } catch (error: any) {
      console.error("Error scheduling message:", error);
      alert("Failed to schedule the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Message Scheduler</h1>
      
      {/* Input for Message */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="message" style={{ display: "block", fontWeight: "bold" }}>Text Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "10px" }}
          placeholder="Type your message here..."
        />
      </div>

      {/* Input for Phone Numbers */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="phoneNumber" style={{ display: "block", fontWeight: "bold" }}>Phone Number:</label>
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter 10-digit phone number"
          style={{ padding: "10px", width: "calc(100% - 90px)", marginRight: "10px" }}
        />
        <button onClick={addPhoneNumber} style={{ padding: "10px" }}>Add</button>
      </div>

      {/* List of Phone Numbers */}
      {phoneNumbers.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Phone Numbers:</h3>
          <ul>
            {phoneNumbers.map((num, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {num}{" "}
                <button
                  onClick={() => removePhoneNumber(num)}
                  style={{
                    color: "red",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dropdown for Frequency */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="frequency" style={{ display: "block", fontWeight: "bold" }}>Frequency:</label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as FrequencyOption)}
          style={{ padding: "10px", width: "100%" }}
        >
          <option value="Once">Once</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button
          onClick={handleSubmit}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
          disabled={isLoading}
        >
          {isLoading ? "Scheduling..." : "Schedule Message"}
        </button>
      </div>
    </div>
  );
};

export default MessageScheduler;