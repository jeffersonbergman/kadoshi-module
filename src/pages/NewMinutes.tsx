
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, ArrowLeft, Mic, FileUp } from 'lucide-react';

const NewMinutes = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="animate-fade-in max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-2" 
            onClick={() => navigate('/administrativo')}
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Nova Ata</h1>
            <p className="text-gray-500">Registre uma nova ata de reunião</p>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detalhes da Ata</CardTitle>
            <CardDescription>Preencha as informações básicas sobre a reunião</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Reunião</Label>
                  <Input id="title" placeholder="Ex: Assembleia Geral Ordinária" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Data da Reunião</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="place">Local</Label>
                  <Input id="place" placeholder="Ex: Sala de Reuniões" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recorder">Registrado por</Label>
                  <Input id="recorder" placeholder="Ex: Maria Oliveira" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Pauta Principal</Label>
                <Input id="subject" placeholder="Ex: Aprovação do plano financeiro anual" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Redação da Ata</CardTitle>
            <CardDescription>Descreva detalhadamente o conteúdo da reunião</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <textarea 
                className="w-full min-h-[300px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-church-primary"
                placeholder="Digite o conteúdo da ata aqui..."
              />
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Mic size={18} className="mr-2" /> Gravar Áudio
                </Button>
                <Button variant="outline">
                  <FileUp size={18} className="mr-2" /> Anexar Arquivo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/administrativo')}>Cancelar</Button>
          <Button onClick={() => {
            // Save the form data
            navigate('/administrativo');
          }}>
            <Save size={18} className="mr-2" /> Salvar Ata
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewMinutes;
