import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase";
import Loading from "../Loading";


 function LoginForm(props) {
    
        const { toastRef, navigation } = props;
        const [hidePassword, setHidePassword] = useState(true);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [isVisibleLoading, setIsVisibleLoading] = useState("false");
        
        const Login = async () => {
            setIsVisibleLoading(true);
            console.log('usuario logueado')
            console.log('Email: ' + email);
            console.log('password: ' + password);
            if (!email || !password){
                toastRef.current.show("todos los campos son obligatorios", 1000);
              }  else {
                    if(!validateEmail(email)){
                        toastRef.current.show("el email no es correcto")
                    } else { 

                        await firebase
                            .auth()
                            .signInWithEmailAndPassword(email, password)
                            .then(()=>{
                                navigation.navigate("MyAccount");
                            })
                            .catch(()=> {
                                toastRef.current.show("Email o contraseña incorrecta")
                            })

                        console.log('login correcto');
                    }
                    
                }
                setIsVisibleLoading(false);
        }

        return (
            <View style={styles.formContainer} >
                <Input
                    placeholder="Correo electronico"
                    containerStyle={styles.inputForm}
                    onChange={e => setEmail(e.nativeEvent.text)}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name="at"
                            iconStyle={styles.iconRight}
                        />
                    }
                />
                
                <Input
                    placeholder="Contraseña"
                    containerStyle={styles.inputForm}
                    password={true}
                    secureTextEntry={hidePassword}
                    onChange={e => setPassword(e.nativeEvent.text)}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name={hidePassword ? "eye-outline" : "eye-off-outline"}
                            iconStyle={styles.iconRight}
                            onPress={()=> setHidePassword(!hidePassword)}
                        />
                    }
                />
                <Button 
                    title="Iniciar sesión"
                    containerStyle={styles.btnContainerLogin}
                    buttonStyle={styles.btnLogin}
                    onPress={Login}
                />
                <Loading isVisible={isVisibleLoading} text="iniciando sesión"/>
            </View>
        )
    }
    export default withNavigation(LoginForm)

    const styles = StyleSheet.create({
        formContainer: {
            flex:1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
        },
        inputForm: {
            width: "100%",
            marginTop: 20
        },
        iconRight: {
            color: "#c1c1c1"
        },
        btnContainerLogin: {
            marginTop: 20,
            width: "95%"
        },
        btnLogin: {
            backgroundColor: "#00a680"
        }
    });


