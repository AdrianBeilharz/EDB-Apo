class AuthorizationService {

  nutzerPasswortToBase64(nutzername, passwort) {
    return "Basic " + btoa(nutzername + ":" + passwort);
  }

  async login(nutzername, passwort) {
    fetch(process.env.REACT_APP_BACKEND_URL + "/login", {
      "headers": {
        "Authorization": this.nutzerPasswortToBase64(nutzername, passwort)
      },
      credentials: "same-origin"
    }).then(res => {
      if(res.status ===200) {
        console.log(res)
      } else {
        throw new Error(res.statusText)
      }
    }).catch(err => console.log(err))
  }
}
export default AuthorizationService;
