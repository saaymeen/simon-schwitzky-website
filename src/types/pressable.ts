import type { IconType } from 'react-icons/lib';

interface PressableProps {
	icon: IconType;
	size?: 'base' | 'lg';
	theme?: 'primary' | 'secondary';
}

export { type PressableProps };
