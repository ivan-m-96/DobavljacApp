import React, { Component } from 'react';
import Combobox from 'react-widgets/lib/Combobox';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import getAllDobavljac from './service/api';
import 'react-widgets/dist/css/react-widgets.css';
import './obradaPorudzbenice.css';

export default class obradaPorudzbenice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kolicina: null,
      dobavljaci: [],
      selectedDobavljac: null,
      selectedKatalog: null,
      selectedProizvod: null
    };

    this.handleKolicinaChange = this.handleKolicinaChange.bind(this);
    this.getDobavljaci = this.getDobavljaci.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleKolicinaChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
                    onSelect={e => this.handleSelect(e, 'selectedDobavljac')}
                  ></Combobox>
                </Col>
                <Col>
                  <Form.Label>Katalog</Form.Label>

                  <Combobox
                    id="katalozi"
                    disabled={!this.state.selectedDobavljac}
                    onSelect={e => this.handleSelect(e, 'selectedKatalog')}
                  ></Combobox>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Proizvod</Form.Label>

                  <Combobox
                    id="proizvodi"
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
          </Form>
        </div>
      </div>
    );
  }
}
