import axios from 'axios'

let api = {
    requestKind(){
        return new Promise((resolve,reject) => {
            axios.get("http://39.98.194.75:3000/api/kind/distinct")
              .then(data => {
                // console.log(data)
                  resolve(data.data)
              }).catch(err => reject(err))

        })
    },
    requestGoods(){
      return new Promise((resolve,reject) => {
          axios.get("http://39.98.194.75:3000/api/kind")
            .then(data => {
                // console.log(data.data)
                resolve(data.data)
            }).catch(err => reject(err))
      })
  }
}
export default api