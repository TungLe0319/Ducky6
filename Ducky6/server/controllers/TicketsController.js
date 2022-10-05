import { Auth0Provider } from '@bcwdev/auth0provider';
import { ticketsService } from "../services/TicketsService.js";
import BaseController from '../utils/BaseController.js';

export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets');
    this.router
      
     
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
     
      .delete('/:Id', this.remove);
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

  async remove(req, res, next) {
    try {
      const ticket = await ticketsService.removeTicket(req.params.ticketId,req.userInfo.id)
      // await Service.remove(req.params.Id, req.userInfo)
      res.send('Successfully Removed',ticket)
    } catch (error) {
      next(error);
    }
  }
}
