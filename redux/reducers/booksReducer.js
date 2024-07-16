import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
	name: "books",
	initialState: { books: [], relatedBooks: [], loading: false, loadingRelated: false, page: 1, errorRelated: null },
	reducers: {
		fetchBooksStart(state) {
			state.loading = true;
		},
		fetchBooksSuccess(state, action) {
			state.books = action.payload;
			state.loading = false;
			state.page = 1;
		},
		appendBooksSuccess(state, action) {
			state.books = [...state.books, ...action.payload];
			state.loading = false;
			state.page += 1;
		},
		fetchBooksFailure(state) {
			state.loading = false;
		},
		fetchRelatedBooksStart(state) {
			state.loadingRelated = true;
			state.errorRelated = null;
		},
		fetchRelatedBooksSuccess(state, action) {
			state.relatedBooks = action.payload;
			state.loadingRelated = false;
		},
		fetchRelatedBooksFailure(state) {
			state.loadingRelated = false;
			state.errorRelated = true;
		},
	},
});

export const {
	fetchBooksStart,
	fetchBooksSuccess,
	fetchBooksFailure,
	appendBooksSuccess,
	fetchRelatedBooksStart,
	fetchRelatedBooksSuccess,
	fetchRelatedBooksFailure,
} = booksSlice.actions;
export default booksSlice.reducer;
