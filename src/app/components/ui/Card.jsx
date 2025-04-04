import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-card text-card-foreground rounded-lg border border-border shadow ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div 
      className={`p-6 border-b border-border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 
      className={`text-lg font-semibold ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p 
      className={`text-sm text-muted-foreground mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div 
      className={`p-6 pt-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div 
      className={`p-6 pt-0 flex items-center ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}