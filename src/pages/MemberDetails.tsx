
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, Home, FileText, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch member data from an API
  const member = {
    id: id,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    birthdate: '15/05/1985',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    memberSince: '15/01/2023',
    status: 'Ativo',
    role: 'Membro',
    department: 'Louvor',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    notes: 'Participa ativamente dos cultos e é membro do ministério de louvor.',
    attendance: [
      { date: '07/04/2025', event: 'Culto de Domingo' },
      { date: '31/03/2025', event: 'Culto de Domingo' },
      { date: '24/03/2025', event: 'Culto de Domingo' },
      { date: '17/03/2025', event: 'Culto de Domingo' },
    ],
    contributions: [
      { date: '05/04/2025', amount: 'R$ 100,00', type: 'Dízimo' },
      { date: '05/03/2025', amount: 'R$ 100,00', type: 'Dízimo' },
      { date: '05/02/2025', amount: 'R$ 100,00', type: 'Dízimo' },
    ]
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <Button variant="outline" className="gap-2">
            <Edit size={16} />
            Editar Membro
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-church-light">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-center mb-1">{member.name}</h2>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  member.status === 'Ativo' ? 'bg-green-100 text-green-800' : 
                  member.status === 'Inativo' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {member.status}
                </span>
                <p className="text-sm text-gray-500 mt-2">{member.role} • {member.department}</p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="text-sm">{member.birthdate}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Home size={18} className="text-gray-500 mt-0.5" />
                  <span className="text-sm">{member.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-gray-500" />
                  <span className="text-sm">Membro desde {member.memberSince}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="attendance">Frequência</TabsTrigger>
                <TabsTrigger value="contributions">Contribuições</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-2">Notas:</h3>
                    <p className="text-gray-600 mb-4">{member.notes}</p>

                    <h3 className="font-medium mt-4 mb-2">Ministérios:</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-church-light text-church-primary px-2.5 py-1 rounded-full text-xs font-medium">
                        Louvor
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="attendance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequência</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Evento</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {member.attendance.map((item, index) => (
                            <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle">{item.date}</td>
                              <td className="p-4 align-middle">{item.event}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contributions" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contribuições</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Valor</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {member.contributions.map((item, index) => (
                            <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle">{item.date}</td>
                              <td className="p-4 align-middle">{item.amount}</td>
                              <td className="p-4 align-middle">{item.type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MemberDetails;
