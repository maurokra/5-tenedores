import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-easy-toast";

export default function InfoUser(props) { 
    const { 
        //userInfo,
         userInfo: { uid, displayName, email,  photoURL },
         toastRef,
         setLoading,
         setLoadingText,
     } = props;
//console.log (userInfo);
    
    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
   
        if (resultPermissionCamera === "denied") {
            console.log("es necesario aceptar permisos de la galería")
            toastRef.current.show("Es necesario aceptar los permisos de la galería")
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                console.log("has cancelado la galeria de imagenes.");
                toastRef.current.show("Has cancelado la galeria de imagenes.")
            } else {
                uploadImage(result.uri, uid)
                .then(() => {
                    updatePhotoUrl();
                }).catch(() => {
                    console.log('error al actualizar el avatar')
                    toastRef.current.show("Error al actualizar el avatar")
                })
            }
        }
            
        };

        const uploadImage = async (uri) => {
            setLoadingText("Actualizando avatar");
            setLoading(true);
            const response = await fetch(uri);
            const blob = await response.blob();
            
            const ref = firebase.storage().ref().child('avatar/${uid}');
            return ref.put(blob);
        }; 

        const updatePhotoUrl = () => {
            firebase
              .storage()
              .ref('avatar/${uid}')
              .getDownloadURL()
              .then(async (response) => {
                  const update = {
                      photoURL: response
                  };
                  await firebase.auth().currentUser.updateProfile(update)
                  
                    setLoading(false);
                })
                .catch(() => {
                    toastRef.current.show("error al actualizar el avatar");
                })
        };

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                 source={{
                     uri: photoURL ? photoURL : "https://api.adorable.io/avatars/155/abott@adorable.png"
                 }}
          />
        <View>
                <Text style={styles.displayName}> 
                    {displayName ? displayName : "Anonimo"}
                 </Text>
                <Text>{email ? email : "Social Login"}</Text>
        </View>
       
        </View>

    );

}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }
});