import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeaderLogoProps {
  src: string;
  alt: string;
  to?: string;
  delay?: number;
  isClickable?: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ src, alt, to, delay = 0, isClickable = true }) => {
  const logoMotion = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        delay: delay
      }
    }
  };

  const Logo = (
    <motion.img
      src={src}
      alt={alt}
      style={{ 
        height: '40px',
        cursor: isClickable ? 'pointer' : 'default'
      }}
      initial="initial"
      animate="animate"
      variants={logoMotion}
    />
  );

  if (to && isClickable) {
    return (
      <Link to={to} style={{ display: 'inline-block' }}>
        {Logo}
      </Link>
    );
  }

  return Logo;
};

export default HeaderLogo; 