import React from 'react';
import './App.css';
import Weather from './Weather/weather';
import ShowWeatherDetails from './ShowWeatherDetails/showWeatherDetails';
import Auth from './Auth/auth';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/"  exact component={Auth}/>
          <Route path="/weather"  component={Weather}/>
          <Route path="/show/:date"  component={ShowWeatherDetails}/>
        </Switch>
    </div>
  );
}

export default App;
