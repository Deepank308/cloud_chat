import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import history from './history';
import Home from './components/Home';
// import more components
export default (
    <HashRouter history={history}>
     <div>
      <Route path='/' component={Home} />
     </div>
    </HashRouter>
);
