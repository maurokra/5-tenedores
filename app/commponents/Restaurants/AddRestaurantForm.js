import React, { useState, useEffect } from "react";
import { StyleSheet,  View, ScrollView, Dimensions, Alert } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import AddRestaurants from "../../screens/Restaurants/AddRestaurant";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";
import Modal from "../Modal";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/storage";

const widthScreem = Dimensions.get("window").width;

export default  function AddRestaurantForm(props){
    const {toastRef, setIsLoading, navigation} = props;
    
    const [restaurantName, setRestaurantName ] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [imagenSelected, setImagenSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState(null);

    const addRestaurant = () => {
            if (!restaurantName || !restaurantAddress || !restaurantDescription) {
                toastRef.current.show("Todos los campos del formulario son obligatorios.");
            } else if (size(imagenSelected) === 0) {
                toastRef.current.show("El restaurantes tiene que tener almenos una foto");
            } else if (!locationRestaurant) {
                toastRef.current.show("Tienes que  localizar el restaurante en el mapa");
            } else { 
                console.log("formulario ok!")
                upLoadImagenStorage().then((response) => {
                    console.log(response);
                    
                })
            }
        };
        /*console.log("Ok!");
        console.log("restaurantName: " + restaurantName);
        console.log("restaurantAddress: " + restaurantAddress);
        console.log("restaurantDescription: " + restaurantDescription);
        console.log(imagenSelected);
        console.log(locationRestaurant);*/

        const upLoadImagenStorage = async () => {
           
            const imageBlob = [];
        await Promise.all(
            map(imagenSelected, async(image) =>  {
                const response = await fetch(image);
                const blob = await response.blob();
               const name = uuid();
                const ref = firebase.storage().ref('restaurants').child(name);
                await ref.put(blob).then(async (result) => {
                    await firebase
                        .storage() 
                        .ref('restaurants/${name}')
                        .getDownloadURL()
                        .then((photoUrl) => {
                            imageBlob.push(photoUrl); 
                        })
                        .catch((error) => {
                            console.log(error);
                            
                        })                   
                });
            })
            );
            return imageBlob;
         };
    
    return (
        <ScrollView style={styles.scrollView}>
            <ImagenRestaurant imagenRestaurant={imagenSelected[0]} />
            <FormAdd
                setRestaurantName = {setRestaurantName}
                setRestaurantAddress = {setRestaurantAddress}
                setRestaurantDescription = {setRestaurantDescription}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />
            <UploadImagen 
                toastRef={toastRef} 
                setImagenSelected={setImagenSelected}
                imagenSelected={imagenSelected}
                
            />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <Map 
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap} 
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
                />
        </ScrollView>
    );
}

function ImagenRestaurant(props) {
    const { imagenRestaurant } = props;

    return (
        <View style={styles.viewPhoto}>
            <Image
                 source={
                     ImagenRestaurant
                    ? { uri: imagenRestaurant }
                    : require("../../../assets/img/original.png")
                    
                    }
                 style={{width: widthScreem, height: 200}}
            />
        </View>
    );
}

function FormAdd(props){
    const {setRestaurantName,
           setRestaurantAddress, 
           setRestaurantDescription,
           setIsVisibleMap,
           locationRestaurant
           }  = props;

    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante"
                containerStyle={styles.input}
                onChange={(e) => setRestaurantName(e.nativeEvent.text)}
            />
            <Input
                placeholder="Dirección"
                containerStyle={styles.input}
                onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationRestaurant? "#00a680" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                placeholder="Descripción del restaurantes"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    )
}

function Map(props) {
    const { isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef } = props;
    const [location, setLocation] = useState(null);

    useEffect(() => {
(async () => {
    const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
    );
    const statusPermissions = resultPermissions.permissions.location.status;
    if(statusPermissions !== "granted"){
        toastRef.current.show(
            "Tienes que aceptar los permisos de localización para crear un restaurante",  
            3000);      
    } else {
        const loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,

        })
    }
    
})();
    },  []);

const confirmLocation = () => {
    setLocationRestaurant(location);
    toastRef.current.show("Localización guardada correctamente.");
    setIsVisibleMap(false);
}

    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style = {styles.mapsStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            draggable
                        />

                        
                    </MapView>
                )}

                
                <View style ={styles.viewMapBtn} >
                           <Button title="Guardar ubicación" 
                            containerStyle={styles.viewMapBtncontainerSave}
                            buttonStyle={styles.viewMapBtnSave}
                            onPress={ confirmLocation}
                           />  
                           <Button 
                                title="Cancelar ubicación" 
                                containerStyle={styles.viewMapBtncontainerCancel} 
                                buttonStyle={styles.viewMapBtnCancel}
                                onPress={() => setIsVisibleMap(false)}
                            /> 

                </View>
            </View>
        </Modal>
    )
    
}

function UploadImagen(props) {
    const {toastRef, setImagenSelected, imagenSelected} =props;
    
    const imagenSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
    Permissions.CAMERA_ROLL
    );



    if(resultPermissions === "denied"){
        toastRef.current.show(
            "Es necesario aceptar los permisos de la galería, si los has rechazados, tienes que ir a ajustes y activarlos manualmente." 
            , 3000)
    } else {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true, 
            aspect: [4, 3]
            
        });

        if(result.cancelled) {
            toastRef.current.show(
                "Has cerrado la galería sin seleccionar ninguna imagen",
                2000)
        } else {
            setImagenSelected([...imagenSelected, result.uri]);
            
        }
    }
};

const removeImage = (image) => {
   
    Alert.alert(
        "Elimar Imagen",
        "¿estas seguro de que quieres eliminar la imagen",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Eliminar",
                onPress: () => {
                    setImagenSelected(
                        filter(imagenSelected,(imageUrl) => imageUrl !== image)
                    );                   
                },
            },
        ],
        { cancelable: false}
    )
};


    return(
        <View style={styles.viewImagen}>
            {size(imagenSelected) < 4 && (
                 <Icon
                type= "material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerStyleIcon}
                onPress={imagenSelect}
            /> 
             ) }
           
            {map(imagenSelected, (imagenRestaurant, index) => (
                <Avatar
                key={index}
                style={styles.miniatureStyles}
                source={{ uri: imagenRestaurant}}
                onPress={() => removeImage (imagenRestaurant)}
            />
              
            ))}
                 
        </View>

    )
}



const styles = StyleSheet.create({
    scrollView: {
        height: "100%",

    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
        
    },
    input: {
        marginBottom: 10,

    },
    textArea: {
        height: 100,
        width:"100%",
        padding: 0,
        margin: 0
    },
    btnAddRestaurant: {
        backgroundColor: "#00a680",
        margin: 20
    },
    viewImagen: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerStyleIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width:70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyles: {
        width: 70,
        height: 70,
        marginRight: 10

    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapsStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtncontainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d"
    },
    viewMapBtncontainerSave: {
        paddingRight: 5
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680"
    }
    
})