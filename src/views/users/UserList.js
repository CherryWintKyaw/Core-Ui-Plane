import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { ENDPOINTS } from '../../api/api';  // Ensure you import the endpoints

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(ENDPOINTS.USERS, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          const errorData = await response.json();
          setErrors(errorData);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrors({ general: 'An error occurred. Please try again.' });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <CContainer className="min-vh-100 d-flex flex-column align-items-center">
      <CRow className="justify-content-center">
        <CCol md={10}>
          <CCard className="mt-4">
            <CCardHeader>
              <h1>User List</h1>
            </CCardHeader>
            <CCardBody>
              {loading ? (
                <p>Loading...</p>
              ) : errors ? (
                <p className="text-danger">{errors.general || 'Failed to load users.'}</p>
              ) : (
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>ID</CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Email</CTableHeaderCell>
                      <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {users.map(user => (
                      <CTableRow key={user.id}>
                        <CTableDataCell>{user.id}</CTableDataCell>
                        <CTableDataCell>{user.name}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color="primary" className="me-2">
                            Edit
                          </CButton>
                          <CButton color="danger">
                            Delete
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default UserList;
