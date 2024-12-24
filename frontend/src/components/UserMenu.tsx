import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar, 
  ListItemIcon,
  Divider,
  Box,
  Button
} from '@mui/material';
import { 
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../services/authService';

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

interface UserMenuProps {
  user: {
    username: string;
    email: string;
    profileImage?: string;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // Profil resmi için renk seçimi
  const getBorderColor = () => {
    const currentImage = user.profileImage || '/images/profile-icons/ppdefault.png';
    return profileColors[currentImage] || '#90caf9'; // Varsayılan renk
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const borderColor = getBorderColor();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={handleMenu}
        sx={{
          borderRadius: '50px',
          padding: '4px 16px 4px 4px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: 'white',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Avatar 
          src={user.profileImage || '/images/profile-icons/ppdefault.png'} 
          sx={{ 
            width: 32, 
            height: 32,
            border: '2px solid',
            borderColor: borderColor,
            transition: 'border-color 0.3s ease',
          }}
        />
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {user.username}
        </motion.span>
        <ArrowDownIcon 
          sx={{ 
            fontSize: 20,
            transition: 'transform 0.3s ease',
            transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'rotate(0deg)',
          }} 
        />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            background: 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            minWidth: '200px',
            '& .MuiMenuItem-root': {
              color: 'white',
              padding: '10px 16px',
              gap: 1.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(4px)',
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Box sx={{ mb: 0.5, fontWeight: 500, color: 'white' }}>
              {user.username}
            </Box>
            <Box sx={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              {user.email}
            </Box>
          </motion.div>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />
        <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" sx={{ color: 'white' }} />
          </ListItemIcon>
          Profil
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" sx={{ color: 'white' }} />
          </ListItemIcon>
          Ayarlar
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: 'white' }} />
          </ListItemIcon>
          Çıkış Yap
        </MenuItem>
      </Menu>
    </motion.div>
  );
};

export default UserMenu; 