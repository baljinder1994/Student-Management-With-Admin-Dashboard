import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button,Table,Modal,Form,InputGroup,FormControl} from 'react-bootstrap'
import Sidebar from './Sidebar'
const ViewStudent = () => {
  const[students,setStudents]=useState([]);
  const[showEditModal,setShowEditModal]=useState(false)
  const[currentStudent,setCurrentStudent]=useState(null)
  const[filteredStudents,setFilteredStudents]=useState([])
  const[searchTerm,setSearchTerm]=useState('')

  useEffect(() =>{
    const fetchStudents=async() =>{
      try{
        const res=await axios.get('http://localhost:5000/api/student/view')
        setStudents(res.data)
        setFilteredStudents(res.data)
      }catch(err){
        console.error('Error fetching students',err)
      }
    }
    fetchStudents()
  },[])

  const handleEdit=(student) =>{
    setCurrentStudent(student)
    setShowEditModal(true)
  }
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try{
      await axios.put(`http://localhost:5000/api/student/update/${currentStudent._id}`, currentStudent)
      setStudents(students.map((student) => (student._id === currentStudent._id ? currentStudent: student)))
      setShowEditModal(false)
    }catch(err){
      console.error('Error updating student:',err)
    }
  }
  const handleDelete=async(id)=>{
    if(window.confirm('Are you sure you want to delete this student?')){
    try{
      await axios.delete(`http://localhost:5000/api/student/delete/${id}`)
      setStudents(students.filter((student) => student._id !== id))
    
    }catch(err){
      console.error('Error deleting student:',err)
    }
  }
}

  const handleChange=(e)=>{
    setCurrentStudent({...currentStudent,[e.target.name]:e.target.value})
  }

  const handleSerchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredStudents(students); // Show all students if search term is empty
    } else {
      const filtered = students.filter(student =>
        student.rollNumber.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };
  return (
    <div className='container-fluid'>
       <div className='row'>
        <Sidebar/>
        <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-4"  >
           <h2>Admin Dashboard</h2>

           <InputGroup className="mb-3">
           <FormControl
             placeholder="Search by Roll Number"
             value={searchTerm}
             onChange={handleSerchChange}
           ></FormControl>
           </InputGroup>
           <div className='table-responsive mt-3'>
           <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
              <th>Roll Number</th>
                <th>Name</th>
                <th>Class</th>
                <th>Batch</th>
               
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) =>(
                <tr key={student._id}>
                  <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.batch}</td>
                
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(student)}>Edit</Button>
                </td>
                <td>
                  <Button variant="danger" className="me-2" onClick={() => handleDelete(student._id)}>Delete</Button>
                </td>
                </tr>
              ))}
            </tbody>
           </Table>
         </div>
           <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
           <Modal.Header closeButton>
                 <Modal.Title>Edit  Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentStudent && (
                <Form onSubmit={handleUpdate}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={currentStudent.name}
                      onChange={handleChange}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formClass">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      type="text"
                      name="class"
                      value={currentStudent.class}
                      onChange={handleChange}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBatchYear">
                    <Form.Label>Batch</Form.Label>
                    <Form.Control
                      type="text"
                      name="batchYear"
                      value={currentStudent.batchYear}
                      onChange={handleChange}
                      required
                    ></Form.Control>
                     </Form.Group>
                    <Form.Group controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      name="gender"
                      value={currentStudent.gender}
                      onChange={handleChange}
                      required
                    ></Form.Control>
                    
                  </Form.Group>
                  
                  <Button variant="primary" type="submit">Update Student</Button>
                </Form>
              )}
            </Modal.Body>
           </Modal>
         </main>
       </div>
    </div>
  )
}

export default ViewStudent
