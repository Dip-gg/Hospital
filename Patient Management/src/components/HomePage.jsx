import React, { useState } from 'react';
import { AppShell, Burger, Group, Skeleton, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useNavigate } from 'react-router-dom';
import RegisterPage from './RegisterPatient';
import PatientDataTable from './Dummy';

export function HomePage() {

  const navigate = useNavigate();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [currentPage, setCurrentPage] = useState('main');

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
      default:
        return <PatientDataTable />;
    }
  }


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
          Navbar
          <Button onClick={() => handlePageChange('register')} mt="xl" fullWidth>
            Register Page
          </Button>
          <Button onClick={() => handlePageChange('dummy')} mt="xl" fullWidth>
            Dummy Page
          </Button>
        </div>
        <div style={{bottom: 0}}>
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
