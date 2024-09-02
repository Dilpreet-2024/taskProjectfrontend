import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const UpdateBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [bookDetails, setBookDetails] = useState({
    Title: '',
    Author: '',
    isbn: '',
    Price: '',
    StockQuantity: '',
    Description: '',
    Image: null,
  });
  const [visible, setVisible] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEditBook = (book) => {
    setBookDetails({
      Title: book.Title,
      Author: book.Author,
      isbn: book.isbn,
      Price: book.Price,
      StockQuantity: book.StockQuantity,
      Description: book.Description,
      Image: null,
    });
    setCurrentBookId(book._id);
    setEditMode(true);
    setVisible(true);
  };

  const handleUpdateBook = async () => {
    const formData = new FormData();
    formData.append('Title', bookDetails.Title);
    formData.append('Author', bookDetails.Author);
    formData.append('isbn', bookDetails.isbn);
    formData.append('Price', bookDetails.Price);
    formData.append('StockQuantity', bookDetails.StockQuantity);
    formData.append('Description', bookDetails.Description);

    if (bookDetails.Image) {
      formData.append('Image', bookDetails.Image);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/books/${currentBookId}`,
        formData,
        
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        
      );
      fetchBooks()
      window.alert("Book updated successfully!")
      
      setBooks(books.map((book) =>
        book._id === currentBookId ? { ...book, ...response.data } : book
      ));
      setVisible(false);
      setEditMode(false);
      setCurrentBookId(null);
      setBookDetails({
        Title: '',
        Author: '',
        isbn: '',
        Price: '',
        StockQuantity: '',
        Description: '',
        Image: null,
      });
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleImageChange = (e) => {
    setBookDetails({ ...bookDetails, Image: e.target.files[0] });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h1 style={{ fontSize: '24px', color: 'hotpink' }}>Books List</h1>
        </CCardHeader>
        <CCardBody>
          {books.length === 0 ? (
            <div>No books found.</div>
          ) : (
            <CTable striped hover bordered responsive>
              <CTableHead color='dark'>
                <CTableRow>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Author</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ISBN</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Stock Quantity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {books.map((book) => (
                  <CTableRow key={book._id}>
                    <CTableDataCell>{book.Title}</CTableDataCell>
                    <CTableDataCell>{book.Author}</CTableDataCell>
                    <CTableDataCell>{book.isbn}</CTableDataCell>
                    <CTableDataCell>${book.Price}</CTableDataCell>
                    <CTableDataCell>{book.StockQuantity}</CTableDataCell>
                    <CTableDataCell>{book.Description}</CTableDataCell>
                    <CTableDataCell>
                      {book.Image && (
                        <img
                          src={`http://localhost:5000/${book.Image}`}
                          alt={book.Title}
                          style={{ width: '100px' }}
                        />
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ color: '#b3ae0f', cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => handleEditBook(book)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>{editMode ? 'Edit Book' : 'Add Book'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  type="text"
                  value={bookDetails.Title}
                  onChange={(e) => setBookDetails({ ...bookDetails, Title: e.target.value })}
                  placeholder="Title"
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  type="text"
                  value={bookDetails.Author}
                  onChange={(e) => setBookDetails({ ...bookDetails, Author: e.target.value })}
                  placeholder="Author"
                />
              </CCol>
              <CCol>
                <CFormInput
                  type="text"
                  value={bookDetails.isbn}
                  onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })}
                  placeholder="ISBN"
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  type="text"
                  value={bookDetails.Price}
                  onChange={(e) => setBookDetails({ ...bookDetails, Price: e.target.value })}
                  placeholder="Price"
                />
              </CCol>
              <CCol>
                <CFormInput
                  type="text"
                  value={bookDetails.StockQuantity}
                  onChange={(e) => setBookDetails({ ...bookDetails, StockQuantity: e.target.value })}
                  placeholder="Stock Quantity"
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
               
              <CFormInput
                  type="text"
                  value={bookDetails.Description}
                  onChange={(e) => setBookDetails({ ...bookDetails, Description: e.target.value })}
                  placeholder="Description"
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  type="file"
                  onChange={handleImageChange}
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleUpdateBook}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default UpdateBooks;
