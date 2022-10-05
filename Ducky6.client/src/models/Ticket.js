export class Ticket {
  constructor(data) {
    this.hasTicket = data.hasTicket || false;
    this.id = data.id;
    this.accountId = data.accountId;
    this.eventId = data.eventId;
  }
}
