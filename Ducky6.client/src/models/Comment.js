export class Comment{
  constructor(data) {
    this.body = data.body
    this.isAttending=data.isAttending || false
  }
}