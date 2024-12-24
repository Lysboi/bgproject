import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <Link to={to} className="nav-button" style={{ textDecoration: 'none' }}>
      <img src={defaultImage} alt={alt} className="default" />
      <img src={hoverImage} alt={`${alt} Hover`} className="hover" />
    </Link>
  );
};

export default NavigationButton; 