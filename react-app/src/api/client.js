
const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
}

////////////////////////////////////////////////////////////////////////////////

/*
 * User
 */

//register
export const registerUserAPIMethod = (user) => {
    //console.log(user);
    return fetch(`/api/users`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(user),
    }).then(checkLoginStatus);
}

//login
export const loginUserAPIMethod = (user) => {
    return fetch(`/api/login`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(user),
    }).then(checkLoginStatus);
}

//logout
export const logoutUserAPIMethod = () => {
    return fetch(`/api/logout`, {
        ...defaultHeaders,
        method: 'POST',
    }).then(checkLoginStatus);
}

//get users (admin)
export const getUsersAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get current user @
export const getCurrentUserAPIMethod = () => {
    return fetch(`/api/currentuser`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//update user
export const updateUserAPIMethod = (user) => {
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(user),
    }).then(checkStatus);
}

//delete user
export const deleteUserByIdAPIMethod = (userId) => {
    return fetch(`/api/users/${userId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

//upload profile image to cloudinary @
export const uploadImageToCloudinaryAPIMethod = (formData) => {
    const cloudName = 'dxvrj0lkv';
    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}

////////////////////////////////////////////////////////////////////////////////

/*
 * Daylog
 */

//get daylogs
export const getDaylogsAPIMethod = () => {
    return fetch(`/api/daylogs`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get daylog by id
export const getDaylogByIdAPIMethod = (daylogId) => {
    return fetch(`/api/daylogs/${daylogId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get daylog by date @

//add daylog
export const createDaylogAPIMethod = (daylog) => {
    return fetch(`/api/daylogs`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(daylog),
    }).then(checkStatus)
        .then(parseJSON);
}

//update daylog
export const updateDaylogAPIMethod = (daylog) => {
    return fetch(`/api/daylogs/${daylog._id}`, {
        ...defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(daylog),
    }).then(checkStatus);
}

//delete daylog
export const deleteDaylogByIdAPIMethod = (daylogId) => {
    return fetch(`/api/daylogs/${daylogId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

////////////////////////////////////////////////////////////////////////////////

/*
 * Question
 */

//get questions
export const getQuestionsAPIMethod = () => {
    return fetch(`/api/questions`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getQuestionsByDaylogIdAPIMethod = (daylog) => {
    return fetch(`/api/questions/findByDaylog/${daylog._id}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get question by id
export const getQuestionByIdAPIMethod = (questionId) => {
    return fetch(`/api/questions/${questionId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get question by date @

//add question
export const createQuestionAPIMethod = (question) => {
    return fetch(`/api/questions`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(question),
    }).then(checkStatus)
        .then(parseJSON);
}

//update question
export const updateQuestionAPIMethod = (question) => {
    return fetch(`/api/daylogs/${question._id}`, {
        ...defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(question),
    }).then(checkStatus);
}

//delete question
export const deleteQuestionByIdAPIMethod = (questionId) => {
    return fetch(`/api/questions/${questionId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

////////////////////////////////////////////////////////////////////////////////

function checkLoginStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return true;
    } else {
        return false;
    }
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}