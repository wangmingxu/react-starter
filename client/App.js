import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import routes from 'Route';
import RouteWrapper from 'Component/RouteWrapper';
import { renderRoutes } from 'react-router-config';
import withLogin from 'Hoc/withLogin';

@withLogin(true)
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<HashRouter>
      <Route
        render={props => (
          <RouteWrapper {...props}>
            {renderRoutes(routes)}
          </RouteWrapper>
        )}
      />
    </HashRouter>);
  }
}

export default App;
