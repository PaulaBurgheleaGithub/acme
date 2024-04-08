'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.'
    }),
    amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.'
    }),
    date: z.string(),
});

const FormSchema2 = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please enter the full customer name.'
    }),
    email: z.string({
        invalid_type_error: 'Please enter an email address.'
    }),
    image_url: z.string({
        invalid_type_error: 'Please enter a link.'
    }),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CreateCustomer = FormSchema2.omit({ });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateCustomer = FormSchema2.omit({ id: true});



export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export type State2 = {
    errors?: {
        name?: string[];
        email?: string[];
        image_url?:string[];
    };
    message?: string | null;
};



export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
      // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error
        return { message: 'Database Error: Failed to Create Invoice'};
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
};

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}`;

    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice'};
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
};

export async function createCustomer(prevState: State2, formData: FormData) {
    const validatedFields = CreateCustomer.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        image_url: formData.get('image_url')
    });
      // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.',
        };
    }
    const { name, email, image_url } = validatedFields.data;

    try {
        await sql`
        INSERT INTO customers (name, email, image_url)
        VALUES (${name}, ${email}, ${image_url})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error
        return { message: 'Database Error: Failed to Create Customer'};
    }
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
};

export async function updateCustomer(
    id: string,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateCustomer.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        image_url:formData.get('image_url')
    });
    
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }
    const { name, email, image_url } = validatedFields.data;

    try {
        await sql`
        UPDATE customers
        SET name = ${name}, email = ${email}, image_url = ${image_url}
        WHERE id = ${id}`;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice'};
    }
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
};

export async function deleteInvoice(id: string) {
    //throw new Error('Failed to Delete Invoice');

    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return {message: 'Invoice Successfully Deleted!'}
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice'};
    }
};

export async function deleteCustomer(id: string) {

    try {
        await sql`DELETE FROM customers WHERE id = ${id}`;
        revalidatePath('/dashboard/customers');
        return {message: 'Customer Successfully Deleted!'}
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Customer'};
    }
};

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
    ) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
        switch (error.type) {
        case 'CredentialsSignin':
            return 'Invalid credentials provided.';
        default:
            return 'Something went wrong. Please try again!';
        }
    }
    throw error;
    }
};