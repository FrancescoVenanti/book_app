import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../redux/reducers/favoritesReducer";
import BookCard from "../components/BookCard";

const FavoriteBooksScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites.favorites);

	const handleRemoveFromFavorites = (book) => {
		dispatch(removeFromFavorites(book.key));
	};

	const isFavorite = (book) => favorites.some((fav) => fav.key === book.key);

	if (favorites.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text>No favorites yet.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={favorites}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<BookCard
						book={item}
						isFavorite={isFavorite(item)}
						onPressFavorite={() => handleRemoveFromFavorites(item)}
						onPressDetails={() => navigation.navigate("BookDetails", { book: item })}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default FavoriteBooksScreen;
