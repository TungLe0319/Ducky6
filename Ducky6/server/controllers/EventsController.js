import { Auth0Provider } from '@bcwdev/auth0provider';
import BaseController from '../utils/BaseController.js';

export class EventsController extends BaseController {
  constructor() {
    super('/api/events');
    this.router
      .get('', this.getAll)
      .get('/:Id', this.getById)
      //NOTE MiddleWare Here ORDER MATTERS
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:Id', this.edit)
      .delete('/:Id', this.remove);
      /*  the '/:Id' are magicVariable words that must Match the req.params.Id in the below edit and remove and get by Id async functions.*/
  }
  async getAll(req, res, next) {
    try {
      res.send();
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      //  const PlaceHolder = await PlaceholderService.getById(req.params.Id)
      res.send();
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      //formData is same thing as the req.body.. interchangeable
      // formData.creatorId = req.userInfo.id <--maybe.. Forces them to be who they say they are
      // const PlaceHolder = await Service.create(req.body)
      // res.send(PlaceHolder)
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {

      //the req.userInfo is from the previous create method formData.creatorId
      //same thing will be needed if you use a remove/delete method.
      //  const PlaceHolder = await PlaceHolderService.edit(req.body, req.userInfo,req.params.Id)
      res.send();
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      // await Service.remove(req.params.Id, req.userInfo)
      //res.send('Successfully Removed')
    } catch (error) {
      next(error);
    }
  }
}
