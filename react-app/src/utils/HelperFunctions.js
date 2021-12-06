

export const sortByDate = (list) => {
    return list.sort((a, b) => new Date(a.mdate) - new Date(b.mdate));
}
