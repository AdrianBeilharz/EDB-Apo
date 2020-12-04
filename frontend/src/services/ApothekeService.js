class ApothekeService {


  async getUserApotheke() {

    return new Promise((resolve,reject) => {
      fetch(process.env.REACT_APP_BACKEND_URL + "/apotheke/" + sessionStorage.getItem("apothekeId"), {
        headers:{
          "Content-Type": "application/json",
          "Authorization": "Bearer "  + sessionStorage.getItem("jwt")
        }
      })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
    })
    
  }


  async getApotheke(id) {

    return new Promise((resolve,reject) => {
      fetch(process.env.REACT_APP_BACKEND_URL + "/apotheke/" + id, {
        headers:{
          "Content-Type": "application/json",
          "Authorization": "Bearer "  + sessionStorage.getItem("jwt")
        }
      })
      .then(res => {
        if(res.status === 200) {
          resolve(res.json())
        }else {
          reject(res.status)
        }
      })
    })
  }
}

export default ApothekeService;
