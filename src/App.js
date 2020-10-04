import React from 'react';
import { Route, Switch } from 'react-router-dom';
//css
import './App.css';
//components
import Weather from './Weather/Weather';
import Auth from './Auth/Auth';
import ShowWeatherDetails from './ShowWeatherDetails/ShowWeatherDetails';

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
