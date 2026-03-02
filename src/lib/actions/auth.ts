'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@lemuria.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function loginAction(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return { success: true };
    }

    if (email !== ADMIN_EMAIL) {
        return { success: false, error: 'Invalid email address' };
    }

    return { success: false, error: 'Invalid password' };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}
