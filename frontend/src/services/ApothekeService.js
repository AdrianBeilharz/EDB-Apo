
class ApothekeService {

  async getApotheke(id) {
    fetch(process.env.REACT_APP_BACKEND_URL + "/apotheke/" + id, {
      credentials: "same-origin",
      headers: {
        "authorization": localStorage.getItem("authorization")
      }
    })
    .then(res => {return res.json()})
    .catch(err => {console.log(err); alert(err)})
  }
}

export default ApothekeService;
