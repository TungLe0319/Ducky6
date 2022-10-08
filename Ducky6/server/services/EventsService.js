import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext.js';

class EventsService {
  async cancelEvent(id, userInfo) {
    const event = await this.getEventById(id);
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

  async getUncancelledEvents() {
    const event = await dbContext.Events.find().populate(
      'creator',
      'name picture'
    );

    return event;
  }

  async getEventsByAccountId(accountId) {
    const event = await dbContext.Events.find(accountId).populate(
      'creator',
      'name picture'
    );
    return event;
  }
  //Id is req.params.id
  async getEventById(id) {
    const event = await dbContext.Events.findById(id).populate(
      'creator',
      'name picture'
    );

    // const event = await dbContext.Events.findById(id).populate(
    //   'creator',
    //   'name picture'
    // );
    if (!event) {
      throw new BadRequest('Invalid event Id');
    }
    return event;
  }

  async getEventIfNotCancelled(id) {
    const event = await this.getEventById(id);

    // if (event.isCanceled) {
    //   throw new BadRequest('Tis Cancelled... sorry.');
    // }
    return event;
  }
  async editEvent(eventData, eventId, userInfo) {
    const event = await this.getEventIfNotCancelled(eventId);

    // @ts-ignore
    if (userInfo.id != event.creatorId.toString()) {
      throw new Forbidden('Forbidden! You Cannot Edit This Event.');
    }

    if (!event) {
      throw new BadRequest('Invalid or Bad Event Id..');
    }

    if (event.isCanceled) {
      throw new BadRequest('This Event Is Cancelled Sorry...');
    }

    event.name = eventData.name || event.name;
    event.description = eventData.description || event.description;

    await event.save();
    return event;
  }
  async getEventThatIsNotCancelled(eventId) {
    const event = await this.getEventById(eventId);

    // if (event.isCanceled) {
    //   throw new BadRequest('This Event Is Cancelled Sorry...');
    // }

    return event;
  }
}

export const eventsService = new EventsService();

//Do not forget to fill out schemas in Dbcontext.js
