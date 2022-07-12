import logo from './logo.svg';
import Moveable from './components/workEfficiently/Moveable';
import DisplayIdeas from './components/DisplayIdeas';
import './App.css';
import React from 'react';
import Container from './components/workEfficiently/Container';

class App extends React.Component {

  /*
  <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
  */

  render() {
    return (
      <div>
        <div>
          <Moveable />
        </div>
        <div>
          <DisplayIdeas />
        </div>
        <br></br>
      </div>
    );
  };
}

export default App;
