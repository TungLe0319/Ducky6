import { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export const EventSchema = new Schema(
  {
    name: {
      type: String,
      min: 0,
      required: true,
    },

    description: {
      type: String,
      default: '',
      minLength: 3,
    },
    coverImg: {
      type: String,
      default: '',
      minLength: 3,
    },
    location: {
      type: String,
      default: '',
      minLength: 3,
    },
    capacity: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: '',
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
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
