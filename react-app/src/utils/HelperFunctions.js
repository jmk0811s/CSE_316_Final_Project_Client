

export const sortByDate = (list) => {
    return list.sort((a, b) => new Date(a.mdate) - new Date(b.mdate));
}

export const dateToString = (date) => {
    return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
}