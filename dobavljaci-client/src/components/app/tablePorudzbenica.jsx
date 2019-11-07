import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './tablePorudzbenica.css';
export class tablePorudzbenica extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stavke: [],
      curStavkaId: 0
    };
  }

  render() {
    return (
      <div id="obradaPorudzbenice">
        <div className="row justify-content-center">
          <Table className="table-hover" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Naziv</th>
                <th>Jedinična cena</th>
                <th>Količina</th>
                <th>Ukupna cena</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.proizvodi.map(stavka => (
                <tr key={stavka.porId}>
                  <td>{stavka.porId}</td>
                  <td>{stavka.proizvod.naziv}</td>
                  <td>{stavka.proizvod.cena}</td>
                  <td>{stavka.kolicina}</td>
                  <td>{stavka.proizvod.cena * stavka.kolicina}</td>
                  <th />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default tablePorudzbenica;
