'use server';

import { Manager } from '@/lib/models';
import connectToDatabase from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { logActivity } from './activity-actions';
import { cookies } from 'next/headers';

// Authorization check helper
async function requireSuperAdmin() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    if (!session) return false;

    try {
        const data = JSON.parse(session.value);
        return data.role === 'SUPER_ADMIN';
    } catch {
        return false;
    }
}

export async function getManagers() {
    if (!await requireSuperAdmin()) return [];

    await connectToDatabase();
    // Return all managers but exclude password field
    const managers = await Manager.find({}).sort({ createdAt: -1 }).select('-password').lean();
    return JSON.parse(JSON.stringify(managers));
}

export async function createManager(prevState: any, formData: FormData) {
    try {
        if (!await requireSuperAdmin()) {
            return { success: false, message: 'Unauthorized' };
        }

        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const permissions = formData.getAll('permissions') as string[];

        if (!username || !password) {
            return { success: false, message: 'Username and Password are required' };
        }

        await connectToDatabase();

        const existing = await Manager.findOne({ username });
        if (existing) {
            return { success: false, message: 'Username already exists' };
        }

        await Manager.create({
            username,
            password,
            permissions,
            createdBy: 'Super Admin'
        });

        await logActivity('CREATE', 'Manager', `Created manager ${username}`);
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Manager created successfully' };
    } catch (error) {
        console.error('Create manager error:', error);
        return { success: false, message: 'Failed to create manager' };
    }
}

export async function deleteManager(id: string) {
    if (!await requireSuperAdmin()) {
        return { success: false, message: 'Unauthorized' };
    }

    await connectToDatabase();
    try {
        const manager = await Manager.findByIdAndDelete(id);
        if (manager) {
            await logActivity('DELETE', 'Manager', `Deleted manager ${manager.username}`);
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Manager deleted' };
        }
    } catch (error) {
        console.error('Delete manager error:', error);
        return { success: false, message: 'Failed to delete manager' };
    }
    return { success: false, message: 'Manager not found' };
}

export async function updateManager(id: string, formData: FormData) {
    try {
        if (!await requireSuperAdmin()) {
            return { success: false, message: 'Unauthorized' };
        }

        const permissions = formData.getAll('permissions') as string[];
        const password = formData.get('password') as string;

        await connectToDatabase();

        const updateData: any = { permissions };
        if (password && password.trim() !== '') {
            updateData.password = password;
        }

        const manager = await Manager.findByIdAndUpdate(id, updateData, { new: true });

        if (manager) {
            await logActivity('UPDATE', 'Manager', `Updated permissions for ${manager.username}`);
            revalidatePath('/admin/dashboard');
            return { success: true, message: 'Manager updated successfully' };
        }
        return { success: false, message: 'Manager not found' };
    } catch (error) {
        console.error('Update manager error:', error);
        return { success: false, message: 'Failed to update manager' };
    }
}
