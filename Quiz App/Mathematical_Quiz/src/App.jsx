import { useState, useEffect } from 'react'; 

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/students/')
      .then(response => response.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching students:", err));
  }, []);

    const [state, setState] = useState({
    num1: Math.ceil(Math.random() * 10),
    num2: Math.ceil(Math.random() * 10),
    response: "",
    score: 0
  });


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

  return (
    <div className="app" >

      <div>
        <h2>Mathematical Quiz</h2>
        <div>{state.num1} + {state.num2}</div>
        <input 
          autoFocus
          onChange={updateResponse} 
          onKeyDown={inputKeyPress} 
          value={state.response} 
        />
        <div>Score: <strong>{state.score}</strong></div>
      </div>

      <hr />

      <div>
        <h1>Students List</h1>
        <ul>
          {students.map(s => (
            <li key={s.id}>
              {s.name} - <span>{s.faculty}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;