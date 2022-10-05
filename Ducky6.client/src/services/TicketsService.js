import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { api } from './AxiosService.js';

class TicketsService {
  async createTicket(eventData) {
    const res = await api.post('/api/tickets', eventData);
    const ticketHolder = res.data;
    AppState.tickets.push(ticketHolder);
 
  }

async removeTicket(ticketHolderId){
  await api.delete(`api/tickets/${ticketHolderId}`)
AppState.tickets = AppState.tickets.filter(t => t.id != ticketHolderId)
}

}
export const ticketsService = new TicketsService();
