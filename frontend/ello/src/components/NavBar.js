// components/NavBar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';

const NavBar = () => {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#5ACCCC',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h6" noWrap sx={{ fontFamily: 'Mulish', color: '#FFFFFF' }}>
            Teacher's Portal
          </Typography>
        </Box>
        <List>
          {[
            'Dashboard',
            'Class Management',
            'Lesson Planning',
            'Grading and Feedback',
            'Messages',
            'Settings',
          ].map((text, index) => (
            <ListItem button key={index}>
              <ListItemText primary={
                <Typography variant="body1" sx={{ fontFamily: 'Mulish', color: '#FFFFFF' }}>
                  {text}
                </Typography>
              } />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{
            width: '100%',
            backgroundColor: '#FABD33',
            color: '#335C6E',
            '&:hover': { backgroundColor: '#FABD33' },
            fontFamily: 'Mulish',
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default NavBar;
