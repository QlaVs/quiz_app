export default function authHeader() {
    // @ts-ignore
    var token = localStorage.getItem('token');
    if (token != null) {
        return { Authorization: "Token " + token };
    }
    else {
        console.log('No user token');
        return {};
    }
}
//# sourceMappingURL=auth-header.js.map