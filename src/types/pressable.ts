import type { IconType } from 'react-icons/lib';

interface PressableProps {
	icon?: IconType;
	size?: 'base' | 'lg';
	theme?: 'primary' | 'secondary' | 'white';
	iconAnimation?: 'right' | 'top-right' | 'down' | 'zoom';
}

export { type PressableProps };
