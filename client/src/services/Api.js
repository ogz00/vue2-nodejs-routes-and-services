/**
 * Created by oguzhankaracullu on 02/04/2018.
 */
import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:8081`
  })
}
