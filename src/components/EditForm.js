import React, { useState, useEffect } from "react";

const EditForm = (employee) => {

    // Populate employee data into states when the component is loaded with a new employee
    useEffect(() => {
        if (employee.data) {
            setId(employee.data._id);
            setFirstName(employee.data.firstName);
            setLastName(employee.data.lastName);
            setSalary(employee.data.salary);
            openModal();
        };
    }, [employee]);

    // Store form data as states
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

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

    function closeModal() {
        setDialogOpen(false);
    }

    function openModal() {
        setDialogOpen(true);
    }


    return (
        <>
            {dialogOpen ? (
                <>
                    <div className="justify-center items-center flex fixed inset-0 z-50">
                        <div className="bg-white shadow-lg rounded">
                            <div className="p-5 border rounded-t">
                                <h1 className="text-xl">
                                    Edit Employee
                                </h1>
                            </div>
                            <div className="py-5 px-14">
                                <form onSubmit={handleSubmit}>
                                    <label className="block text-lg font-light mt-4">
                                        First Name:
                                        <input className="ml-4 rounded border-gray-300 p-3 border" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </label>
                                    <label className="block text-lg font-light mt-4">
                                        Last Name:
                                        <input className="ml-4 rounded border-gray-300 p-3 border" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </label>
                                    <label className="block text-lg font-light mt-4">
                                        Salary:
                                        <input className="ml-4 rounded border-gray-300 p-3 border" type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
                                    </label>
                                    <input type="submit" value="Submit" className="bg-white hover:bg-gray-300 font-bold mt-5 mx-1 px-3 py-2 border border-gray-400 rounded shadow"/>
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold mt-5 mx-1 px-3 py-2 border border-gray-400 rounded shadow"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )


}

export default EditForm;
