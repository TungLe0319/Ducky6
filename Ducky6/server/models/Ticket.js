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

TicketSchema.virtual('account', {
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


