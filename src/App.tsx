import React, {useState, ChangeEvent} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


const styles: { container: React.CSSProperties, input: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',  
    alignItems: 'center',  
    justifyContent: 'center',  
    height: '100vh',  
    textAlign: 'center',  
    padding: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '300px',  
    marginTop: '10px',  
    borderRadius: '4px',  
    border: '1px solid #ccc',  
  },
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Current ingredients!: ", event.target.value);
    setInputValue(event.target.value);
  };

  const sendData = async() => {
    try {
      const res = await axios.post('http://localhost:5000/process', {inputValue});
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error sending data: ', error);
    }
  }

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
      <button onClick={sendData}>Send</button>
      {response && <p>Response: {response}</p>}
      <p>You typed: {inputValue}</p>
    </div>
  );
}

export default App;
