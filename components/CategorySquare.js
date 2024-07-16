import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CategorySquare = ({ name, onPress, backgroundColor }) => {
	return (
		<TouchableOpacity style={[styles.square, { backgroundColor }]} onPress={onPress}>
			<Text style={styles.text}>{name}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	square: {
		width: 100,
		height: 100,
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		borderRadius: 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 6,
	},
	text: {
		textAlign: "center",
		color: "black",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default CategorySquare;
