const sessionIdToUserMap = new Map();

const setUser = (id, user) =>{
    sessionIdToUserMap.set(id, user);
}

const getUser = (id) =>{
    return sessionIdToUserMap.get(id);
}

const deleteUser = (id) => {
    sessionIdToUserMap.delete(id);
}

module.exports = {setUser, getUser, deleteUser}