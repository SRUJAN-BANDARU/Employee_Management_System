import React from "react";
import { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate:null,
  });
  const navigate = useNavigate();
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const department = await fetchDepartments();
      setDepartments(department);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dep"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  name="department"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleDepartment}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              <div >
                <label
                  htmlFor="emp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee
                </label>
                <select
                  name="employeeId"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="desig"
                  className="block text-sm font-medium text-gray-700"
                >
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  placeholder="basic salary"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="allownace"
                  className="block text-sm font-medium text-gray-700"
                >
                  Allowances
                </label>
                <input
                  type="number"
                  id="allowance"
                  name="allowances"
                  placeholder="Allowances"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="deductions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deductions
                </label>
                <input
                  type="number"
                  id="deductions"
                  name="deductions"
                  placeholder="Deductions"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pay Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="payDate"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Add Salary
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Add;
