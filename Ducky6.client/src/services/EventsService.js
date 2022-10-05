import { api } from "./AxiosService.js"


class EventsService{

async getEvents(){
  const res = await api.get('api/events')
  
}


}

export const eventsService = new EventsService()