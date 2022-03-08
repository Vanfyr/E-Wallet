import "./styles.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import AddCard from "./components/pages/AddCard";
import { fetchRandomUser } from "./redux/cardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRandomUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <h1> E-WALLET </h1>

        <Link to="/Home">
          <button className="Home"> Home </button>
        </Link>
        <Link to="/addcard">
          <button className="AddCard"> AddCard</button>
        </Link>

        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/addcard" component={AddCard} />
        </Switch>
      </div>
    </Router>
  );
}
