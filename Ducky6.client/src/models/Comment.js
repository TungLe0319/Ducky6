import { Account } from "./Account.js"

export class Comment{
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.eventId= data.eventId
    
    this.isAttending=data.isAttending || false

    this.creator= new Account(data.creator)
  }
}