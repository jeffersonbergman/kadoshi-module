
import React, { useState } from 'react';
import { Event } from '@/types/calendar';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import AddEventDialog from '@/components/calendar/AddEventDialog';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, Info } from 'lucide-react';
import PastorAgenda from '@/components/calendar/PastorAgenda';

// Evento de exemplo para Agenda do Pastor
const initialPastorMeetings = [
  {
    id: 'p1',
    date: new Date(2025, 3, 23, 15, 0),
    duration: 1,
    member: 'Maria Oliveira',
    description: 'Aconselhamento Pastoral'
  }
];

const AdminCalendar: React.FC = () => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [tab, setTab] = useState("calendar");

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Culto de Domingo',
      date: new Date(2025, 3, 20),
      time: '10:00',
      description: 'Culto dominical com Santa Ceia',
      type: 'service'
    },
    {
      id: '2',
      title: 'Reunião de Liderança',
      date: new Date(2025, 3, 15),
      time: '19:30',
      description: 'Planejamento trimestral',
      type: 'meeting'
    },
    {
      id: '3',
      title: 'Evento Especial de Páscoa',
      date: new Date(2025, 3, 12),
      time: '18:00',
      description: 'Celebração especial de Páscoa',
      type: 'special'
    }
  ]);

  // Estado para agenda do Pastor
  const [pastorMeetings, setPastorMeetings] = useState(initialPastorMeetings);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleAddEvent = (event: Event) => {
    setEvents([...events, event]);
    toast({
      title: "Evento adicionado",
      description: `O evento "${event.title}" foi adicionado com sucesso.`
    });
  };

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    setIsAddEventDialogOpen(true);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  // Função para adicionar novo agendamento com o Pastor
  const handlePastorBook = (meeting: any) => {
    setPastorMeetings((prev) => [...prev, { ...meeting, id: Math.random().toString(36).substring(2, 9) }]);
    toast({
      title: "Reunião agendada",
      description: `Seu momento com o Pastor foi agendado para ${format(meeting.date, 'dd/MM/yyyy HH:mm')}.`
    });
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="gap-2 mb-4 overflow-x-auto w-full justify-start">
            <TabsTrigger value="calendar">Calendário da Igreja</TabsTrigger>
            <TabsTrigger value="pastor">Agenda do Pastor</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <CalendarHeader 
              currentDate={currentMonth} 
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
              onAddEvent={() => setIsAddEventDialogOpen(true)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
              {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'].map((day, index) => (
                <div key={index} className="hidden md:block text-center font-medium text-sm py-2">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isCurrentDay = isToday(day);
                
                return (
                  <Card 
                    key={index} 
                    className={`min-h-[120px] cursor-pointer transition-colors ${
                      !isCurrentMonth ? 'opacity-40' : ''
                    } ${
                      isCurrentDay ? 'border-church-primary' : ''
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    <CardContent className="p-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${
                          isCurrentDay ? 'bg-church-primary text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                        }`}>
                          {format(day, 'd')}
                        </span>
                        <span className="text-xs text-gray-500 md:hidden">
                          {format(day, 'E', { locale: ptBR })}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div 
                            key={event.id} 
                            className={`text-xs p-1 rounded truncate ${
                              event.type === 'service' ? 'bg-blue-100 text-blue-800' :
                              event.type === 'meeting' ? 'bg-amber-100 text-amber-800' :
                              event.type === 'special' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{event.time}</span>
                            </div>
                            <div className="truncate">{event.title}</div>
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{dayEvents.length - 3} mais
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
        
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Card className="flex-1">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-church-primary" />
                    Próximos Eventos
                  </h3>
                  <div className="space-y-3">
                    {events
                      .filter(event => new Date(event.date) >= new Date())
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .slice(0, 5)
                      .map(event => (
                        <div key={event.id} className="flex items-start border-b pb-3">
                          <div className={`p-2 rounded-md mr-3 ${
                            event.type === 'service' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'meeting' ? 'bg-amber-100 text-amber-800' :
                            event.type === 'special' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {format(new Date(event.date), 'dd/MM/yyyy')}
                              <Clock className="h-3 w-3 ml-2 mr-1" />
                              {event.time}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                  {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      Nenhum evento programado
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="w-full md:w-80">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Legenda</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded bg-blue-100 mr-2"></div>
                      <span className="text-sm">Cultos</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded bg-amber-100 mr-2"></div>
                      <span className="text-sm">Reuniões</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded bg-purple-100 mr-2"></div>
                      <span className="text-sm">Eventos Especiais</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded bg-gray-100 mr-2"></div>
                      <span className="text-sm">Outros</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <AddEventDialog 
              isOpen={isAddEventDialogOpen} 
              onClose={() => setIsAddEventDialogOpen(false)}
              onAddEvent={handleAddEvent}
              selectedDate={selectedDate}
            />
          </TabsContent>

          <TabsContent value="pastor">
            <PastorAgenda meetings={pastorMeetings} onBook={handlePastorBook} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminCalendar;
