
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import { DollarSign, Users, Music, Calendar, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Sample data (to be replaced with real data)
  const stats = [
    { 
      title: t('dashboard.balance'), 
      value: 'R$ 15.420,00', 
      description: t('dashboard.updatedToday'), 
      icon: <DollarSign size={18} />,
      trend: { value: 12, isPositive: true }
    },
    { 
      title: t('dashboard.activeMembers'), 
      value: '245', 
      description: t('dashboard.membersLastMonth'),
      icon: <Users size={18} />
    },
    { 
      title: t('dashboard.nextEvent'), 
      value: t('dashboard.worshipService'), 
      description: t('dashboard.sunday19h'),
      icon: <Calendar size={18} />,
      onClick: () => navigate('/administrativo/calendario')
    },
    { 
      title: t('dashboard.currentRepertoire'), 
      value: '12 músicas', 
      description: t('dashboard.updatedDaysAgo', { days: 2 }),
      icon: <Music size={18} />
    }
  ];

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t('dashboard.title')}</h1>
          <p className="text-gray-500">{t('dashboard.welcome')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              trend={stat.trend}
              onClick={stat.onClick}
            />
          ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Módulos do Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <DashboardCard
            title="Financeiro"
            icon={<DollarSign size={24} />}
            description="Gerencie receitas, despesas e gere relatórios financeiros da igreja."
            to="/financeiro"
            count={8}
          />
          <DashboardCard
            title="Administrativo"
            icon={<Users size={24} />}
            description="Cadastre membros, registre atas e envie comunicados internos."
            to="/administrativo"
            count={3}
          />
          <DashboardCard
            title="Música"
            icon={<Music size={24} />}
            description="Organize escalas, repertórios e recursos para a equipe de louvor."
            to="/musica"
            count={5}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Atividades Recentes</h2>
          <div className="dashboard-card">
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-church-light rounded-full flex items-center justify-center text-church-primary mr-3">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nova entrada financeira registrada</p>
                    <p className="text-xs text-gray-500">Hoje, 14:32</p>
                  </div>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-church-light rounded-full flex items-center justify-center text-church-primary mr-3">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Novo membro cadastrado: Maria Silva</p>
                    <p className="text-xs text-gray-500">Ontem, 10:45</p>
                  </div>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-church-light rounded-full flex items-center justify-center text-church-primary mr-3">
                    <Music size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Repertório atualizado para o próximo domingo</p>
                    <p className="text-xs text-gray-500">Há 2 dias</p>
                  </div>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-church-light rounded-full flex items-center justify-center text-church-primary mr-3">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nova ata de reunião registrada</p>
                    <p className="text-xs text-gray-500">Há 3 dias</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
