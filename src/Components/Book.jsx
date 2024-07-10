import React from "react";

import { Card, Container, Row, Col, Nav } from "react-bootstrap";

export default function Book(props) {
  const { book: book } = props;

  function handleDelete() {
    props.onDelete(book.id);
  }
  function handleEdit() {
    props.onEdit(book);
  }

  return (
    <>
      <Card
        bg="info"
        text="white"
        // key={variant}
        // text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        style={{ width: "30rem" }}
        //border="primary"
        //className="mb-2"
        className="shadow-lg p-2 mb-5 bg-white rounded"
        // className="bg-dark text-white mb-2" hover-shadow
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={4}>
              <Card.Img
                src="/images/books/children/CaveBaby.jpg"
                //src="/images/books/children/paper-dolls.png"
                //  src="/images/books/card-img/paper-dolls.jpg"
                alt="Card image"
              />
            </Col>

            <Col xs={8}>
              <Card.Header>
                <Card.Title  as="h6">{book.title}</Card.Title>
                {/* <Nav variant="tabs" defaultActiveKey="#first">
                  <Nav.Item>
                    <Nav.Link href="#first">Active</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#link">Link</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#disabled" disabled>
                      Disabled
                    </Nav.Link>
                  </Nav.Item>
                </Nav> */}
              </Card.Header>
              <Card.Body>
                <Card.Text>by {book.authorRef.author_name} | {book.publication_date} </Card.Text>
                <Card.Text>{book.genreRef.genre_name}</Card.Text>
                <Card.Text className="text-muted">{book.price}</Card.Text>
                {/* <Card.Text>{book.publication_date}</Card.Text> */}
              </Card.Body>
              <Card.Footer />
            </Col>
          </Row>
        </Container>
      </Card>
      {/* 
<div class="card mb-3 max-width-540">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="./images/bootstrap.png" class="card-image"
                alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur.Ut enim ad minim veniam,
                    nisi ut aliquip ex ea commodo consequat</p>
                <a class="text-decoration-none" href="#">www.website-link.com</a>
            </div>
        </div>
    </div>
</div> */}

      {/* <tr>
     
      <td>{book.title}</td>
      <td>{book.price}</td>
      <td>{book.publication_date}</td>
      <td>
      <button style={{ border: 0 }} onClick={handleEdit}>
        <img
          src="/images/icons/Oxygen-Icons.org-Oxygen-Actions-document-edit.24.png"
          title="Edit Book Details"   
        />
        </button>
      </td>
    
      <td>
        <button style={{ border: 0 }} onClick={handleDelete}>
          <img src="/images/delete.24.png" title="Delete Book" />
        </button>
      </td> */}

      {/* <section id="task">
        
      <p>{task.description}</p>
       
        
      </section> */}
      {/* </tr> */}
    </>
  );
}
