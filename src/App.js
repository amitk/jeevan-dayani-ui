import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home.js';
import { AppLayout } from './components/AppLayout.js';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={AppLayout} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
