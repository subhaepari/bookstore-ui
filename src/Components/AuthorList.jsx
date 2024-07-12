import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "./Spinner";
import useFetch from "../Hooks/useFetch";
//import PageNotFound from "./PageNotFound";

import { Card, Container, Row, Col, Nav } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import Author from "./Author";

export default function AuthorList(props) {
  const { authors: authors } = props;

  function handleDelete(authorid) {
   
    props.onDelete(authorid);
  }
  function handleEdit(author) {
     props.onEdit(author);
  
  }

  return (
    <>
      <section id="authors-section">
        {authors.length == 0 && (
          <h6 style={{ marginLeft: "100px" }}> No authors to display!</h6>
        )}

        <Accordion>
          {authors.map((author) => (
            <Accordion.Item eventKey={author.id}>
              <Accordion.Header>{author.author_name}</Accordion.Header>
              <Accordion.Body>
                <div>
                  <h6>Biography:</h6>
                  <p>{author.biography}</p>
                  <div className="d-flex justify-content-end">
                    <button style={{ border: 0 }} onClick={() => {handleEdit(author)}}>
                      <img
                        src="/images/icons/Oxygen-Icons.org-Oxygen-Actions-document-edit.24.png"
                        title="Edit Author"
                      />
                    </button>
                    {/* <button style={{ border: 0 }} onClick={handleDelete}>
                      <img src="/images/delete.24.png" title="Delete Author" />
                    </button> */}
                    <button style={{ border: 0 }} onClick={() => {handleDelete(author.id)}}>
                      <img src="/images/delete.24.png" title="Delete Author" />
                    </button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
    </>
  );
}


