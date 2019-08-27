import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './header-css.css';

export default function header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Upravljanje dobavljačima</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/form">
            Unos
          </Link>
          <Link className="nav-link" to="/tabela">
            Pregled i izmena
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
