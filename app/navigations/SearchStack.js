import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";

const SearchScreenStacks = createStackNavigator({
    Restaurants: {
        screen: SearchScreen,
        navigationOptions: () => ({
            title: "busca tu restaurante"
        })
    }
});

export default SearchScreenStacks;