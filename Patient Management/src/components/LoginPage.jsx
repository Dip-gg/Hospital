import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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
  Divider,
} from '@mantine/core';

function LoginPage() {
  const [type, toggle] = useToggle(['login', 'register']);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },
    // validate: {
    //   email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    //   password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    // },
  });

  const handleLogin = () => {
    // Dummy login credentials (replace with real authentication logic)
    if (form.values.email === 'admin' && form.values.password === 'password') {
      // Navigate to home page upon successful login
      navigate('/home');
    } else {
      setError('Invalid username or password');
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

        {/* <Group grow mb="md" mt="md">
          <Button radius="xl">Google</Button>
          <Button radius="xl">Twitter</Button>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

        <form onSubmit={form.onSubmit(handleLogin)}>
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
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
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

          <Group mt="xl" justify='space-between'>
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
