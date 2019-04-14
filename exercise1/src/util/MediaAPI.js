const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

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
    },
  };
  return fetch(apiUrl + 'users/user', settings).then(response => {
    return response.json();
  });
};

const checkUser = (username) => {
  return fetch(apiUrl + 'users/username/' + username).then(response => {
    return response.json();
  });
};

const getFilesByTag = (tag) => {
  return fetch(apiUrl + 'tags/' + tag).then(response => {
    return response.json();
  });
};

const filters = {
  brightness: 100,
  contrast: 100,
  warmth: 0,
  saturation: 100,
};


const handleRangeChange = (element) => {

  const image = element.target.files[0];

  console.log(element.value);
  filters[element.id] = element.value;
  image.style.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) sepia(${filters.warmth}%) saturate(${filters.saturation}%)`;
};

export {getAllMedia, getSingleMedia, login, register, getUser, getFilesByTag, checkUser, handleRangeChange};