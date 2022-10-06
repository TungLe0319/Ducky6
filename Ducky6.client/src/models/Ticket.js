import { Account } from "./Account.js";
import { Event } from "./Event.js";

export class Ticket {
  constructor(data) {
    this.hasTicket = data.hasTicket || false; //check to see if data.accountId == Appstate.account.id
    this.id = data.id;
    this.OwnerAccountId = data.accountId;
  
    this.profile = new Account(data.profile)
    this.event= new Event(data.event)
  }
}
