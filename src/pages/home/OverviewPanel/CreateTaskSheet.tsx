import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
	SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import axiosClient from '@/api/axios';
import useData from '@/hooks/useData';
import { DataContextType } from '@/contexts/DataProvider';

export default function CreateTaskSheet() {
	const { dataManager } = useData() as DataContextType;
	const [name, setName] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const [remindDate, setRemindDate] = useState<Date>();
	const [dueDate, setDueDate] = useState<Date>();

	const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onNoteChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};

	const handleSubmit = async () => {
		try {
			await axiosClient.post(
				'/task',
				JSON.stringify({
					name,
					note,
					...(remindDate && { remindDate: remindDate.toISOString() }),
					...(dueDate && { dueDate: dueDate.toISOString() }),
				}),
				{
					headers: {
						Authorization: `Bearer ${dataManager.accessToken}`,
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			setName('');
			setNote('');
			setRemindDate(undefined);
			setDueDate(undefined);
		} catch (error) {
			//
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="w-full">Add task</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create a new task</SheetTitle>
					<SheetDescription>Click confirm when you're done.</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							value={name}
							onChange={onNameChanged}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="note" className="text-right">
							Notes
						</Label>
						<Textarea
							className="col-span-3"
							id="note"
							value={note}
							onChange={onNoteChanged}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="remindDate" className="text-right">
							Remind
						</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn(
										'w-[240px] justify-start text-left font-normal',
										!remindDate && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{remindDate ? (
										format(remindDate, 'PPP')
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={remindDate}
									onSelect={setRemindDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="dueDate" className="text-right">
							Due
						</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn(
										'w-[240px] justify-start text-left font-normal',
										!dueDate && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{dueDate ? format(dueDate, 'PPP') : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={dueDate}
									onSelect={setDueDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type="button" onClick={handleSubmit}>
							Confirm
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
