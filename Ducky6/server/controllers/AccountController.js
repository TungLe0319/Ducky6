import { Auth0Provider } from '@bcwdev/auth0provider';
import { accountService } from '../services/AccountService';
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from '../services/TicketsService.js';
import BaseController from '../utils/BaseController';

export class AccountController extends BaseController {
  constructor() {
    super('account');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
      .get('/events', this.getMyEvents)
      .delete('/tickets/:ticketId', this.deleteMyTicketOnAccount);
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo);
      res.send(account);
    } catch (error) {
      next(error);
    }
  }

  async getMyTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketByAccountId(
        req.userInfo.id
      );
      res.send(tickets);
    } catch (error) {
      next(error);
    }
  }

  async getMyEvents(req,res,next){
    try {
      // req.body.accountId = req.userInfo.id
      const events = await eventsService.getEventsByAccountId(req.body)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }
  //frontend When they fire off to Delete ticket I want this one to fire off to dleete it from route /account/tickets
  async deleteMyTicketOnAccount(req, res, next) {
    try {
      const ticket = await ticketsService.deleteTicket(req.params.ticketId,req.userInfo.id);
      res.send('tung-successfully deleted your account Ticket');
    } catch (error) {
      next(error);
    }
  }
}
