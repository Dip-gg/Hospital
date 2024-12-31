import React, { useState, useEffect } from 'react';
import { Checkbox, Button, Paper, Group } from '@mantine/core';
import axios from 'axios';

const ChangeColumns = () => {
    const [data, setData] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);

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
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    const handleColumnChange = (column, checked) => {
        // Update selectedColumns based on checkbox selection
        if (checked) {
            setSelectedColumns((prev) => [...prev, column]);
        } else {
            setSelectedColumns((prev) => prev.filter((col) => col !== column));
        }
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
            <Group mb="md" direction="column">
                {/* Dynamically generate checkboxes for each column */}
                {allColumns.map((column) => (
                    <Checkbox
                        key={column}
                        label={column}
                        checked={selectedColumns.includes(column)}
                        onChange={(e) => handleColumnChange(column, e.target.checked)}
                    />
                ))}

                <Button onClick={handleSubmit} disabled={selectedColumns.length === 0}>
                    Submit
                </Button>
            </Group>
        </Paper>
    );
};

export default ChangeColumns;
