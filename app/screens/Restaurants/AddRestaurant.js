import React , { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../commponents/Loading";
import AddRestaurantForm from "../../commponents/Restaurants/AddRestaurantForm";

export default function AddRestaurants(props){
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);

    const toastRef = useRef();
    

    return (
        <View>
            <AddRestaurantForm
            toastRef={toastRef}
            setIsLoading={setIsLoading}
            navigation={navigation}
            />
            <Toast ref={ toastRef } position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Creando restaurantes"/>

        </View>
    );
}

