import { IconType } from 'react-icons/lib';

type SystemTabPropsType = {
	onClick: () => void;
	focusIdentifier: number;
	text: string;
	Icon: IconType;
	focused: boolean;
	setFocus: React.Dispatch<React.SetStateAction<number>>;
};

export default function SystemTab({
	onClick,
	focusIdentifier,
	text,
	Icon,
	focused,
	setFocus,
}: SystemTabPropsType) {
	const handleClick = () => {
		setFocus(focusIdentifier);
		onClick();
	};

	return (
		<div
			className={`px-2 py-2 flex flex-row items-center gap-2 cursor-pointer ${
				!focused ? 'hover:' : 'font-bold '
			}bg-slate-400 rounded-md`}
			onClick={handleClick}
		>
			{focused && <div className="w-1 h-full bg-blue-600 rounded-md"></div>}
			<Icon size="1.25rem" className="text-slate-600 mx-2" />
			<span className="text-sm">{text}</span>
		</div>
	);
}
