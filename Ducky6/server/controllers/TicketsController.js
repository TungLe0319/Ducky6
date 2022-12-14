import { Auth0Provider } from '@bcwdev/auth0provider';
import { ticketsService } from '../services/TicketsService.js';
import BaseController from '../utils/BaseController.js';

export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets');
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)

      .delete('/:id', this.deleteTicket);
  }

  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id;
      const ticket = await ticketsService.createTicket(req.body);
      res.send(ticket);
    } catch (error) {
      next(error,'TUNG HI FROM SERVER CONTROLLER TICKETS');
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketsService.deleteTicket(
        req.params.id,
        req.userInfo.id
      );

      res.send('Successfully Removed');
    } catch (error) {
      next(error);
    }
  }
}

