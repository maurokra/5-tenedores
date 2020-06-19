import * as firebase from "firebase";

export function reauthenticate(password) {
    const user = firebase.auth().currentUser; /*usuarios logueado actualmente*/
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    ); /*devuelve las credenciales */
    return user.reauthenticateWithCredential(credentials);
}