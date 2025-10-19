import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const List = () => {

  const {user} = useAuth();
  const [leaves, setLeaves] = useState(null)
  let sno = 1;
  const {id} = useParams()

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if(!leaves){
    return <div>Loading...</div>
  }
  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
      </div>

      {user.role === 'employee' && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by Emp Name"
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          // onChange={handleFilter}
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow transition-colors duration-200"
        >
          Add New Leave
        </Link>
        
        
      </div>
      )}
      

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200 rounded-md">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="bg-white border-b hover:bg-teal-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>
                  <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{leave.reason}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        leave.status === "Approved"
                          ? "bg-green-500"
                          : leave.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No leaves found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List
