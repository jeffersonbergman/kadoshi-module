
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface PastorBookingModalProps {
  open: boolean;
  onClose: () => void;
  onBook: (meeting: {date: Date; duration: number; member: string; description: string;}) => void;
}

const PastorBookingModal: React.FC<PastorBookingModalProps> = ({ open, onClose, onBook }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState(1);
  const [member, setMember] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !member.trim()) return;
    // Mesclar dia e hora
    const [h, m] = time.split(':').map(Number);
    const date = new Date(selectedDate);
    date.setHours(h, m, 0, 0);
    onBook({ date, duration, member, description });
    setTimeout(() => {
      setSelectedDate(undefined);
      setTime("10:00");
      setDuration(1);
      setMember("");
      setDescription("");
    }, 150);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agendar com o Pastor</DialogTitle>
          <DialogDescription>
            Escolha a data, horário e duração. O tempo padrão é 1 hora.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Membro</Label>
            <Input 
              value={member} 
              onChange={e => setMember(e.target.value)} 
              placeholder="Seu nome"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Descrição</Label>
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrição da reunião (opcional)"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={"justify-start text-left font-normal"}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Escolher data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  mode="single"
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col flex-1 gap-1.5">
              <Label>Hora</Label>
              <Input 
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                required
                min="07:00" max="22:00"
              />
            </div>
            <div className="flex flex-col flex-1 gap-1.5">
              <Label>Duração (h)</Label>
              <Input 
                type="number"
                min={1}
                max={6}
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={!selectedDate || !member.trim()}>Agendar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PastorBookingModal;
