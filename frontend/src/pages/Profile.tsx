import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Avatar, 
  Typography, 
  IconButton, 
  Box, 
  Snackbar, 
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser, updateProfileImage } from '../services/authService';
import { Edit as EditIcon } from '@mui/icons-material';

interface ProfileIcon {
  path: string;
  name: string;
}

// Profil görselleri için renk eşleştirmeleri
const profileColors: { [key: string]: string } = {
  '/images/profile-icons/ppdefault.png': '#733d8b',
  '/images/profile-icons/ppicon1.png': '#ebd4bd',
  '/images/profile-icons/ppicon2.png': '#ee181c',
  '/images/profile-icons/ppicon3.png': '#00cdf7',
  '/images/profile-icons/ppicon4.png': '#65d046',
  '/images/profile-icons/ppicon5.png': '#f79e51',
  '/images/profile-icons/ppicon6.png': '#c3c4c4',
  '/images/profile-icons/ppicon7.png': '#996b4d',
  '/images/profile-icons/ppicon8.png': '#f3a9b9',
  '/images/profile-icons/ppicon9.png': '#d31b6c',
  '/images/profile-icons/ppicon10.png': '#fbda3f',
  '/images/profile-icons/ppicon11.png': '#ffffff',
};

const profileIcons: ProfileIcon[] = [
  { path: '/images/profile-icons/ppdefault.png', name: 'Default' },
  { path: '/images/profile-icons/ppicon1.png', name: 'Icon 1' },
  { path: '/images/profile-icons/ppicon2.png', name: 'Icon 2' },
  { path: '/images/profile-icons/ppicon3.png', name: 'Icon 3' },
  { path: '/images/profile-icons/ppicon4.png', name: 'Icon 4' },
  { path: '/images/profile-icons/ppicon5.png', name: 'Icon 5' },
  { path: '/images/profile-icons/ppicon6.png', name: 'Icon 6' },
  { path: '/images/profile-icons/ppicon7.png', name: 'Icon 7' },
  { path: '/images/profile-icons/ppicon8.png', name: 'Icon 8' },
  { path: '/images/profile-icons/ppicon9.png', name: 'Icon 9' },
  { path: '/images/profile-icons/ppicon10.png', name: 'Icon 10' },
  { path: '/images/profile-icons/ppicon11.png', name: 'Icon 11' }
];

const Profile = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>('/images/profile-icons/ppdefault.png');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    if (user?.profileImage) {
      setSelectedIcon(user.profileImage);
    }
  }, [user]);

  const handleIconSelect = async (iconPath: string) => {
    try {
      setLoading(true);
      setError(null);
      await updateProfileImage(iconPath);
      setSelectedIcon(iconPath);
      setSuccess(true);
      setOpenDialog(false);
    } catch (err: any) {
      if (err.message === 'Oturum süresi dolmuş. Lütfen tekrar giriş yapın.') {
        setError(err.message);
        // 2 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(err.response?.data?.message || 'Profil resmi güncellenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Profil resmi için renk seçimi
  const getBorderColor = (imagePath: string) => {
    return profileColors[imagePath] || '#90caf9'; // Varsayılan renk
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        sx={{ 
          p: 3, 
          background: 'rgba(30, 30, 30, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box sx={{ textAlign: 'center', position: 'relative' }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar
                src={selectedIcon}
                sx={{
                  width: 150,
                  height: 150,
                  margin: '0 auto',
                  border: '4px solid',
                  borderColor: getBorderColor(selectedIcon),
                  opacity: loading ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                }}
              />
            </motion.div>
            <IconButton
              onClick={() => setOpenDialog(true)}
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: getBorderColor(selectedIcon),
                '&:hover': {
                  backgroundColor: getBorderColor(selectedIcon),
                  filter: 'brightness(1.2)',
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>

          <Typography variant="h5" sx={{ mt: 2, color: 'white' }}>
            {user?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
            {user?.email}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 2, 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(5px)',
              }}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  Diğer profil bilgileri buraya eklenecek...
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Profil İkonu Seçme Dialog'u */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          color: 'white',
          fontSize: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 24px'
        }}>
          Profil İkonu Seç
        </DialogTitle>
        <DialogContent sx={{ padding: '24px' }}>
          <Grid 
            container 
            spacing={2} 
            sx={{ 
              mt: 0,
            }}
          >
            {profileIcons.map((icon, index) => (
              <Grid item xs={4} sm={3} key={icon.path}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <IconButton
                    onClick={() => handleIconSelect(icon.path)}
                    disabled={loading}
                    sx={{
                      p: 0.5,
                      border: '2px solid',
                      borderColor: selectedIcon === icon.path ? getBorderColor(icon.path) : 'transparent',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      opacity: loading ? 0.5 : 1,
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '1/1',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      '&:hover': {
                        borderColor: getBorderColor(icon.path),
                        transform: 'scale(1.05)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                      },
                    }}
                  >
                    <Avatar
                      src={icon.path}
                      sx={{
                        width: '85%',
                        height: '85%',
                        border: '2px solid',
                        borderColor: getBorderColor(icon.path),
                      }}
                    />
                  </IconButton>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ 
          padding: '12px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Button 
            onClick={() => setOpenDialog(false)} 
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            İptal
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={error !== null} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={success} 
        autoHideDuration={3000} 
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Profil resmi başarıyla güncellendi
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 