import axios from 'axios'
import baseUrl from "@/api"
let api = {
    // requestData(){
    //     return new Promise((resolve,reject) => {
    //         axios.get(baseUrl+"")
    //           .then(data => resolve(data.data))
    //           .catch(err => reject(err))
    //     })
    // },
    requestBannerData(){
        return new Promise((resolve,reject) => {
            axios.get(baseUrl+"/rotations")
              .then(data => {
                // console.log(data.data)
                resolve(data.data)
              })
              .catch(err => reject(err))
        })
    }
}
export default api