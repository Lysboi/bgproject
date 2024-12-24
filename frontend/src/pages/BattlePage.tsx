import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import {
  Person as PersonIcon,
  PlayArrow as PlayIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { getBattle, Battle } from '../services/battleService';

const BattlePage: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [battle, setBattle] = useState<Battle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kapışmayı yükle
  useEffect(() => {
    const loadBattle = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) throw new Error('Kapışma ID\'si bulunamadı');
        
        const data = await getBattle(id);
        setBattle(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBattle();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !battle) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || 'Kapışma bulunamadı'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/thisorthat')}
        >
          Geri Dön
        </Button>
      </Container>
    );
  }

  return (
    <PageTransition>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/thisorthat')}
            sx={{ mb: 2 }}
          >
            Geri Dön
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              {battle.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                icon={<PersonIcon />}
                label={battle.creator.username}
                variant="outlined"
              />
              <Chip
                label={battle.category}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`${battle.playCount} Oynama`}
                variant="outlined"
              />
            </Box>
          </motion.div>
        </Box>

        {/* Kapak Görseli ve Başlat Butonu */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ 
                background: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={battle.coverImage}
                  alt={battle.title}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ 
                height: '100%',
                background: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Kapışmaya Hazır mısın?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      {battle.options.length} seçenek arasından tercihini yap!
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayIcon />}
                      onClick={() => navigate(`/thisorthat/${battle._id}/play`)}
                      sx={{
                        borderRadius: '50px',
                        px: 4,
                        py: 1.5,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        '&:hover': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        }
                      }}
                    >
                      Kapışmayı Başlat
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* İstatistikler */}
        <Box sx={{ mt: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="h5" gutterBottom>
              Kapışma Hakkında
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ 
                  p: 3,
                  background: 'rgba(30, 30, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Typography variant="h6" gutterBottom>
                    Toplam Oynama
                  </Typography>
                  <Typography variant="h3">
                    {battle.playCount.toLocaleString()}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ 
                  p: 3,
                  background: 'rgba(30, 30, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Typography variant="h6" gutterBottom>
                    Seçenek Sayısı
                  </Typography>
                  <Typography variant="h3">
                    {battle.options.length}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ 
                  p: 3,
                  background: 'rgba(30, 30, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Typography variant="h6" gutterBottom>
                    Oluşturulma Tarihi
                  </Typography>
                  <Typography variant="h3">
                    {new Date(battle.createdAt).toLocaleDateString('tr-TR')}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default BattlePage; 