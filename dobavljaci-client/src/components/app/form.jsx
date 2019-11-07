import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './form.css';
import { postDobavljac } from './service/api';
import tableDobavljaci from './tableDobavljaci';

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
      <div className="justify-content-center">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />

        <Form id="forma">
          <Form.Row>
            <Col>
              <Form.Group controlId="formInputName">
                <Form.Control
                  type="text"
                  placeholder="Unesite naziv"
                  value={this.state.naziv}
                  onChange={this.handleChange}
                  name="naziv"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formInputAdress">
                <Form.Control
                  type="text"
                  placeholder="Unesite adresu"
                  value={this.state.adresa}
                  onChange={this.handleChange}
                  name="adresa"
                />
              </Form.Group>
            </Col>
            <Button
              variant="primary"
              onClick={async e => {
                let result = await postDobavljac({
                  naziv: this.state.naziv,
                  adresa: this.state.adresa
                });
                await this.props.getDobavljaci();
                this.setState({ naziv: '', adresa: '' });

                console.log(result);
              }}
            >
              Add
            </Button>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
