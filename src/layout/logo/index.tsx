import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	logoContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "0.5em",
		height: "4.5em",
	},
	logoText: {
		fontSize: "1em",
		fontWeight: "bold",
		color: "#FFFFFF",
	},
});

export default function Logo() {
	const classes = useStyles();
	return (
		<div className={classes.logoContainer}>
			<h1 className={classes.logoText}>Intake Tracker</h1>
		</div>
	);
}
