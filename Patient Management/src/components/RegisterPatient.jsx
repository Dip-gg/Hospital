// RegisterPage.jsx
import React, { useState } from 'react';
import { Container, Title, TextInput, Button, Select, Textarea, SimpleGrid, rem, Checkbox, Notification, Text, Divider } from '@mantine/core';
import { IconCalendar, IconCheck, IconX } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';

function RegisterPage() {
  const [value, setValue] = useState(null);
  const [showInsurance, setShowInsurance] = useState(false);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showMedications, setShowMedications] = useState(false);
  const [notification, setNotification] = useState(null);
  const icon = <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    date_of_birth: null,
    gender: '',
    contact_info: {
      phone: '',
      email: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
      },
    },
    medical_history: [
      {
        condition: '',
        diagnosed_date: null,
        treatment: '',
      },
    ],
    allergies: [],
    current_medications: [
      {
        medication_name: "",
        dosage: "",
        frequency: ""
      },
    ],
    emergency_contact: {
      name: '',
      relationship: '',
      phone: '',
    },
    doctor_assigned: {
      name: '',
      specialty: '',
      contact: {
        phone: '',
        email: '',
      },
    },
    insurance_info: {},
  });


  const handleChange = (path, value) => {
    setFormData((prev) => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      let temp = { ...prev };
      let current = temp;

      keys.forEach((key) => {
        if (!current[key]) {
          current[key] = {}; // Initialize missing nested objects
        }
        current = current[key];
      });

      current[lastKey] = value;

      return temp; // Return the updated state
    });
  };

  const handleSubmit = async () => {
    const payload = { ...formData };
    if (!showInsurance) payload.insurance_info = null;
    if (!showMedicalHistory) payload.medical_history = null;
    if (!showMedications) payload.current_medications = null;

    try {
      await axios.post('http://localhost:8080/register_new_patient', payload);
      setNotification({ type: 'success', message: 'Successfully Registered New Patient' });
      console.log(payload);
    } catch (error) {
      const message = error.response?.data?.error || 'Something went wrong!';
      setNotification({ type: 'error', message });
    }
  };

  return (
    <Container>
      <Title align="center" mt={40}>Register Patient</Title>

      {notification && (
        <Notification
          color={notification.type === 'success' ? 'teal' : 'red'}
          icon={notification.type === 'success' ? <IconCheck size={18} /> : <IconX size={18} />}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}

      {/* Personal Information */}
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <TextInput
          label="First Name"
          placeholder="Enter first name"
          mt="md"
          value={formData.first_name}
          onChange={(e) => handleChange('first_name', e.target.value)}
          required
        />
        <TextInput
          label="Middle Name"
          placeholder="Enter middle name"
          mt="md"
          value={formData.middle_name}
          onChange={(e) => handleChange('middle_name', e.target.value)}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter last name"
          mt="md"
          value={formData.last_name}
          onChange={(e) => handleChange('last_name', e.target.value)}
          required
        />
      </SimpleGrid>

      {/* Date of Birth and Gender */}
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <DatePickerInput
          leftSection={icon}
          leftSectionPointerEvents="none"
          mt="md"
          label="Date of Birth"
          placeholder="Pick date"
          value={formData.date_of_birth}
          onChange={(value) => handleChange('date_of_birth', value)}
        />
        <Select
          label="Gender"
          placeholder="Select gender"
          data={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' },
          ]}
          value={formData.gender}
          onChange={(value) => handleChange('gender', value)}
          mt="md"
          required
        />
      </SimpleGrid>

      {/* Contact Information */}
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput
          label="Phone"
          placeholder="+1-555-123-4567"
          mt="md"
          value={formData.contact_info.phone}
          onChange={(e) => handleChange('contact_info.phone', e.target.value)}
          required
        />
        <TextInput
          label="Email"
          placeholder="example@example.com"
          mt="md"
          value={formData.contact_info.email}
          onChange={(e) => handleChange('contact_info.email', e.target.value)}
          required
        />
      </SimpleGrid>

      {/* Address */}
      <SimpleGrid cols={{ base: 1, sm: 5 }}>
        <TextInput
          label="Street"
          placeholder="Enter street address"
          mt="md"
          value={formData.contact_info.address.street}
          onChange={(e) => handleChange('contact_info.address.street', e.target.value)}
          required
        />
        <TextInput
          label="City"
          placeholder="Enter city"
          mt="md"
          value={formData.contact_info.address.city}
          onChange={(e) => handleChange('contact_info.address.city', e.target.value)}
          required
        />
        <TextInput
          label="State"
          placeholder="Enter state"
          mt="md"
          value={formData.contact_info.address.state}
          onChange={(e) => handleChange('contact_info.address.state', e.target.value)}
          required
        />
        <TextInput
          label="Zip Code"
          placeholder="Enter zip code"
          mt="md"
          value={formData.contact_info.address.zip_code}
          onChange={(e) => handleChange('contact_info.address.zip_code', e.target.value)}
          required
        />
        <TextInput
          label="Country"
          placeholder="Enter country"
          mt="md"
          value={formData.contact_info.address.country}
          onChange={(e) => handleChange('contact_info.address.country', e.target.value)}
          required
        />
      </SimpleGrid>

      {/* Emergency Contact */}
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <TextInput label="Emergency Contact Name" placeholder="Enter name" mt="md" onChange={(e) => handleChange('emergency_content.name', e.target.value)} required />
        <TextInput label="Relationship" placeholder="Enter relationship" mt="md" onChange={(e) => handleChange('emergency_content.relationship', e.target.value)} required />
        <TextInput label="Emergency Contact Phone" placeholder="+1-555-987-6543" mt="md" onChange={(e) => handleChange('emergency_content.phone', e.target.value)} required />
      </SimpleGrid>

      {/* Doctor Assigned */}
      <SimpleGrid cols={{ base: 1, sm: 4 }}>
        <TextInput label="Assigned Doctor's Name" placeholder="Dr. Emily Smith" mt="md" onChange={(e) => handleChange('doctor_assigned.name', e.target.value)} required />
        <TextInput label="Specialty" placeholder="Endocrinologist" mt="md" onChange={(e) => handleChange('doctor_assigned.speciality', e.target.value)} required />
        <TextInput label="Doctor Contact Phone" placeholder="+1-555-111-2222" mt="md" onChange={(e) => handleChange('doctor_assigned.contact.phone', e.target.value)} required />
        <TextInput label="Doctor Contact Email" placeholder="doctor@example.com" mt="md" onChange={(e) => handleChange('doctor_assigned.contact.email', e.target.value)} required />
      </SimpleGrid>

      <Checkbox
        mt="md"
        checked={showMedicalHistory}
        onChange={(event) => setShowMedicalHistory(event.currentTarget.checked)}
        label="Add Medical History"
      />
      {showMedicalHistory && (
        <>
          <Text size="xl" mt="md">Medical History</Text>
          {/* Medical History */}
          {formData.medical_history.map((entry, index) => (
            <SimpleGrid key={index} cols={{ base: 1, sm: 4 }}>
              <TextInput
                label={`Condition ${index + 1}`}
                placeholder="Enter medical condition"
                value={entry.condition}
                onChange={(e) => handleChange(`medical_history.${index}.condition`, e.target.value)}
              />
              <DatePickerInput
                label="Date of Diagnosis"
                placeholder="Select date"
                value={entry.diagnosed_date}
                onChange={(value) => handleChange(`medical_history.${index}.diagnosed_date`, value)}
              />
              <TextInput
                label="Treatment"
                placeholder="Enter treatment"
                value={entry.treatment}
                onChange={(e) => handleChange(`medical_history.${index}.treatment`, e.target.value)}
              />
              <Button
                mt="md"
                color="red"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    medical_history: prev.medical_history.filter((_, i) => i !== index),
                  }));
                }}
              >
                Remove
              </Button>
            </SimpleGrid>
          ))}
          <Button
            mt="md"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                medical_history: [
                  ...prev.medical_history,
                  { condition: '', diagnosed_date: null, treatment: '' },
                ],
              }));
            }}
          >
            Add Another Condition
          </Button>
        </>
      )}

      <Checkbox
        mt="md"
        checked={showMedications}
        onChange={(event) => setShowMedications(event.currentTarget.checked)}
        label="Add Current Medications"
      />
      {/* Current Medications */}
      {showMedications && (
        <>
          <Text size="xl" mt="md">Current Medication</Text>
          {formData.current_medications.map((entry, index) => (
            <SimpleGrid key={index} cols={{ base: 1, sm: 4 }}>
              <TextInput
                label={`Medication ${index + 1}`}
                placeholder="Enter medication name"
                value={entry.medication_name}
                onChange={(e) => handleChange(`current_medications.${index}.medication_name`, e.target.value)}
              />
              <TextInput
                label="Dosage"
                placeholder="Enter Dosage"
                value={entry.dosage}
                onChange={(e) => handleChange(`current_medications.${index}.dosage`, e.target.value)}
              />
              <TextInput
                label="Frequency of Medication"
                placeholder="Enter Frequency"
                value={entry.frequency}
                onChange={(e) => handleChange(`current_medications.${index}.frequency`, e.target.value)}
              />
              <Button
                mt="md"
                color="red"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    current_medications: prev.current_medications.filter((_, i) => i !== index),
                  }));
                }}
              >
                Remove
              </Button>
            </SimpleGrid>
          ))}
          <Button
            mt="md"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                current_medications: [
                  ...prev.current_medications,
                  { medication_name: '', dosage: null, frequency: '' },
                ],
              }));
            }}
          >
            Add Another Condition
          </Button>
        </>
      )}

      <Checkbox
        mt="md"
        checked={showInsurance}
        onChange={(event) => {
          setShowInsurance(event.currentTarget.checked);
          if (!event.currentTarget.checked) {
            handleChange('insurance_info', null);
          }
        }}
        label="Take Insurance Info"
      />

      {/* Insurance Information */}
      {showInsurance && (
        <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
          <TextInput
            label="Insurance Provider"
            placeholder="Enter provider"
            mt="md"
            onChange={(e) => handleChange('insurance_info.provider', e.target.value)}
          />
          <TextInput
            label="Policy Number"
            placeholder="Enter policy number"
            mt="md"
            onChange={(e) => handleChange('insurance_info.policyNumber', e.target.value)}
          />
          <TextInput
            label="Group Number"
            placeholder="Enter group number"
            mt="md"
            onChange={(e) => handleChange('insurance_info.groupNumber', e.target.value)}
          />
        </SimpleGrid>
      )}

      {/* Submit Button */}
      <Button mt="xl" fullWidth onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
}

export default RegisterPage;
