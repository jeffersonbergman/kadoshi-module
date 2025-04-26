
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Mic, FileUp } from 'lucide-react';

const MinutesTab = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Atas de Assembleia</CardTitle>
            <CardDescription>Registre e consulte atas de reuniões</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => navigate('/administrativo/atas/nova')}>
              <FileUp size={18} className="mr-2" /> Nova Ata
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-md hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText size={20} className="mr-3 text-church-primary" />
                <div>
                  <h3 className="font-medium">Assembleia Geral Ordinária</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Data: 05/04/2025 • Registrado por: Pr. Roberto Silva
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Mic size={16} className="mr-2" /> Áudio
                </Button>
                <Button variant="outline" size="sm">Visualizar</Button>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Pauta principal: Aprovação do plano financeiro para 2025 e eleição de novos diáconos.</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-md hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText size={20} className="mr-3 text-church-primary" />
                <div>
                  <h3 className="font-medium">Reunião do Conselho</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Data: 20/03/2025 • Registrado por: Maria Oliveira
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Mic size={16} className="mr-2" /> Áudio
                </Button>
                <Button variant="outline" size="sm">Visualizar</Button>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Pauta principal: Planejamento de eventos para o segundo trimestre de 2025.</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-md hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText size={20} className="mr-3 text-church-primary" />
                <div>
                  <h3 className="font-medium">Assembleia Extraordinária</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Data: 15/02/2025 • Registrado por: Pr. Roberto Silva
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Mic size={16} className="mr-2" /> Áudio
                </Button>
                <Button variant="outline" size="sm">Visualizar</Button>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Pauta principal: Aprovação de reforma do templo e compra de novos equipamentos.</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-md hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText size={20} className="mr-3 text-church-primary" />
                <div>
                  <h3 className="font-medium">Reunião de Liderança</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Data: 05/01/2025 • Registrado por: João Silva
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Mic size={16} className="mr-2" /> Áudio
                </Button>
                <Button variant="outline" size="sm">Visualizar</Button>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Pauta principal: Planejamento anual e definição de metas para 2025.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MinutesTab;
