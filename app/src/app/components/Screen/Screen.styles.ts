import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	screen: {
		backgroundColor: '#ffffff',
		flex: 1,
	},
	screenContent: {
		alignSelf: 'center',
		flexGrow: 1,
		maxWidth: 541 + 16 * 2,
		padding: 16,
		width: '100%',
	},

	topShadow: { height: 0, left: 0, position: 'absolute', right: 0, top: 0 },
	bottomShadow: { bottom: 0, height: 0, left: 0, position: 'absolute', right: 0 },
});
