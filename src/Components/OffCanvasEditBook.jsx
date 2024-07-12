import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function OffCanvasAddBook(props) {
  const { showOffCanvas, handleClose, onSubmitHandle, authors, genres, bookToEdit } = props;

  const [title, setCategory] = useState(bookToEdit.title);
  const [description, setDescription] = useState(bookToEdit.description);
  const [price, setPrice] = useState(bookToEdit.price);
  const [publishDate, setPublishDate] = useState(bookToEdit.publication_date);
  const [genreId, setGenreId] = useState(bookToEdit.genre_id);
  const [authorId, setAuthorId] = useState(bookToEdit.author_id);

  const defaultTitle = bookToEdit.title;
  const defaultDescription = bookToEdit.description;
  const defaultPrice = bookToEdit.price;
  const defaultPublishDate = getFormattedDateString(bookToEdit.publication_date);
  const defaultGenreId= bookToEdit.genre_id;
  const defaultAuthorId= bookToEdit.author_id;


  function getFormattedDateString(dateStr){
    let  date = new Date(dateStr);

    let month = date.getMonth() + 1;
    let day = date.getDate()

    // if (month.toString.length == 1) monthStr = "0" + month;
    // if (day.toString.length == 1) dayStr = "0" + day;
    
     return date.getFullYear() + '-' 
          + ((month.toString().length === 1)? "0" + month : month) + '-' 
          + ((day.toString().length === 1)? "0" + day : day);
   }

 //const defaultPublishDate = "2022-11-02";
// const defaultPublishDate = "2024-12-31";
 
 
  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleClose}
      placement="end" //"bottom" //end
      id="offcanvas-editbook"
    //  backdrop="static"
    >
      <Offcanvas.Header style={{ marginTop: "30px" }} closeButton>
        <Offcanvas.Title id="offcanvas-addbook-title">
          Edit & Update Book Details:
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{ marginTop: "30px", marginLeft: "50px", marginRight: "50px" }}
        >
          <Form className="mt-50" onSubmit={onSubmitHandle}>
            <div className="d-grid gap-3">
              <Form.Group controlId="etitle-frmgrp-id">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="book_title"
                  defaultValue={defaultTitle}
                  placeholder=""
                  // onChange={usernameAvalabilityChk}
                />
              </Form.Group>

              <Form.Group controlId="egenre-frmgrp-id">
                <Form.Label>Genre</Form.Label>
                <Form.Select
                  id="egenre-select-id"
                  name="book_genre_id"
                  // ref={categoriesForUpdateTaskRef}
                  size="sm"
                  className="mb-3"
                  defaultValue={defaultGenreId}
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

              <Form.Group controlId="eauthor-frmgrp-id">
                <Form.Label>Author</Form.Label>
                <Form.Select
                  id="eauthors-select-id"
                  name="book_author_id"
                  // ref={categoriesForUpdateTaskRef}
                  size="sm"
                  className="mb-3"
                  defaultValue={defaultAuthorId}
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

              <Form.Group controlId="eprice-frmgrp-id">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="book_price"
                  defaultValue={defaultPrice}
                  placeholder=""
                  // onChange={usernameAvalabilityChk}
                />
              </Form.Group>

              <Form.Group controlId="edescription-frmgrp-id">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  name="book_description"
                  defaultValue={defaultPublishDate}
                  placeholder=""
                  // onChange={usernameAvalabilityChk}
                />
              </Form.Group>

              <Form.Group controlId="epublish-date-frmgrp-id">
                <Form.Label>Publication Date</Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="book_publish_date"
                  
                 defaultValue={defaultPublishDate}
                  //value={defaultPublishDate}
                  placeholder=""
                  // onChange={usernameAvalabilityChk}
                />


                  <input
                      id="bookId-frm-id"
                      name="bookIdForUpdate"
                      value={bookToEdit.id}
                      type="text"
                      hidden
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

              <Button id="offcanvas-update-btn" size="sm" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
