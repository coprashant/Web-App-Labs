import { useState, useEffect } from 'react'; 
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    num1: Math.ceil(Math.random() * 10),
    num2: Math.ceil(Math.random() * 10),
    response: "",
    score: 0
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/students/')
      .then(response => response.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      });
  }, []);

  function updateResponse(event) {
    setState({
      ...state,
      response: event.target.value
    });
  }

  function inputKeyPress(event) {
    if (event.key === "Enter") {
      const answer = parseInt(state.response);
      if (answer === state.num1 + state.num2) {
        setState({
          ...state,
          score: state.score + 1,
          response: "",
          num1: Math.ceil(Math.random() * 10),
          num2: Math.ceil(Math.random() * 10)
        });
      } else {
        setState({
          ...state,
          score: state.score - 1,
          response: ""
        });
      }
    }
  }

  if (loading) {
    return <h3>Loading data...</h3>;
  }

  return (
    <>
    <h2>Mathematical Quiz</h2>
    <div className="container">
      <div className="score">
        <div><h3>Score: <br></br><br></br>{state.score}</h3></div>
      </div>

      <div className="question">
        <h3>Question:</h3>
        <div>{state.num1} + {state.num2}</div>
        <div className="answer">
          <h3>Answer:</h3>
          <input 
            autoFocus
            onChange={updateResponse} 
            onKeyDown={inputKeyPress} 
            value={state.response} 
          />
        </div>
      </div>

      <div className='std_list'>
        <h2>Students List</h2>
        <ul>
          {students.map(s => (
            <li key={s.id}>
              {s.name} - {s.faculty}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default App;