
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: any) => void;
  editingCategory: any | null;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  editingCategory
}) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [type, setType] = useState('entrada');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setType(editingCategory.type);
      setDescription(editingCategory.description);
    } else {
      setName('');
      setType('entrada');
      setDescription('');
    }
  }, [editingCategory]);

  const handleSubmit = () => {
    if (!name) {
      toast({
        title: "Campo obrigatório",
        description: "O nome da categoria é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    const category = {
      id: editingCategory ? editingCategory.id : Math.random().toString(36).substr(2, 9),
      name,
      type,
      description
    };

    onSave(category);
    toast({
      title: editingCategory ? "Categoria atualizada" : "Categoria adicionada",
      description: editingCategory 
        ? "A categoria foi atualizada com sucesso!" 
        : "A categoria foi adicionada com sucesso!"
    });
    
    // Reset form
    setName('');
    setType('entrada');
    setDescription('');
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
          <DialogDescription>
            {editingCategory ? 'Edite os detalhes da categoria.' : 'Adicione os detalhes da nova categoria financeira.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da categoria"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="saida">Saída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da categoria"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>{editingCategory ? 'Atualizar' : 'Salvar'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
