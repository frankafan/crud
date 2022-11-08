import React from "react";

const EmployeeTable = ({ data }) => {

    const generateTable = () => {

        data = [
            {
                "firstName": "Lewis",
                "lastName": "Burson",
                "salary": 99000
            },
            {
                "firstName": "Ian",
                "lastName": "Malcolm",
                "salary": 99000
            }
        ]

        return (
            <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Salary</th>
                    <th></th>
                </tr>
                {data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <th>{item.firstName}</th>
                            <th>{item.lastName}</th>
                            <th>{item.salary}</th>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    return (
        <table>
            {generateTable()}
        </table>
    )
}

export default EmployeeTable;
