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

  async getMyTickets() {
    try {
      const res = await api.get('/account/tickets');
      console.log(res.data);
      AppState.myTickets = [...AppState.myTickets, new Ticket(res.data)];
    } catch (error) {
      logger.error('Get My EVents?!?', error);
    }
  }
}

export const accountService = new AccountService();
