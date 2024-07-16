import axios from "axios";
import {
	fetchBooksStart,
	fetchBooksSuccess,
	fetchBooksFailure,
	appendBooksSuccess,
	fetchRelatedBooksStart,
	fetchRelatedBooksSuccess,
	fetchRelatedBooksFailure,
} from "../reducers/booksReducer";

/* the query the is a workaround, since apparently i cant fetch books without proving a query parameter */
export const fetchBooks =
	(query = "the", page = 1) =>
	async (dispatch) => {
		try {
			dispatch(fetchBooksStart());
			const response = await axios.get(
				`https://openlibrary.org/search.json?q=${query}&page=${page}&limit=10&fields=key,title,author_name,cover_i,first_sentence,ratings_average&sort=rating`
			);
			dispatch(fetchBooksSuccess(response.data.docs));
		} catch (error) {
			dispatch(fetchBooksFailure());
			console.error("Fetch Books Error: ", error);
		}
	};

export const fetchBooksByCategory =
	(category, page = 1) =>
	async (dispatch) => {
		try {
			dispatch(fetchBooksStart());
			const response = await axios.get(
				`https://openlibrary.org/subjects/${category}.json?limit=10&page=${page}&fields=key,title,author_name,cover_i,first_sentence,ratings_average&sort=rating`
			);
			const books = response.data.works;
			dispatch(fetchBooksSuccess(books));
		} catch (error) {
			dispatch(fetchBooksFailure());
			console.error("Fetch Books by Category Error: ", error);
		}
	};

export const searchBooks =
	(query, page = 1) =>
	async (dispatch) => {
		try {
			dispatch(fetchBooksStart());
			const response = await axios.get(
				`https://openlibrary.org/search.json?q=${query}&page=${page}&fields=key,title,author_name,cover_i,first_sentence,ratings_average&sort=rating`
			);
			dispatch(fetchBooksSuccess(response.data.docs));
		} catch (error) {
			dispatch(fetchBooksFailure());
			console.error("Search Books Error: ", error);
		}
	};

export const loadMoreBooks = (query, page) => async (dispatch) => {
	try {
		const response = await axios.get(
			`https://openlibrary.org/search.json?q=${query}&page=${page}&fields=key,title,author_name,cover_i,first_sentence,ratings_average&sort=rating`
		);
		dispatch(appendBooksSuccess(response.data.docs));
	} catch (error) {
		console.error("Load More Books Error: ", error);
	}
};

export const fetchRelatedBooksByAuthor = (author) => async (dispatch) => {
	try {
		dispatch(fetchRelatedBooksStart());
		const response = await axios.get(
			`https://openlibrary.org/search.json?author=${author}&limit=5&fields=key,title,author_name,cover_i,first_sentence,ratings_average`
		);
		dispatch(fetchRelatedBooksSuccess(response.data.docs));
	} catch (error) {
		dispatch(fetchRelatedBooksFailure());
		console.error("Fetch Related Books by Author Error: ", error);
	}
};
