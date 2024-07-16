import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { addToFavorites, removeFromFavorites } from "../redux/reducers/favoritesReducer";

const FavoriteIcon = ({ book }) => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites.favorites);
	const isFavorite = favorites.some((fav) => fav.key === book.key);

	const handleFavorite = () => {
		if (isFavorite) {
			dispatch(removeFromFavorites(book.key));
		} else {
			dispatch(addToFavorites(book));
		}
	};

	return (
		<Icon
			name={isFavorite ? "heart" : "heart-o"}
			size={24}
			color={isFavorite ? "red" : "gray"}
			style={{ marginRight: 15 }}
			onPress={handleFavorite}
		/>
	);
};

export default FavoriteIcon;
