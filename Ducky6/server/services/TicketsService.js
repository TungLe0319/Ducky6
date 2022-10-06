import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext.js';
import { eventsService } from './EventsService.js';

class TicketsService {
  async deleteTicket(ticketId, userId) {
    const ticket = await this.getTicketById(ticketId);
    if (!ticket) {
      throw new BadRequest('Invalid ticket Id');
    }
    const event = await eventsService.getEventById(ticket.eventId);

    // @ts-ignore
    const theLoggedInUserIsOwner = userId == event.creatorId.toString();

    // @ts-ignore
    const theLoggedInUserHasATicket = ticket.accountId.toString() == userId;

    if (!theLoggedInUserIsOwner && !theLoggedInUserHasATicket) {
      throw new Forbidden("Forbidden! Not Your Ticket");
    }
    await ticket.remove();
    // @ts-ignore
    await event.capacity++;
    await event.save();
    return ticket;
  }
  async createTicket(ticketData) {
    const event = await eventsService.getEventThatIsNotCancelled(
      ticketData.eventId
    );

    // const event = await eventsService.getEventThatIsNotCancelled(
    //   ticketData.eventId
    // );
    // const hasTicket = await this.getTicketForEvent(
    //   ticketData.eventId,
    //   ticketData.accountId
    // );
    // if (hasTicket) {
    //   return hasTicket;
    // }

    const ticket = await dbContext.Tickets.create(ticketData);
    // @ts-ignore
    if (event.capacity <= 0) {
      throw new BadRequest('out of tickets');
    }
    if (ticket) {
      // @ts-ignore

      //REVIEW THIS. FELT SO SIMPLE TOOK FOREVER TO FIGURE OUT
      event.capacity--;
    }

    // @ts-ignore
    await event.save();

    await ticket.populate('profile', ' name picture');
    await ticket.populate('event');

    return ticket;
  }

  /**
   * people who have ticket for the event
   */
  async getTicketForEvent(eventId, accountId) {
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

  //NOTE TICKETS FOR LOGGED IN USER
  async getTicketByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId })
      .populate('profile', 'name picture')
      .populate('event');
    return tickets;
  }

  async getTicketById(id) {
    const ticket = await dbContext.Tickets.findById(id)
      .populate('profile', 'name picture')
      .populate('event');
    return ticket;
  }
}

export const ticketsService = new TicketsService();

//Do not forget to fill out schemas in Dbcontext.js
