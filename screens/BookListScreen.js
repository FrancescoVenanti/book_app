import React, { useState, useEffect } from "react";
import { View, VirtualizedList, ActivityIndicator, StyleSheet, TextInput, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchBooksByCategory, searchBooks, loadMoreBooks } from "../redux/actions/bookActions";
import { addToFavorites, removeFromFavorites } from "../redux/reducers/favoritesReducer";
import BookCard from "../components/BookCard";

const BookListScreen = ({ route, navigation }) => {
	const { category } = route.params || {}; // Retrieve category from route params if available
	const dispatch = useDispatch();
	const books = useSelector((state) => state.books.books);
	const loading = useSelector((state) => state.books.loading);
	const favorites = useSelector((state) => state.favorites.favorites);
	const page = useSelector((state) => state.books.page);
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (category) {
			dispatch(fetchBooksByCategory(category));
		}
	}, [dispatch, category]);

	const handleSearch = () => {
		dispatch(searchBooks(query));
	};

	const handleAddOrRemoveFromFavorites = (book) => {
		if (favorites.some((fav) => fav.key === book.key)) {
			dispatch(removeFromFavorites(book.key));
		} else {
			dispatch(addToFavorites(book));
		}
	};

	const isFavorite = (book) => favorites.some((fav) => fav.key === book.key);

	const handleLoadMore = () => {
		if (!loading) {
			dispatch(loadMoreBooks(query || category || "the", page + 1));
		}
	};

	if (loading && page === 1) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	const getItemCount = (data) => data.length;
	const getItem = (data, index) => data[index];

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.searchBar}
				placeholder="Search books..."
				value={query}
				onChangeText={setQuery}
				onSubmitEditing={handleSearch}
			/>
			{!category && !query ? (
				<View style={styles.messageContainer}>
					<Text style={styles.messageText}>Search your favorite book or your favorite author.</Text>
				</View>
			) : (
				<VirtualizedList
					data={books}
					initialNumToRender={10}
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
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
					ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	searchBar: {
		padding: 10,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 10,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	messageContainer: {
		flex: 1,
		paddingTop: 20,
		paddingHorizontal: 20,
	},
	messageText: {
		fontSize: 18,
		color: "#555",
	},
});

export default BookListScreen;
