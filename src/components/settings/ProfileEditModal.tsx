
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ProfileEditModalProps {
  open: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
  };
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  open,
  onClose,
  user = { name: "", email: "" },
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  React.useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPassword("");
  }, [user, open]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações de perfil foram salvas com sucesso.",
      variant: "default",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Altere suas informações de perfil abaixo e salve as mudanças.
          </DialogDescription>
        </DialogHeader>
        <form className="gap-4 flex flex-col w-full" onSubmit={handleSave}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-name">Nome</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome"
              required
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-email">E-mail</Label>
            <Input
              id="profile-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-password">Nova senha</Label>
            <Input
              id="profile-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="******"
              type="password"
            />
          </div>
          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
