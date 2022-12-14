export class Event {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.location = data.location;
    this.capacity = data.capacity;
    this.startDate = new Date(data.startDate).toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
    this.type = data.type;
    this.creator = data.creator;
    this.isCanceled = data.isCanceled || false;
  }
}
