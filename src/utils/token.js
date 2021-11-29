export default {
    get() {
        return window.sessionStorage.getItem('TOKEN');
    },
    save(token) {
        window.sessionStorage.setItem('TOKEN', token);
    },
    delete() {
        return window.sessionStorage.removeItem('TOKEN');
    },
};