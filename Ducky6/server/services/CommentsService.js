import { BadRequest, Forbidden } from '@bcwdev/auth0provider/lib/Errors.js';
import { dbContext } from '../db/DbContext.js';
import { eventsService } from './EventsService.js';

class CommentsService {
  async deleteComment(commentId, userId) {
    const comment = await this.getCommentById(commentId);

    // @ts-ignore
    if (userId != comment.creatorId.toString()) {
      throw new Forbidden('Not Your Comment Begone');
    }
    await comment.delete();
    return comment;
  }

  async createComment(commentData) {
    await eventsService.getUncancelledEvents();

    const comment = await dbContext.Comments.create(commentData);
    await comment.populate('creator', 'name picture');
    await comment.populate('event');
    return comment;
  }

  //Id is req.params.id
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate(
      'creator',
      'name picture'
    ).populate('event');
    return comments;
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId).populate(
      'creator',
      ' name picture'
    ).populate('event');
    if (!comment) {
      throw new BadRequest('Invalid of Bad Comment Id');
    }
    return comment;
  }

  async getComments() {
    const comment = await dbContext.Comments.find().populate(
      'creator',
      ' name picture'
    ).populate('event');
    return comment;
  }
}

export const commentsService = new CommentsService();

//Do not forget to fill out schemas in Dbcontext.js
