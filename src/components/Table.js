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
                <tbody className="bg-white text-xl">
                    <tr className="border-b">
                        <th className="p-8">First Name</th>
                        <th className="p-8">Last Name</th>
                        <th className="p-8">Salary</th>
                        <th className="p-8">Edit</th>
                    </tr>
                    {data.map((item, i) => {
                        return (
                            <tr className="border-b transition duration-300 hover:bg-gray-100" key={i}>
                                <th className="font-light p-6">{item.firstName}</th>
                                <th className="font-light p-6">{item.lastName}</th>
                                <th className="font-light p-6">{item.salary}</th>
                                <th className="font-light p-6 text-sm">
                                    <button className="bg-white hover:bg-gray-300 font-bold mx-1 px-3 py-2 border border-gray-400 rounded shadow" onClick={(e) => setEmployeeToEdit(item)}>Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold mx-1 px-3 py-2 border border-black rounded shadow" type="submit" onClick={(e) => deleteEmployee(item._id)}>Delete</button>
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
            <div className="inline-block">
                {generateTable(employeeData)}
                <EditForm data={employeeToEdit}></EditForm>
                <AddForm></AddForm>
            </div>
    );
}

export default EmployeeTable;
