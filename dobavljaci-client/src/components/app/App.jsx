import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { removeDobavljac } from './service/api';
import Header from './header';
import Forma from './form';
import Tabela from './table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null
    };
    this.onRemove = this.onRemove.bind(this);
  }
  async onRemove() {
    try {
      console.log('proba');
      const id = this.state.selectedRow;

      let result = await removeDobavljac(id);
      console.log('poslato');
      this.setState({ selectedRow: null });
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  setSelectedRow = id => this.setState({ selectedRow: id });
  render() {
    return (
      <Router>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <div className="App">
          <Header />

          <div>
            <hr />
            <div>
              <Route path="/form" render={props => <Forma {...props} />} />
              <Route
                path="/tabela"
                render={props => (
                  <Tabela
                    {...props}
                    selectedRow={this.state.selectedRow}
                    setSelectedRow={this.setSelectedRow}
                    onRemove={this.onRemove}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
