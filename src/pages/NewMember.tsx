
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const NewMember = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to an API
    toast.success("Membro cadastrado com sucesso!");
    navigate('/administrativo');
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 mr-4">
              <ArrowLeft size={16} />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Novo Membro</h1>
              <p className="text-gray-500">Cadastrar um novo membro na igreja</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Preencha os dados do novo membro</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input id="name" placeholder="Ex: João Silva" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="Ex: joao.silva@email.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input id="phone" placeholder="Ex: (11) 98765-4321" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Data de Nascimento</Label>
                  <Input id="birthdate" placeholder="Ex: 15/05/1985" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Ex: Rua das Flores, 123 - São Paulo, SP" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="member-since">Membro desde</Label>
                  <Input id="member-since" placeholder="Ex: 15/01/2023" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="visitor">Visitante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Função</Label>
                  <Select defaultValue="member">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Membro</SelectItem>
                      <SelectItem value="leader">Líder</SelectItem>
                      <SelectItem value="pastor">Pastor</SelectItem>
                      <SelectItem value="deacon">Diácono</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Select defaultValue="none">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worship">Louvor</SelectItem>
                      <SelectItem value="kids">Infantil</SelectItem>
                      <SelectItem value="youth">Jovens</SelectItem>
                      <SelectItem value="missions">Missões</SelectItem>
                      <SelectItem value="education">Educação</SelectItem>
                      <SelectItem value="none">Nenhum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Informações adicionais sobre o membro..." 
                    className="min-h-[100px]" 
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="photo">Foto</Label>
                  <Input id="photo" type="file" />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancelar
                </Button>
                <Button type="submit">Cadastrar Membro</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NewMember;
