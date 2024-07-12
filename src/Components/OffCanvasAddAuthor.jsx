import React, { useState } from "react";

import { Form, Button, FloatingLabel, Offcanvas } from "react-bootstrap";

export default function OffCanvasAddAuthor(props) {
  const { showOffCanvas, handleClose, onSubmitHandle } = props;

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleClose}
      placement="end" //"bottom" //end
      id="offcanvas-add-author"
      // backdrop="static"
    >
      <Offcanvas.Header style={{ marginTop: "30px" }} closeButton>
        <Offcanvas.Title id="offcanvas-title-add-book">
          Add an Author:
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{ marginTop: "30px", marginLeft: "50px", marginRight: "50px" }}
        >
          <Form className="mt-50" onSubmit={onSubmitHandle}>
            <div className="d-grid gap-3">
              <FloatingLabel
                controlId="authorname-add-frm-id"
                label="Author Name"
                className="mb-3"
              >
                <Form.Control
                  name="author_name"
                  type="text"
                  size="sm"
                  placeholder="aaaa"
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="biograpphy-add-frm-id"
                label="Biography"
                className="mb-3"
              >
                <Form.Control
                  name="author_biography"
                  as="textarea"
                  rows={10}
                  placeholder=""
                //   autoResizeEnabled={true}
                // minHeight={20}
                // maxHeight={50}
                />
              </FloatingLabel>

              <Button id="offcanvas-add-author-btn" size="sm" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
