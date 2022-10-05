import { Auth0Provider } from '@bcwdev/auth0provider';
import { ticketsService } from "../services/TicketsService.js";
import BaseController from '../utils/BaseController.js';

export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets');
    this.router
      
     
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
     
      .delete('/:id', this.deleteTicket);
      /*  the '/:Id' are magicVariable words that must Match the req.params.Id in the below edit and remove and get by Id async functions.*/
  }
 

  async createTicket(req, res, next) {
    try {
      const ticket = await ticketsService.createTicket(req.body.eventId,req.userInfo.id)
      res.send(ticket)
      
    } catch (error) {
      next(error);
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketsService.deleteTicket(req.params.ticketId,req.userInfo.id)
     
      res.send('Successfully Removed',ticket)
    } catch (error) {
      next(error);
    }
  }
}
