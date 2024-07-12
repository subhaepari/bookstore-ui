import {React, useState} from "react";

import { Card, Container, Row, Col, Nav } from "react-bootstrap";

export default function Book(props) {
  const [activeTab, setActiveTab] = useState("details")

  const { book: book } = props;
  const months = [ 
    "January", "February",  
    "March", "April", "May",  
    "June", "July", "August", 
    "September", "October",  
    "November", "December" 
]; 

  function handleDelete() {
    props.onDelete(book.id);
  }
  function handleEdit() {
    props.onEdit(book);
  }

  function getFormattedDateString(dateStr){
   let  date = new Date(dateStr);
   
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  }

  return (
    <>
      <Card
        bg="info"
        text="green"
        // key={variant}
        // text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        style={{ width: "30rem" }}
        //border="primary"
        //className="mb-2"
        className="shadow-lg p-2 mb-5 bg-white rounded"
        // className="bg-dark text-white mb-2" hover-shadow
      >
        
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
                <Card.Title as="h6">{book.title}</Card.Title>
                <Nav variant="tabs" defaultActiveKey="#first">
                  <Nav.Item>
                    <Nav.Link href="#first" onClick = {() => setActiveTab("details")}>Detail</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#second" onClick = {() => setActiveTab("description")}>Description</Nav.Link>
                  </Nav.Item>
                  
                </Nav>
              </Card.Header>

             

             {(activeTab === "details") &&
             <Card.Body>
                <Card.Text>
                  by {book.authorRef.author_name} | {getFormattedDateString(book.publication_date)}{" "}
                </Card.Text>
                <Card.Text>{book.genreRef.genre_name}</Card.Text>
                <Card.Text className="text-muted">
                  <small>{book.price}</small>
                </Card.Text>
       
              </Card.Body>}


            {(activeTab === "description") &&
             (<Card.Body>
                <Card.Text>
                {book.title}
                </Card.Text>
                
              </Card.Body>) }

              <Card.Footer>
                <button style={{ border: 0 }} onClick={handleEdit}>
                  <img
                    src="/images/icons/Oxygen-Icons.org-Oxygen-Actions-document-edit.24.png"
                    title="Edit Book"
                  />
                </button>
                <button style={{ border: 0 }} onClick={handleDelete}>
                  <img src="/images/delete.24.png" title="Delete Book" />
                </button>
              </Card.Footer>
            </Col>
          </Row>
        
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
