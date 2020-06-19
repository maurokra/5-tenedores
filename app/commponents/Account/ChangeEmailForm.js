import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button} from "react-native-elements";
import * as firebase from "firebase";
import { useScreens } from "react-native-screens";
import { validateEmail } from "../../utils/Validation";
import { reauthenticate } from "../../utils/api";


export default function ChangeEmailFrom (props){
    const {email, setShowModal, toastRef, setRealoadUserInfo} = props;
    const [FormData, setFormData] = useState(defaultValue());
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({...FormData, [type]: e.nativeEvent.text });
        };

    const onSubmit = () => {
        setErrors({});
        if(!FormData.email || email === FormData.email) {
            setErrors({
                email: "El email no ha cambiado",
            });
        } else if(!validateEmail(FormData.email)){
            setErrors({
                email:"email es incorrecto",
            });
        } else if(!FormData.password){
            setErrors({
                password: "La contraseña no puede estar vacía",
            });
        } else {
            setIsLoading(true);
            console.log("ok");

            reauthenticate(FormData.password).then(response => {
                console.log(response);
                firebase.auth()
                    .currentUser.updateEmail(FormData.email)
                    .then(()=>{
                        setIsLoading(false);
                        setRealoadUserInfo(true);
                        toastRef.current.show ("Email actualizado correctamente.");
                        setShowModal(false);
                    })
                    .catch(()=>{
                        setErrors({email:"Error al actualizar el email"})
                        setShowModal(false);
                        setIsLoading(false);
                    })
               
                
            }).catch(() => {
                setErrors({password: "contraseña incorrecta"});
                setIsLoading(false);
            });
        }

};

    return(
        <View style={styles.view}>
            <Input 
                placeholder= "ingresa el email"
                containerStyle={styles.input}
                defaultValue={email || ""}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errors.email}
            />
            <Input 
                placeholder= "Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true }
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline" ,
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Button
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

function defaultValue(){
    return{
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btn: {
        backgroundColor: "#00a680"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%"
        
    }
})
