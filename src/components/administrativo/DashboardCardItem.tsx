
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const DashboardCardItem: React.FC<DashboardCardItemProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick 
}) => {
  return (
    <div 
      className="dashboard-card flex items-start group cursor-pointer" 
      onClick={onClick}
    >
      <div className="mr-4 bg-church-light p-3 rounded-lg text-church-primary">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-500 mt-1 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default DashboardCardItem;
