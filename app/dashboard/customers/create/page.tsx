import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';
import { fetchCustomers } from '@/app/lib/data';
import { createCustomer } from '@/app/lib/actions';

export const metadata: Metadata = {
    title: 'New Customer',
};

export default async function Page() {
    const customers = await fetchCustomers();
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Customers', href: '/dashboard/customers' },
                {
                    label: 'Create Customer',
                    href: '/dashboard/customers/create',
                    active: true,
                },
                ]}
            />
            {/* Not happy with how I am passing props for the new customer Form, I technically need the customers to check if a customer already exists with that email */}
            <Form customer={customers}/>
        </main>
    );
}