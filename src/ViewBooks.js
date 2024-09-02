import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableCaption, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

const ViewBooks = () => {
  const [books, setBooks] = useState([]); // Ensure books is initialized as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        console.log('API Response:', response.data); // Log to check the response structure
        if (response.data && Array.isArray(response.data.data)) {
          setBooks(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          setBooks([]); // Set an empty array if data is not in expected format
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>Books List</strong>
      </CCardHeader>
      <CCardBody>
        <CTable hover striped responsive bordered>
          <CTableCaption>List of books</CTableCaption>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Author</CTableHeaderCell>
              <CTableHeaderCell>ISBN</CTableHeaderCell>
              <CTableHeaderCell>Price</CTableHeaderCell>
              <CTableHeaderCell>Stock Quantity</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell>Image</CTableHeaderCell>
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
                  {book.Image ? (
                    <img src={`http://localhost:5000/${book.Image}`} alt={book.Title} style={{ width: '100px' }} />
                  ) : (
                    'No Image'
                  )}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default ViewBooks;
