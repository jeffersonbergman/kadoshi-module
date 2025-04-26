
import React from 'react';
import { formatCurrency } from '@/utils/currency';
import StatCard from './StatCard';

interface CurrencyStatCardProps {
  title: string;
  value: number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  currencyLocale?: string;
}

const CurrencyStatCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className,
  currencyLocale 
}: CurrencyStatCardProps) => {
  return (
    <StatCard
      title={title}
      value={formatCurrency(value, currencyLocale)}
      description={description}
      icon={icon}
      trend={trend}
      className={className}
    />
  );
};

export default CurrencyStatCard;
