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
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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

    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
      setVisible(false);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const openDeleteModal = (bookId) => {
    setCurrentBookId(bookId);
    setVisible(true);
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
                        icon={faTrash}
                        style={{ color: '#d9534f', cursor: 'pointer' }}
                        onClick={() => openDeleteModal(book._id)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Delete Book</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete this book?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={() => handleDeleteBook(currentBookId)}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteBooks;
