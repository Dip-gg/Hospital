import React, { useState, useEffect } from 'react';
import { MultiSelect, Button, Table, Paper, Group, ScrollArea } from '@mantine/core';
import axios from 'axios';

const ChangeColumns = () => {
    const [data, setData] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const allColumns = [
        "patient_id",
        "first_name",
        "last_name",
        "date_of_birth",
        "gender",
        "phone",
        "email",
        "address",
        "medical_history",
        "allergies",
        "current_medications",
        "emergency_contact",
        "insurance_info",
        "doctor_assigned",
    ];

    useEffect(() => {
        // Simulating an API call, replace this with your API endpoint
        axios.get('http://localhost:8080/get_patient_data')
            .then(response => {
                setData(response.data.data);
                console.log(response.data.data);
                // setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                // setError(err);
                // setLoading(false);
            });
    }, []);

    const handleColumnChange = (columns) => {
        setSelectedColumns(columns);

        // Filter data based on selected columns
        const filtered = data.map((item) => {
            const row = {};
            columns.forEach((col) => {
                if (col === "phone") {
                    row[col] = item.contact_info.phone;
                } else if (col === "email") {
                    row[col] = item.contact_info.email;
                } else if (col === "address") {
                    const { street, city, state, zip_code } = item.contact_info.address;
                    row[col] = `${street}, ${city}, ${state}, ${zip_code}`;
                } else if (item[col]) {
                    row[col] = item[col];
                }
            });
            return row;
        });
        setFilteredData(filtered);
    };

    const handleSubmit = async () => {
        const payload = { selectedColumns };
        console.log("Payload:", payload);

        try {
            const response = await axios.post(
                "http://localhost:8080/submit-columns",
                payload,
                { headers: { "Content-Type": "application/json" } }
            );
            alert("Data submitted successfully!");
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Failed to submit data");
        }
    };


    return (
        <Paper withBorder p="md" radius="md">
            <Group mb="md">
                <MultiSelect
                    data={allColumns}
                    value={selectedColumns}
                    onChange={handleColumnChange}
                    label="Select Columns"
                    placeholder="Choose columns to display"
                    clearable
                    searchable
                />
                <Button onClick={handleSubmit} disabled={selectedColumns.length === 0}>
                    Submit
                </Button>
            </Group>

            {/* <ScrollArea>
                <Table>
                    <thead>
                        <tr>
                            {selectedColumns.map((col) => (
                                <th key={col}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, index) => (
                            <tr key={index}>
                                {selectedColumns.map((col) => (
                                    <td key={col}>{row[col] || "N/A"}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ScrollArea> */}
        </Paper>
    );
};


export default ChangeColumns;
