import React, { useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import { Feather, FontAwesome6, AntDesign } from "@expo/vector-icons";

type ButtonValue = string;

export default function HomeScreen() {
	const [display, setDisplay] = useState<string>("");
	const [evaluated, setEvaluated] = useState<boolean>(false);

	const handlePress = (value: ButtonValue) => {
		if (display === "Error" || display === "Divide by zero") {
			if (/^[1-9]$/.test(value)) {
				setDisplay(value);
			} else {
				setDisplay("");
			}
			setEvaluated(false);
		} else {
			if (value === "=") {
				if (display.length > 0) {
					try {
						if (eval(display).toString() !== "Infinity") {
							setDisplay(eval(display).toString());
							setEvaluated(true);
						} else {
							setDisplay("Divide by zero");
							setEvaluated(false);
						}
					} catch {
						setDisplay("Error");
					}
				}
			} else if (value === "C") {
				setDisplay("");
				setEvaluated(false);
			} else if (value === "<") {
				setDisplay(display.slice(0, -1));
				setEvaluated(false);
			} else if (value === "%") {
				if (display.length > 0) {
					setDisplay((eval(display) / 100).toString());
					setEvaluated(false);
				}
			} else {
				if (/^[1-9]$/.test(value)) {
					if (evaluated) {
						setDisplay(value);
						setEvaluated(false);
					} else {
						setDisplay(display + value);
					}
				} else {
					if (display.length > 0) {
						setDisplay(display + value);
					}
				}
			}
		}
	};

	const renderButton = (value: ButtonValue) => (
		<TouchableOpacity
			onPress={() => handlePress(value)}
			style={styles.button}
			key={value}>
			<Text style={styles.buttonText}>{value}</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={"dark-content"}
				backgroundColor={"#2f2f2f"}
			/>
			<View style={styles.displayContainer}>
				<Text style={styles.displayText}>
					{display.length > 0 ? display : "0"}
				</Text>
			</View>
			<View style={styles.numpad}>
				<View style={styles.buttonRow}>
					<TouchableOpacity
						onPress={() => handlePress("C")}
						style={styles.funcBTN}
						key={"C"}>
						<Text style={styles.funcBTNText}>{"C"}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handlePress("%")}
						style={styles.funcBTN}
						key={"%"}>
						<FontAwesome6
							name="percent"
							size={24}
							color="#da6c35"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handlePress("/")}
						style={styles.funcBTN}
						key={"/"}>
						<FontAwesome6
							name="divide"
							size={24}
							color="#da6c35"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handlePress("<")}
						style={styles.funcBTN}
						key={"<"}>
						<Feather
							name="delete"
							size={24}
							color="#da6c35"
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonRow}>
					{["7", "8", "9"].map(renderButton)}
					<TouchableOpacity
						onPress={() => handlePress("*")}
						style={styles.funcBTN}
						key={"*"}>
						<AntDesign
							name="close"
							size={24}
							color="#da6c35"
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonRow}>
					{["4", "5", "6"].map(renderButton)}
					<TouchableOpacity
						onPress={() => handlePress("-")}
						style={styles.funcBTN}
						key={"-"}>
						<FontAwesome6
							name="minus"
							size={24}
							color="#da6c35"
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonRow}>
					{["1", "2", "3"].map(renderButton)}
					<TouchableOpacity
						onPress={() => handlePress("+")}
						style={styles.funcBTN}
						key={"+"}>
						<FontAwesome6
							name="add"
							size={24}
							color="#da6c35"
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonRow}>
					{["0", "."].map(renderButton)}
					<TouchableOpacity
						onPress={() => handlePress("=")}
						style={styles.eqButton}
						key={"="}>
						<Text style={styles.buttonText}>{"="}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 50,
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: "#1a1a1a",
	},
	displayContainer: {
		justifyContent: "center",
		alignItems: "flex-end",
		// backgroundColor: "#383838",
		borderBottomWidth: 0.5,
		borderBottomColor: "#707070",
		borderRadius: 10,
		padding: 20,
		width: "90%",
		marginBottom: 20,
	},
	displayText: {
		fontSize: 48,
		color: "#fff",
	},
	buttonRow: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-around",
		width: "90%",
	},
	button: {
		flex: 1,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		margin: 5,
	},
	buttonText: {
		fontWeight: "bold",
		fontSize: 30,
		color: "#FFF",
	},
	numpad: {
		flex: 0.55,
	},
	eqButton: {
		flex: 2,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#da6c35",
		margin: 5,
	},
	funcBTN: {
		flex: 1,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		margin: 5,
	},
	funcBTNText: {
		fontWeight: "bold",
		fontSize: 30,
		color: "#da6c35",
	},
});
