import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import BookListScreen from "../screens/BookListScreen";
import FavoriteBooksScreen from "../screens/FavoriteBooksScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import FavoriteIcon from "../components/FavoriteIcon"; // Import the FavoriteIcon component

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BooksStack = () => (
	<Stack.Navigator
		screenOptions={{
			headerStyle: { backgroundColor: "#CDE77F" }, // Pale green background for the header
			headerTintColor: "#000", // Black text color for the header
		}}
	>
		<Stack.Screen name="BooksList" component={BookListScreen} options={{ headerShown: true }} />
		<Stack.Screen
			name="BookDetails"
			component={BookDetailsScreen}
			options={({ route }) => ({
				title: route.params.book.title,
				headerBackTitleVisible: false,
				headerRight: () => <FavoriteIcon book={route.params.book} />, // Add the FavoriteIcon to the header
			})}
		/>
	</Stack.Navigator>
);

const FavoritesStack = () => (
	<Stack.Navigator
		screenOptions={{
			headerStyle: { backgroundColor: "#CDE77F" }, // Pale green background for the header
			headerTintColor: "#CDE77F", // Black text color for the header
		}}
	>
		<Stack.Screen name="FavoritesList" component={FavoriteBooksScreen} options={{ headerShown: false }} />
		<Stack.Screen
			name="FavoriteBookDetails"
			component={BookDetailsScreen}
			options={({ route }) => ({
				title: route.params.book.title,
				headerBackTitleVisible: false,
				headerRight: () => <FavoriteIcon book={route.params.book} />, // Add the FavoriteIcon to the header
			})}
		/>
	</Stack.Navigator>
);

const Navigation = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color, size }) => {
						let iconName;

						switch (route.name) {
							case "Categories":
								iconName = "list";
								break;
							case "Books":
								iconName = "book";
								break;
							case "Favorites":
								iconName = "heart";
								break;
							default:
								iconName = "circle"; // default icon
								break;
						}

						return <Icon name={iconName} size={size} color={color} />;
					},
					tabBarStyle: { backgroundColor: "#CDE77F" }, // Pale green background for the tab bar
					tabBarActiveTintColor: "#2C3A2F", // Black color for the active tab icon
					tabBarInactiveTintColor: "#888", // Grey color for the inactive tab icons
					headerStyle: { backgroundColor: "#CDE77F" }, // Pale green background for the header
				})}
			>
				<Tab.Screen name="Categories" component={CategoriesScreen} />
				<Tab.Screen name="Books" component={BooksStack} options={{ headerShown: false }} />
				<Tab.Screen name="Favorites" component={FavoritesStack} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
