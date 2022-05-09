import './App.css';
import {useState, useEffect} from 'react';
import { Qte } from './Qte';

function App() {
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(5);
  const [qteLaunch, setQteLaunch] = useState(false);

  useEffect(() => {
    let inter
    if(loading && counter > 0) {
      inter = setInterval(() => {
        if(counter-1 === 0) {
          setLoading(false);
          document.body.focus();
          launchQte()
        }
        setCounter(counter - 1)
      }, 1000)
    }
    return () => {
      if(inter) {
        clearInterval(inter)
      }
    }
  }, [counter, loading])

  const onStart = () => {
    setLoading(true)
  }

  const launchQte = () => {
    setQteLaunch(true)
  }

  return (
    <div className="App">
      <div className="container">
        {qteLaunch ? <Qte /> : [
          loading && <div className="row">{counter}</div>,
          !loading && <button onClick={onStart}>start</button>
        ]}
      </div>
    </div>
  );
}

export default App;
