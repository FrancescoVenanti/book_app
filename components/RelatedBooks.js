import React, { useEffect } from "react";
import { View, VirtualizedList, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedBooksByAuthor } from "../redux/actions/bookActions";
import { addToFavorites, removeFromFavorites } from "../redux/reducers/favoritesReducer";
import BookCard from "./BookCard";

const RelatedBooks = ({ author, navigation }) => {
	const dispatch = useDispatch();
	const relatedBooks = useSelector((state) => state.books.relatedBooks);
	const loading = useSelector((state) => state.books.loadingRelated);
	const error = useSelector((state) => state.books.errorRelated);
	const favorites = useSelector((state) => state.favorites.favorites);

	useEffect(() => {
		if (author) {
			dispatch(fetchRelatedBooksByAuthor(author));
		}
	}, [dispatch, author]);

	const handleAddOrRemoveFromFavorites = (book) => {
		if (favorites.some((fav) => fav.key === book.key)) {
			dispatch(removeFromFavorites(book.key));
		} else {
			dispatch(addToFavorites(book));
		}
	};

	const isFavorite = (book) => favorites.some((fav) => fav.key === book.key);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Failed to load related books. Please try again later.</Text>
			</View>
		);
	}

	const getItemCount = (data) => data.length;
	const getItem = (data, index) => data[index];

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Books by the Same Author</Text>
			<VirtualizedList
				data={relatedBooks || []}
				initialNumToRender={4}
				renderItem={({ item }) => (
					<BookCard
						book={item}
						isFavorite={isFavorite(item)}
						onPressFavorite={() => handleAddOrRemoveFromFavorites(item)}
						onPressDetails={() => navigation.navigate("BookDetails", { book: item })}
					/>
				)}
				keyExtractor={(item) => item.key}
				getItemCount={getItemCount}
				getItem={getItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	heading: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	loadingContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	errorContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	errorText: {
		color: "red",
		fontSize: 16,
	},
});

export default RelatedBooks;
