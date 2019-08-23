import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './App.css';
import getAllDobavljac from './service/api';

export class table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dobavljaci: []
    };
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

  async onRemove(e) {
    console.log('klikno dugme');
    this.setSelectedRow(null);
    await this.props.onRemove();
  }
  componentWillReceiveProps({ someProp }) {
    this.setState({ ...this.state, someProp });
  }
  setSelectedRow(id) {
    if (this.props.selectedRow === id) this.props.setSelectedRow(null);
    else this.props.setSelectedRow(id);
  }

  async componentDidMount() {
    await this.getDobavljaci();
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Naziv</th>
            <th>Adresa</th>
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
              onClick={() => this.setSelectedRow(dobavljac.id)}
            >
              <td>{dobavljac.id}</td>
              <td>{dobavljac.naziv}</td>
              <td>{dobavljac.adresa}</td>
              <td>
                <Button
                  id={dobavljac.id}
                  variant="danger"
                  disabled={this.props.selectedRow === null}
                  onClick={() => {
                    this.onRemove();
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default table;
