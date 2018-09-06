import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import routes from 'Route';
import RouteWrapper from 'Component/RouteWrapper';
import { renderRoutes } from 'react-router-config';
import WithLogin from 'Hoc/WithLogin';
import api from 'utils/api';
import dayjs from 'dayjs';

@WithLogin(false)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
  }
  async componentDidMount() {
    try {
      await this.getDayVote();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ ready: true });
    }
  }
  getDayVote = async () => {
    // const key = `School_${dayjs().format('YYYY_MM_DD')}`;
    // if (localStorage.getItem(key)) return;
    await api.getLoginVote({}, { needAuth: true, timeout: 3000 });
    // localStorage.setItem(key, true);
  }
  render() {
    const { ready } = this.state;
    return ready ? (<HashRouter>
      <Route
        render={props => (
          <RouteWrapper {...props}>
            {renderRoutes(routes)}
          </RouteWrapper>
        )}
      />
    </HashRouter>) : null;
  }
}

export default App;
