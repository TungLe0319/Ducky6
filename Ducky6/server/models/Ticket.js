import { Schema } from 'mongoose';

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
//Creates a One to one relationShip Only one person can have one 
//Examples one person owns one Ticket, To an Event Tied To Their Account Id Matching event Id
TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true });

TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true });

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
