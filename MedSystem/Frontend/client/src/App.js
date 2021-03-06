import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AddDoctorPanel from "./components/AddDoctorPanel/AddDoctorPanel";
import AddPrescriptions from "./components/AddPrescriptions/AddPrescriptions";
import AddVisitReport from "./components/AddVisitReport/AddVisitReport";
import BookVisit from "./components/BookVisit/BookVisit";
import MailContactForm from "./components/MailContactForm/MailContactForm";
import MailContactFormDoctor from "./components/MailContactFormDoctor/MailContactFormDoctor";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Tile from "./components/TileGallery/Tile/Tile";
import TileGallery from "./components/TileGallery/TileGallery";
import UserLockUnlock from "./components/UserLockUnlock/UserLockUnlock";
import ViewPrescriptionDoctor from "./components/ViewPrescriptionDoctor/ViewPrescriptionDoctor";
import ViewQuestionnaireDoctor from "./components/ViewQuestionnaireDoctor/ViewQuestionnaireDoctor";
import ViewPrescriptionPatient from "./components/ViewPrescriptionPatient/ViewPrescriptionPatient";
import ViewVisits from "./components/ViewVists/ViewVisits";
import Dashboard from "./views/Dashboard";
import EditQuestionnaire from "./views/EditQuestionnaire";
import Login from "./views/Login";
import Registration from "./views/Registration/Registration";
import ViewAccountDetails from "./components/ViewAccountDetails/ViewAccountDetails";
import ViewReportsPatient from "./components/ViewReportsPatient/ViewReportsPatient";
import ViewReportsDoctor from "./components/ViewReportsDoctor/ViewReportsDoctor";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        {localStorage.getItem("role") === null && (
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route exact path="/register">
              <Registration></Registration>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            {localStorage.getItem("registeredData") !== null && (
              <Route exact path="/questionnaire">
                <Questionnaire />
              </Route>
            )}
          </Switch>
        )}

        {localStorage.getItem("role") === "patient" && (
          <Switch>
            <Route exact path="/">
              <Dashboard title="Panel g????wny pacjenta">
                <TileGallery>
                  <Tile title="Twoje konto" redirectPath="/userAccount">
                    <li>podgl??d ankiety </li>
                    <li>edycja ankiety</li>
                    <li>informacje o koncie</li>
                  </Tile>
                  <Tile title="Kontakt z lekarzem" redirectPath="/contact">
                    <li>kontakt z lekarzem</li>
                    <li>wys??anie maila</li>
                  </Tile>
                  <Tile title="Wizyty" redirectPath="/visits">
                    <li>zarezerwuj wizyt?? u wybranego lekarza</li>
                    <li>zobacz planowane wizyty</li>
                    <li>zobacz historie swoich wizyt w plac??wce</li>
                  </Tile>
                  <Tile title="Recepty" redirectPath="/prescriptions">
                    <li>zobacz swoje recepty</li>
                    <li>zobacz dawkowanie lek??w</li>
                    <li>wydrukuj pdf z informacjami o recepcie</li>
                  </Tile>
                  <Tile title="Raporty" redirectPath="/reports">
                    <li>zobacz raporty z wizyt</li>
                    <li>zobacz zalecenia lekarzy z wizyty</li>
                    <li>wydrukuj pdf z informacjami z wizyty</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path="/userAccount">
              <Dashboard title="Twoje Konto">
                <TileGallery>
                  <Tile
                    title="Edytuj ankiet??"
                    redirectPath="/userAccount/editQuestionnaire"
                  >
                    <li>zmie?? odpowiedzi na pytania</li>
                    <li>zobacz udzielone odpowiedzi</li>
                  </Tile>
                  <Tile
                    title="Sprawd?? informacje o koncie"
                    redirectPath="/userAccount/info"
                  >
                    <li>zobacz Twoje dane</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path="/userAccount/editQuestionnaire">
              <EditQuestionnaire />
            </Route>
            <Route exact path="/userAccount/info">
              <ViewAccountDetails></ViewAccountDetails>
            </Route>
            <Route exact path="/contact">
              <MailContactForm></MailContactForm>
            </Route>
            <Route exact path="/visits/bookVisit">
              <BookVisit></BookVisit>
            </Route>
            <Route exact path="/visits">
              <Dashboard title="Wizyty">
                <TileGallery>
                  <Tile
                    title="Zarezerwuj wizyt??"
                    redirectPath="/visits/bookVisit"
                  >
                    <li>um??w si?? na wizyt?? </li>
                    <li>zarezerwuj wizyt??</li>
                  </Tile>
                  <Tile
                    title="Historia i planowane wizyty"
                    redirectPath="/visits/visitsTerms"
                  >
                    <li>zobacz histori?? wizyt</li>
                    <li>zobacz zaplanowane wizyty</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path="/visits/visitsTerms">
              <ViewVisits role="patient"></ViewVisits>
            </Route>
            <Route exact path="/prescriptions">
              <ViewPrescriptionPatient></ViewPrescriptionPatient>
            </Route>
            <Route exact path="/reports">
              <ViewReportsPatient />
            </Route>
          </Switch>
        )}

        {localStorage.getItem("role") === "doctor" && (
          <Switch>
            <Route exact path="/">
              <Dashboard title="Panel g????wny lekarza">
                <TileGallery>
                  <Tile title="Kontakt mailowy" redirectPath="/contact">
                    <li>skontaktuj si?? z administratorem</li>
                  </Tile>
                  <Tile title="Recepty" redirectPath="/prescriptions">
                    <li>wystaw recept??</li>
                    <li>zobacz histori?? wystawionych recept</li>
                  </Tile>
                  <Tile title="Raporty" redirectPath="/reports">
                    <li>wystaw raport z wizyty</li>
                    <li>zobacz histori?? wystawionych raport??w</li>
                  </Tile>
                  <Tile title="Wizyty" redirectPath="/visits">
                    <li>zobacz terminy um??wionych do Ciebie wizyt</li>
                  </Tile>
                  <Tile
                    title="Ankiety zdrowotne"
                    redirectPath="/questionnaires"
                  >
                    <li>znajd?? ankiet?? zdrowotn?? pacjenta</li>
                    <li>przegl??dznij ankiet?? pacjenta</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path="/contact">
              <MailContactFormDoctor></MailContactFormDoctor>
            </Route>
            <Route exact path="/questionnaires">
              <ViewQuestionnaireDoctor />
            </Route>
            <Route exact path="/prescriptions">
              <Dashboard title="Recepty">
                <TileGallery>
                  <Tile
                    title="Wystaw recept??"
                    redirectPath="/prescriptions/addPrescription"
                  >
                    <li>wystaw recept?? pacjentowi</li>
                  </Tile>
                  <Tile
                    title="Wystawione recepty"
                    redirectPath="/prescriptions/historyPrescriptions"
                  >
                    <li>zobacz wystawione recepty</li>
                    <li>wygeneruj plik pdf ze szczeg????ami recepty</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path="/prescriptions/addPrescription">
              <AddPrescriptions />
            </Route>
            <Route exact path="/prescriptions/historyPrescriptions">
              <ViewPrescriptionDoctor />
            </Route>
            <Route exact path="/reports">
              <Dashboard title="Raporty">
                <TileGallery>
                  <Tile title="Sw??rz raport" redirectPath="/reports/addReport">
                    <li>wystaw raport z wizyty pacjenta</li>
                  </Tile>
                  <Tile
                    title="Wystawione raporty"
                    redirectPath="/reports/historyReports"
                  >
                    <li>zobacz wystawione raporty</li>
                    <li>wygeneruj plik pdf ze szczeg????ami raportu</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path="/visits">
              <ViewVisits role="doctor" />
            </Route>
            <Route exact path="/reports/addReport">
              <AddVisitReport />
            </Route>
            <Route exact path="/reports/historyReports">
              <ViewReportsDoctor />
            </Route>
          </Switch>
        )}
        {localStorage.getItem("role") === "admin" && (
          <Switch>
            <Route exact path="/">
              <Dashboard title="Kokpit">
                <TileGallery>
                  <Tile title="Lekarze" redirectPath="/doctors">
                    <li>dodawanie Lekarzy</li>
                  </Tile>
                  <Tile
                    title="Zarz??dzanie kontami"
                    redirectPath="/usersAccounts"
                  >
                    <li>zablokuj istniej??cych u??ytkownik??w systemu</li>
                    <li>odblokuj istniej??cych u??ytkownik??w systemu</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path="/doctors">
              <Dashboard title="Dodawanie Lekarzy">
                <TileGallery>
                  <Tile
                    title="Dodaj Lekarza"
                    redirectPath="/doctors/addDoctors"
                  >
                    <li>dodawanie konta lekarza</li>
                  </Tile>
                </TileGallery>
              </Dashboard>
            </Route>
            <Route exact path="/doctors/addDoctors">
              <AddDoctorPanel />
            </Route>
            <Route exact path="/usersAccounts">
              <UserLockUnlock />
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
