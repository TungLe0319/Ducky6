import { AppState } from '../AppState'
import { Event } from "../models/Event.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (error) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', error)
    }
  }


async getMyEvents(){
try {
  const res = await api.get('/account/tickets')
  console.log(res.data);
  AppState.myEvents = res.data
} catch (error) {
  console.error('Get My EVents?!?',error)
}

}

}

export const accountService = new AccountService()
