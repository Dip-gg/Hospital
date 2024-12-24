import React from 'react';
import { Container, Title, Text, Grid, Paper, Button } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

function PatientProfile() {
    const { state } = useLocation();
    const patient = state?.patient;
    const navigate = useNavigate();

    if (!patient) {
        return (
            <Container mt={40}>
                <Title align="center">No Patient Data Available</Title>
                <Text align="center" mt="md" c="red">
                    Please provide valid patient data.
                </Text>
            </Container>
        );
    }

    return (
        <Container mt={40} style={{position: 'relative'}}>
            <Button 
                variant='filled' 
                style={{position:'absolute', right: "10px", top: "10px"}}
                onClick={() => navigate('/home')}
            >
                Home
            </Button>
            <Title align="center">Patient Profile</Title>
            <Paper shadow="md" p="lg" mt="lg">
                {/* Basic Info */}
                <Title order={4} mt="md">Basic Information</Title>
                <Grid mt="sm">
                    <Grid.Col span={6}>
                        <Text><strong>Patient ID:</strong> {patient.patient_id || 'N/A'}</Text>
                        <Text><strong>Name:</strong> {`${patient.first_name || 'N/A'} ${patient.last_name || ''}`.trim()}</Text>
                        <Text><strong>Date of Birth:</strong> {patient.date_of_birth || 'N/A'}</Text>
                        <Text><strong>Gender:</strong> {patient.gender || 'N/A'}</Text>
                    </Grid.Col>
                </Grid>

                {/* Contact Info */}
                <Title order={4} mt="md">Contact Information</Title>
                <Grid mt="sm">
                    <Grid.Col span={6}>
                        <Text><strong>Phone:</strong> {patient.contact_info?.phone || 'N/A'}</Text>
                        <Text><strong>Email:</strong> {patient.contact_info?.email || 'N/A'}</Text>
                        <Text>
                            <strong>Address:</strong>{' '}
                            {patient.contact_info?.address
                                ? `${patient.contact_info.address.street || ''}, ${patient.contact_info.address.city || ''}, ${patient.contact_info.address.state || ''}, ${patient.contact_info.address.country || ''} (${patient.contact_info.address.zip_code || 'N/A'})`.trim()
                                : 'N/A'}
                        </Text>
                    </Grid.Col>
                </Grid>

                {/* Medical History */}
                <Title order={4} mt="md">Medical History</Title>
                <Grid mt="sm">
                    <Grid.Col span={12}>
                        {patient.medical_history?.length > 0 ? (
                            patient.medical_history.map((history, index) => (
                                <Text key={index}>
                                    <strong>Condition:</strong> {history.condition || 'Unknown'} | <strong>Diagnosed:</strong> {history.diagnosed_date || 'Unknown'} | <strong>Treatment:</strong> {history.treatment || 'Unknown'}
                                </Text>
                            ))
                        ) : (
                            <Text>N/A</Text>
                        )}
                    </Grid.Col>
                </Grid>

                {/* Allergies */}
                <Title order={4} mt="md">Allergies</Title>
                <Grid mt="sm">
                    <Grid.Col span={12}>
                        <Text>{patient.allergies?.length > 0 ? patient.allergies.join(', ') : 'N/A'}</Text>
                    </Grid.Col>
                </Grid>

                {/* Current Medications */}
                <Title order={4} mt="md">Current Medications</Title>
                <Grid mt="sm">
                    <Grid.Col span={12}>
                        {patient.current_medications?.length > 0 ? (
                            patient.current_medications.map((med, index) => (
                                <Text key={index}>
                                    <strong>Medication:</strong> {med.medication_name || 'Unknown'} | <strong>Dosage:</strong> {med.dosage || 'Unknown'} | <strong>Frequency:</strong> {med.frequency || 'Unknown'}
                                </Text>
                            ))
                        ) : (
                            <Text>N/A</Text>
                        )}
                    </Grid.Col>
                </Grid>

                {/* Emergency Contact */}
                <Title order={4} mt="md">Emergency Contact</Title>
                <Grid mt="sm">
                    <Grid.Col span={6}>
                        <Text><strong>Name:</strong> {patient.emergency_contact?.name || 'N/A'}</Text>
                        <Text><strong>Relationship:</strong> {patient.emergency_contact?.relationship || 'N/A'}</Text>
                        <Text><strong>Phone:</strong> {patient.emergency_contact?.phone || 'N/A'}</Text>
                    </Grid.Col>
                </Grid>

                {/* Insurance Info */}
                <Title order={4} mt="md">Insurance Information</Title>
                <Grid mt="sm">
                    <Grid.Col span={6}>
                        <Text><strong>Provider:</strong> {patient.insurance_info?.provider || 'N/A'}</Text>
                        <Text><strong>Policy Number:</strong> {patient.insurance_info?.policy_number || 'N/A'}</Text>
                        <Text><strong>Group Number:</strong> {patient.insurance_info?.group_number || 'N/A'}</Text>
                    </Grid.Col>
                </Grid>

                {/* Doctor Assigned */}
                <Title order={4} mt="md">Doctor Assigned</Title>
                <Grid mt="sm">
                    <Grid.Col span={6}>
                        <Text><strong>Name:</strong> {patient.doctor_assigned?.name || 'N/A'}</Text>
                        <Text><strong>Specialty:</strong> {patient.doctor_assigned?.specialty || 'N/A'}</Text>
                        <Text>
                            <strong>Contact:</strong>{' '}
                            {patient.doctor_assigned?.contact
                                ? `${patient.doctor_assigned.contact.phone || 'N/A'}, ${patient.doctor_assigned.contact.email || 'N/A'}`
                                : 'N/A'}
                        </Text>
                    </Grid.Col>
                </Grid>
            </Paper>
        </Container>
    );
};

export default PatientProfile;
