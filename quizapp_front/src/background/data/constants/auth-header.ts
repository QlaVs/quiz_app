export default function authHeader() {
    // @ts-ignore
    let token: string = localStorage.getItem('token');

    if (token != null) {
        return { Authorization: "Token " + token };
    } else {
        console.log('No user token')
        return { };
    }
}
