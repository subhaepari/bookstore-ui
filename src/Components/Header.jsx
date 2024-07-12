import { React, useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Row, Col, Tabs, Tab } from "react-bootstrap";

import Home from "./Home";
import GenreManager from "./GenreManager";
import AuthorManager from "./AuthorManager";
import BookManager from "./BookManager";

import "../styles/styles.css";

function Header() {
  // const [bgcolor, setBgcolor] = useState('black');
  // const [textcolor, setTextcolor] = useState('white');

  // function handleHighlightTab() {
  //   setBgcolor('white');
  //   setTextcolor('black');
  // }

  // function handleHighlightTab(event) {
  //     event.target.style = {color: 'green'}
  //     alert(`You just selected ${ event.target.eventKey} !`)

  // }

  let bgcolor = "green";
  let textcolor = "white";

  return (
    <>
      {/* <Container>
        <Row>
          <Col>
            <Tabs defaultActiveKey="Home" id="controlled-tab">
              <Tab eventKey="home" title="Home">
                <Home />
              </Tab>
              <Tab eventKey="author" title="Authors">
                <AuthorManager />
              </Tab>
              <Tab eventKey="book" title="Books">
                <BookManager />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container> */}

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">BookWare</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="navbar-id">
            {/* <Nav>
            <Container>
              <Row>
                <Col>
                  <Tabs defaultActiveKey="Home" id="controlled-tab">
                    <Tab eventKey="home" title="Home">
                      <Home />
                    </Tab>
                    <Tab eventKey="author" title="Authors">
                      <AuthorManager />
                    </Tab>
                    <Tab eventKey="book" title="Books" disabled>
                      <BookManager />
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </Container> 
          </Nav> */}

            {/* <Nav justify variant="tabs" defaultActiveKey="/home" className="m-auto">
            <Nav.Item>
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">Authors</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Books</Nav.Link>
            </Nav.Item>
          </Nav> */}

            <Nav
              // className="me-auto my-2 my-lg-0"
              //className="ms-auto"
              className="m-auto"
              variant="tabs" //underline, pills
              defaultActiveKey="homekey"
              style={{ maxHeight: "100px" }}
              navbarScroll
              // fill
              // justify
              //activeKey="authorskey"
              // onSelect={(selectedKey) => alert(`You just selected ${selectedKey} !`)}
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="homekey"
                  href="/home"
                  //   onSelect={handleHighlightTab}
                  //  style={{ backgroundColor: bgcolor, color: textcolor }}
                >
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="authorskey"
                  href="/authors"
                  //    onSelect={handleHighlightTab}
                  // style={{ backgroundColor: bgcolor, color: textcolor }}
                >
                  Authors
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="bookskey"
                  href="/books"
                  //     onSelect={handleHighlightTab}
                  //  style={{ backgroundColor: bgcolor, color: textcolor }}
                >
                  Books
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
