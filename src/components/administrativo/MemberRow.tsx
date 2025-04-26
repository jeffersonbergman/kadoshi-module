
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, ShieldCheck } from "lucide-react";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  registered: string;
  access: string;
}

const accessLabels: Record<string, string> = {
  adm: "Adm",
  financeiro: "Financeiro",
  louvor: "Louvor",
  none: "Nenhum",
};

const accessColors: Record<string, string> = {
  adm: "bg-blue-100 text-blue-800",
  financeiro: "bg-yellow-100 text-yellow-800",
  louvor: "bg-purple-100 text-purple-800",
  none: "bg-gray-100 text-gray-800",
};

type MemberRowProps = {
  member: Member;
  onClickAccess: () => void;
  onDetails: () => void;
};

export const MemberRow: React.FC<MemberRowProps> = ({ member, onClickAccess, onDetails }) => {
  return (
    <tr className="border-b hover:bg-muted/60">
      <td className="p-4 align-middle font-medium">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <span>{member.name}</span>
        </div>
      </td>
      <td className="p-4 align-middle">
        <div className="flex flex-col">
          <span className="text-xs flex items-center">
            <Mail size={12} className="mr-1" /> {member.email}
          </span>
          <span className="text-xs flex items-center mt-1">
            <Phone size={12} className="mr-1" /> {member.phone}
          </span>
        </div>
      </td>
      <td className="p-4 align-middle">
        <span className={
          member.status === "Ativo"
            ? "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
            : member.status === "Inativo"
            ? "inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
            : "inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
        }>
          {member.status}
        </span>
      </td>
      <td className="p-4 align-middle">
        <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${accessColors[member.access]}`}>
          <ShieldCheck size={12} className="mr-1" />
          {accessLabels[member.access]}
        </div>
        <Button
          variant="link"
          size="sm"
          className="pl-0 ml-0 mt-1"
          onClick={onClickAccess}
        >
          Editar acesso
        </Button>
      </td>
      <td className="p-4 align-middle text-muted-foreground">{member.registered}</td>
      <td className="p-4 align-middle flex flex-col md:flex-row gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDetails}
        >
          Detalhes
        </Button>
      </td>
    </tr>
  );
};
