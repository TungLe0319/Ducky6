import { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export const EventSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Tung Testing Create ',
      required: true,
    },

    description: {
      type: String,
      default: '',
    },
    coverImg: {
      type: String,
      default: '//thiscatdoesnotexist.com',
    },
    location: {
      type: String,
      default: 'Italy',
    },
    capacity: {
      type: Number,
      default: '100',
      required: true,
    },
    startDate: {
      type: Date,
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'convention',
      required: true,
      enum: ['convention', 'sport', 'digital', 'concert'],
    },

    creatorId: { type: ObjectId, required: true, ref: 'Account' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
});
