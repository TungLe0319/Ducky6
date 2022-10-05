import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext.js';

class EventService {
  async cancelEvent(id, userInfo) {
    const event = await this.getEventThatIsNotCancelledById(id);
    // @ts-ignore
    if (userInfo.id != event.creatorId.toString()) {
      throw new Forbidden('Not Your Event To Remove, Begone!');
    }
    event.isCanceled = true;
    await event.save();
    return event;
  }
  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData);
    await event.populate('creator', 'name picture');
    return event;
    //TODO
  }

  async getUncancelledEvents(query) {
    const event = await dbContext.Events.find({
      isCanceled: false,
      ...query,
    }).populate('creator', 'name picture');

    return event;
  }

  //Id is req.params.id
  async getEventThatIsNotCancelledById(id) {
    const event = await dbContext.Events.findById(id).populate(
      'creator',
      'name picture'
    );
    if (!event) {
      throw new BadRequest('Invalid event Id');
    }
    return event;
  }

  async editEvent(eventData, eventId, userInfo) {
    const event = await this.getEventThatIsNotCancelledById(eventId);

    // @ts-ignore
    if (userInfo.id != event.creatorId.toString()) {
      throw new Forbidden('Not Yours To Edit! BEGONE!');
    }
    event.name = eventData.name || event.name;
    event.description = eventData.description || event.description;

    await event.save();
    return event;
    //name

    //description

    //save
    //return
  }
  // async getEventThatIsNotCancelled(id){
  //   const event = await this.getEventById(id)

  //   if (event.isCanceled) {
  //     throw new BadRequest('This Event Is Cancelled Sorry...')
  //   }

  // }
}

export const eventsService = new EventService();

//Do not forget to fill out schemas in Dbcontext.js
