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
  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState<any[]>([]);

  const fetchNews = async(topic: string) => {
    const response = await axios.get('http://localhost:5000/fetch_news?query=${topic}');
    setArticles(response.data.articles)
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews(topic);
  }

  return (
    <div style={styles.container}>
      <h1>Welcome to Armin's News Aggregator!</h1>
      <p>This is the beginning of this website, stay tuned for more!</p>
      <p>Enter topics below.</p>

      <form onSubmit={handleSearch}>
        <input
          type='text'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder='Enter a topic'
        />

        <button type='submit'>Search</button>
      </form>

      <div>
        {articles.map((article, index) => ( // Corrected syntax here
          <div key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target='_blank' rel='noopener noreferrer'>Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
