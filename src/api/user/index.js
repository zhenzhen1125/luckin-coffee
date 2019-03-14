import axios from 'axios'
import baseUrl from '@/api'
let api = {
    requestData(tel,password){
      // console.log(tel,password)
        return new Promise((resolve,reject) => {
            axios.get(baseUrl+"/users/login?tel="+tel+"&password="+password)
              .then(data => resolve(data.data))
              .catch(err => reject(err))
              console.log(baseUrl)
        })
    },
    
}
export default api
