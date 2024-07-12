import { React, useState, useRef } from "react";
import { Button,ToastContainer, Toast } from "react-bootstrap";

import useFetch from "../Hooks/useFetch";
import useFetchAll from "../Hooks/useFetchAll";
import Spinner from "./Spinner";
//import PageNotFound from "./PageNotFound";
import BookLayout from "./BookLayout";
import OffCanvasAddBook from "./OffCanvasAddBook";
import OffCanvasEditBook from "./OffCanvasEditBook";

const baseUrl = "http://localhost:3000/";

export default function BookManager() {

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);
  let successToastMessage = useRef("");
  let failureToastMessage = useRef("");
 // const toggleToast = () => setShowToast(!showToast);

  const [showAddBook, setShowAddBook] = useState(false);
  const handleAddBookOffCanvasClose = () => setShowAddBook(false);
  const handleAddBookOffCanvasShow = () => setShowAddBook(true);

  const [showEditBook, setShowEditBook] = useState(false);
  const handleEditBookOffCanvasClose = () => setShowEditBook(false);
  const handleEditBookOffCanvasShow = () => setShowEditBook(true);

  let bookToEditRef = useRef({});

  // When the Component loads first time fetch the Users and Categories
  const urls = ["api/authors/", "api/genres/"];
  const {
    data,
    loading: loadingData,
    error: errorRetrievingData,
  } = useFetchAll(urls);

  const url = `api/books/`;
  const {
    data: books,
    setData: setBooks,
    loading: loadingBooks,
    error: errorRetrievingBooks,
  } = useFetch(url);

  if (errorRetrievingData) throw errorRetrievingData;
  if (errorRetrievingBooks) throw errorRetrievingBooks;

  if (loadingData || loadingBooks) return <Spinner />;

  // if (errorRetrievingBooks) throw errorRetrievingBooks;
  // if (loadingBooks) return <Spinner />;

  let authors = null;
  let genres = null;

  if (data != null && data.length === 2) {
    authors = data[0];
    genres = data[1];
  }

  //second render onwards this is not required
  if (authors == null || authors.length === 0) return "Authors not loaded";
  if (genres == null || genres.length === 0) return "Genres not loaded";

  if (books == null) return "Books not Loaded...";

  function addBook(event) {
    // taskToUpdateRef.current = task;
    //alert("In add book");
    // handleUpdateTaskModalShow();

    console.log("entered add book");

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());
    // alert("entered update task with form submit params" + JSON.stringify(formDataObj));

    async function addBookOnServer() {
      try {
        let newBookObj = {
          title: formDataObj.book_title,
          author_id: formDataObj.book_author_id,
          genre_id: formDataObj.book_genre_id,
          //description: formDataObj.book_description,
          publication_date: formDataObj.book_publish_date,
          price: formDataObj.book_price,
        };

        const response = await fetch(`${baseUrl}api/books/`, {
          method: "POST",
          body: JSON.stringify(newBookObj),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          const json = await response.json();

          if (json.id === undefined || json.id === null) {
            console.log("Book could not be added on server.");
            throw "Book could not be added on server.";
          }

          console.log(`Added book successfully with id: ${json.id}`);
          // alert(`Added book successfully with id: ${json.id}`)
          alert(JSON.stringify(json))
          //toast success
            successToastMessage = `Added book '${json.title}' successfully to BookWare!`
         // successToastMessage = `Added book successfully to BookWare!`
          setShowSuccessToast(true);
          handleAddBookOffCanvasClose();

          // Adding new book to existing list, Re-rendering component
          setBooks([...books, json]);
        } else {
          // alert("response not ok :" + response);
          throw response;
        }
      } catch (e) {
        //toast fail
        failureToastMessage =  `Failed adding book to BookWare!`
        setShowFailureToast(true);
        handleAddBookOffCanvasClose();
        // alert("update task caught error:" + e);

        //setError(e);
      }
    }

    addBookOnServer();
  }

  function deleteBook(bookid) {
   
    async function deleteBookOnServer() {
      try {
        console.log(`Got to delete  : ${baseUrl}api/books/${bookid}`);

        const response = await fetch(`${baseUrl}api/books/${bookid}`, {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });


        if (response.ok){

          if(response.status === 204){
            console.log(`Deleted successfully book with id: ${bookid}`);

            setShowSuccessToast(true);

            let filteredBooks = books.filter( b => b.id !== bookid)
            setBooks(filteredBooks);

           

          } else if(response.status === 404){

            throw "Book not found. ";

          } else{
            throw "Got server response but delete unsuccessful ";
          }

        } else {
          
          throw `Response not ok.`;
        }
      } catch (e) {
        //setError(e);
        setShowFailureToast(true);
        console.log(`Caught error deleting book ${baseUrl}api/books/${bookid}. 
                      Error: ${e.message}`);

      }
    }

    deleteBookOnServer();
  }

  function editBook(book) {
     // alert("In edit book");

     bookToEditRef.current = book; 
     handleEditBookOffCanvasShow();
  }

  function updateBook(event) {

    console.log("entered update book");

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());

    async function updateBookOnServer() {
      try {

        let bookId = formDataObj.bookIdForUpdate;
        let updateBookObj = {
          title: formDataObj.book_title,
          author_id: formDataObj.book_author_id,
          genre_id: formDataObj.book_genre_id,
          //description: formDataObj.book_description,
          publication_date: formDataObj.book_publish_date,
          price: formDataObj.book_price,
        };

        const response = await fetch(`${baseUrl}api/books/${bookId}`, {
          method: "PUT",
          body: JSON.stringify(updateBookObj),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          const updatedBook = await response.json();

          if (updatedBook.id === undefined || updatedBook.id === null) {
            console.log("Book could not be updated on server.");
            throw "Book could not be updated on server.";
          }

          console.log(`Updated book successfully with id: ${updatedBook.id}`);
          // alert(`Added book successfully with id: ${json.id}`)
         // alert(JSON.stringify(json))
          //toast success
            successToastMessage = `Updated book '${updatedBook.title}' successfully on BookWare!`
         
          setShowSuccessToast(true);
          handleEditBookOffCanvasClose();
        
          let updatedBookList = books.map( b => {if(b.id === updatedBook.id) {b = updatedBook} return b;})
          
          // Updating the book in the existing list, Re-rendering component 
          setBooks([...updatedBookList]);
        } else {
          // alert("response not ok :" + response);
          throw response;
        }
      } catch (e) {
        //toast fail
        failureToastMessage =  `Failed updating book on BookWare!`
        setShowFailureToast(true);
        handleEditBookOffCanvasClose();
        // alert("update task caught error:" + e);

        //setError(e);
      }
    }

    updateBookOnServer();


  }

  return (
    <>
      <Button variant="link" onClick={handleAddBookOffCanvasShow}>
        <img
          src="images/icons/Gartoon-Team-Gartoon-Action-List-add.72.png"
          alt="Add A New Book"
          title="Add A New Book"
        />
      </Button>
      <section id="books-sec">
        <div id="bookLayoutDiv">
          <br />
          <BookLayout books={books} onDelete={deleteBook} onEdit={editBook} />
        </div>
      </section>
      <section id="AddBook-OffCanvas-Section">
        <OffCanvasAddBook
          showOffCanvas={showAddBook}
          handleClose={handleAddBookOffCanvasClose}
          onSubmitHandle={addBook}
          authors={authors}
          genres={genres}
        />
      </section>
      <section id="EditBook-OffCanvas-Section">
        <OffCanvasEditBook
          showOffCanvas={showEditBook}
          handleClose={handleEditBookOffCanvasClose}
          onSubmitHandle={updateBook}
          authors={authors}
          genres={genres}
          bookToEdit={bookToEditRef.current}
        />
      </section>
      <ToastContainer className="p-3" position="middle-center" style={{ position: 'fixed', zIndex: 1 , color: 'white'}} >
      
        <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} delay={5000} bg="success" autohide> 
          <Toast.Header closeVariant='white' style={{color: 'green'}}> <strong className="me-auto">Success! 😊 </strong></Toast.Header>
          <Toast.Body>Book added successfully to Bookware repository. 😊 </Toast.Body>
          {/* <Toast.Body>{successToastMessage.current}</Toast.Body> */}
        </Toast>
        <Toast show={showFailureToast} onClose={() => setShowFailureToast(false)} delay={5000} bg="danger" autohide> 
          <Toast.Header closeVariant='white' style={{color: 'red'}}> <strong className="me-auto">Failure! 😞 </strong></Toast.Header>   
          <Toast.Body>Failed adding book to the Bookware repository. 😞 </Toast.Body>
          {/* <Toast.Body>{failureToastMessage.current}</Toast.Body> */}
        </Toast>
      </ToastContainer>

    </>
  );
}


