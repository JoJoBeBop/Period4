const apiUrl = 'http://media.mw.metropolia.fi/wbma/';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMTksInVzZXJuYW1lIjoiYXNkIiwiZW1haWwiOiJhc2QiLCJmdWxsX25hbWUiOm51bGwsImlzX2FkbWluIjpudWxsLCJ0aW1lX2NyZWF0ZWQiOiIyMDE5LTAxLTI0VDEwOjIzOjI4LjAwMFoiLCJpYXQiOjE1NTQyMDAzNzgsImV4cCI6MTU1NjI3Mzk3OH0.19J5MmR_x4AIiemncpe1jY0D1qA3W3JOVg6nBPitTFg;"

const getAllMedia = () => {
  return fetch(apiUrl + 'media/').then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + 'media/' + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      console.log(pics);
      return pics;
    });
  });
};

const getSingleMedia = (id) => {
  return fetch(apiUrl + 'media/' + id).then(response => {
    console.log(response);

    return response.json();
  });
};


const getProfilePic = (tag) => {
    return fetch(apiUrl + 'tags/').then(response => {
        return response.json();
    });
};

const login = (username, password) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  };
  return fetch(apiUrl + 'login', settings).then(response => {
    return response.json();
  });
};

const register = (user) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  return fetch(apiUrl + 'users', settings).then(response => {
    return response.json();
  });
};

const getUser = (token) => {
  const settings = {
    headers: {
      'x-access-token': token,
    }
  };
  return fetch(apiUrl + 'users/user', settings).then(response => {
    console.log(JSON.stringify(response));
    return response.json();
  });
};

const getProfileImage = (token) => {
  const settings = {
    headers: {
      'x-access-token': token,
    }
  };
  return fetch(apiUrl + 'tags/:profile', settings).then(response => {
    return response.json();
  });
};

const checkAvailability = (username) => {
  return fetch(apiUrl + 'users/username/' + username).then(response => {
    return response.json();
  });
};

export {getAllMedia, getSingleMedia, login, register, getUser, checkAvailability, getProfileImage};