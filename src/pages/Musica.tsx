
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Music, Calendar, ListMusic, PlusCircle, Search, 
  ChevronRight, UserPlus, Clock, FileMusic, Mic, 
  Edit, Trash2, Plus, Share, Download, Upload, CheckCircle2, 
  Eye, Filter, SlidersHorizontal, Disc3
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { SongEditor } from '@/components/musica/SongEditor';
import { SongList } from '@/components/musica/SongList';

const Musica = () => {
  const { toast } = useToast();
  const [musicianDialogOpen, setMusicianDialogOpen] = useState(false);
  const [scaleDialogOpen, setScaleDialogOpen] = useState(false);
  const [repertoireDialogOpen, setRepertoireDialogOpen] = useState(false);
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('escalas');
  const [editingSong, setEditingSong] = useState<string | null>(null);
  const [isAddingSong, setIsAddingSong] = useState(false);

  const handleNewMusician = (event: React.FormEvent) => {
    event.preventDefault();
    setMusicianDialogOpen(false);
    toast({
      title: "Músico adicionado",
      description: "O novo músico foi adicionado com sucesso.",
    });
  };

  const handleNewScale = (event: React.FormEvent) => {
    event.preventDefault();
    setScaleDialogOpen(false);
    toast({
      title: "Escala criada",
      description: "A nova escala foi criada com sucesso.",
    });
  };

  const handleNewRepertoire = (event: React.FormEvent) => {
    event.preventDefault();
    setRepertoireDialogOpen(false);
    toast({
      title: "Repertório criado",
      description: "O novo repertório foi criado com sucesso.",
    });
  };

  const handleNewSong = (event: React.FormEvent) => {
    event.preventDefault();
    setSongDialogOpen(false);
    toast({
      title: "Música adicionada",
      description: "A nova música foi adicionada com sucesso.",
    });
  };

  // Dados de exemplo para as músicas
  const sampleSongs = [
    {
      id: '1',
      title: 'Grande é o Senhor',
      artist: 'Adhemar de Campos',
      key: 'E',
      bpm: 80,
      lastUpdated: '14/04/2025'
    },
    {
      id: '2',
      title: 'Oceanos',
      artist: 'Hillsong',
      key: 'D',
      bpm: 72,
      lastUpdated: '12/04/2025'
    },
    {
      id: '3',
      title: 'Tua Graça Me Basta',
      artist: 'Davi Sacer',
      key: 'G',
      bpm: 76,
      lastUpdated: '10/04/2025'
    },
    {
      id: '4',
      title: 'Lugar Secreto',
      artist: 'Gabriela Rocha',
      key: 'A',
      bpm: 68,
      lastUpdated: '08/04/2025'
    }
  ];

  const handleEditSong = (songId: string) => {
    setEditingSong(songId);
    setActiveTab('repertorios');
  };

  const handleDeleteSong = (songId: string) => {
    // Implementação real excluiria a música do banco de dados
    toast({
      title: "Música excluída",
      description: "A música foi excluída com sucesso.",
    });
  };

  const handleViewSong = (songId: string) => {
    setEditingSong(songId);
    setActiveTab('repertorios');
  };

  const handleAddNewSong = () => {
    setIsAddingSong(true);
    setActiveTab('repertorios');
  };

  const handleBackToSongList = () => {
    setEditingSong(null);
    setIsAddingSong(false);
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Módulo de Música</h1>
            <p className="text-gray-500">Gerencie escalas, repertórios e recursos para a equipe de louvor</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={musicianDialogOpen} onOpenChange={setMusicianDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="hidden md:flex">
                  <UserPlus size={18} className="mr-2" /> Novo Músico
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Músico</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do novo integrante da equipe de louvor.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNewMusician}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nome
                      </Label>
                      <Input id="name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="instrument" className="text-right">
                        Instrumento
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione um instrumento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vocal">Vocal</SelectItem>
                          <SelectItem value="guitarra">Guitarra</SelectItem>
                          <SelectItem value="violao">Violão</SelectItem>
                          <SelectItem value="baixo">Baixo</SelectItem>
                          <SelectItem value="bateria">Bateria</SelectItem>
                          <SelectItem value="teclado">Teclado</SelectItem>
                          <SelectItem value="piano">Piano</SelectItem>
                          <SelectItem value="violino">Violino</SelectItem>
                          <SelectItem value="saxofone">Saxofone</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Telefone
                      </Label>
                      <Input id="phone" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione um status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="ocasional">Ocasional</SelectItem>
                          <SelectItem value="inativo">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={scaleDialogOpen} onOpenChange={setScaleDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle size={18} className="mr-2" /> Nova Escala
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Escala</DialogTitle>
                  <DialogDescription>
                    Defina os detalhes e os músicos para a nova escala.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNewScale}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-name" className="text-right">
                        Evento
                      </Label>
                      <Input id="event-name" className="col-span-3" placeholder="Ex: Culto de Domingo - Manhã" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Data
                      </Label>
                      <Input id="date" type="date" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start-time" className="text-right">
                        Horário Início
                      </Label>
                      <Input id="start-time" type="time" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end-time" className="text-right">
                        Horário Fim
                      </Label>
                      <Input id="end-time" type="time" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="musicians" className="text-right">
                        Músicos
                      </Label>
                      <div className="col-span-3 space-y-2">
                        <div className="flex items-center justify-between border p-2 rounded-md">
                          <span>João Silva (Bateria)</span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus size={16} className="mr-2" /> Adicionar Músico
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Criar Escala</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="escalas" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="escalas">Escalas</TabsTrigger>
            <TabsTrigger value="repertorios">Repertórios</TabsTrigger>
            <TabsTrigger value="musicos">Músicos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escalas" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Escalas de Músicos</CardTitle>
                    <CardDescription>Organização das equipes para cada culto</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      <Calendar size={16} className="mr-2" /> Calendário
                    </Button>
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      <Filter size={16} className="mr-2" /> Filtrar
                    </Button>
                    <Dialog open={scaleDialogOpen} onOpenChange={setScaleDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <PlusCircle size={16} className="mr-2" /> Nova Escala
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Culto de Domingo - Manhã</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            21/04/2025 • 10:00 - 12:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full hidden md:inline-flex">
                          6 músicos
                        </span>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Share size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <span>Detalhes</span>
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          João (Bateria)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          Maria (Vocal)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Pedro (Violão)
                        </span>
                        <span className="text-xs text-church-primary cursor-pointer hover:underline">
                          +3 músicos
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Culto de Domingo - Noite</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            21/04/2025 • 19:00 - 21:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full hidden md:inline-flex">
                          5 músicos
                        </span>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Share size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <span>Detalhes</span>
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Carlos (Bateria)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          Ana (Vocal)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Lucas (Guitarra)
                        </span>
                        <span className="text-xs text-church-primary cursor-pointer hover:underline">
                          +2 músicos
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Culto de Quarta-feira</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            24/04/2025 • 19:30 - 21:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full hidden md:inline-flex">
                          4 músicos
                        </span>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Share size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <span>Detalhes</span>
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          Julia (Vocal)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Ricardo (Violão)
                        </span>
                        <span className="text-xs text-church-primary cursor-pointer hover:underline">
                          +2 músicos
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h3 className="font-medium">Ensaio Geral da Equipe</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            20/04/2025 • 15:00 - 17:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full hidden md:inline-flex">
                          8 músicos
                        </span>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Share size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <span>Detalhes</span>
                            <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 md:pl-12">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          João (Bateria)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          Maria (Vocal)
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Pedro (Violão)
                        </span>
                        <span className="text-xs text-church-primary cursor-pointer hover:underline">
                          +5 músicos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="repertorios" className="mt-4">
            <Card>
              {editingSong || isAddingSong ? (
                <SongEditor 
                  songId={editingSong || undefined} 
                  onBack={handleBackToSongList} 
                />
              ) : (
                <>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Repertórios</CardTitle>
                        <CardDescription>Gerenciamento das músicas para cada culto</CardDescription>
                      </div>
                      <div className="flex w-full md:w-auto space-x-2">
                        <Button variant="outline" size="sm" onClick={handleAddNewSong}>
                          <FileMusic size={16} className="mr-2" /> Nova Música
                        </Button>
                        <Dialog open={repertoireDialogOpen} onOpenChange={setRepertoireDialogOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <ListMusic size={16} className="mr-2" /> Novo Repertório
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Criar Novo Repertório</DialogTitle>
                              <DialogDescription>
                                Defina as músicas para o novo repertório.
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleNewRepertoire}>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="rep-name" className="text-right">
                                    Nome
                                  </Label>
                                  <Input id="rep-name" className="col-span-3" placeholder="Ex: Culto de Domingo - Manhã (21/04)" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="rep-date" className="text-right">
                                    Data
                                  </Label>
                                  <Input id="rep-date" type="date" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="rep-songs" className="text-right">
                                    Músicas
                                  </Label>
                                  <div className="col-span-3 space-y-2">
                                    <div className="flex items-center justify-between border p-2 rounded-md">
                                      <span>Grande é o Senhor (Adhemar de Campos)</span>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Trash2 size={16} />
                                      </Button>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                      <Plus size={16} className="mr-2" /> Adicionar Música
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="rep-notes" className="text-right">
                                    Observações
                                  </Label>
                                  <Input id="rep-notes" className="col-span-3" placeholder="Notas adicionais para a equipe" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Criar Repertório</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <SongList 
                        songs={sampleSongs}
                        onEdit={handleEditSong}
                        onDelete={handleDeleteSong}
                        onView={handleViewSong}
                        onNew={handleAddNewSong}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Repertórios Criados</h3>
                      <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center">
                            <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                              <Music size={18} />
                            </div>
                            <div>
                              <h3 className="font-medium">Culto de Domingo - Manhã (21/04)</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                8 músicas • Atualizado em 14/04/2025
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center mt-3 md:mt-0">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Share size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center">
                                <span>Ver Repertório</span>
                                <ChevronRight size={16} className="ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 md:pl-12">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center">
                              <FileMusic size={16} className="mr-2 text-church-primary" />
                              <span className="text-sm">Grande é o Senhor (Adhemar de Campos)</span>
                            </div>
                            <div className="flex items-center">
                              <FileMusic size={16} className="mr-2 text-church-primary" />
                              <span className="text-sm">Oceanos (Hillsong)</span>
                            </div>
                            <div className="flex items-center">
                              <FileMusic size={16} className="mr-2 text-church-primary" />
                              <span className="text-sm">Tua Graça Me Basta (Davi Sacer)</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-church-primary cursor-pointer hover:underline">
                                +5 músicas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center">
                            <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                              <Music size={18} />
                            </div>
                            <div>
                              <h3 className="font-medium">Culto de Domingo - Noite (21/04)</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                7 músicas • Atualizado em 14/04/2025
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center mt-3 md:mt-0">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Share size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center">
                                <span>Detalhes</span>
                                <ChevronRight size={16} className="ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 md:pl-12">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center">
                              <FileMusic size={16} className="mr-2 text-church-primary" />
                              <span className="text-sm">Deus é Deus (Delino Marçal)</span>
                            </div>
                            <div className="flex items-center">
                              <FileMusic size={16} className="mr-2 text-church-primary" />
                              <span className="text-sm">Santo Espírito (Laura Souguellis)</span>
                            </div>
                            <div className="flex items-center">
                              <FileMusic size={16} className="mr-2 text-church-primary" />
                              <span className="text-sm">Lugar Secreto (Gabriela Rocha)</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-church-primary cursor-pointer hover:underline">
                                +4 músicas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center">
                            <div className="bg-church-light p-3 rounded-lg text-church-primary mr-3">
                              <Music size={18} />
                            </div>
                            <div>
                              <h3 className="font-medium">Culto de Quarta-feira (24/04)</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                5 músicas • Atualizado em 13/04/2025
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center mt-3 md:mt-0">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Share size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center">
                                <span>Detalhes</span>
                                <ChevronRight size={16} className="ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 md:pl-12">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center">
                              <FileMusic size={16} className="mr-2 text-church-primary" />
                              <span className="text-sm">Alfa e Ômega (Marine Friesen)</span>
                            </div>
                            <div className="flex items-center">
                              <FileMusic size={16} className="mr-2 text-church-primary" />
                              <span className="text-sm">Só Tu És Santo (Aline Barros)</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-church-primary cursor-pointer hover:underline">
                                +3 músicas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="musicos" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Equipe de Música</CardTitle>
                    <CardDescription>Gerenciamento dos integrantes da equipe de louvor</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      <Filter size={16} className="mr-2" /> Filtrar
                    </Button>
                    <Dialog open={musicianDialogOpen} onOpenChange={setMusicianDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <UserPlus size={16} className="mr-2" /> Novo Músico
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <Mic size={24} className="text-gray-600" />
                      </div>
                      <h3 className="font-medium text-lg">Maria Silva</h3>
                      <p className="text-sm text-gray-500">Vocal</p>
                      <div className="mt-2 flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <Music size={24} className="text-gray-600" />
                      </div>
                      <h3 className="font-medium text-lg">João Santos</h3>
                      <p className="text-sm text-gray-500">Bateria</p>
                      <div className="mt-2 flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <Music size={24} className="text-gray-600" />
                      </div>
                      <h3 className="font-medium text-lg">Pedro Oliveira</h3>
                      <p className="text-sm text-gray-500">Violão</p>
                      <div className="mt-2 flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <Music size={24} className="text-gray-600" />
                      </div>
                      <h3 className="font-medium text-lg">Ana Costa</h3>
                      <p className="text-sm text-gray-500">Vocal</p>
                      <div className="mt-2 flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <Music size={24} className="text-gray-600" />
                      </div>
                      <h3 className="font-medium text-lg">Lucas Ferreira</h3>
                      <p className="text-sm text-gray-500">Guitarra</p>
                      <div className="mt-2 flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Musica;
