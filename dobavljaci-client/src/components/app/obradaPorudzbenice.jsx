import React, { Component } from 'react';
import Combobox from 'react-widgets/lib/Combobox';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  getAllDobavljac,
  getAllKatalog,
  getKataloziZaDobavljaca
} from './service/api';

import 'react-widgets/dist/css/react-widgets.css';
import './obradaPorudzbenice.css';

export default class obradaPorudzbenice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kolicina: 0,
      dobavljaci: [],
      katalozi: [],
      proizvodi: [],
      selectedDobavljac: '',
      selectedKatalog: '',
      selectedProizvod: ''
    };

    this.handleKolicinaChange = this.handleKolicinaChange.bind(this);
    this.getDobavljaci = this.getDobavljaci.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleKolicinaChange(e) {
    this.setState({ kolicina: e.target.value });
  }
  handleSelect(e, name) {
    console.log(e);
    this.setState({
      [name]: e
    });
  }

  componentDidMount() {
    this.getDobavljaci();
  }
  async getDobavljaci() {
    try {
      let dobavljaci = [];
      await getAllDobavljac().then(result =>
        result.forEach(element => {
          dobavljaci.push(element);
        })
      );

      this.setState({ dobavljaci: dobavljaci });
    } catch (e) {
      console.log(e.message);
    }
  }
  async getProizvodi() {
    try {
      let proizvodi = [];
      await getAllKatalog(this.state.selectedKatalog).then(result => {
        console.log(result);
        result.stavke.forEach(element => {
          proizvodi.push(element);
        });
      });

      this.setState({ proizvodi: proizvodi });
    } catch (e) {
      console.log(e.message);
    }
  }
  async getKatalozi() {
    try {
      let katalozi = [];
      if (this.state.selectedDobavljac) {
        await getKataloziZaDobavljaca(this.state.selectedDobavljac.id).then(
          result => {
            console.log(result);
            katalozi = result.map(katalog => katalog.id);
          }
        );
        this.setState({ katalozi });
      }
      if (!katalozi) {
        console.log(
          'za dobavljaca sa id ' +
            this.state.selectedDobavljac.id +
            'nema kataloga'
        );
      }
      return katalozi;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <div>
          <Form>
            <Form.Group controlId="formInputKolicina">
              <Row>
                <Col>
                  <Form.Label>Dobavljač</Form.Label>

                  <Combobox
                    id="dobavljaci"
                    data={this.state.dobavljaci}
                    textField="naziv"
                    filter="contains"
                    onSelect={async e => {
                      await this.handleSelect(e, 'selectedDobavljac');
                      await this.getKatalozi();
                      await this.props.setSelectedDobavljac(
                        this.state.selectedDobavljac
                      );
                    }}
                  ></Combobox>
                </Col>
                <Col>
                  <Form.Label>Katalog</Form.Label>

                  <Combobox
                    id="katalozi"
                    data={this.state.katalozi}
                    textField="naziv"
                    disabled={!this.state.selectedDobavljac}
                    onSelect={async e => {
                      await this.handleSelect(e, 'selectedKatalog');
                      await this.getProizvodi();
                    }}
                  ></Combobox>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Proizvod</Form.Label>

                  <Combobox
                    id="proizvodi"
                    data={this.state.proizvodi}
                    textField="naziv"
                    disabled={!this.state.selectedKatalog}
                    onSelect={e => this.handleSelect(e, 'selectedProizvod')}
                  ></Combobox>
                </Col>
                <Col>
                  <Form.Label>Količina</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder="Količina"
                      disabled={!this.state.selectedProizvod}
                      value={this.state.kolicina}
                      onChange={this.handleKolicinaChange}
                      name="kolicina"
                    />
                    <InputGroup.Append>
                      <Button id="unos" variant="primary">
                        Unesi
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Redni broj porudžbenice</Form.Label>

                  <Form.Control
                    type="text"
                    disabled={true}
                    value={this.props.redniBrojPorudzbenice}
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Label>Datum</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Datum"
                      disabled={true}
                      value={this.props.datum}
                      name="date"
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}
