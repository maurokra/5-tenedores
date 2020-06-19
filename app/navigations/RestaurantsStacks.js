
import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurant from "../screens/Restaurants/AddRestaurant";

const RestaurantsScreenStacks = createStackNavigator({
    Restaurants: {
        screen: RestaurantsScreen,
        navigationOptions: () => ({
            title: "Restaurantes"
        })
    },
    AddRestaurant: {
        screen: AddRestaurant,
        navigationOptions: () => ({
            title: "Añadir un nuevo Restaurantes"
        })
    }
});

export default RestaurantsScreenStacks;