

// latest first
export const sortByDate = (list) => {
    return list.sort((a, b) => new Date(b.mdate) - new Date(a.mdate));
}

export const dateToString = (date) => {
    return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
}