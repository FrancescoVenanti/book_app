import axios from "axios";
import { fetchCategoriesSuccess } from "../reducers/categoriesReducer";

export const fetchCategories = () => async (dispatch) => {
	try {
		const subjects = [
			"Science",
			"History",
			"Art",
			"Literature",
			"Technology",
			"Biography",
			"Children",
			"Fantasy",
			"Fiction",
			"Health",
			"Mystery",
			"Philosophy",
			"Psychology",
			"Religion",
			"Romance",
			"Science Fiction",
			"Self-help",
			"Travel",
			"Cooking",
			"Business",
			"Education",
			"Sports",
			"Music",
			"Poetry",
			"Politics",
			"Nature",
			"Comics",
			"Drama",
			"Horror",
		];
		const formattedCategories = subjects.map((subject) => ({ key: subject.toLowerCase(), name: subject }));
		dispatch(fetchCategoriesSuccess(formattedCategories));
	} catch (error) {
		console.error(error);
	}
};
