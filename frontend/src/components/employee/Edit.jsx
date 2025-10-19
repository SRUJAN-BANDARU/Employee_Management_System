import React from 'react'
import { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
  const [employee, setEmployee] = useState({
    name : '',
    maritalStatus : '',
    designation : '',
    salary : 0,
    department : ''
  })
  const navigate = useNavigate();
  const [departments, setDepartments] = useState(null)
  const [formData, setFormData] = useState({});

    const {id}= useParams();

    useEffect(() => {
        const getDepartments = async() => {
          const department = await fetchDepartments();
          setDepartments(department);
        }
        getDepartments();
        
      }, []);
  useEffect(() => {
    const fetchEmployee = async () => {
          
          try {
            const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              },
            });
            if (response.data.success) {
                const employee = response.data.employee;
                setEmployee((prev) => ({
                  ...prev,
                  name: employee.userId.name,
                  maritalStatus : employee.maritalStatus,
                  designation : employee.designation,
                  salary : employee.salary,
                  department : employee.department
                }))
            }
          } catch (error) {
            if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
          }
          
        };
        fetchEmployee()
    
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
  
      setEmployee((prevData) => ({...prevData, [name] : value}))
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
            const response = await axios.put(`http://localhost:3000/api/employee/${id}`, employee, 
                {headers : {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate("/admin-dashboard/employees")
            }
        }
        catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }

  }

  return (
    <>{departments && employee ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="name" className='block text-sm font-medium text-gray-700'>
                Name
              </label>
              <input 
                type="text" 
                name='name'
                value={employee.name}
                id='name'
                placeholder='Insert Name'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
            </div>


            <div>
              <label 
                htmlFor="ms"
                className='block text-sm font-medium text-gray-700'
              >
                Marital Status
              </label>

              <select name="maritalStatus" 
                // placeholder="Marital Status"
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                value = {employee.maritalStatus}
                required
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            <div>
              <label htmlFor="desig" className='block text-sm font-medium text-gray-700'>
                Designation
              </label>
              <input 
                type="text" 
                name='designation'
                placeholder='Designation'
                value = {employee.designation}
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                required
              />
            </div>

            <div>
              <label htmlFor="salary"
                className='block text-sm font-medium text-gray-700'>
                Salary
              </label>
              <input 
                type="number"
                id='salary'
                name='salary'
                placeholder='Salary'
                value = {employee.salary}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                required
               />
            </div>

            <div className='col-span-2'>
              <label htmlFor="dep" className='block text-sm font-medium text-gray-700'>
                Department
              </label>
              <select 
                name="department" 
                value={employee.department}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
              </select>
            </div>

            


            <div className='flex items-center justify-center'>
              <button
                type='submit'
                className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'>
                  Edit Employee
              </button>
            </div>
          </div>
        </form>
    </div>
    ) : <div>Loading</div>}</>
  )
}

export default Edit
