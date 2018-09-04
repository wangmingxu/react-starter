import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import routes from 'Route';
import RouteWrapper from 'Component/RouteWrapper';
import { renderRoutes } from 'react-router-config';
import { baseUrlPath } from 'constant';
import WithLogin from 'Hoc/WithLogin';

const Router = location.hash.length > 0 ? HashRouter : BrowserRouter;

const basename = location.hash.length > 0 ? '' : baseUrlPath;

@WithLogin(false)
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<Router basename={basename}>
      <Route
        render={props => (
          <RouteWrapper {...props}>
            {renderRoutes(routes)}
          </RouteWrapper>
        )}
      />
    </Router>);
  }
}

export default App;
