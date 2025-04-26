
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  PlusCircle
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddEvent: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onAddEvent
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Calendário</h1>
        <div className="flex items-center text-gray-500">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>
            {format(currentDate, "MMMM yyyy", { locale: ptBR })}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onAddEvent}>
          <PlusCircle size={18} className="mr-2" /> Adicionar Evento
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
