
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface rounded-xl shadow-md p-6 h-full ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => {
  return <h2 className={`text-xl font-bold text-text ${className}`}>{children}</h2>;
};

export const CardDescription: React.FC<CardProps> = ({ children, className = '' }) => {
  return <p className={`text-sm text-muted ${className}`}>{children}</p>;
};

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};

export default Card;
