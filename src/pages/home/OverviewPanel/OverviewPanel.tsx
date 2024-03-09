import SystemTab from './SystemTab';
import { useState } from 'react';

// * Icon Imports
import { IoSunnyOutline } from 'react-icons/io5';
import { CiStar } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { LuTally3 } from 'react-icons/lu';

import UserTab from './UserTab';
import CreateTaskSheet from './CreateTaskSheet';

type OverviewPanelPropsType = {
	className?: string;
	loadMyDay: () => void;
	loadImportant: () => void;
	loadAssigned: () => void;
	loadAll: () => void;
};

export default function OverviewPanel({
	className,
	loadMyDay,
	loadImportant,
	loadAssigned,
	loadAll,
}: OverviewPanelPropsType) {
	const [focus, setFocus] = useState(0);

	return (
		<div className={`${className} flex flex-col px-2 py-3 gap-2`}>
			<UserTab />
			<div className="p-2">
				<CreateTaskSheet />
			</div>
			<SystemTab
				text="My day"
				Icon={IoSunnyOutline}
				onClick={loadMyDay}
				focusIdentifier={-1}
				focused={focus === -1}
				setFocus={setFocus}
			></SystemTab>
			<SystemTab
				text="Important"
				Icon={CiStar}
				onClick={loadImportant}
				focusIdentifier={-2}
				focused={focus === -2}
				setFocus={setFocus}
			></SystemTab>
			<SystemTab
				text="Assigned"
				Icon={IoPersonOutline}
				onClick={loadAssigned}
				focusIdentifier={-3}
				focused={focus === -3}
				setFocus={setFocus}
			></SystemTab>
			<SystemTab
				text="All"
				Icon={LuTally3}
				onClick={loadAll}
				focusIdentifier={-4}
				focused={focus === -4}
				setFocus={setFocus}
			></SystemTab>

			<hr className="bg-gray-500 h-0.5" />
		</div>
	);
}
