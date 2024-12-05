import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import axios from 'axios';
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Group,
  Stack,
} from '@mantine/core';

function LoginPage() {
  const [type, toggle] = useToggle(['login', 'register']);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      terms: true,
    },
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username: form.values.username,
        password: form.values.password,
      });

      if (response.data.success) {
        if (response.data.is_admin) {
          alert('Logged in as Admin');
        } else {
          alert('Logged in as Regular User');
        }
        navigate('/home'); // Navigate to home page upon successful login
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <Paper className="form" radius={0} p={30}>
        <Title order={2} className="title" align="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>

        <Text size="lg" weight={500}>
          {upperFirst(type)} with
        </Text>

        <form
          onSubmit={form.onSubmit(() => {
            if (type === 'login') handleLogin();
            else setError('Registration not implemented yet');
          })}
        >
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}

            <TextInput
              required
              label="User Name"
              placeholder="hello@example.com"
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}

            {error && <Text color="red">{error}</Text>}
          </Stack>

          <Group mt="xl" justify="space-between">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}

export default LoginPage;
