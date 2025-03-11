import React from 'react';
import { Card, CardContent, Typography, Button, Chip, Box } from '@mui/material';
import { Work, Link as LinkIcon } from '@mui/icons-material';
import { Link } from '../types';

interface LinkCardProps {
  link: Link;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  // Kategori renkleri
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'yonetim':
        return '#3f51b5'; // Yönetim mavi
      default:
        return '#4caf50'; // Diğer yeşil
    }
  };

  // Kategori ikonu
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'yonetim':
        return <Work />;
      default:
        return <LinkIcon />;
    }
  };

  return (
    <Card 
      sx={{ 
        width: '100%',
        boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
        borderRadius: '10px',
        transition: 'all 0.3s ease',
        position: 'relative',
        borderLeft: `4px solid ${getCategoryColor(link.category)}`,
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
          '& .card-button': {
            backgroundColor: getCategoryColor(link.category),
            color: 'white',
          }
        },
      }}
    >
      <CardContent sx={{ px: 2, pt: 2, pb: 1.5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
          <Typography 
            variant="h6" 
            component="div" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              flexGrow: 1,
              mr: 2,
              fontSize: '1rem',
              mt: 0
            }}
          >
            {link.title}
          </Typography>
          <Chip 
            icon={getCategoryIcon(link.category)} 
            label={link.category.charAt(0).toUpperCase() + link.category.slice(1)}
            sx={{ 
              backgroundColor: getCategoryColor(link.category) + '22',
              color: getCategoryColor(link.category),
              fontWeight: 'bold',
              border: `1px solid ${getCategoryColor(link.category)}44`,
              height: '24px',
              '& .MuiChip-label': {
                px: 1
              },
              '& .MuiChip-icon': {
                fontSize: '0.9rem'
              }
            }}
            size="small"
          />
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 1.5,
            fontSize: '0.85rem',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }}
        >
          {link.description || 'Açıklama yok'}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="caption" color="text.secondary" sx={{ mr: 2, fontSize: '0.75rem' }}>
            Eklenme: {link.createdAt}
          </Typography>
          <Button 
            className="card-button"
            variant="outlined" 
            size="small" 
            href={link.url} 
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              borderColor: getCategoryColor(link.category),
              color: getCategoryColor(link.category),
              transition: 'all 0.3s ease',
              fontSize: '0.75rem',
              py: 0.25,
              minWidth: '80px',
              '&:hover': {
                backgroundColor: getCategoryColor(link.category),
                borderColor: getCategoryColor(link.category),
                color: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }
            }}
          >
            Ziyaret Et
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LinkCard; 