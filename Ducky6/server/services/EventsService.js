
import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext.js';

class EventService{

 async getEvents(){
 const event = await dbContext.Event.find().populate('creator', 'name picture')

 return event


//don't forget to .populate
 }

//Id is req.params.id
 async getEventById(Id){

  // if (!) {
  //  throw new BadRequest('Invalid Id');
  // }
 }

 async create(){
//Drop down one line when trying to .populate 
 }


 async deleteExample(){
}

}

export const eventsService = new EventService()

//Do not forget to fill out schemas in Dbcontext.js