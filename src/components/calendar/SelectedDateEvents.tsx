
import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Event } from '@/types/calendar';
import EventsList from './EventsList';

interface SelectedDateEventsProps {
  selectedDate?: Date;
  events: Event[];
}

const SelectedDateEvents: React.FC<SelectedDateEventsProps> = ({ selectedDate, events }) => {
  const { t } = useTranslation();
  
  // Filter events for the selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => 
        event.date.getDate() === selectedDate.getDate() && 
        event.date.getMonth() === selectedDate.getMonth() && 
        event.date.getFullYear() === selectedDate.getFullYear())
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedDate ? (
            <span>{format(selectedDate, 'dd/MM/yyyy')}</span>
          ) : (
            t('administrative.selectDate')
          )}
        </CardTitle>
        <CardDescription>
          {selectedDateEvents.length > 0 
            ? t('administrative.eventsCount', { count: selectedDateEvents.length }) 
            : t('administrative.noEvents')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EventsList 
          events={selectedDateEvents} 
          selectedDate={selectedDate} 
        />
      </CardContent>
    </Card>
  );
};

export default SelectedDateEvents;
