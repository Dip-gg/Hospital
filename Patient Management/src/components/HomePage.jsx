import React, { useState, useEffect } from 'react';
import { AppShell, Burger, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import RegisterPage from './RegisterPatient';
import PatientDataTable from './Dummy';
import ChangeColumns from './ChangeColumns'; // Add a ChangeColumns component

export function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [currentPage, setCurrentPage] = useState('main');
  const {isAdmin, setIsAdmin} = useAuth();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case 'register':
        return <RegisterPage />;
      case 'stock':
        return <ChangeColumns />; // Render ChangeColumns component
      default:
        return <PatientDataTable />;
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <MantineLogo size={30} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div>
          <Button onClick={() => handlePageChange('register')} mt="xl" fullWidth>
            Register Page
          </Button>
          <Button onClick={() => handlePageChange('dummy')} mt="xl" fullWidth>
            Dummy Page
          </Button>
          {isAdmin && ( // Conditionally render the "Stock Page" button for admin users
            <Button onClick={() => handlePageChange('stock')} mt="xl" fullWidth>
              Stock Page
            </Button>
          )}
        </div>
        <div style={{ bottom: 0 }}>
          <Button
            onClick={handleLogout}
            mt="xl"
            fullWidth
            style={{ marginTop: 'auto' }}
          >
            Logout
          </Button>
        </div>
      </AppShell.Navbar>
      <AppShell.Main style={{ minWidth: "100vw" }}>{renderMainContent()}</AppShell.Main>
    </AppShell>
  );
}

export default HomePage;
