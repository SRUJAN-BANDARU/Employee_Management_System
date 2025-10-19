import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import axios from 'axios';



const Table = () => {
    const [leaves, setLeaves] = useState(null)
    const [filteredLeaves, setFilteredLeaves] = useState(null)
    const fetchLeaves = async () =>{
        try {

            const response = await axios.get("http://localhost:3000/api/leave", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            });
            // console.log(response.data)
            if (response.data.success) {
            let sno = 1;
            const data = await response.data.leaves.map((leave) =>  ({
                _id: leave._id,
                sno: sno++,
                employeeId: leave.employeeId.employeeId,
                name : leave.employeeId.userId.name,
                leaveType : leave.leaveType,
                department : leave.employeeId.department.dep_name,
                days : new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
                status : leave.status,
                action : <LeaveButtons Id= {leave._id} />
                
            }
        ));
            setLeaves(data)
            setFilteredLeaves(data)
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
        }
    }
    useEffect(() => {
        fetchLeaves()
    }, [])

    const filterByInput = (e) => {
        const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredLeaves(data)
    }
    const filterByButton = (status) => {
        const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()));
        setFilteredLeaves(data)
    }

    
  return (
    <div>
    {filteredLeaves ? (
    <div className='p-6'>
        <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by Emp ID"
          onChange={filterByInput}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          // onChange={handleFilter}
        />
        <div className='space-x-3'>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700' onClick={() => filterByButton("Pending")}>Pending</button>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700' onClick={() => filterByButton("Approved")}>Approved</button>
            <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700' onClick={() => filterByButton("Rejected")}>Rejected</button>
        </div>
      </div>

      <div className='mt-3'>
        <DataTable columns={columns} data={filteredLeaves} pagination />
      </div>
    </div>
    ) : <div>Loading ....</div>}
    </div>
  )
}

export default Table
