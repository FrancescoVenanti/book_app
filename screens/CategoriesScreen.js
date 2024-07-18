import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryActions";
import CategorySquare from "../components/CategorySquare";

const colorPalette = [
	"#4169e1", // Royal Blue
	"#50c878", // Emerald Green
	"#9966cc", // Amethyst Purple
	"#ffd700", // Gold
	"#dc143c", // Crimson Red
	"#40e0d0", // Turquoise
	"#ff7f50", // Coral Pink
	"#4682b4", // Steel Blue
	"#ffc40c", // Saffron Yellow
	"#ff6347", // Tomato Red

	"#6a5acd", // Slate Blue
	"#20b2aa", // Light Sea Green
	"#deb887", // Burlywood
];

const CategoriesScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories.categories);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const handlePress = (category) => {
		navigation.navigate("Books", { screen: "BooksList", params: { category } });
	};

	if (!categories || categories.length === 0) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Loading...</Text>
			</View>
		);
	}

	const renderItem = ({ item, index }) => (
		<CategorySquare
			name={item.name}
			onPress={() => handlePress(item.key)}
			backgroundColor={colorPalette[index % colorPalette.length]}
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={categories}
				keyExtractor={(item) => item.key}
				numColumns={3}
				renderItem={renderItem}
				contentContainerStyle={styles.list}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	list: {
		justifyContent: "center",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CategoriesScreen;
