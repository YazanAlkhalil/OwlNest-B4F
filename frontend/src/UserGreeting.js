function UserGreeting({user}){
    
    return(
        <h1>Hello {user.first ? user.first + " "+ user.last : "Anonymous"}</h1>
    )
}
export default UserGreeting;