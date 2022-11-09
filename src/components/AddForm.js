import React, { useState, useEffect } from "react";

const AddForm = () => {

    // Store form data as states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [salary, setSalary] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

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

    // Update clear backend employee data and populate with example employee data
    const handleReset = () => {
        fetch("http://localhost:8000/employee/", {
            method: "DELETE",
        }
        ).then(
            res => res.json()
        ).then(
            res => console.log(res.message)
        ).then(
            () => fetch("http://localhost:8000/employee/addExamples", { method: "POST" })
        ).then(
            res => res.json()
        ).then(
            res => console.log(res.message)
        ).then(
            () => window.location.reload()
        );
    };

    function closeModal() {
        setModalOpen(false);
    }

    return (
        <>
            <button
                className="bg-blue-400 hover:bg-blue-600 transition duration-300 text-white font-bold m-5 mb-12 px-3 py-2 border border-gray-400 rounded shadow"
                type="button"
                onClick={() => setModalOpen(true)}
            >
                Add Employee
            </button>
            <button
                className="bg-blue-400 hover:bg-blue-600 transition duration-300 text-white font-bold m-5 mb-12 px-3 py-2 border border-gray-400 rounded shadow"
                type="submit"
                onClick={handleReset}
            >
                Reset Employees
            </button>
            {modalOpen ? (
                <>
                    <div className="justify-center items-center flex fixed inset-0 z-50">
                        <div className="bg-white shadow-lg rounded">
                            <div className="p-5 border rounded-t">
                                <h1 className="text-xl">
                                    Add Employee
                                </h1>
                            </div>
                            <div className="py-5 px-14">
                                <form onSubmit={handleSubmit}>
                                    <label className="block text-lg font-light mt-4">
                                        First Name:
                                        <input className="ml-4 rounded border-gray-300 p-3 border" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                                    </label>
                                    <label className="block text-lg font-light mt-4">
                                        Last Name:
                                        <input className="ml-4 rounded border-gray-300 p-3 border" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                    </label>
                                    <label className="block text-lg font-light mt-4">
                                        Salary:
                                        <input className="ml-4 rounded border-gray-300 p-3 border" type="number" min="0" value={salary} onChange={(e) => setSalary(e.target.value)} required/>
                                    </label>
                                    <input type="submit" value="Submit" className="bg-white hover:bg-gray-300 font-bold mt-5 mx-1 px-3 py-2 border border-gray-400 rounded shadow transition duration-200" />
                                    <button
                                        type="button"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold mt-5 mx-1 px-3 py-2 border border-gray-400 rounded shadow transition duration-200"
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

export default AddForm;
