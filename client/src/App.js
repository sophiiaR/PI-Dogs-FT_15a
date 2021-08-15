import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import DogCreate from './components/DogCreate/DogCreate';
import DogDetail from "./components/DogDetail/DogDetail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/create" component={DogCreate} />
        <Route path="/detail/:id" component={DogDetail} />   
      </Switch>
    </BrowserRouter>
  );
}

export default App;
