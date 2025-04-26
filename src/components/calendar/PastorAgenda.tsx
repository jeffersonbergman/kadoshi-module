
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import PastorBookingModal from "./PastorBookingModal";
import { format } from "date-fns";

interface PastorAgendaProps {
  meetings: {
    id: string;
    date: Date;
    duration: number;
    member: string;
    description: string;
  }[];
  onBook: (meeting: {date: Date; duration: number; member: string; description: string;}) => void;
}
const PastorAgenda: React.FC<PastorAgendaProps> = ({ meetings, onBook }) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-6">
        <h2 className="text-2xl font-semibold">Agenda do Pastor</h2>
        <Button variant="default" onClick={() => setBookingOpen(true)}>
          Agendar com o Pastor
        </Button>
      </div>

      <Card className="mb-5">
        <CardContent>
          <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-church-primary" />
            Próximas reuniões agendadas
          </h3>
          <div className="flex flex-col gap-3">
            {meetings.length === 0 && (
              <div className="py-6 text-gray-500 text-center text-sm">Nenhuma reunião agendada</div>
            )}
            {meetings
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((m) => (
                <div key={m.id} className="rounded border p-3 flex flex-col md:flex-row md:items-center gap-2 bg-gray-50">
                  <div className="flex-1">
                    <div className="flex gap-1 items-center text-sm">
                      <Calendar className="h-4 w-4" />
                      {format(m.date, "dd/MM/yyyy")} 
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                      <Clock className="h-4 w-4" />
                      {format(m.date, "HH:mm")} &rarr; {format(new Date(m.date.getTime() + (m.duration * 60 * 60 * 1000)), "HH:mm")}
                      <span className="ml-2">{m.duration}h</span>
                    </div>
                  </div>
                  <div className="md:w-44 flex-1">
                    <div className="text-[15px] font-medium">{m.member}</div>
                    <div className="text-xs text-muted-foreground">{m.description}</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      <PastorBookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} onBook={onBook} />
    </div>
  );
};

export default PastorAgenda;
