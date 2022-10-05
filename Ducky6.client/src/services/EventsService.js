import { AppState } from '../AppState.js';
import { Comment } from "../models/Comment.js";
import { Event } from '../models/Event.js';
import { api } from './AxiosService.js';

class EventsService {
  async getEvents() {
    const res = await api.get('api/events');
    // console.log(res.data);
    // AppState.events = res.data.map(e => new Event(e))
    AppState.events = res.data.map((e) => new Event(e));
  }

  async getEventById(id) {
    const res = await api.get(`api/events/${id}`);
    // console.log(res.data);
    AppState.activeEvent = res.data
  }

  async createEvent() {}

  async getCommentsByEventId(eventId) {
    // const res = await api.get(`api/events/${eventId}/comments`);
    // console.log(res.data);
   
  }

  async getTicketsByEventId(eventId){
    
  }

  async createTicket() {
    //Todo
    //capacity decreases
    //can't buy another ticket
    //shows that you have one like a like
  }
}

export const eventsService = new EventsService();
