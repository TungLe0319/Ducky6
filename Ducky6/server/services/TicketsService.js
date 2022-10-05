import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext.js';
import { eventsService } from './EventsService.js';

class TicketsService {
  async removeTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId);
    if (!ticket) {
      throw new BadRequest('Invalid ticket Id');
    }
    const event = await eventsService.getEventById(ticket.eventId);

    // @ts-ignore
    const theLoggedInUserIsOwner = userId == event.creatorId.toString();

    // @ts-ignore
    const theLoggedInUserHasATicket = userId == ticket.accountId.toString();

    if (!theLoggedInUserIsOwner && !theLoggedInUserHasATicket) {
      throw new Forbidden("Can't Take Another Ticket");
    }
    await ticket.remove();
    return ticket;
  }
  async createTicket(eventId, accountId) {
    await eventsService.getUncancelledEvents(eventId);
    const hasTicket = this.getTicketForEvent(eventId, accountId)

    if (hasTicket) {
      return hasTicket
    }

const ticket = await dbContext.Tickets.create({eventId,accountId})
await ticket.populate('account',' name picture')
return ticket
  }


  
  async getTicketForEvent(eventId, accountId) {
    const ticket = await dbContext.Tickets.findOne({ eventId, accountId })
      .populate('account', 'name picture')
      .populate('event', 'name coverImg');
    return ticket;
  }

  async getTicketByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate(
      'event',
      'name coverImg'
    ); //double check this REVIEW
    return tickets;
  }
  async getTicketByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate(
      'account',
      'name picture'
    );
    return tickets;
  }
}

export const ticketsService = new TicketsService();

//Do not forget to fill out schemas in Dbcontext.js
