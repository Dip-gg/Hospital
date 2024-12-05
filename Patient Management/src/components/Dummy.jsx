import React, { useEffect, useState } from 'react';
import { Container, Table, Title, Loader, Text } from '@mantine/core';
import axios from 'axios';

function PatientDataTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulating an API call, replace this with your API endpoint
        axios.get('http://localhost:8080/get_patient_data')
            .then(response => {
                setData(response.data.data);
                console.log(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container>
                <Loader mt={40} />
                <Text mt="md">Loading...</Text>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Title align="center" mt={40}>Error</Title>
                <Text mt="md" c="red">Failed to fetch data: {error.message}</Text>
            </Container>
        );
    }

    const rows = data.map((patient, index) => (
        <Table.Tr key={index}>
            <Table.Td>{patient.patient_id}</Table.Td>
            <Table.Td>{`${patient.first_name} ${patient.last_name}`}</Table.Td>
            <Table.Td>{patient.date_of_birth}</Table.Td>
            <Table.Td>{patient.gender}</Table.Td>
            <Table.Td>{patient.allergies.join(', ')}</Table.Td>
            <Table.Td>
                {patient.current_medications.map((med, i) => (
                    <div key={i}>{`${med.medication_name} (${med.dosage}, ${med.frequency})`}</div>
                ))}
            </Table.Td>
            <Table.Td>{patient.doctor_assigned.name}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Container>
            <Title align="center" mt={40}>Patient Data</Title>
            <Table highlightOnHover mt="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Patient ID</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Date of Birth</Table.Th>
                        <Table.Th>Gender</Table.Th>
                        <Table.Th>Allergies</Table.Th>
                        <Table.Th>Medications</Table.Th>
                        <Table.Th>Doctor Assigned</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Container>
    );
}

export default PatientDataTable;
