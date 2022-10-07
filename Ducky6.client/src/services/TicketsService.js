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

    AppState.activeEvent.capacity--
  }

  async removeTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`);
  
    AppState.tickets = AppState.tickets.filter((t) => t.id != ticketId);
    AppState.activeEvent.capacity++

  }


}
export const ticketsService = new TicketsService();
