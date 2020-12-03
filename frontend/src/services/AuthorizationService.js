class AuthorizationService {

  nutzerPasswortToBase64(nutzername, passwort) {
    return "Basic " + btoa(nutzername + ":" + passwort);
  }

  async login(nutzername, passwort) {
    fetch(process.env.REACT_APP_BACKEND_URL + "/login", {
      "headers": {
        "authorization": this.nutzerPasswortToBase64(nutzername, passwort)
      },
      credentials: "same-origin"
    }).then(res => {
      if(res.status ===200) {
        localStorage.setItem("authorization", this.nutzerPasswortToBase64(nutzername, passwort));
        console.log(res.status)
        return res.status;
      } else {
        throw new Error(res.status, res.statusText);
      }
    }).catch(err => {console.log(err); alert(err)})
  }
}
export default AuthorizationService;
