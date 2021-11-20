import logo from './logo.svg';
import './App.css';
import AnotherComponent from './TestComponent'

function App() {
  const test = 54
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <AnotherComponent testProp='test'></AnotherComponent>
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
  );
}

export default App;
