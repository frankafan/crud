import React, { useState, useEffect } from "react";
import EditForm from "./EditForm";
import AddForm from "./AddForm";

const EmployeeTable = () => {

    const [loading, setLoading] = useState(true);  // indicator that the frontend is loading the API data
    const [employeeData, setEmployeeData] = useState();  // employee data requested from the backend
    const [employeeToEdit, setEmployeeToEdit] = useState();  // employee data passed to the edit form component

    // Use GET request to fetch employee data everytime the page is loaded
    useEffect(() => {
        fetch("http://localhost:8000/employee/", {
            method: "GET"
        }
        ).then(
            res => res.json()
        ).then(
            res => {
                setEmployeeData(res);
                setLoading(false);
            }
        ).then(
            console.log("Data fetched")
        );
    }, []);


    // Delete the employee with the input id and update employee data
    const deleteEmployee = (id) => {
        fetch("http://localhost:8000/employee/" + id, {
            method: "DELETE"
        }
        ).then(
            res => res.json()
        ).then(
            // Remove deleted employee from employee data
            setEmployeeData(employeeData.filter(x => x._id != id))
        ).then(
            res => console.log(res.message)
        );
    };

    // Generate table after the data is fetched
    const generateTable = (data) => {
        return (
            <table>
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Salary</th>
                        <th>Edit</th>
                    </tr>
                    {data.map((item, i) => {
                        return (
                            <tr key={i}>
                                <th>{item.firstName}</th>
                                <th>{item.lastName}</th>
                                <th>{item.salary}</th>
                                <th>
                                    <button onClick={(e) => setEmployeeToEdit(item)}>Edit</button>
                                    <button onClick={(e) => deleteEmployee(item._id)}>Delete</button>
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    };

    return (
        loading ? <h1>Loading</h1> :
            <div>
                {generateTable(employeeData)}
                <button>Add Employee</button>
                <EditForm data={employeeToEdit}></EditForm>
                <AddForm></AddForm>
            </div>
    );
}

export default EmployeeTable;
