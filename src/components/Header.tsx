import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';
import { Collections as CollectionsIcon } from '@mui/icons-material';

const Header: React.FC = () => {
  const theme = useTheme();
  
  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <CollectionsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Topluluk Bağlantı Merkezi
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 