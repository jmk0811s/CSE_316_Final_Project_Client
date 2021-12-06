
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
export const updateUserAPIMethod = (user, nUser) => {
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(nUser),
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
 * Question
 */

//get questions
export const getQuestionsAPIMethod = () => {
    return fetch(`/api/questions`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get question by id
export const getQuestionsByIdAPIMethod = (questionId) => {
    return fetch(`/api/questions/${questionId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get questions by type
export const getQuestionsByTypeAPIMethod = (questionType) => {
    return fetch(`/api/questions/${questionType}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

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
    return fetch(`/api/questions/${question._id}`, {
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

/*
 * Response
 */

//get responses
export const getResponsesAPIMethod = () => {
    return fetch(`/api/responses`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get response by id
export const getResponseByIdAPIMethod = (responseId) => {
    return fetch(`/api/responses/${responseId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

//get responses by date @

//add response
export const createResponseAPIMethod = (response) => {
    return fetch(`/api/responses`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(response),
    }).then(checkStatus)
        .then(parseJSON);
}

//update question
export const updateResponseAPIMethod = (response) => {
    return fetch(`/api/responses/${response._id}`, {
        ...defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(response),
    }).then(checkStatus);
}

//delete question
export const deleteResponseByIdAPIMethod = (responseId) => {
    return fetch(`/api/responses/${responseId}`, {
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