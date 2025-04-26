
import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Event } from '@/types/calendar';
import EventItem from './EventItem';

interface EventsListProps {
  events: Event[];
  selectedDate?: Date;
  showDate?: boolean;
}

const EventsList: React.FC<EventsListProps> = ({ 
  events, 
  selectedDate,
  showDate = false 
}) => {
  const { t } = useTranslation();
  
  // If it's empty, show a placeholder
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <CalendarIcon className="h-12 w-12 text-gray-300 mb-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {t('administrative.noEventsTitle')}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {selectedDate ? t('administrative.noEventsForDate') : t('administrative.selectDateToSeeEvents')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id}>
          {showDate && (
            <p className="text-sm text-gray-500 mb-1">
              {format(event.date, 'dd/MM/yyyy')}
            </p>
          )}
          <EventItem event={event} />
        </div>
      ))}
    </div>
  );
};

export default EventsList;
