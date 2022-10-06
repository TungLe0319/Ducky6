import { Account } from "./Account.js";

export class Ticket {
  constructor(data) {
    this.hasTicket = data.hasTicket || false; //check to see if data.accountId == Appstate.account.id
    this.id = data.id;
    this.accountId = data.accountId;
    this.eventId = data.eventId;
    this.profile = new Account(data.profile)
    this.event= new Event(data.event)
  }
}
