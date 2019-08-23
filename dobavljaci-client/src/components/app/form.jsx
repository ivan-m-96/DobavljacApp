import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';
import { postDobavljac } from './service/api';

export default class form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      naziv: '',
      adresa: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Form>
          <Form.Group controlId="formInputName">
            <Form.Label>Naziv</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite naziv"
              value={this.state.naziv}
              onChange={this.handleChange}
              name="naziv"
            />
          </Form.Group>

          <Form.Group controlId="formInputAdress">
            <Form.Label>Adresa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite adresu"
              value={this.state.adresa}
              onChange={this.handleChange}
              name="adresa"
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={e => {
              let result = postDobavljac({
                naziv: this.state.naziv,
                adresa: this.state.adresa
              });
              console.log(result);
            }}
          >
            Button
          </Button>
        </Form>
      </div>
    );
  }
}
