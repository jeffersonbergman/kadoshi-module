
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PageHeader: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t('administrative.title')}</h1>
        <p className="text-gray-500">{t('administrative.subtitle')}</p>
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => navigate('/administrativo/membros/novo')}>
          <UserPlus size={18} className="mr-2" /> {t('administrative.newMember')}
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
