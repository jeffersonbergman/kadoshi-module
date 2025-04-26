import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Search, Send, User, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Communication {
  id: string;
  title: string;
  content: string;
  recipients: string;
  date: string;
  isRead?: boolean;
}

const Communications = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [communications, setCommunications] = useState<Communication[]>([
    {
      id: '1',
      title: 'Convite para Retiro Anual',
      content: 'Convite para participação no retiro anual da igreja, que acontecerá nos dias 15 a 17 de maio...',
      recipients: 'Todos os Membros',
      date: '10/04/2025'
    },
    {
      id: '2',
      title: 'Campanha de Arrecadação',
      content: 'Estamos iniciando uma campanha de arrecadação de alimentos não perecíveis para doação...',
      recipients: 'Todos os Membros',
      date: '05/04/2025'
    },
    {
      id: '3',
      title: 'Reunião de Líderes de Ministério',
      content: 'Convocamos todos os líderes de ministério para uma reunião importante no dia 10/04...',
      recipients: 'Líderes de Ministério',
      date: '01/04/2025'
    },
    {
      id: '4',
      title: 'Alteração no Horário dos Cultos',
      content: 'Informamos que a partir do próximo domingo (07/04), o culto da manhã passará a ser realizado às 10h...',
      recipients: 'Todos os Membros',
      date: '25/03/2025'
    }
  ]);

  const [newCommunication, setNewCommunication] = useState({
    title: '',
    content: '',
    recipients: 'all'
  });

  const handleSendCommunication = () => {
    if (!newCommunication.title || !newCommunication.content) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const recipientsText = newCommunication.recipients === 'all' 
      ? 'Todos os Membros' 
      : newCommunication.recipients === 'leaders' 
        ? 'Líderes de Ministério' 
        : 'Grupo Selecionado';

    const newComm: Communication = {
      id: (communications.length + 1).toString(),
      title: newCommunication.title,
      content: newCommunication.content,
      recipients: recipientsText,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setCommunications([newComm, ...communications]);
    setIsDialogOpen(false);
    setNewCommunication({
      title: '',
      content: '',
      recipients: 'all'
    });

    toast.success("Comunicado enviado com sucesso!");
  };

  return (
    
    <MainLayout>
      <div className="container mx-auto py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Comunicados</h1>
            <p className="text-gray-500">Gerenciar comunicados para membros da igreja</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Send size={18} className="mr-2" /> Novo Comunicado
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Novo Comunicado</DialogTitle>
                <DialogDescription>
                  Crie um novo comunicado para enviar aos membros da igreja.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comm-title" className="text-right">
                    Título *
                  </Label>
                  <Input
                    id="comm-title"
                    value={newCommunication.title}
                    onChange={(e) => setNewCommunication({...newCommunication, title: e.target.value})}
                    className="col-span-3"
                    placeholder="Ex: Convite para evento especial"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comm-recipients" className="text-right">
                    Destinatários *
                  </Label>
                  <Select 
                    value={newCommunication.recipients} 
                    onValueChange={(value) => setNewCommunication({...newCommunication, recipients: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione os destinatários" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Membros</SelectItem>
                      <SelectItem value="leaders">Líderes de Ministério</SelectItem>
                      <SelectItem value="youth">Jovens</SelectItem>
                      <SelectItem value="worship">Equipe de Louvor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="comm-content" className="text-right pt-2">
                    Conteúdo *
                  </Label>
                  <Textarea
                    id="comm-content"
                    value={newCommunication.content}
                    onChange={(e) => setNewCommunication({...newCommunication, content: e.target.value})}
                    className="col-span-3 min-h-[150px]"
                    placeholder="Digite o conteúdo do comunicado..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSendCommunication}>Enviar Comunicado</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Comunicados Internos</CardTitle>
                <CardDescription>Envie e gerencie comunicados para os membros</CardDescription>
              </div>
              <div className="flex w-full md:w-auto space-x-2">
                <div className="relative flex-grow md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Buscar comunicado..."
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="sent">Enviados</TabsTrigger>
                <TabsTrigger value="scheduled">Agendados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <div className="space-y-4">
                  {communications.map((comm) => (
                    <div key={comm.id} className="p-4 border rounded-md hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail size={20} className="mr-3 text-church-primary" />
                          <div>
                            <h3 className="font-medium">{comm.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              Enviado em: {comm.date} • Para: {comm.recipients}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Detalhes</Button>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>{comm.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="sent" className="mt-4">
                <div className="space-y-4">
                  {communications.map((comm) => (
                    <div key={comm.id} className="p-4 border rounded-md hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail size={20} className="mr-3 text-church-primary" />
                          <div>
                            <h3 className="font-medium">{comm.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              Enviado em: {comm.date} • Para: {comm.recipients}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Detalhes</Button>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>{comm.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="scheduled" className="mt-4">
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Mail className="h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">Nenhum comunicado agendado</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Você ainda não possui comunicados agendados para envio futuro.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Communications;
