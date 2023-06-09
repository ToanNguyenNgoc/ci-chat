import { axiosConfig } from "src/configs"
import {
  ContextData,
  IMessage,
  ITopic,
  IUser,
  LoginBody,
  MessageBody,
  QueryMessage,
  QueryTopic,
  Response,
  TopicBody
} from "src/interfaces"


const apis = {
  postLogin: (org: string, body: LoginBody) => {
    return axiosConfig.post(`auth/${org}/login`, body).then<Response<IUser>>(res => res.data)
  },
  getProfile: () => {
    return axiosConfig.get('/users/profile').then(res => res.data)
  },
  getTopics: (params?: QueryTopic) => {
    return axiosConfig
      .get('/topics', { params })
      .then<Response<ContextData<ITopic[]>>>(res => res.data)
  },
  postTopic: (data: TopicBody) => {
    return axiosConfig
      .post('/topics', data)
      .then<Response<ITopic>>(res => res.data)
  },
  getMessages: (params: QueryMessage) => {
    return axiosConfig
      .get('/messages', { params })
      .then<Response<ContextData<IMessage[]>>>(res => res.data)
  },
  postMessage: (data: MessageBody) => {
    return axiosConfig
      .post('/messages', data)
      .then<Response<IMessage>>(res => res.data)
  }
}
export default apis