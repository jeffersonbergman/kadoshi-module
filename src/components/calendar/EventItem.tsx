
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Event } from '@/types/calendar';

interface EventItemProps {
  event: Event;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const { t } = useTranslation();
  
  return (
    <div className="p-3 border rounded-md hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-base">{event.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{event.time} - {event.description}</p>
        </div>
        <div className={`px-2 py-1 text-xs font-medium rounded-full ${
          event.type === 'service' ? 'bg-blue-100 text-blue-800' :
          event.type === 'meeting' ? 'bg-amber-100 text-amber-800' :
          event.type === 'special' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {t(`administrative.eventType.${event.type}`)}
        </div>
      </div>
    </div>
  );
};

export default EventItem;
