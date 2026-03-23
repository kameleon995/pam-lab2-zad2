export function lightTheme() {
	return {
		colors: {
			background: '#FFFFFF',
			text: '#000000',
			primary: '#007AFF',
			border: '#C7C7CC',
			borderError: '#FF3B30',
			good: '#008c23',
		},
	};
};

export function darkTheme() {
	return {
		colors: {
			background: '#000000',
			text: '#FFFFFF',
			primary: '#0A84FF',
			border: '#3A3A3C',
			borderError: '#FF3B30',
			good: '#34C759',
		},
	};
};

export default function getTheme(mode: 'light' | 'dark') {
	return mode === 'light' ? lightTheme() : darkTheme();
}

