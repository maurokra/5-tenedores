import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";
 
export default function LoginFacebook(props) {
  const { toastRef, navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
 
  async function login() {
    try {
      await Facebook.initializeAsync("241417143660502");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"]
      });
      if (type === "success") {
        setIsLoading(true);
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        await firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {
            navigation.navigate("MyAccount");
          })
          .catch(() => {
            toastRef.current.show(
              "Error acdediendo con Facebook, intentelo más tarde"
            );
          });
      } else if (type === "cancel") {
        toastRef.current.show("Inicio de sesion cancelado");
      } else {
        toastRef.current.show("Error desconocido, intentelo más tarde");
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
    setIsLoading(false);
  }
 
  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading isVisible={isLoading} text="Iniciando sesión" />
    </>
  );
}
 
