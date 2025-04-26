
import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Event } from '@/types/calendar';
import EventsList from './EventsList';

interface EventTabsProps {
  events: Event[];
}

const EventTabs: React.FC<EventTabsProps> = ({ events }) => {
  const { t } = useTranslation();

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Tabs defaultValue="upcoming">
      <TabsList>
        <TabsTrigger value="upcoming">{t('administrative.upcomingEvents')}</TabsTrigger>
        <TabsTrigger value="past">{t('administrative.pastEvents')}</TabsTrigger>
        <TabsTrigger value="recurring">{t('administrative.recurringEvents')}</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('administrative.upcomingEvents')}</CardTitle>
            <CardDescription>{t('administrative.upcomingEventsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <EventsList events={upcomingEvents} showDate={true} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="past" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('administrative.pastEvents')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">{t('administrative.pastEventsPlaceholder')}</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="recurring" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('administrative.recurringEvents')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">{t('administrative.recurringEventsPlaceholder')}</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default EventTabs;
