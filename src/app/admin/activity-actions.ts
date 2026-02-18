'use server';

import connectToDatabase from '@/lib/db';
import { AdminActivity } from '@/lib/models';
import { revalidatePath } from 'next/cache';

export async function logActivity(action: string, target: string, details: string) {
    try {
        await connectToDatabase();
        await AdminActivity.create({
            action,
            target,
            details,
            timestamp: new Date(),
        });
        // We don't revalidate fetchers here usually to avoid excessive re-renders, 
        // as logs are often viewed in a specific tab.
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
}

export async function getActivities() {
    try {
        await connectToDatabase();
        const activities = await AdminActivity.find()
            .sort({ timestamp: -1 })
            .limit(100) // Limit to last 100 activities
            .lean();
        return JSON.parse(JSON.stringify(activities));
    } catch (error) {
        console.error('Failed to fetch activities:', error);
        return [];
    }
}

export async function getAllActivities() {
    try {
        await connectToDatabase();
        const activities = await AdminActivity.find()
            .sort({ timestamp: -1 })
            .lean();
        return JSON.parse(JSON.stringify(activities));
    } catch (error) {
        console.error('Failed to fetch all activities:', error);
        return [];
    }
}


export async function clearActivities() {
    // Basic Super Admin Check (Env Vars or Cookie Role)
    // We import cookies dynamically
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');

    let isSuperAdmin = false;
    if (sessionCookie) {
        try {
            const session = JSON.parse(sessionCookie.value);
            if (session.role === 'SUPER_ADMIN') isSuperAdmin = true;
        } catch {
            if (sessionCookie.value === 'true') isSuperAdmin = true; // Legacy
        }
    }

    if (!isSuperAdmin) {
        return { success: false, message: 'Unauthorized' };
    }

    try {
        await connectToDatabase();
        await AdminActivity.deleteMany({});
        revalidatePath('/admin/dashboard');
        return { success: true, message: 'Activity log cleared successfully' };
    } catch (error) {
        console.error('Failed to clear activities:', error);
        return { success: false, message: 'Failed to clear log' };
    }
}
