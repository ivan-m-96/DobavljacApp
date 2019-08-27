import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import getAllDobavljac from './service/api';

export class table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dobavljaci: [],
      edit: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
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
  handleClick() {
    this.setState(this.props.lastSelectedRow);
  }
  async onRemove(e) {
    this.setSelectedRow(null);
    await this.props.onRemove().then();
  }
  componentWillReceiveProps({ someProp }) {
    this.setState({ ...this.state, someProp });
  }
  setSelectedRow(id) {
    if (this.props.selectedRow === id) this.props.setSelectedRow(null);
    else this.props.setSelectedRow(id);
  }
  setSelectedValues(naziv, adresa) {
    this.props.setSelectedValues(naziv, adresa);
  }

  async componentDidMount() {
    await this.getDobavljaci();
  }
  async onUpdate() {
    await this.props.onUpdate();
  }
  handleTextChange(e) {
    this.props.handleTextChange(e);
  }
  render() {
    return (
      <div>
        <div className="row justify-content-center" id="izmena-dobavljaca">
          <Form.Row>
            <Form.Label />

            <Col>
              <Form.Control
                id="naziv"
                name="naziv"
                value={this.props.naziv}
                placeholder="Naziv"
                onChange={this.handleTextChange}
              />
            </Col>
            <Col>
              <Form.Control
                id="adresa"
                name="adresa"
                value={this.props.adresa}
                placeholder="Adresa"
                onChange={this.handleTextChange}
              />
            </Col>
            <Col>
              <Button
                variant="secondary"
                disabled={!this.props.selectedRow}
                onClick={async e => {
                  await this.onUpdate();
                  await this.getDobavljaci();
                }}
              >
                {' '}
                Izmena
              </Button>
            </Col>
          </Form.Row>
        </div>
        <div className="row justify-content-center">
          <Table className="table-hover" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Naziv</th>
                <th>Adresa</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.dobavljaci.map(dobavljac => (
                <tr
                  key={dobavljac.id}
                  className="table-row"
                  style={
                    this.props.selectedRow === dobavljac.id
                      ? { backgroundColor: '#D3D3D3	' }
                      : {}
                  }
                  onClick={() => {
                    this.setSelectedRow(dobavljac.id);
                    this.setSelectedValues(dobavljac.naziv, dobavljac.adresa);
                  }}
                >
                  <td>{dobavljac.id}</td>
                  <td>{dobavljac.naziv}</td>
                  <td>{dobavljac.adresa}</td>

                  <td>
                    <ButtonGroup>
                      <Button
                        id={dobavljac.id}
                        variant="danger"
                        disabled={this.props.selectedRow !== dobavljac.id}
                        onClick={async e => {
                          await this.onRemove(e);
                          await this.getDobavljaci();
                        }}
                      >
                        Brisanje
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default table;
