import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <header className="mb-6 pb-4 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
        <p className="text-text-secondary mt-1">{description}</p>
      </div>
      <div>
        {children}
      </div>
    </header>
  );
};

export default PageHeader;
