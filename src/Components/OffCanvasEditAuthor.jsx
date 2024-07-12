import React, { useState } from "react";

import { Form, Button, FloatingLabel, Offcanvas } from "react-bootstrap";

export default function OffCanvasEditAuthor(props) {
  const { showOffCanvas, handleClose, onSubmitHandle, authorToEdit } = props;

  const origAuthorName = authorToEdit.author_name;
  const origAuthorBiography = authorToEdit.biography;


  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleClose}
      placement="end" //"bottom" //end
      id="offcanvas-edit-author"
      // backdrop="static"
    >
      <Offcanvas.Header style={{ marginTop: "30px" }} closeButton>
        <Offcanvas.Title id="offcanvas-title-edit-author">
          Edit Author:
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{ marginTop: "30px", marginLeft: "50px", marginRight: "50px" }}
        >
          <Form className="mt-50" onSubmit={onSubmitHandle}>
            <div className="d-grid gap-3">
              <FloatingLabel
                controlId="authorname-edit-frm-id"
                label="Author Name"
                className="mb-3"
              >
                <Form.Control
                  name="author_name"
                  type="text"
                  size="sm"
                  placeholder=""
                  defaultValue={origAuthorName}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="biograpphy-edit-frm-id"
                label="Biography"
                className="mb-3"
              >
                <Form.Control
                  name="author_biography"
                  as="textarea"
                  rows={10}
                  placeholder=""
                  defaultValue={origAuthorBiography}
                  
                />
              </FloatingLabel>

              <input
                      id="authorId-frm-id"
                      name="authorIdForUpdate"
                      value={authorToEdit.id}
                      type="text"
                      hidden
                    />

              <Button id="offcanvas-edit-author-btn" size="sm" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
