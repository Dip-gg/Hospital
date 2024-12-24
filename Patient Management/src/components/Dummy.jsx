import React, { useEffect, useState } from 'react';
import { Container, Table, Title, Loader, Text, Button } from '@mantine/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PatientDataTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch patient data
        axios.get('http://localhost:8080/get_patient_data')
            .then(response => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(err);
                setLoading(false);
            });

        // Fetch selected columns
        axios.get('http://localhost:8080/get_columns')
            .then(response => {
                setColumns(response.data.selectedColumns);
            })
            .catch(err => {
                console.error('Error fetching columns:', err);
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

    const handleViewClick = (patient) => {
        console.log("View clicked for:", patient);
        navigate(`/home/patientprofile`, { state: { patient } });
    };

    const rows = data.map((patient, index) => (
        <Table.Tr key={index}>
            {columns.includes("patient_id") && <Table.Td>{patient.patient_id || 'N/A'}</Table.Td>}
            {columns.includes("first_name") && columns.includes("last_name") && (
                <Table.Td>{`${patient.first_name || 'N/A'} ${patient.last_name || ''}`.trim()}</Table.Td>
            )}
            {columns.includes("date_of_birth") && <Table.Td>{patient.date_of_birth || 'N/A'}</Table.Td>}
            {columns.includes("gender") && <Table.Td>{patient.gender || 'N/A'}</Table.Td>}
            {columns.includes("allergies") && (
                <Table.Td>{patient.allergies?.length > 0 ? patient.allergies.join(', ') : 'N/A'}</Table.Td>
            )}
            {columns.includes("current_medications") && (
                <Table.Td>
                    {patient.current_medications?.length > 0 ? (
                        patient.current_medications.map((med, i) => (
                            <div key={i}>
                                {`${med.medication_name || 'Unknown'} (${med.dosage || 'Unknown'}, ${med.frequency || 'Unknown'})`}
                            </div>
                        ))
                    ) : (
                        'N/A'
                    )}
                </Table.Td>
            )}
            {columns.includes("medical_history") && (
                <Table.Td>
                    {patient.medical_history?.length > 0 ? (
                        patient.medical_history.map((history, i) => (
                            <div key={i}>
                                {`${history.condition || 'Unknown'} (${history.diagnosed_date || 'Unknown'}, ${history.treatment || 'Unknown'})`}
                            </div>
                        ))
                    ) : (
                        'N/A'
                    )}
                </Table.Td>
            )}
            {columns.includes("doctor_assigned") && (
                <Table.Td>{patient.doctor_assigned?.name || 'N/A'}</Table.Td>
            )}
            <Table.Td>
                <Button variant="filled" onClick={() => handleViewClick(patient)}>
                    View
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Container fluid>
            <Title align="center" mt={40}>Patient Data</Title>
            <Table highlightOnHover mt="md">
                <Table.Thead>
                    <Table.Tr>
                        {columns.includes("patient_id") && <Table.Th>Patient ID</Table.Th>}
                        {columns.includes("first_name") && columns.includes("last_name") && <Table.Th>Name</Table.Th>}
                        {columns.includes("date_of_birth") && <Table.Th>Date of Birth</Table.Th>}
                        {columns.includes("gender") && <Table.Th>Gender</Table.Th>}
                        {columns.includes("allergies") && <Table.Th>Allergies</Table.Th>}
                        {columns.includes("current_medications") && <Table.Th>Medications</Table.Th>}
                        {columns.includes("medical_history") && <Table.Th>Medical History</Table.Th>}
                        {columns.includes("doctor_assigned") && <Table.Th>Doctor Assigned</Table.Th>}
                        <Table.Th>View Patient</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Container>
    );
}

export default PatientDataTable;
