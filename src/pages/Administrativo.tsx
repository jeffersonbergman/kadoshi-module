
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/administrativo/PageHeader';
import DashboardCards from '@/components/administrativo/DashboardCards';
import MembersTab from '@/components/administrativo/MembersTab';
import MinutesTab from '@/components/administrativo/MinutesTab';
import CommunicationsTab from '@/components/administrativo/CommunicationsTab';

const Administrativo = () => {
  const { t } = useTranslation();
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <PageHeader />
        <DashboardCards />

        <Tabs defaultValue="membros" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="membros">Membros</TabsTrigger>
            <TabsTrigger value="atas">Atas</TabsTrigger>
            <TabsTrigger value="comunicados">Comunicados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="membros" className="mt-4">
            <MembersTab />
          </TabsContent>
          
          <TabsContent value="atas" className="mt-4">
            <MinutesTab />
          </TabsContent>
          
          <TabsContent value="comunicados" className="mt-4">
            <CommunicationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Administrativo;
