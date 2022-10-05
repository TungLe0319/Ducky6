import { Account } from "./Account.js"

export class Comment{
  constructor(data) {
    this.body = data.body
    this.isAttending=data.isAttending || false

    this.creator= new Account(data.creator)
  }
}