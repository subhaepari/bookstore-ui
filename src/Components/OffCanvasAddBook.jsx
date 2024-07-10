import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function OffCanvasAddBook(props) {
  const { showOffCanvas, handleClose, onSubmitHandle, authors, genres } = props;

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleClose}
      placement="bottom" //end
      id="offcanvas-addbook"
    >
      <Offcanvas.Header style={{ marginTop: "30px" }} closeButton>
        <Offcanvas.Title id="offcanvas-addbook-title">
          Add a book:
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{ marginTop: "30px", marginLeft: "50px", marginRight: "50px" }}
        >
          <Form className="mt-50" onSubmit={onSubmitHandle}>
            <div className="d-grid gap-3">
              <Form.Group controlId="title-frmgrp-id">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="book_title"
                  placeholder=""
                  // onChange={usernameAvalabilityChk}
                />
              </Form.Group>

              <Form.Group controlId="genre-frmgrp-id">
                <Form.Label>Genre</Form.Label>
                <Form.Select
                  id="genre-select-id"
                  name="book_genre_id"
                  // ref={categoriesForUpdateTaskRef}
                  size="sm"
                  className="mb-3"
                  // defaultValue={defaultCategory}
                  // value={category}
                  // // onChange={(event)=> setCategory(event.target.value)}
                  // // onChange={(e) => setUserid(e.target.value)}
                >
                  <option value="">Choose...</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.genre_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="author-frmgrp-id">
                <Form.Label>Author</Form.Label>
                <Form.Select
                  id="authors-select-id"
                  name="book_author_id"
                  // ref={categoriesForUpdateTaskRef}
                  size="sm"
                  className="mb-3"
                  // defaultValue={defaultCategory}
                  // value={category}
                  // // onChange={(event)=> setCategory(event.target.value)}
                  // // onChange={(e) => setUserid(e.target.value)}
                >
                  <option value="">Choose...</option>
                  {authors.map((auth) => (
                    <option key={auth.id} value={auth.id}>
                      {auth.author_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="price-frmgrp-id">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="book_price"
                  placeholder=""
                  // onChange={usernameAvalabilityChk}
                />
              </Form.Group>

              <Form.Group controlId="description-frmgrp-id">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  name="book_description"
                  placeholder=""
                  // onChange={usernameAvalabilityChk}
                />
              </Form.Group>

              <Form.Group controlId="publish-date-frmgrp-id">
                <Form.Label>Publication Date</Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="book_publish_date"
                  placeholder=""
                  // onChange={usernameAvalabilityChk}
                />
              </Form.Group>

              {/* <Alert
                variant="danger"
                onClose={() => setUsernameNotAvailShow(false)}
                dismissible
              >
                <p>This Login Name is not available, try another. </p>
              </Alert> */}

              {/* <Form.Group controlId="file-frmgrp-id" className="mb-3">
                <Form.Label>Upload Cover page picture</Form.Label>
                <Form.Control type="file" size="sm" />
              </Form.Group> */}

              <Button id="offcanvas-signup-btn" size="sm" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
