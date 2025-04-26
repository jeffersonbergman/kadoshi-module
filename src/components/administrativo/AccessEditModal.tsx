
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AccessEditModalProps {
  open: boolean;
  memberName: string;
  currentAccess: string;
  onSave: (value: string) => void;
  onClose: () => void;
}

const accessOptions = [
  { value: "none", label: "Nenhum", description: "Apenas visualizar dados básicos e configurar conta própria." },
  { value: "adm", label: "Adm (Acesso Total)", description: "Gerenciar tudo no sistema (administração completa)." },
  { value: "financeiro", label: "Financeiro", description: "Acesso total financeiro e gerencia financeira de membros." },
  { value: "louvor", label: "Ministro de Louvor", description: "Gerenciar músicas e membros do ministério de louvor." },
];

export const AccessEditModal: React.FC<AccessEditModalProps> = ({
  open, memberName, currentAccess, onSave, onClose,
}) => {
  const [selected, setSelected] = React.useState(currentAccess);

  React.useEffect(() => {
    setSelected(currentAccess);
  }, [currentAccess, open]);

  function handleSave() {
    onSave(selected);
    toast.success("Perfil de acesso atualizado!");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Definir acesso para {memberName}</DialogTitle>
        </DialogHeader>
        <div className="mb-3">
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o acesso" />
            </SelectTrigger>
            <SelectContent>
              {accessOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div>
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-xs text-muted-foreground">{opt.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={onClose} type="button" variant="outline">Cancelar</Button>
          <Button onClick={handleSave} type="button">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
