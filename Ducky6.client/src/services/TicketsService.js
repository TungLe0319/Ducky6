import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { api } from './AxiosService.js';

class TicketsService {
  async createTicket(eventData) {
    let accountId = AppState.account.id
    
if (accountId == eventData.creatorId) {
  throw new console.error('YOU Already Have a Ticket');
}

    const res = await api.post('/api/tickets', eventData);
    const ticketHolder = res.data;
    AppState.tickets.push(ticketHolder);
 
  }

async removeTicket(ticketId){
  await api.delete(`api/tickets/${ticketId}`)
AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
}

}
export const ticketsService = new TicketsService();
