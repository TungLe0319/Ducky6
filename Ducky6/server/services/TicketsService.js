import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext.js';
import { eventsService } from './EventsService.js';

class TicketsService {
  async deleteTicket(ticketId, userId) {
    const ticket = await this.getTicketById(ticketId)
    if (!ticket) {
      throw new BadRequest('Invalid ticket Id');
    }
    const event = await eventsService.getEventThatIsNotCancelledById(
      ticket.eventId
    );
 // @ts-ignore
 if (userId != ticket.creatorId.toString()) {
   throw new Forbidden("Tung- You Are FORBIDDEN")
 }

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
    //REVIEW grab events that aren't cancelled...
    //make sure they don't already have a ticket for Event
    //increase event Capacity once ticket is created

    await eventsService.getUncancelledEvents(eventId);
    const hasTicket = await this.getTicketsForEvent(eventId, accountId);
    if (hasTicket) {
      return hasTicket;
    }

    const ticket = await dbContext.Tickets.create({ eventId, accountId });

    await ticket.populate('profile', ' name picture');
    await ticket.populate('event', ' name coverImg');
    return ticket;
  }

  /**
   * people who have ticket for the event
   */
  async getTicketsForEvent(eventId, accountId) {
    const ticket = await dbContext.Tickets.findOne({ eventId, accountId })
      .populate('profile', 'name picture')
      .populate('event', 'name coverImg');
    return ticket;
  }

  async getTicketByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId })
      .populate('event', 'name coverImg')
      .populate('profile', 'name picture'); //double check this REVIEW
    return tickets;
  }
  async getTicketByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId })
      .populate('profile', 'name picture')
      .populate('event');
    return tickets;
  }

  async getTicketById(id){
    const ticket = await dbContext.Tickets.findById(id).populate('profile','name picture').populate('event')
    return ticket
  }
}

export const ticketsService = new TicketsService();

//Do not forget to fill out schemas in Dbcontext.js
