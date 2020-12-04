class AuthorizationService {

  async login(credentials) {
    return new Promise((resolve,reject) => {
      fetch(process.env.REACT_APP_BACKEND_URL + "/login", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(credentials)
      })
      .then(res => {
        console.log(res);
        if(res.status === 200) {
          resolve(res.json())
          
        }else {
          reject(res.status)
        }
      })
    })
  }


  async logout() {
    fetch(process.env.REACT_APP_BACKEND_URL + "/logout", {
      "headers": {

      },
      "credentials": "same-origin"
    }).then(res => localStorage.removeItem("authorization"))
  }
}
export default AuthorizationService;
