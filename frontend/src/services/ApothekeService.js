
class ApothekeService {

  async getApotheke(id) {
    fetch(process.env.REACT_APP_BACKEND_URL + "/apotheke/" + id, {
      credentials: "same-origin"
    })
    .then(res => {return res.json()})
    .then(err => console.log(err))
  }
}

export default ApothekeService;
