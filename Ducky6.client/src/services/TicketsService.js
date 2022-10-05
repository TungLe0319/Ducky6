import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { api } from './AxiosService.js';

class TicketsService {
  async createTicket() {
    try {
      const res = api.post('/api/tickets');
      console.log(res.data);
    } catch (error) {
      logger('createTicket', err);
    }
  }
}
export const ticketsService = new TicketsService();
