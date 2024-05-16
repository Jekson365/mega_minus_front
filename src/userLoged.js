
export default userIsLogged = () => {
    if (localStorage.getItem("token") == "") {
        return false
    }
    else {
        return true
    }
}