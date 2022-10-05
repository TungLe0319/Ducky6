import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService{

async removeComment(id){
await api.delete(`api.comments/${id}`)
let leftOverComments = AppState.comments.filter(c => c.id != id)
AppState.comments = leftOverComments
}

async addComment(formData){

const res = await api.post(`api/comments`,formData)
// console.log(res.data);
// AppState.comments= [new Comment(res.data), ...AppState.comments]
}

async getComments(){
  const res = await api.get('/api/comments')
  // console.log(res.data);

  AppState.comments = res.data.map(c => new Comment(c))
  // console.log(AppState.comments);
}




}
export const commentsService = new CommentsService()