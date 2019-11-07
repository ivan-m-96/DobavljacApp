import React from 'react';
// eslint-disable-next-line
import { ReactDOM, render } from 'react-dom';
import './App.css';
import 'react-widgets/dist/css/react-widgets.css';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  removeDobavljac,
  updateDobavljac,
  getPorudzbeniceZaDobavljaca,
  postDobavljac
} from './service/api';
import Header from './header';
import Forma from './form';
import Tabela from './tableDobavljaci';
import ObradaPorudzbenice from './obradaPorudzbenice';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,

      naziv: '',
      adresa: '',
      selectedDobavljac: 0,
      selectedPorudzbenica: null,
      redniBrojPorudzbenice: 0
    };
    this.onRemove = this.onRemove.bind(this);
    this.setSelectedValues = this.setSelectedValues.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onInsert = this.onInsert.bind(this);
    this.setSelectedDobavljac = this.setSelectedDobavljac.bind(this);
    this.getRedniBrojPorudzbenice = this.getRedniBrojPorudzbenice.bind(this);
    this.setSelectedPorudzbenica = this.setSelectedPorudzbenica.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  async onRemove() {
    try {
      console.log('proba');
      const id = this.state.selectedRow;

      let result = await removeDobavljac(id);
      console.log('poslato');
      this.setState({ selectedRow: null, naziv: '', adresa: '' });
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

  async onInsert() {
    try {
      await postDobavljac({
        naziv: this.state.naziv,
        adresa: this.state.adresa
      }).then(result => console.log(result));
    } catch (error) {
      console.log(error);
    }
  }

  setSelectedValues(naziv, adresa) {
    if (this.state.selectedRow) {
      this.setState({ naziv: naziv, adresa: adresa });
    } else {
      this.setState({ naziv: '', adresa: '' });
    }
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async getRedniBrojPorudzbenice() {
    if (!this.state.selectedPorudzbenica) {
      let porudzbenice = [];
      await getPorudzbeniceZaDobavljaca(this.state.selectedDobavljac.id).then(
        result => {
          console.log('resultat' + result);
          result.forEach(element => {
            porudzbenice.push(element);
          });
        }
      );
      let id = [...porudzbenice].pop();
      if (id) {
        console.log(
          'redni broj porudzbenice iz getRedniBrojPorudzbenice()' + id.id
        );
        this.setState({ redniBrojPorudzbenice: id.id + 1 });
      } else this.setState({ redniBrojPorudzbenice: 1 });
    } else {
      this.setState({
        redniBrojPorudzbenice: this.state.selectedPorudzbenica.id
      });
    }
  }

  setSelectedDobavljac(id) {
    this.setState({ selectedDobavljac: id });
    this.getRedniBrojPorudzbenice();
  }

  setSelectedPorudzbenica(porudzbenica) {
    this.setState({ selectedPorudzbenica: porudzbenica });
    this.getRedniBrojPorudzbenice();
  }
  setSelectedRow = id => this.setState({ selectedRow: id });

  refresh() {
    this.setState({ ...this.state });
  }

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
              {/* <Route path="/form" render={props => <Forma {...props} />} /> */}
              <Route
                path="/dobavljaci"
                render={props => (
                  <Tabela
                    {...props}
                    selectedRow={this.state.selectedRow}
                    setSelectedRow={this.setSelectedRow}
                    onRemove={this.onRemove}
                    onUpdate={this.onUpdate}
                    onInsert={this.onInsert}
                    lastSelectedRow={this.state.lastSelectedRow}
                    setSelectedValues={this.setSelectedValues}
                    naziv={this.state.naziv}
                    adresa={this.state.adresa}
                    handleTextChange={this.handleTextChange}
                    refresh={this.refresh}
                  />
                )}
              />
              <Route
                path="/porudzbenica"
                render={props => (
                  <ObradaPorudzbenice
                    {...props}
                    getRedniBrojPorudzbenice={this.getRedniBrojPorudzbenice}
                    setSelectedDobavljac={this.setSelectedDobavljac}
                    redniBrojPorudzbenice={this.state.redniBrojPorudzbenice}
                    setSelectedPorudzbenica={this.setSelectedPorudzbenica}
                  />
                )}
              ></Route>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
