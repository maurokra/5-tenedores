import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button, colors } from "react-native-elements"
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";


export default function RegisterForm(props) {
    
    const { toastRef } = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepeatPassword, sethideRepeatPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("");

    const register = async () => {
        if(!email || !password || !repeatpassword){
            toastRef.current.show('todos los campos son obligatorios',1000)
            console.log('-------------------------------------------------')
            console.log(toastRef)
        } else {
            if(!validateEmail(email)) {
                toastRef.current.show("el mail no es correcto")
            console.log("el email No es correcto")
            } else {
                if(password !== repeatpassword) {
                    console.log ("las contraseñas no son iguales")
                } else{
                    await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log('usuario creado correctamente!')
                    })
                    .catch(() => {
                        console.log ('Error al crear la cuenta. Intentelo mas tarde')
                    });
                }
            }
        }
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
                    title="Unirse"
                    contaninerStyle={styles.btnContainerRegister}
                    buttonStyle={styles.btnRegister}
                    onPress={register}
                    />
        </View>
    );

}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    inputForm: {
        width:"100%",
        marginTop: "center"
    },
    iconRight: {
        color: "#c1d1c1"

    },
    btnContainerRegister: {
        marginTop : 20,
        width:"95%"
        
    },
    btnRegister: {
    backgroundColor: "#00a680"
}

})