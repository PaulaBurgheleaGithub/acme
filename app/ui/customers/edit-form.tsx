'use client';

import { CustomerField, CustomerForm} from '@/app/lib/definitions';
import {
    UserCircleIcon,
    InboxIcon,
    LinkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCustomer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';


export default function EditCustomerForm({
    customer
}: {
    customer: CustomerForm;
}) {
    const initialState = { message: null, errors: {} };
    const updateCustomerWithId = updateCustomer.bind(null, customer.id);
    // TO DO - This is working in the dev mode, however it cannot be build
    const [state, dispatch] = useFormState(updateCustomerWithId, initialState); 

    return (
        <form action={dispatch}>
            <div>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* Customer Name */}
                    <div>
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Full Name
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                <input
                                    id="name"
                                    name="name"
                                    type="string"
                                    step="0.01"
                                    defaultValue={customer.name}
                                    placeholder="Enter new name"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="name-error"
                                />
                            </div>
                        </div>
                        {/* <div id="name-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                                </p>
                            ))}
                        </div> */}
                    </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* Customer Name */}
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Email
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <InboxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                <input
                                    id="email"
                                    name="email"
                                    type="string"
                                    step="0.01"
                                    defaultValue={customer.email}
                                    placeholder="Enter new name"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="email-error"
                                />
                            </div>
                        </div>
                        {/* <div id="name-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                                </p>
                            ))}
                        </div> */}
                    </div>
                </div>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    {/* Customer Name */}
                    <div className="mb-4">
                        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Image URL
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                <input
                                    id="image_url"
                                    name="image_url"
                                    type="string"
                                    step="0.01"
                                    defaultValue={customer.image_url}
                                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="email-error"
                                />
                            </div>
                        </div>
                        {/* <div id="name-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                                </p>
                            ))}
                        </div> */}
                    </div>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                href="/dashboard/customers"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                Cancel
                </Link>
                <Button type="submit">Update</Button>
            </div>
        </form>
    )
}
