import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// eslint-disable-next-line
import Form from 'react-bootstrap/Form';
// eslint-disable-next-line
import FormControl from 'react-bootstrap/FormControl';
// eslint-disable-next-line
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './header-css.css';

export default function header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="nav-link" to="/dobavljaci">
        Upravljanje naručivanjem
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Link className="nav-link" to="/form">
            Unos
          </Link> */}
          <Link className="nav-link" to="/dobavljaci">
            Obrada dobavljača
          </Link>
          <Link className="nav-link" to="/porudzbenica">
            Obrada porudžbenice
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
