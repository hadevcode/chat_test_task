import { useIsTablet, useTheme } from '@hooks';
import { StyleSheet } from 'react-native';

export function useStyles() {
	const isTablet = useIsTablet();
	const { theme } = useTheme();

	const styles = StyleSheet.create({
		contentContainer: {
			paddingBottom: 24,
			paddingHorizontal: isTablet ? 5 : 16,
		},
		allTipsScreen__sortWidgetBox: {
			paddingVertical: 12,
		},
	});

	return { styles, isTablet, theme };
}
