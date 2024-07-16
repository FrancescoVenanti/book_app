import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
	name: "favorites",
	initialState: { favorites: [] },
	reducers: {
		addToFavorites(state, action) {
			const exists = state.favorites.some((book) => book.key === action.payload.key);
			if (!exists) {
				state.favorites.push(action.payload);
			}
		},
		removeFromFavorites(state, action) {
			state.favorites = state.favorites.filter((book) => book.key !== action.payload);
		},
	},
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
