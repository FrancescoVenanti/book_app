import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/categoryActions";
import CategorySquare from "../components/CategorySquare";

const colorPalette = [
	"#f28b82",
	"#fbbc04",
	"#fff475",
	"#ccff90",
	"#a7ffeb",
	"#cbf0f8",
	"#aecbfa",
	"#d7aefb",
	"#fdcfe8",
	"#e6c9a8",
	"#e8eaed",
	"#f28b82",
	"#fbbc04",
	"#fff475",
	"#ccff90",
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
