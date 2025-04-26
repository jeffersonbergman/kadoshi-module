
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardCardItem from './DashboardCardItem';

const DashboardCards = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <DashboardCardItem
        icon={Users}
        title={t('administrative.members')}
        description={t('administrative.membersDescription')}
        onClick={() => navigate('/administrativo/membros/1')}
      />
      
      <Link to="/administrativo/calendario" className="block">
        <DashboardCardItem
          icon={Calendar}
          title={t('administrative.events')}
          description={t('administrative.eventsDescription')}
          onClick={() => {}}
        />
      </Link>
      
      <Link to="/administrativo/comunicados" className="block">
        <DashboardCardItem
          icon={Mail}
          title={t('administrative.communications')}
          description={t('administrative.communicationsDescription')}
          onClick={() => {}}
        />
      </Link>
    </div>
  );
};

export default DashboardCards;
