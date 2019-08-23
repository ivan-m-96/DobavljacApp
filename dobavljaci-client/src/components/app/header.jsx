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
      <Navbar.Brand href="/form">Upravljanje dobavljačima</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/form">Unos</Nav.Link>
          <Nav.Link href="/tabela">Pregled i izmena</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
