
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { logActivity } from './activity-actions';

import { Manager } from '@/lib/models';
import connectToDatabase from '@/lib/db';

export async function login(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    await connectToDatabase();

    // 1. Check Super Admin (Env Vars)
    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', JSON.stringify({ role: 'SUPER_ADMIN', permissions: ['all'] }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        await logActivity('LOGIN', 'System', 'Super Admin logged in');
        return { success: true };
    }

    // 2. Check Manager (Database)
    try {
        const manager = await Manager.findOne({ username });
        if (manager && manager.password === password) {
            const cookieStore = await cookies();
            cookieStore.set('admin_session', JSON.stringify({
                role: 'MANAGER',
                permissions: manager.permissions,
                username: manager.username
            }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            await logActivity('LOGIN', 'System', `Manager ${username} logged in`);
            return { success: true };
        }
    } catch (error) {
        console.error('Login error:', error);
    }

    return { success: false, message: 'Invalid credentials' };
}

export async function logout() {
    await logActivity('LOGOUT', 'System', 'Admin logged out');
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}
