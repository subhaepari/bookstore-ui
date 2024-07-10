import { React, useState } from "react";
import { Button,ToastContainer, Toast } from "react-bootstrap";

import useFetch from "../Hooks/useFetch";
import useFetchAll from "../Hooks/useFetchAll";
import Spinner from "./Spinner";
//import PageNotFound from "./PageNotFound";
import BookList from "./BookList";
import OffCanvasAddBook from "./OffCanvasAddBook";

const baseUrl = "http://localhost:3000/";

export default function BookManager() {

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  let successToastMessage = "";
 // const toggleToast = () => setShowToast(!showToast);

  const [showAddBook, setShowAddBook] = useState(false);
  const handleAddBookOffCanvasClose = () => setShowAddBook(false);
  const handleAddBookOffCanvasShow = () => setShowAddBook(true);

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
          //alert(JSON.stringify(json))
          //toast success
         // successToastMessage = `Added book \'${json.title}\' successfully to BookWare!`
          successToastMessage = `Added book successfully to BookWare!`
          setShowSuccessToast(true);
          handleAddBookOffCanvasClose();
          // Re-rendering component fetching new UI
          setBooks([...books, json]);
        } else {
          // alert("response not ok :" + response);
          throw response;
        }
      } catch (e) {
        //toast fail
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
        console.log("Deleting  :" + `${baseUrl}api/books/` + bookid);

        const response = await fetch(`${baseUrl}api/books/` + bookid, {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        if (response.ok) {
          const json = await response.json();

          if (bookid === json.deletedTodo.id) {
            console.log(`Deleted successfully task with id: ${bookid}`);

            // Re-rendering component fetching new UI
            //  setUserTasks([...userTasks]);
            //toast success
          } else {
            throw "Got server response but result not ok ";
          }
        } else {
          //alert("response not ok :" + response);
          throw response;
        }
      } catch (e) {
        //alert("caught error:" + e);
        //toast fail
        //setError(e);
      }
    }

    deleteBookOnServer();
  }

  function editBook(book) {
    // taskToUpdateRef.current = task;

    alert("In edit book");

    // handleUpdateTaskModalShow();
  }

  return (
    <>
      Books page
      <Button variant="link" onClick={handleAddBookOffCanvasShow}>
        <img
          src="images/icons/Gartoon-Team-Gartoon-Action-List-add.72.png"
          alt="Add A New Book"
          title="Add A New Book"
        />
      </Button>
      <section id="books-sec">
        <div id="bookListDiv">
          <br />
          <BookList books={books} onDelete={deleteBook} onEdit={editBook} />
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
      <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
        <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} delay={3000} autohide> 
          <Toast.Body>{successToastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>



      <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         limit={1}
         pauseOnFocusLoss
         draggable
         pauseOnHover
/>


    </>
  );
}
