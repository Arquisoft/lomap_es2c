export function readCookie(name: string) {
    try {
        let cookies = document.cookie.split(';');
        let selectedCookie = cookies.find(cookie => cookie.startsWith(name + '='));
        let valueCookie = selectedCookie.split('=')[1];
        return valueCookie;
    } catch (e: any) {
        return "";
    }
}