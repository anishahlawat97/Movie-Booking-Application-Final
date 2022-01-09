const KEYS ={
    users:'users',
    userID:'userID'
}

export function registerUser(data) {
    let users=getAllUsers();
    data['id'] = generateUserID()
    users.push(data)
    localStorage.setItem(KEYS.users,JSON.stringify(users))
}

export function generateUserID() {
    if (localStorage.getItem(KEYS.userID) == null)
        localStorage.setItem(KEYS.userID, '0')
    var id = parseInt(localStorage.getItem(KEYS.userID))
    localStorage.setItem(KEYS.userID, (++id).toString())
    return id;
}

export function getAllUsers() {
    if (localStorage.getItem(KEYS.users) == null)
        localStorage.setItem(KEYS.users, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.users));
}

function loginUser(){
    localStorage.getItem(KEYS.users)
}