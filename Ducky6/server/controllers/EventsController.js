import { Auth0Provider } from '@bcwdev/auth0provider';
import { commentsService } from '../services/CommentsService.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import BaseController from '../utils/BaseController.js';

export class EventsController extends BaseController {
  constructor() {
    super('/api/events');
    this.router
      .get('', this.getEvents)
      .get('/:id', this.getEventById)
      .get('/:id/comments', this.getCommentsByEventId)
      .get('/:id/tickets', this.getTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.removeEvent)
      .put('/:id', this.editEvent)
      .post('', this.createEvent);
  }
  async getEvents(req, res, next) {
    try {
      const events = await eventsService.getUncancelledEvents(req.query);
      res.send(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.id);
      res.send(event);
    } catch (error) {
      next(error);
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const event = await eventsService.createEvent(req.body);
      res.send(event);
    } catch (error) {
      next(error);
    }
  }

  async removeEvent(req, res, next) {
    try {
      await eventsService.cancelEvent(req.params.id, req.userInfo);
      // await Service.remove(req.params.Id, req.userInfo)
      res.send('Successfully Removed');
    } catch (error) {
      next(error);
    }
  }


  async getEventThatIsNotCancelledById(req,res,next){
try {
  
} catch (error) {
  next(error)
}
  }
  async getTicketsByEventId(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketByEventId(req.params.id);
      res.send(tickets);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {
      //NOTE COMMENTS SERVICE
      const comments = await commentsService.getCommentsByEventId(
        req.params.id
      );
      res.send(comments);
    } catch (error) {
      next(error);
    }
  }

  async editEvent(req, res, next) {
    try {
      const comment = await eventsService.editEvent(
        req.body,
        req.params.id,
        req.userInfo
      );
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }
}
