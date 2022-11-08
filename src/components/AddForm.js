import React, { useState, useEffect } from "react";

const AddForm = () => {

    // Store form data as states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState("");

    // Update backend employee data with employee data stored in the states
    const handleSubmit = () => {
        fetch("http://localhost:8000/employee/", {
            method: "POST",
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

export default AddForm;
