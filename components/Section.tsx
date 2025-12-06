import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, className = '', children }) => {
  return (
    <section id={id} className={`py-20 px-4 md:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-4xl font-bold text-brand-blue mb-4">{title}</h2>}
            {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
            <div className="w-24 h-1 bg-brand-orange mx-auto mt-6 rounded-full"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};