import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import favoritesReducer from "./favoritesReducer";
import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
	books: booksReducer,
	favorites: favoritesReducer,
	categories: categoriesReducer,
});

export default rootReducer;
