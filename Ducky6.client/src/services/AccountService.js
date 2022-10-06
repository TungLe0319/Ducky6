import { AppState } from '../AppState';
import { Event } from '../models/Event.js';
import { Ticket } from '../models/Ticket.js';
import { logger } from '../utils/Logger';
import { api } from './AxiosService';

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account');
      AppState.account = res.data;
    } catch (error) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', error);
    }
  }


  // async getMyEvents(){
  //   try {
  //     const res = await api.get('/events')
  //     console.log(res.data);
  //   } catch (error) {
  //     logger.error('Get My Events',error)
  //   }
  // }

  async getMyTickets() {
    try {
      const res = await api.get('/account/tickets');
      // console.log(res.data);
      AppState.myTickets = res.data.map((t) => new Ticket(t));
      // console.log(AppState.myTickets);
      // AppState.myTickets = [...AppState.myTickets, new Ticket(res.data)];
    } catch (error) {
      logger.error('Get My Tickets', error);
    }
  }

  async removeMyTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`);
    AppState.myTickets = AppState.myTickets.filter((t) => t.id != ticketId);
    //   AppState.tickets = AppState.tickets.filter((t) => t.id != ticketId);
    // }
  }
}
export const accountService = new AccountService();
