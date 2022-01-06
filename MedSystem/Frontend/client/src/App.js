import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Registration from './views/Registration/Registration';
import Questionnaire from './components/Questionnaire/Questionnaire';
import EditQuestionnaire from './views/EditQuestionnaire';
import TileGallery from './components/TileGallery/TileGallery';
import Tile from './components/TileGallery/Tile/Tile';

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        {localStorage.getItem("role") === null &&
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route exact path='/register'>
              <Registration></Registration>
            </Route>
          </Switch>
        }

        {localStorage.getItem("role") === "patient" &&
          <Switch>
            <Route exact path="/">
              <Dashboard title="Kokpit">
                <TileGallery>
                  <Tile title="Twoje konto" redirectPath="/userAccount">
                    <li>podgląd ankiety </li>
                    <li>edycja ankiety</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path='/questionnaire'>
              <Questionnaire />
            </Route>
            <Route exact path='/userAccount'>
              <Dashboard title="Twoje Konto">
                <TileGallery>
                  <Tile title="Edytuj ankietę" redirectPath="/userAccount/editQuestionnaire">
                    <li>zmień odpowiedzi na pytania</li>
                    <li>zobacz udzielone odpowiedzi</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path="/userAccount/editQuestionnaire">
              <EditQuestionnaire />
            </Route>
          </Switch>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
