import clsx from 'clsx';

import { DefaultProps } from './types';

export interface ShortcutProps extends DefaultProps {
	chars: string;
}

export const Shortcut: React.FC<ShortcutProps> = (props) => {
	const { className, chars, ...rest } = props;

	return (
		<kbd
			className={clsx(
				`px-1 border border-b-2`,
				`rounded-lg text-xs font-bold`,
				`text-gray-400 bg-gray-200 border-gray-300`,
				`dark:text-gray-400 dark:bg-transparent dark:border-transparent`,
				className
			)}
			{...rest}
		>
			{chars}
		</kbd>
	);
};
