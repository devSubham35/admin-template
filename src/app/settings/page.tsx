'use client'
import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
    name: string;
    email: string;
    phone: string;
}

interface Entry extends FormData {
    id: number;
}

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required'),
    phone: yup.string().required('Phone is required')
}).required();


const Settings = () => {

    const [entries, setEntries] = useState<Entry[]>([]);
    const [editingEntryId, setEditingEntryId] = useState<number | null>(null);

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            phone: ''
        }
    });

    const onSubmit = (data: FormData) => {
        if (editingEntryId) {
            // Update existing entry
            setEntries(prevEntries =>
                prevEntries.map(entry =>
                    entry.id === editingEntryId
                        ? { ...data, id: entry.id }
                        : entry
                )
            );
            setEditingEntryId(null);
        } else {
            // Add new entry
            setEntries(prevEntries => [...prevEntries, { ...data, id: Date.now() }]);
        }
        reset();
    };

    const editEntry = (id: number) => {
        const entryToEdit = entries.find(entry => entry.id === id);
        if (entryToEdit) {
            setValue('name', entryToEdit.name);
            setValue('email', entryToEdit.email);
            setValue('phone', entryToEdit.phone);
            setEditingEntryId(id);
        }
    };

    const deleteEntry = (id: number) => {
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
        if (editingEntryId === id) {
            reset();
            setEditingEntryId(null);
        }
    };

    const cancelEdit = () => {
        reset();
        setEditingEntryId(null);
    };

    const handleDataSubmit = (e: any) => {
        e.preventDefault()
        const data = entries.map(({ email, name, phone }) => ({ email, name, phone }));
        console.log(data);
    };



    return (
        <div className="bg-white w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8">


            <div className='w-full grid gap-5'>
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold">
                            {editingEntryId ? 'Edit Contact' : 'Add New Contact'}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-5 border rounded-xl">
                        <div className="grid gap-4 grid-cols-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    {...register('email')}
                                    className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register('phone')}
                                    className={`mt-1 block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    placeholder="(123) 456-7890"
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                            </div>

                            <div className="mt-6 flex space-x-3">
                                {editingEntryId !== null && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                )}

                                <button
                                    type="submit"
                                    className="h-fit px-4 py-2 border border-transparent rounded-md 
                                    shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    {editingEntryId !== null ? 'Update' : 'Add'}
                                </button>

                                {entries?.length > 0 &&
                                    <button
                                        type="submit"
                                        className="h-fit px-4 py-2 border border-transparent rounded-md shadow-sm text-sm 
                        font-medium text-white bg-blue-600 hover:bg-blue-700"
                                        onClick={handleDataSubmit}
                                    >
                                        Submit List
                                    </button>
                                }
                            </div>
                        </div>

                    </form>
                </div>

                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Contact List</h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {entries.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                No contacts added yet. Add your first contact above.
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-8 px-6 py-2">
                                    <div className="col-span-5 grid grid-cols-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Name</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Phone</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    entries.map(entry => (
                                        <div key={entry.id} className="px-6 py-2.5">
                                            <div className="grid grid-cols-8">
                                                <div className="col-span-5 grid grid-cols-3">
                                                    <div>
                                                        <p className="text-gray-900">{entry.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-900 truncate">{entry.email}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-900">{entry.phone}</p>
                                                    </div>
                                                </div>

                                                <div className="col-span-3 flex justify-end gap-6">
                                                    <button
                                                        onClick={() => editEntry(entry.id)}
                                                        className="w-[70px] flex justify-center items-center border
                                                    border-gray-300 rounded-md text-sm font-medium 
                                                    text-gray-700 bg-white hover:bg-gray-200"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteEntry(entry.id)}
                                                        className="w-[70px] py-1 flex justify-center items-center border border-red-600
                                                    rounded-md text-sm font-medium
                                                    text-white bg-red-600 hover:bg-red-700 "
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Settings
