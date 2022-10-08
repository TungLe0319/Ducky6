import { useRouter } from 'vue-router';
import { AppState } from '../AppState.js';

import { Comment } from '../models/Comment.js';
import { Event } from '../models/Event.js';
import { Ticket } from '../models/Ticket.js';
import { router } from '../router.js';

import { api } from './AxiosService.js';
import { ticketsService } from './TicketsService.js';

class EventsService {
  async getEvents(type = '') {
    let res;
    if (type) {
      res = await api.get('api/events', {
        params: {
          type: type,
        },
      });
    } else {
      res = await api.get('api/events');
    }
    AppState.events = res.data.map((e) => new Event(e));
  }

  async getEventsForAccount() {
    const res = await api.get('api/events');

    AppState.myEvents = res.data.map((e) => new Event(e));
    // console.log(AppState.myEvents);
    // AppState.myEvents = AppState.myEvents.filter(
    //   (e) => e.creator.id == AppState.account.id
    // );
    // console.log(AppState.myEvents);
  }
  async getEventById(id) {
    const res = await api.get(`api/events/${id}`);
    // console.log(res.data);
    AppState.activeEvent = res.data;
  }

  async createEvent(formData) {
    const res = await api.post('api/events', formData);
    // console.log(res.data);
    //TODO fire off CreateTicket from here.
    const event = new Event(res.data);
    // let eventId=res.data.id

    // res = await api.post('/api/tickets',{eventId})
    // const ticketHolder = res.data
    // AppState.tickets.push(ticketHolder)
    // console.log(event);

    AppState.events = [event, ...AppState.events];
    AppState.activeEvent = event;
    router.push({ name: 'EventPage', params: { id: AppState.activeEvent.id } });
  }

  async removeEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`);
    // console.log(res.data);
    AppState.events = AppState.events.filter((e) => e.id != eventId);
    AppState.activeEvent.isCanceled = true;
  }

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`);
    // console.log(res.data);
    AppState.comments = res.data.map((c) => new Comment(c));
  }

  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`);
    // console.log(res.data);

    AppState.tickets = res.data.map((t) => new Ticket(t));
    // console.log(AppState.tickets);
  }

  async createTicket() {}
}

export const eventsService = new EventsService();
