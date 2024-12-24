import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Alert,
  CircularProgress,
  useTheme,
  alpha
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { createBattle } from '../services/battleService';

// Kategoriler
const categories = [
  'Yemek', 'Anime', 'Spor', 'Oyun', 'Eğlence',
  'Müzik', 'Film', 'Hayvan', 'Bilim', 'Yaşam',
  'Moda', 'Doğa', 'Teknoloji', 'Alışveriş', 'İş',
  'Para', 'Tarih', 'Siyaset', 'Diğer'
];

interface Option {
  title: string;
  image: string;
}

const CreateBattle: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kapak görseli yükleme
  const handleCoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Seçenek görseli yükleme
  const handleOptionImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newOptions = [...options];
        newOptions[index] = {
          ...newOptions[index],
          image: reader.result as string
        };
        setOptions(newOptions);
      };
      reader.readAsDataURL(file);
    }
  };

  // Yeni seçenek ekleme
  const addOption = () => {
    if (options.length < 128) {
      setOptions([...options, { title: '', image: '' }]);
    }
  };

  // Seçenek silme
  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  // Seçenek başlığını güncelleme
  const updateOptionTitle = (index: number, title: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], title };
    setOptions(newOptions);
  };

  // Form gönderme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasyonlar
    if (!title.trim()) {
      setError('Başlık zorunludur');
      return;
    }
    if (!category) {
      setError('Kategori seçmelisiniz');
      return;
    }
    if (!coverImage) {
      setError('Kapak görseli zorunludur');
      return;
    }
    if (options.length < 4) {
      setError('En az 4 seçenek eklemelisiniz');
      return;
    }
    if (options.length > 128) {
      setError('En fazla 128 seçenek ekleyebilirsiniz');
      return;
    }
    if (options.some(option => !option.title.trim() || !option.image)) {
      setError('Tüm seçenekler için başlık ve görsel zorunludur');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await createBattle({
        title,
        category,
        coverImage,
        options
      });

      navigate('/thisorthat');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Kapışma Oluştur
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom align="center">
            Seçeneklerini belirle ve kapışmayı başlat!
          </Typography>
        </motion.div>

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 4 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            {/* Sol Kolon - Kapışma Bilgileri */}
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                p: 3,
                background: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Typography variant="h6" gutterBottom>
                  Kapışma Bilgileri
                </Typography>

                <TextField
                  fullWidth
                  label="Başlık"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  margin="normal"
                  required
                />

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Kategori</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Kategori"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ mt: 3 }}>
                  <Typography gutterBottom>
                    Kapak Görseli
                  </Typography>
                  <input
                    accept="image/*"
                    type="file"
                    id="cover-image-upload"
                    hidden
                    onChange={handleCoverImageUpload}
                  />
                  <label htmlFor="cover-image-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={<UploadIcon />}
                      fullWidth
                    >
                      Görsel Yükle
                    </Button>
                  </label>
                  {coverImage && (
                    <Box sx={{ mt: 2 }}>
                      <img
                        src={coverImage}
                        alt="Kapak Görseli"
                        style={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: 8
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Card>
            </Grid>

            {/* Sağ Kolon - Seçenekler */}
            <Grid item xs={12} md={8}>
              <Card sx={{ 
                p: 3,
                background: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Typography variant="h6">
                    Seçenekler ({options.length}/128)
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addOption}
                    disabled={options.length >= 128}
                  >
                    Seçenek Ekle
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  {options.map((option, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card sx={{ 
                        p: 2,
                        background: alpha(theme.palette.background.paper, 0.4)
                      }}>
                        <Box sx={{ mb: 2 }}>
                          <TextField
                            fullWidth
                            label={`Seçenek ${index + 1}`}
                            value={option.title}
                            onChange={(e) => updateOptionTitle(index, e.target.value)}
                            required
                          />
                        </Box>

                        <Box sx={{ position: 'relative' }}>
                          <input
                            accept="image/*"
                            type="file"
                            id={`option-image-${index}`}
                            hidden
                            onChange={(e) => handleOptionImageUpload(e, index)}
                          />
                          {option.image ? (
                            <Box sx={{ position: 'relative' }}>
                              <CardMedia
                                component="img"
                                height="150"
                                image={option.image}
                                alt={option.title}
                                sx={{ borderRadius: 1 }}
                              />
                              <IconButton
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                                  }
                                }}
                                onClick={() => removeOption(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          ) : (
                            <label htmlFor={`option-image-${index}`}>
                              <Button
                                component="span"
                                variant="outlined"
                                startIcon={<UploadIcon />}
                                fullWidth
                              >
                                Görsel Yükle
                              </Button>
                            </label>
                          )}
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                minWidth: 200,
                borderRadius: '50px',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Kapışmayı Oluştur'
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </PageTransition>
  );
};

export default CreateBattle; 