import type { IconType } from 'react-icons/lib';

interface PressableProps {
	icon?: IconType;
	left?: IconType;
	size?: 'base' | 'lg';
	theme?: 'primary' | 'secondary' | 'white';
	iconAnimation?: 'right' | 'top-right' | 'down' | 'zoom' | 'left';
}

export { type PressableProps };
