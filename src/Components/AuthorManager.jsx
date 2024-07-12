import { React, useState, useRef } from "react";
import { Button,ToastContainer, Toast } from "react-bootstrap";

import useFetch from "../Hooks/useFetch";
import Spinner from "./Spinner";
import AuthorList from "./AuthorList";

import OffCanvasAddAuthor from "./OffCanvasAddAuthor";
import OffCanvasEditAuthor from "./OffCanvasEditAuthor";

const baseUrl = "http://localhost:3000/";

export default function AuthorManager() {

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailureToast, setShowFailureToast] = useState(false);

  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const handleAddAuthorOffCanvasClose = () => setShowAddAuthor(false);
  const handleAddAuthorOffCanvasShow = () => setShowAddAuthor(true);

  const [showEditAuthor, setShowEditAuthor] = useState(false);
  const handleEditAuthorOffCanvasClose = () => setShowEditAuthor(false);
  const handleEditAuthorOffCanvasShow = () => setShowEditAuthor(true);

  let authorToEditRef = useRef({});


  const url = `api/authors/`;
  const {
    data: authors,
    setData: setAuthors,
    loading: loadingAuthors,
    error: errorRetrievingAuthors,
  } = useFetch(url);

  if (errorRetrievingAuthors) throw errorRetrievingAuthors;

  if (loadingAuthors) return <Spinner />;

  if (authors == null) return "Authors not Loaded...";


  function addAuthor(event) {

    console.log("entered add author");

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());
   alert("entered update task with form submit params" + JSON.stringify(formDataObj));

    async function addAuthorOnServer() {
      try {
        let newAuthorObj = {
          author_name: formDataObj.author_name,
          biography: formDataObj.author_biography,
        };

        const response = await fetch(`${baseUrl}api/authors/`, {
          method: "POST",
          body: JSON.stringify(newAuthorObj),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          const json = await response.json();

          if (json.id === undefined || json.id === null) {
            console.log("Author could not be added on server.");
            throw "Author could not be added on server.";
          }

          console.log(`Added author successfully with id: ${json.id}`);
          // alert(`Added book successfully with id: ${json.id}`)
          alert(JSON.stringify(json))
          //toast success
           // successToastMessage = `Added book '${json.title}' successfully to BookWare!`
         // successToastMessage = `Added book successfully to BookWare!`
          setShowSuccessToast(true);
          handleAddAuthorOffCanvasClose();

          // Adding new book to existing list, Re-rendering component
          setAuthors([...authors, json]);
        } else {
          // alert("response not ok :" + response);
          throw response;
        }
      } catch (e) {
        //toast fail
      //  failureToastMessage =  `Failed adding book to BookWare!`
        setShowFailureToast(true);
        handleAddAuthorOffCanvasClose();
        // alert("update task caught error:" + e);

        //setError(e);
      }
    }

    addAuthorOnServer();
  }


  function deleteAuthor(authorid) {
   
    async function deleteAuthorOnServer() {
      try {
        console.log(`Got to delete  : ${baseUrl}api/authors/${authorid}`);

        const response = await fetch(`${baseUrl}api/authors/${authorid}`, {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });


        if (response.ok){

          if(response.status === 204){
            console.log(`Deleted successfully author with id: ${authorid}`);

            setShowSuccessToast(true);

            let filteredAuthors = authors.filter( a => a.id !== authorid)
            setAuthors(filteredAuthors);

           

          } else if(response.status === 404){

            throw "Author not found. ";

          } else{
            throw "Got server response but delete unsuccessful ";
          }

        } else {
          
          throw `Response not ok.`;
        }
      } catch (e) {
        //setError(e);
        setShowFailureToast(true);
        console.log(`Caught error deleting author ${baseUrl}api/authors/${authorid}. 
                      Error: ${e.message}`);

      }
    }

    deleteAuthorOnServer();
  }

  function editAuthor(author) {

    authorToEditRef.current = author; 
    handleEditAuthorOffCanvasShow();
  }


  function updateAuthor(event) {

    console.log("entered update author");

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());

    async function updateAuthorOnServer() {
      try {

        let authorId = formDataObj.authorIdForUpdate;
        let updateAuthorObj = {
          author_name: formDataObj.author_name,
          biography: formDataObj.author_biography,
        };

        const response = await fetch(`${baseUrl}api/authors/${authorId}`, {
          method: "PUT",
          body: JSON.stringify(updateAuthorObj),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          const updatedAuthor = await response.json();

          if (updatedAuthor.id === undefined || updatedAuthor.id === null) {
            console.log("Author could not be updated on server.");
            throw "Author could not be updated on server.";
          }

          console.log(`Updated author successfully with id: ${updatedAuthor.id}`);
          // alert(`Added book successfully with id: ${json.id}`)
         // alert(JSON.stringify(json))
          //toast success
            //successToastMessage = `Updated book '${updatedBook.title}' successfully on BookWare!`
         
          setShowSuccessToast(true);
          handleEditAuthorOffCanvasClose();
        
          let updatedAuthorList = authors.map( a => {if(a.id === updatedAuthor.id) {a = updatedAuthor} return a;})
          
          // Updating the book in the existing list, Re-rendering component 
          setAuthors([...updatedAuthorList]);
        } else {
          // alert("response not ok :" + response);
          throw response;
        }
      } catch (e) {
        //toast fail
        //failureToastMessage =  `Failed updating author on BookWare!`
        setShowFailureToast(true);
        handleEditAuthorOffCanvasClose();
        // alert("update task caught error:" + e);

        //setError(e);
      }
    }

    updateAuthorOnServer();


  }

  return (
    <div>
      <Button variant="link" onClick={handleAddAuthorOffCanvasShow}>
        <img
          src="images/icons/Gartoon-Team-Gartoon-Action-List-add.72.png"
          alt="Add A New Author"
          title="Add A New Author"
        />
      </Button>

      <section id="authors-sec">
        <div id="authorLayoutDiv">
          <br />
          <AuthorList
            authors={authors}
            onDelete={deleteAuthor}
            onEdit={editAuthor}
          />
        </div>
      </section>
      <section id="AddAuthor-OffCanvas-Section">
        <OffCanvasAddAuthor
          showOffCanvas={showAddAuthor}
          handleClose={handleAddAuthorOffCanvasClose}
          onSubmitHandle={addAuthor}
        />
      </section>
      <section id="EditAuthor-OffCanvas-Section">
        <OffCanvasEditAuthor
          showOffCanvas={showEditAuthor}
          handleClose={handleEditAuthorOffCanvasClose}
          onSubmitHandle={updateAuthor}
          authorToEdit={authorToEditRef.current}
        />
      </section>

      <ToastContainer className="p-3" position="middle-center" style={{ position: 'fixed', zIndex: 1 , color: 'white'}} >
      
      <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} delay={5000} bg="success" autohide> 
        <Toast.Header closeVariant='white' style={{color: 'green'}}> <strong className="me-auto">Success! 😊 </strong></Toast.Header>
        <Toast.Body>Added author successfully to Bookware repository. 😊 </Toast.Body>
        {/* <Toast.Body>{successToastMessage.current}</Toast.Body> */}
      </Toast>
      <Toast show={showFailureToast} onClose={() => setShowFailureToast(false)} delay={5000} bg="danger" autohide> 
        <Toast.Header closeVariant='white' style={{color: 'red'}}> <strong className="me-auto">Failure! 😞 </strong></Toast.Header>   
        <Toast.Body>Failed adding author to the Bookware repository. 😞 </Toast.Body>
        {/* <Toast.Body>{failureToastMessage.current}</Toast.Body> */}
      </Toast>
    </ToastContainer>

      {/* <Table responsive hover striped>
          <tbody>
            {authors.map((author) => (
             <tr><td>{author.author_name}</td> <td>{author.biography}</td></tr>
            ))}
          </tbody>
        </Table>   */}
    </div>
  );
}
