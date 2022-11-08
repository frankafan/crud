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

export default EditForm;
