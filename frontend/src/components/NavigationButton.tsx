import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCurrentUser } from '../services/authService';

// Profil görselleri için renk eşleştirmeleri
const profileColors: { [key: string]: string } = {
  '/images/profile-icons/ppdefault.png': '#733d8b',
  '/images/profile-icons/ppicon1.png': '#6da3c2',
  '/images/profile-icons/ppicon2.png': '#b41e22',
  '/images/profile-icons/ppicon3.png': '#f1cb33',
  '/images/profile-icons/ppicon4.png': '#65d046',
};

interface NavigationButtonProps {
  to: string;
  defaultImage: string;
  hoverImage: string;
  alt: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  defaultImage,
  hoverImage,
  alt,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const user = getCurrentUser();
  
  // Profil resmi için renk seçimi
  const getBorderColor = () => {
    const currentImage = user?.profileImage || '/images/profile-icons/ppdefault.png';
    return profileColors[currentImage] || '#90caf9'; // Varsayılan renk
  };

  return (
    <Link 
      to={to} 
      className="nav-button" 
      style={{ 
        textDecoration: 'none',
        position: 'relative',
        display: 'inline-block',
        padding: '4px',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={defaultImage} alt={alt} className="default" />
      <img src={hoverImage} alt={`${alt} Hover`} className="hover" />
      <motion.div
        initial={{ width: 0 }}
        animate={{ 
          width: isHovered ? '100%' : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          backgroundColor: getBorderColor(),
          borderRadius: '1.5px',
          overflow: 'hidden',
          filter: 'brightness(1.2)'
        }}
      >
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ 
              x: '200%'
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '30%',
              height: '100%',
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255, 255, 255, 0.8) 50%, 
                transparent 100%
              )`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
              zIndex: 1
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default NavigationButton; 