import React, { useState, useEffect } from "react";

const EmployeeTable = () => {

    const [loading, setLoading] = useState(true);  // indicator that the frontend is loading the API data
    const [employeeData, setEmployeeData] = useState();  // employee data requested from the backend

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
        );
    }, []);

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
                                <th><button>Edit</button><button>Delete</button></th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    return (
        <div>
            {loading ? <h1>Loading</h1> : generateTable(employeeData)}
        </div>
    )
}

export default EmployeeTable;
