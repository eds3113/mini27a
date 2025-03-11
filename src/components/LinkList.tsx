import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Typography, Box, CircularProgress, Alert,
  Paper, TextField, InputAdornment
} from '@mui/material';
import { Work as WorkIcon, Link as LinkIcon, Search as SearchIcon } from '@mui/icons-material';
import LinkCard from './LinkCard';
import { getLinks } from '../services/linkService';
import { Link, LinkCategory } from '../types';

const LinkList: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<{[key: string]: Link[]}>({
    'yonetim': [],
    'diger': []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Gösterilecek kartların sayısını ayarla
  const MAX_VISIBLE_CARDS = 4;

  // Başlangıçta tüm bağlantıları yükle
  useEffect(() => {
    loadLinks();
  }, []);

  // Tüm bağlantıları yükle
  const loadLinks = async () => {
    try {
      setLoading(true);
      const data = await getLinks();
      setLinks(data);
      
      // Kategori bazında filtrelenmiş bağlantıları ayarla
      const yonetimLinks = data.filter(link => link.category === 'yonetim');
      const digerLinks = data.filter(link => link.category === 'diger');
      
      setFilteredLinks({
        'yonetim': yonetimLinks,
        'diger': digerLinks
      });
      
      setError(null);
    } catch (err) {
      setError('Bağlantılar yüklenirken bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Arama yapma işlemi
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      // Arama terimi yoksa, kategoriye göre tüm bağlantıları göster
      const yonetimLinks = links.filter(link => link.category === 'yonetim');
      const digerLinks = links.filter(link => link.category === 'diger');
      
      setFilteredLinks({
        'yonetim': yonetimLinks,
        'diger': digerLinks
      });
      return;
    }
    
    // Arama terimine göre filtrele
    const filteredYonetim = links.filter(link => 
      link.category === 'yonetim' && 
      (link.title.toLowerCase().includes(term) || 
      (link.description && link.description.toLowerCase().includes(term)))
    );
    
    const filteredDiger = links.filter(link => 
      link.category === 'diger' && 
      (link.title.toLowerCase().includes(term) || 
      (link.description && link.description.toLowerCase().includes(term)))
    );
    
    setFilteredLinks({
      'yonetim': filteredYonetim,
      'diger': filteredDiger
    });
  };

  // Kategori başlığını render et
  const renderCategoryHeader = (category: LinkCategory) => {
    const getCategoryIcon = () => {
      switch (category) {
        case 'yonetim':
          return <WorkIcon fontSize="large" sx={{ color: '#3f51b5', mr: 2 }} />;
        case 'diger':
          return <LinkIcon fontSize="large" sx={{ color: '#4caf50', mr: 2 }} />;
        default:
          return null;
      }
    };

    const getCategoryTitle = () => {
      switch (category) {
        case 'yonetim':
          return 'Yönetim Dosyaları';
        case 'diger':
          return 'Diğer Kaynaklar';
        default:
          return '';
      }
    };

    const getCategoryColor = () => {
      switch (category) {
        case 'yonetim':
          return '#3f51b5';
        case 'diger':
          return '#4caf50';
        default:
          return '#ffffff';
      }
    };

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {getCategoryIcon()}
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            color: getCategoryColor(),
            borderBottom: `2px solid ${getCategoryColor()}`,
            pb: 1
          }}
        >
          {getCategoryTitle()}
        </Typography>
      </Box>
    );
  };

  // Kategori bölümünü render et
  const renderCategorySection = (category: LinkCategory) => {
    const categoryLinks = filteredLinks[category] || [];
    const linkCount = categoryLinks.length;

    if (linkCount === 0) {
      return (
        <Box sx={{ height: '100%' }}>
          {renderCategoryHeader(category)}
          <Alert severity="info" sx={{ borderRadius: '12px' }}>
            {searchTerm ? 'Arama sonucunda bağlantı bulunamadı.' : 'Bu kategoride bağlantı bulunamadı.'}
          </Alert>
        </Box>
      );
    }

    // Scrollbar'ın ne zaman görüneceğini hesapla
    const hasScroll = linkCount > MAX_VISIBLE_CARDS;

    return (
      <Box sx={{ height: '100%' }}>
        {renderCategoryHeader(category)}
        <Box 
          sx={{ 
            maxHeight: hasScroll ? '500px' : 'auto',
            overflow: hasScroll ? 'auto' : 'visible',
            position: 'relative',
            pt: 0.5, // Üstteki kartın tam görünmesi için üst padding ekliyorum
            pr: hasScroll ? 1 : 0,
            // Özel scrollbar stili
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: category === 'yonetim' ? '#3f51b580' : '#4caf5080',
              borderRadius: '10px',
              '&:hover': {
                background: category === 'yonetim' ? '#3f51b5' : '#4caf50',
              },
            },
          }}
        >
          {categoryLinks.map((link, index) => (
            <Box key={link.id} sx={{ mb: index < categoryLinks.length - 1 ? 3 : 0 }}>
              <LinkCard link={link} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg">
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)'
        }}
      >
        {/* Arama Kutusu */}
        <TextField
          fullWidth
          placeholder="Bağlantılarda ara..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#bb86fc' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '&:hover fieldset': {
                borderColor: '#bb86fc',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#bb86fc',
              }
            },
          }}
        />
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 8 }}>
          <CircularProgress color="secondary" size={60} thickness={4} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2, borderRadius: '12px' }}>{error}</Alert>
      ) : (
        <Grid container spacing={4}>
          {/* Yönetim Kategorisi */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: '16px',
                background: 'linear-gradient(145deg, #1E1E1E 0%, #2D2D2D 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
            >
              {renderCategorySection('yonetim')}
            </Paper>
          </Grid>
          
          {/* Diğer Kategorisi */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: '16px',
                background: 'linear-gradient(145deg, #1E1E1E 0%, #2D2D2D 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
            >
              {renderCategorySection('diger')}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default LinkList; 