import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
	name: "categories",
	initialState: { categories: [] },
	reducers: {
		fetchCategoriesSuccess(state, action) {
			state.categories = action.payload;
		},
	},
});

export const { fetchCategoriesSuccess } = categoriesSlice.actions;
export default categoriesSlice.reducer;
