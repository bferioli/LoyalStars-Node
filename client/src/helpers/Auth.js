class Auth {
    constructor() {
        this.token = localStorage.getItem('loyl-session');
        this.user = null;
        this.signedIn = false;

        console.log('new Auth instance');
    }

    setUser(user) {
        this.user = user;
        this.signedIn = true;
    }

    setToken(token) {
        localStorage.setItem('loyl-session', token);
        this.token = token;
    }

    signIn(credentials) {
        return new Promise( (resolve, reject) => {
            const requestOpts = {
                method: 'POST',
                body: credentials,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            fetch('/api/login', requestOpts)
                .then(response => response.json())
                .then(json => {
                    this.setUser(json.user);
                    this.setToken(json.token);
                    console.log(this);
                    resolve({ user: this.user });
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }

    signUp(credentials) {
        return new Promise( (resolve, reject) => {
            const requestOpts = {
                method: 'POST',
                body: credentials,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            fetch('/api/signup', requestOpts)
                .then(response => response.json())
                .then(json => {
                    this.setUser(json.user);
                    this.setToken(json.token);
                    console.log(this);
                    resolve({ user: this.user });
                })
                .then( () => resolve () )
                .catch(function (err) {
                    reject(err);
                });
        });
    }

    signOut() {
        return new Promise( (resolve) => {
            localStorage.removeItem('loyl-session');
            this.token = null;
            this.user = null;
            this.signedIn = false;
            resolve();
        });
    }

    checkSession() {
        return new Promise( (resolve, reject) => {
            this.token = localStorage.getItem('loyl-session');
            if (this.token) {
                this.verifyToken()
                    .then( repsonse => resolve(repsonse) );
            } else {
                resolve(null);
            }
        })
    }

    verifyToken() {
        return new Promise( (resolve, reject) => {
            const requestOpts = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + this.token,
                }
            };

            fetch('/api/verify', requestOpts)
                .then(response => response.json())
                .then(json => {
                    this.setUser(json.user);
                    console.log(this);
                    resolve({ user: this.user });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default new Auth();