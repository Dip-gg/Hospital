// RegisterPage.jsx
import React, { useState } from 'react';
import { Container, Title, TextInput, Button, Select, Textarea, SimpleGrid, rem, Checkbox } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';

function RegisterPage() {
  const [value, setValue] = useState(null);
  const [showInsurance, setShowInsurance] = useState(false);
  const icon = <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
  return (
    <Container>
      <Title align="center" mt={40}>Register Patient</Title>

      {/* Personal Information */}
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <TextInput label="First Name" placeholder="Enter first name" mt="md" required />
        <TextInput label="Middle Name" placeholder="Enter middle name" mt="md" />
        <TextInput label="Last Name" placeholder="Enter last name" mt="md" required />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <DatePickerInput
          leftSection={icon}
          leftSectionPointerEvents="none"
          mt="md"
          label="Date of Birth"
          placeholder="Pick date"
          value={value}
          onChange={setValue}
        />
        <Select
          label="Gender"
          placeholder="Select gender"
          data={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' },
          ]}
          mt="md"
          required
        />
      </SimpleGrid>

      {/* Contact Information */}
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput label="Phone" placeholder="+1-555-123-4567" mt="md" required />
        <TextInput label="Email" placeholder="example@example.com" mt="md" required />
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 5 }}>
        <TextInput label="Street" placeholder="Enter street address" mt="md" required />
        <TextInput label="City" placeholder="Enter city" mt="md" required />
        <TextInput label="State" placeholder="Enter state" mt="md" required />
        <TextInput label="Zip Code" placeholder="Enter zip code" mt="md" required />
        <TextInput label="Country" placeholder="Enter country" mt="md" required />
      </SimpleGrid>

      {/* Medical History */}
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <Textarea
          label="Medical History"
          placeholder="List any known conditions"
          mt="md"
          minRows={4}
          maxRows={4}
          autosize
        />

        {/* Allergies */}
        <Textarea
          label="Allergies"
          placeholder="List any known allergies"
          mt="md"
          minRows={4}
          maxRows={4}
          autosize
        />

        {/* Current Medications */}
        <Textarea
          label="Current Medications"
          placeholder="List current medications with dosage and frequency"
          mt="md"
          minRows={4}
          maxRows={4}
          autosize
        />
      </SimpleGrid>

      {/* Emergency Contact */}
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        <TextInput label="Emergency Contact Name" placeholder="Enter name" mt="md" required />
        <TextInput label="Relationship" placeholder="Enter relationship" mt="md" required />
        <TextInput label="Emergency Contact Phone" placeholder="+1-555-987-6543" mt="md" required />
      </SimpleGrid>

      {/* Doctor Assigned */}
      <SimpleGrid cols={{ base: 1, sm: 4 }}>
        <TextInput label="Assigned Doctor's Name" placeholder="Dr. Emily Smith" mt="md" required />
        <TextInput label="Specialty" placeholder="Endocrinologist" mt="md" required />
        <TextInput label="Doctor Contact Phone" placeholder="+1-555-111-2222" mt="md" required />
        <TextInput label="Doctor Contact Email" placeholder="doctor@example.com" mt="md" required />
      </SimpleGrid>

      <Checkbox mt="md" checked={showInsurance} onChange={(event) => {setShowInsurance(event.currentTarget.checked)}} label="Take Insurance Info" />
      {/* Insurance Information */}
      {showInsurance && (
        <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
          <TextInput label="Insurance Provider" placeholder="Enter provider" mt="md" required />
          <TextInput label="Policy Number" placeholder="Enter policy number" mt="md" required />
          <TextInput label="Group Number" placeholder="Enter group number" mt="md" required />
        </SimpleGrid>
      )}

      {/* Submit Button */}
      <Button mt="xl" fullWidth>Submit</Button>
    </Container>
  );
}

export default RegisterPage;
