import axios from "axios";
import { useNavigate } from "react-router-dom";


export const fetchDepartments = async () => {
  let departments;

  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    console.log(error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        view
      </button>
      <button
        className="px-3 py-1 bg-blue-500 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-500 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white"
      >
        Leave
      </button>
    </div>
  );
};


export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width : "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable : true,
    width : "100px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width : "90px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width : "120px"

  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable : true,
    width : "140px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center : "true"
  },
];

// employees for salary form
export const getEmployees = async (id) => {
  let employees;

  try {
    const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log(response)
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    console.log(error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};