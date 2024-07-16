import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedBooksByAuthor } from "../redux/actions/bookActions";
import BookCard from "../components/BookCard";

const BookDetailsScreen = ({ route, navigation }) => {
	const { book } = route.params;
	const dispatch = useDispatch();
	const relatedBooks = useSelector((state) => state.books.relatedBooks);
	const loading = useSelector((state) => state.books.loadingRelated); // Ensure this is the correct loading state for related books
	const error = useSelector((state) => state.books.error);

	useEffect(() => {
		dispatch(fetchRelatedBooksByAuthor(book.author_name));
	}, [dispatch, book]);

	const coverId = book.cover_id || book.cover_i || "default_cover_id";
	const title = book.title || "No Title";
	const author = (book.authors && book.authors[0] && book.authors[0].name) || book.author_name || "Unknown Author";
	const rating_trimmed = book.ratings_average ? book.ratings_average.toFixed(1) : "No rating available";

	const renderBookDetails = () => (
		<View>
			<View style={styles.detailsContainer}>
				<Image source={{ uri: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` }} style={styles.image} />
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.author}>{author}</Text>
				{book.first_sentence && <Text style={styles.sentence}>{book.first_sentence} ...</Text>}
				<Text style={styles.rating}>Average user rating: {rating_trimmed}</Text>
			</View>
			<Text style={styles.related}>Other Books by {author}</Text>
		</View>
	);

	const renderRelatedBook = ({ item }) => (
		<BookCard
			book={item}
			isFavorite={false}
			onPressFavorite={() => {}}
			onPressDetails={() => navigation.navigate("BookDetails", { book: item })}
		/>
	);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Error fetching related books.</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={relatedBooks || []}
			keyExtractor={(item) => item.key}
			ListHeaderComponent={renderBookDetails}
			renderItem={renderRelatedBook}
			contentContainerStyle={styles.listContainer}
			ListEmptyComponent={() => (
				<View style={styles.emptyContainer}>
					<Text>No related books found.</Text>
				</View>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	detailsContainer: {
		padding: 20,
		backgroundColor: "#fff",
	},
	image: {
		width: "100%",
		height: 300,
		marginBottom: 20,
		objectFit: "contain",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	author: {
		fontSize: 18,
		color: "gray",
		marginBottom: 20,
	},
	sentence: {
		fontSize: 16,
		marginBottom: 20,
	},
	related: {
		fontSize: 20,
		fontWeight: "bold",
		backgroundColor: "white",
		marginStart: 20,
	},
	rating: {
		fontSize: 18,
		color: "gray",
		marginBottom: 20,
		alignSelf: "flex-end",
	},
	listContainer: {
		flexGrow: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
});

export default BookDetailsScreen;
