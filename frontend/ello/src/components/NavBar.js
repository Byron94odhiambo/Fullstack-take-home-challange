import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Box, IconButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import LessonIcon from '@mui/icons-material/MenuBook';
import GradeIcon from '@mui/icons-material/Grade';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const NavBar = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Class Management', icon: <ClassIcon /> },
    { text: 'Lesson Planning', icon: <LessonIcon /> },
    { text: 'Grading', icon: <GradeIcon /> },
    { text: 'Messages', icon: <MessageIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleToggle}
        sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 56,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 56,
            boxSizing: 'border-box',
            backgroundColor: '#5ACCCC',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowX: 'hidden',
            transition: 'width 0.3s',
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ textAlign: 'center', py: 2, transition: 'opacity 0.3s', opacity: open ? 1 : 0 }}>
            <Typography variant="h6" noWrap sx={{ fontFamily: 'Mulish', color: '#FFFFFF' }}>
              Teacher's Portal
            </Typography>
          </Box>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon sx={{ color: '#FFFFFF', minWidth: '40px' }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: 'Mulish',
                        color: '#FFFFFF',
                        opacity: open ? 1 : 0,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#FFFFFF', minWidth: '40px' }}><LogoutIcon /></ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Mulish',
                    color: '#FFFFFF',
                    opacity: open ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  Logout
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default NavBar;
