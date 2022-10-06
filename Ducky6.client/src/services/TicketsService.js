import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { api } from './AxiosService.js';

class TicketsService {
  async createTicket(eventData) {
    let accountId = AppState.account.id;

    if (accountId == eventData.creatorId) {
      console.error('YOU Already Have a Ticket');
    }

    const res = await api.post('/api/tickets', eventData);
    const ticketHolder = res.data;
    AppState.tickets.push(ticketHolder);
  }

  async removeTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`);
  
    AppState.tickets = AppState.tickets.filter((t) => t.id != ticketId);

  }

  // async deleteTicket(ticketId, userId) {
  //   const ticket = await this.getTicketById(ticketId);
  //   if (!ticket) {
  //     throw new BadRequest('Invalid ticket Id');
  //   }
  //   const event = await eventsService.getEventById(ticket.eventId);

  //   // @ts-ignore
  //   const theLoggedInUserIsOwner = userId == event.creatorId.toString();

  //   // @ts-ignore
  //   const theLoggedInUserHasATicket = ticket.accountId.toString() == userId;

  //   if (!theLoggedInUserIsOwner && !theLoggedInUserHasATicket) {
  //     throw new Forbidden('Forbidden! Not Your Ticket');
  //   }
  //   await ticket.remove();
  //   // @ts-ignore
  //   await event.capacity++;
  //   await event.save();
  //   return ticket;
  // }
}
export const ticketsService = new TicketsService();
