import {Schema} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export const CommentSchema = new Schema(
  {
    body:{
      type:String,
      required:true
    },
    isAttending:{
      type:Boolean
    },
  

    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    eventId:{type:ObjectId,required:true, ref:'Event'}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

CommentSchema.virtual('comment', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
});


