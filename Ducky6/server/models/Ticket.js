import {Schema} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export const TicketSchema = new Schema(
  {
    
  

    accountId: { type: ObjectId, required: true, ref: 'Account' },
    eventId: { type: ObjectId, required: true, ref: 'Event' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//only one person can have a ticket, another person cannot have the same ticket
// TicketSchema.index({eventId:1, accountId :1},{unique : true})

TicketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
});
TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event',
});


