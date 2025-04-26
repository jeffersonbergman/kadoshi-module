
import React from "react";
import { MemberRow } from "./MemberRow";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  registered: string;
  access: string;
}

type Props = {
  members: Member[];
  onAccessEdit: (id: number) => void;
  onDetails: (id: number) => void;
};

export const MembersTable: React.FC<Props> = ({
  members,
  onAccessEdit,
  onDetails,
}) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <div className="w-full min-w-[650px] md:min-w-0">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nome</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Contato</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Acesso</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Data Cadastro</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <MemberRow
                key={member.id}
                member={member}
                onClickAccess={() => onAccessEdit(member.id)}
                onDetails={() => onDetails(member.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
