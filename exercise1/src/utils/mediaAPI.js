import Login from "../views/Login";


const apiUrl = 'http://media.mw.metropolia.fi/wbma/media/';

const login = (username, password) => {

    fetch("http://media.mw.metropolia.fi/wbma/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({"username": username, "password": password})
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            return json;
        })
};

const register = (username, password, email, full_name) => {
    fetch("http://media.mw.metropolia.fi/wbma/users/" + username , {

    });
    fetch("http://media.mw.metropolia.fi/wbma/users", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({"username": username, "password": password, "email": email, "full_name": full_name})
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            return json;
        })
};


const getAllMedia = () => {
    return fetch(apiUrl).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        return Promise.all(json.map(pic => {
            return fetch(apiUrl + pic.file_id).then(response => {
                return response.json();
            });
        })).then(pics => {
            console.log(pics);
            return pics;
        });
    });
};

export {getAllMedia, login, register} ;
