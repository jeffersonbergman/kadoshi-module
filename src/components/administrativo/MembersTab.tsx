
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AccessEditModal } from './AccessEditModal';
import { MembersTable } from './MembersTable';

const initialMembers = [
  // DEMO ADM
  {
    id: 1,
    name: "Pr. Lucas Almeida",
    email: "lucas.almeida@igreja.com",
    phone: "(11) 98888-0001",
    status: "Ativo",
    registered: "01/01/2024",
    access: "adm",
  },
  // DEMO FINANCEIRO
  {
    id: 2,
    name: "Sandra Martins",
    email: "sandra.financeiro@igreja.com",
    phone: "(11) 97777-0002",
    status: "Ativo",
    registered: "10/02/2024",
    access: "financeiro",
  },
  // DEMO LOUVOR
  {
    id: 3,
    name: "Felipe Louvor",
    email: "felipe.louvor@igreja.com",
    phone: "(11) 96666-0003",
    status: "Ativo",
    registered: "05/03/2024",
    access: "louvor",
  },
  // DEMO NENHUM
  {
    id: 4,
    name: "Mariana Souza",
    email: "mariana.souza@igreja.com",
    phone: "(11) 95555-0004",
    status: "Ativo",
    registered: "15/04/2024",
    access: "none",
  },
  // ... membros de exemplo originais ...
  {
    id: 5,
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    status: "Ativo",
    registered: "15/01/2023",
    access: "adm",
  },
  {
    id: 6,
    name: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    phone: "(11) 97654-3210",
    status: "Ativo",
    registered: "03/03/2023",
    access: "financeiro",
  },
  {
    id: 7,
    name: "Pedro Santos",
    email: "pedro.santos@email.com",
    phone: "(11) 95432-1098",
    status: "Visitante",
    registered: "10/04/2025",
    access: "louvor",
  },
  {
    id: 8,
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(11) 92345-6789",
    status: "Inativo",
    registered: "05/07/2022",
    access: "none",
  },
  {
    id: 9,
    name: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    phone: "(11) 91234-5678",
    status: "Ativo",
    registered: "20/09/2023",
    access: "louvor",
  }
];

const MembersTab = () => {
  const navigate = useNavigate();
  const [members, setMembers] = React.useState(initialMembers);
  const [accessModal, setAccessModal] = React.useState<{ open: boolean, memberId?: number }>({ open: false });
  const [search, setSearch] = React.useState('');

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleAccessEditSave(id: number, newAccess: string) {
    setMembers(members =>
      members.map(m => m.id === id ? { ...m, access: newAccess } : m)
    );
  }

  function handleAccessEdit(memberId: number) {
    setAccessModal({ open: true, memberId });
  }

  function handleDetails(memberId: number) {
    navigate(`/administrativo/membros/${memberId}`);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Membros da Igreja</CardTitle>
            <CardDescription>Cadastre, gerencie todos os membros e conceda acessos</CardDescription>
          </div>
          <div className="flex w-full md:w-auto space-x-2">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar membro..."
                className="pl-8"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <UserCheck size={18} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <MembersTable
          members={filtered}
          onAccessEdit={handleAccessEdit}
          onDetails={handleDetails}
        />
        <div className="flex flex-col sm:flex-row justify-center mt-4 gap-2">
          <Button variant="outline" size="sm">Carregar Mais</Button>
        </div>
      </CardContent>
      {accessModal.open && typeof accessModal.memberId === "number" && (
        <AccessEditModal
          open={accessModal.open}
          memberName={members.find(m => m.id === accessModal.memberId)?.name || ""}
          currentAccess={members.find(m => m.id === accessModal.memberId)?.access || "none"}
          onSave={value => handleAccessEditSave(accessModal.memberId!, value)}
          onClose={() => setAccessModal({ open: false })}
        />
      )}
      <div className="mt-8 text-xs text-muted-foreground">
        <strong>Acessos:</strong>{" "}
        <span className="font-medium text-blue-800">Adm</span> (total),{" "}
        <span className="font-medium text-yellow-800">Financeiro</span> (financeiro),{" "}
        <span className="font-medium text-purple-800">Louvor</span> (aba de música e membros do louvor).
        Todos membros de um ministério acessam atas e membros, e editam sua conta.
      </div>
    </Card>
  );
};

export default MembersTab;
