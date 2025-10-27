import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseClasses = 'bg-card border border-border rounded-lg p-4 transition-all duration-200';
  const interactiveClasses = onClick ? 'cursor-pointer hover:bg-card-hover hover:border-primary/50' : '';

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
