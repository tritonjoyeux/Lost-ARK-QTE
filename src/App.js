import './App.css';
import {useState, useEffect} from 'react';
import { Qte } from './components/Qte';
import Ga from './services/ga';
const analytics = new Ga();
analytics.pageview();

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
        <div className="content">
          {qteLaunch ? <Qte /> : [
            loading && <div key="counter" className="row counter">{counter}</div>,
            !loading && [
              <div key="title-container" className="row" style={{marginBottom: 15}}>
                Improve QTE in lost ark
                <div className="description">
                  Make the best streak possible
                </div>
              </div>,
              <button key="button-container" onClick={onStart}>start</button>
            ]
          ]}
        </div>
        <footer style={{fontSize: 12, padding: 10}}>Property of Tritonjoyeux - Provided by Heroku ®</footer>
      </div>
    </div>
  );
}

export default App;
