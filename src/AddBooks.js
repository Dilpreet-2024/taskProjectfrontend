import React, { useState } from 'react';
import axios from 'axios';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const AddBooks = () => {
  const [bookDetails, setBookDetails] = useState({
    Title: '',
    Author: '',
    isbn: '',
    Price: '',
    StockQuantity: '',
    Description: '',
    Image: null,
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setBookDetails({
      ...bookDetails,
      Image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Title', bookDetails.Title);
    formData.append('Author', bookDetails.Author);
    formData.append('isbn', bookDetails.isbn);
    formData.append('Price', bookDetails.Price);
    formData.append('StockQuantity', bookDetails.StockQuantity);
    formData.append('Description', bookDetails.Description);
    formData.append('Image', bookDetails.Image);

    try {
      const response = await axios.post('http://localhost:5000/api/books/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Book created:', response.data);
      setSuccessMessage(true);
      // Reset form fields after submission
      setBookDetails({
        Title: '',
        Author: '',
        isbn: '',
        Price: '',
        StockQuantity: '',
        Description: '',
        Image: null,
      });
      // Navigate to another route if needed
      setTimeout(() => navigate('/booklist'), 2000); // Redirect after 2 seconds to allow message display
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="8">
          <CCard>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <h1 style={{ color: '#20c997', textAlign: 'center' }}>Add Book</h1>
                <div className="mb-3">
                  <CFormLabel htmlFor="Title">Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="Title"
                    name="Title"
                    placeholder="Enter book title"
                    value={bookDetails.Title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="Author">Author</CFormLabel>
                  <CFormInput
                    type="text"
                    id="Author"
                    name="Author"
                    placeholder="Enter author name"
                    value={bookDetails.Author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="isbn">ISBN</CFormLabel>
                  <CFormInput
                    type="text"
                    id="isbn"
                    name="isbn"
                    placeholder="Enter book ISBN"
                    value={bookDetails.isbn}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="Price">Price</CFormLabel>
                  <CFormInput
                    type="text"
                    id="Price"
                    name="Price"
                    placeholder="Enter price"
                    value={bookDetails.Price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="StockQuantity">Stock Quantity</CFormLabel>
                  <CFormInput
                    type="text"
                    id="StockQuantity"
                    name="StockQuantity"
                    placeholder="Enter stock quantity"
                    value={bookDetails.StockQuantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="Description">Description</CFormLabel>
                  <CFormTextarea
                    id="Description"
                    name="Description"
                    rows="4"
                    placeholder="Enter book description"
                    value={bookDetails.Description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="Image">Book Image</CFormLabel>
                  <CFormInput
                    type="file"
                    id="Image"
                    name="Image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <CButton type="submit" color="primary">Submit</CButton>
              </CForm>
              {successMessage && (
                <CCard className="mt-4">
                  <CCardBody>
                    <h4 className="text-center text-success">Book added successfully!</h4>
                  </CCardBody>
                </CCard>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddBooks;
