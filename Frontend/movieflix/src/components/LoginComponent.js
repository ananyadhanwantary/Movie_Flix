import 'bootstrap/dist/css/bootstrap.com'
function LoginComponent(){
    return (
        <>
        <form className="{styles.login-container}">
        <label className="{styles.login-container}">Email
            <input type="text"></input>
        </label>
        <label className="{styles.login-container}">Password
            <input type="password"></input>
        </label>
        <button className="{styles.login-button}">LOG IN</button>
        </form>
        </>
    )
}
export default LoginComponent