import React, { useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksByCategory } from "../redux/actions/bookActions";
import { addToFavorites, removeFromFavorites } from "../redux/reducers/favoritesReducer";

// TODO: IMPORTANT NOT USED, DELETE IF IT KEEPS BEING LIKE THAT.

/* const CategoryBooksScreen = ({ route }) => {
	const { category } = route.params;
	const dispatch = useDispatch();
	const books = useSelector((state) => state.books.books);
	const favorites = useSelector((state) => state.favorites.favorites);

	useEffect(() => {
		dispatch(fetchBooksByCategory(category));
	}, [dispatch, category]);

	const handleAddOrRemoveFromFavorites = (book) => {
		if (favorites.some((fav) => fav.key === book.key)) {
			dispatch(removeFromFavorites(book.key));
		} else {
			dispatch(addToFavorites(book));
		}
	};

	const isFavorite = (book) => favorites.some((fav) => fav.key === book.key);

	return (
		<View>
			<FlatList
				data={books}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<View>
						<Text>{item.title}</Text>
						<Button
							title={isFavorite(item) ? "Remove from Favorites" : "Add to Favorites"}
							onPress={() => handleAddOrRemoveFromFavorites(item)}
						/>
					</View>
				)}
			/>
		</View>
	);
};

export default CategoryBooksScreen;
 */
