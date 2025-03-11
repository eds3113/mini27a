import React from 'react';
import { Box, Typography, Container, Link as MuiLink } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <MuiLink 
            color="inherit" 
            href="https://github.com/yourusername/link-manager" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Topluluk Bağlantı Merkezi
          </MuiLink>
          {' | GitHub Pages üzerinde barındırılmaktadır.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 