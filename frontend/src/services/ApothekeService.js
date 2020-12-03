
class ApothekeService {

  async getApotheke(id) {

    return new Promise((resolve,reject) => {
      fetch(process.env.REACT_APP_BACKEND_URL + "/apotheke/" + id, {
        headers:{
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
    })
    
  }
}

export default ApothekeService;
