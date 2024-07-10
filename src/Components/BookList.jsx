import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "./Spinner";
import useFetch from "../Hooks/useFetch";
//import PageNotFound from "./PageNotFound";

import Book from "./Book";

export default function BookList(props) {

  const { books: books } = props;

  //alert("books  :: " + books)

  return (
    <>
      <section id="books-section">
       

        {books.length == 0 && 
           ( <h6 style={{marginLeft: "100px"}}> No books to display!</h6>)
        }

        <Table responsive hover striped>
          <tbody>
            {books.map((book) => (
              <Book
                key={book.id}
                book={book}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
              />
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
}
