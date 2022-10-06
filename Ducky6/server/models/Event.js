import mongoose from "mongoose"
 const Schema= mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

export const EventSchema = new Schema(
  {
    name: {
      type: String,

      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      default:
        'https://codeworks.blob.core.windows.net/media/mark.ohnsman__QGdtYWlsLmNvbQ==/giraffe.jpeg',
      required: true,
    },
    location: {
      type: String,
      default: 'Local Expo Center',
      required: true,
    },
    capacity: {
      type: Number,
      min: 10,
      default: 100,
    },
    startDate: {
      type: Date,
      required: true,
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

    creatorId: { type: ObjectId, ref: 'Account', required: true },
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
