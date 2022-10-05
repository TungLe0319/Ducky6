import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }


async getMyTickets(){
try {
  const res = await api.get('/account/tickets')
  console.log(res.data);
} catch (error) {
  logger.error('Get My EVents?!?',err)
}

}

}

export const accountService = new AccountService()
