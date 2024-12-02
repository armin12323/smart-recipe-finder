import React, {useState, ChangeEvent} from 'react';
import logo from './logo.svg';
import './App.css';


const styles: { container: React.CSSProperties, input: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',  // Stack elements vertically
    alignItems: 'center',  // Center content horizontally
    justifyContent: 'center',  // Center content vertically (if the container has height)
    height: '100vh',  // Full height of the viewport for vertical centering
    textAlign: 'center',  // Optional: centers text horizontally
    padding: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '300px',  // Define a width for the input
    marginTop: '10px',  // Space between input and previous content
    borderRadius: '4px',  // Optional: rounded corners
    border: '1px solid #ccc',  // Optional: border style for the input
  },
};

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Current ingredients: ", event.target.value);
    setInputValue(event.target.value);
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Armin's Smart Recipe Finder!</h1>
      <p>This is the beginning of this website, stay tuned for more!</p>
      <p>Enter ingredients below.</p>
      
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Ingredients'
        style={styles.input}
      />
      <p>You typed: {inputValue}</p>
    </div>
  );
}

export default App;
