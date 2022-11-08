import React, { useState, useEffect } from "react";

const EditForm = (employee) => {

    // Populate employee data into states when the component is loaded with a new employee
    useEffect(() => {
        if (employee.data) {
            setId(employee.data._id);
            setFirstName(employee.data.firstName);
            setLastName(employee.data.lastName);
            setSalary(employee.data.salary);
        };
    }, [employee]);

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState("");

    // Update backend employee data with employee data stored in the states
    const handleSubmit = () => {
        fetch("http://localhost:8000/employee/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
              },          
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                salary: salary
            })
        }
        ).then(
            res => res.json()
        ).then(
            res => console.log(res.message)
        );
    };

    return (
        // Initialize form values from employee data stored in states, and update states on form change
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
                Salary:
                <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )

}

export default EditForm;
