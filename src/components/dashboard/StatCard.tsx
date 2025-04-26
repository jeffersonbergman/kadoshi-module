
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend,
  className,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "dashboard-card p-5 flex flex-col",
        onClick && "cursor-pointer hover:bg-gray-50",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-church-light rounded-full text-church-primary">
          {icon}
        </div>
      </div>
      <div className="mt-1">
        <div className="text-xl font-semibold">{value}</div>
        <div className="flex items-center mt-1 text-sm">
          {trend && (
            <div className={`flex items-center mr-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isPositive ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              <span>{trend.value}%</span>
            </div>
          )}
          <span className="text-gray-500">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
