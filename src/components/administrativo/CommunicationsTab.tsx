
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send } from 'lucide-react';

const CommunicationsTab = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Comunicados Internos</CardTitle>
            <CardDescription>Envie e gerencie comunicados para os membros</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => navigate('/administrativo/comunicados')}>
              <Send size={18} className="mr-2" /> Novo Comunicado
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/administrativo/comunicados')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-church-primary" />
                <div>
                  <h3 className="font-medium">Convite para Retiro Anual</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Enviado em: 10/04/2025 • Para: Todos os Membros
                  </p>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  navigate('/administrativo/comunicados');
                }}>Detalhes</Button>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Convite para participação no retiro anual da igreja, que acontecerá nos dias 15 a 17 de maio...</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-md hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-church-primary" />
                <div>
                  <h3 className="font-medium">Campanha de Arrecadação</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Enviado em: 05/04/2025 • Para: Todos os Membros
                  </p>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">Detalhes</Button>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Estamos iniciando uma campanha de arrecadação de alimentos não perecíveis para doação...</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-md hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-church-primary" />
                <div>
                  <h3 className="font-medium">Reunião de Líderes de Ministério</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Enviado em: 01/04/2025 • Para: Líderes de Ministério
                  </p>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">Detalhes</Button>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Convocamos todos os líderes de ministério para uma reunião importante no dia 10/04...</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-md hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-church-primary" />
                <div>
                  <h3 className="font-medium">Alteração no Horário dos Cultos</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Enviado em: 25/03/2025 • Para: Todos os Membros
                  </p>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">Detalhes</Button>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Informamos que a partir do próximo domingo (07/04), o culto da manhã passará a ser realizado às 10h...</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationsTab;
