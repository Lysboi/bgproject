import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  useTheme,
  alpha,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Add as AddIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  Whatshot as WhatshotIcon,
  NewReleases as NewReleasesIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { getBattles, Battle } from '../services/battleService';
import { useNavigate } from 'react-router-dom';

// Kategoriler
const categories = [
  'Yemek', 'Anime', 'Spor', 'Oyun', 'Eğlence',
  'Müzik', 'Film', 'Hayvan', 'Bilim', 'Yaşam',
  'Moda', 'Doğa', 'Teknoloji', 'Alışveriş', 'İş',
  'Para', 'Tarih', 'Siyaset', 'Diğer'
];

const ThisOrThat: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kapışmaları yükle
  const loadBattles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let sort = '-createdAt'; // Varsayılan sıralama
      if (currentTab === 0) sort = '-playCount'; // Popüler
      
      const data = await getBattles(selectedCategory || undefined, sort);
      setBattles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde ve filtreler değiştiğinde kapışmaları yükle
  useEffect(() => {
    loadBattles();
  }, [selectedCategory, currentTab]);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <PageTransition>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ 
          mb: 6,
          textAlign: 'center',
          position: 'relative'
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" component="h1" gutterBottom>
              This or That
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              İki seçenek, bir karar. Kendi kapışmanı oluştur veya diğerlerine katıl!
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate('/thisorthat/create')}
                sx={{
                  borderRadius: '50px',
                  px: 4,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  }
                }}
              >
                Kapışma Oluştur
              </Button>

              <IconButton 
                onClick={handleFilterClick}
                sx={{ 
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                  borderRadius: '50%',
                  p: 1.5,
                  '&:hover': {
                    borderColor: theme.palette.primary.main
                  }
                }}
              >
                <FilterIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleFilterClose()}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    maxHeight: '400px',
                    background: 'rgba(30, 30, 30, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <MenuItem onClick={() => handleFilterClose()}>
                  <Typography color="primary">Tüm Kategoriler</Typography>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem 
                    key={category} 
                    onClick={() => handleFilterClose(category)}
                    selected={selectedCategory === category}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </motion.div>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab 
              icon={<WhatshotIcon />} 
              iconPosition="start" 
              label="Popüler" 
            />
            <Tab 
              icon={<NewReleasesIcon />} 
              iconPosition="start" 
              label="Yeni" 
            />
            <Tab 
              icon={<CategoryIcon />} 
              iconPosition="start" 
              label="Kategoriler" 
            />
          </Tabs>
        </Box>

        {/* Loading & Error States */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Battles Grid */}
        {!loading && !error && (
          <Grid container spacing={3}>
            {battles.map((battle) => (
              <Grid item xs={12} sm={6} md={4} key={battle._id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(30, 30, 30, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        background: 'rgba(30, 30, 30, 0.8)',
                      }
                    }}
                    onClick={() => navigate(`/thisorthat/${battle._id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={battle.coverImage}
                      alt={battle.title}
                      sx={{
                        objectFit: 'cover',
                      }}
                    />
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Chip 
                          label={battle.category}
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            color: theme.palette.primary.main,
                            mb: 1
                          }}
                        />
                        <Typography variant="h6" component="h3" gutterBottom>
                          {battle.title}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 'auto'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon sx={{ fontSize: 20, opacity: 0.7 }} />
                          <Typography variant="body2" color="text.secondary">
                            {battle.creator.username}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {battle.playCount.toLocaleString()} oynama
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* No Results Message */}
        {!loading && !error && battles.length === 0 && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Henüz kapışma bulunmuyor
            </Typography>
          </Box>
        )}
      </Container>
    </PageTransition>
  );
};

export default ThisOrThat; 