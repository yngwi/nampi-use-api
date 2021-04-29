import { useAuth } from "nampi-use-api/bundle";
import { Route, Router, Switch } from "react-router";
import { Home } from "./components/Home";
import { LoadingPlaceholder } from "./components/LoadingPlaceholder";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { NoMatch } from "./components/NoMatch";
import { Persons } from "./components/Persons";
import { PrivateRoute } from "./components/PrivateRoute";
import { Profile } from "./components/Profile";
import { HISTORY } from "./constants";

const PERSON_PATHS = ["/persons", "/person/:localId"];

export const App = () => {
  const { initialized } = useAuth();
  return initialized ? (
    <Router history={HISTORY}>
      <div className="text-gray-800">
        <Navbar />
        <div className="m-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path={PERSON_PATHS} component={Persons} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
      </div>
    </Router>
  ) : (
    <LoadingPlaceholder delay />
  );
};