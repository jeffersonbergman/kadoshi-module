
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  to: string;
  className?: string;
  count?: number;
}

const DashboardCard = ({ 
  title, 
  icon, 
  description, 
  to, 
  className, 
  count 
}: DashboardCardProps) => {
  return (
    <Link 
      to={to}
      className={cn(
        "dashboard-card flex items-start group",
        className
      )}
    >
      <div className="mr-4 bg-church-light p-3 rounded-lg text-church-primary">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h3 className="font-heading font-semibold text-lg">{title}</h3>
          {count !== undefined && (
            <span className="bg-church-light text-church-primary text-sm font-medium px-2.5 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        <p className="text-gray-500 mt-1 text-sm">{description}</p>
        <div className="mt-2 text-church-primary flex items-center text-sm font-medium opacity-0 transform translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
          <span>Ver mais</span>
          <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
