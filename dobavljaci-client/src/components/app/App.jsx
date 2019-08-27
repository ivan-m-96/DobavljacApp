import React from 'react';
import { ReactDOM, render } from 'react-dom';
import './App.css';
import 'react-widgets/dist/css/react-widgets.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { removeDobavljac, updateDobavljac } from './service/api';
import Header from './header';
import Forma from './form';
import Tabela from './table';
import ObradaPorudzbenice from './obradaPorudzbenice';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,

      naziv: '',
      adresa: ''
    };
    this.onRemove = this.onRemove.bind(this);
    this.setSelectedValues = this.setSelectedValues.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
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

  async onUpdate() {
    try {
      await updateDobavljac(
        this.state.selectedRow,
        this.state.naziv,
        this.state.adresa
      ).then(r => {
        console.log(r);
      });
    } catch (error) {}
  }

  setSelectedValues(naziv, adresa) {
    this.setState({ naziv: naziv, adresa: adresa });
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
                    onUpdate={this.onUpdate}
                    lastSelectedRow={this.state.lastSelectedRow}
                    setSelectedValues={this.setSelectedValues}
                    naziv={this.state.naziv}
                    adresa={this.state.adresa}
                    handleTextChange={this.handleTextChange}
                  />
                )}
              />
              <Route
                path="/porudzbenica"
                render={props => <ObradaPorudzbenice {...props} />}
              ></Route>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
