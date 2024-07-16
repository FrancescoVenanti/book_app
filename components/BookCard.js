import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FavoriteIcon from "./FavoriteIcon";

const BookCard = ({ book, onPressDetails }) => {
	// Provide default values or checks
	const coverId = book.cover_i || book.cover_id || "default_cover_id";
	const title = book.title || "No Title";
	const author = (book.authors && book.authors[0] && book.authors[0].name) || book.author_name || "Unknown Author";

	return (
		<TouchableOpacity style={styles.card} onPress={onPressDetails}>
			<Image source={{ uri: `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` }} style={styles.image} />
			<View style={styles.info}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.author}>{author}</Text>
			</View>
			<FavoriteIcon book={book} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		padding: 10,
		marginVertical: 5,
		backgroundColor: "#fff",
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
	},
	image: {
		width: 50,
		height: 75,
		marginRight: 10,
	},
	info: {
		flex: 1,
		justifyContent: "center",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	author: {
		fontSize: 14,
		color: "gray",
	},
});

export default BookCard;
