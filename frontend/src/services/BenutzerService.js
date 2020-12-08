class BenutzerService {

    async getBenutzer(id) {
  
      return new Promise((resolve,reject) => {
        fetch(process.env.REACT_APP_BACKEND_URL + "/apotheke/" + id + "/benutzer", {
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
  
export default BenutzerService;