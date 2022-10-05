export class Event {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.location = data.location;
    this.capacity = data.capacity;
    this.startDate = data.startDate;
    this.type = data.type;
    this.creator=data.creator
    this.isCanceled=data.isCanceled ||false
  }
}
