import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button, colors } from "react-native-elements"
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase";
import Loading from "../Loading";

 function RegisterForm(props) {
    
    const { toastRef, navigation } = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepeatPassword, sethideRepeatPassword] = useState(true);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("");

    const register = async () => {
        setIsVisibleLoading(true);

        if(!email || !password || !repeatpassword){
            toastRef.current.show("Todos los campos son obligatorios");
            
        } else {
            if(!validateEmail(email)) {
                toastRef.current.show("El mail no es correcto")}
             else {
                if(password !== repeatpassword) {
                    toastRef.current.show("Las contraseñas no son iguales")}
                 else {
                    await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        navigation.navigate("MyAccount");
                        console.log('usuario creado correctamente!')
                    })
                    .catch(() => {
                        toastRef.current.show("Error al crear la cuenta. Intentelo mas tarde");
                        console.log ('Error al crear la cuenta. Intentelo mas tarde')
                    });
                }
            }
        }
        setIsVisibleLoading(false);
    };

    return(
        <View style={styles.formContainer} >
           <Input
                placeholder="Correo electronico"
                contaninerStyle={styles.inputForm}
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
                placeholder="contraseña"
                password={true}
                secureTextEntry={hidePassword}
                contaninerStyle={styles.inputForm}
                onChange={e => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassword ? "eye-outline" : "eye-off-outline"} 
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePassword (!hidePassword)}
                    />
                }   
                />
            <Input
                placeholder="repetir contraseña"
                password={true}
                secureTextEntry={hideRepeatPassword}
                contaninerStyle={styles.inputForm}
                onChange={e => setRepeatPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"} 
                        iconStyle={styles.iconRight}
                        onPress={() => sethideRepeatPassword (!hideRepeatPassword)}

                    />
                }   
                />
                <Button
                    title="Unirse..."
                    contaninerStyle={styles.btnContainerRegister}
                    buttonStyle={styles.btnRegister}
                    onPress={register}
                />
                <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
        </View>
    );

}

export default withNavigation (RegisterForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    inputForm: {
        width:"100%",
        marginTop: 20
    },
    iconRight: {
        color: "#c1c1c1"
    },
    btnContainerRegister: {
        marginTop : 20,
        width:"95%"
    },
    btnRegister: {
        backgroundColor: "#00a680"
    }
});