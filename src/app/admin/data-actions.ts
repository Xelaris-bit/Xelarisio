
'use server';

import connectToDatabase from '@/lib/db';
import { SiteSettings, TeamMember, Service, Tool, Career, SiteMedia } from '@/lib/models';
import { revalidatePath } from 'next/cache';

import { logActivity } from './activity-actions';

// --- Site Settings ---
export async function getSiteSettings() {
    await connectToDatabase();
    const settings = await SiteSettings.findOne().lean();
    return JSON.parse(JSON.stringify(settings));
}

export async function updateSiteSettings(prevState: any, formData: FormData) {
    await connectToDatabase();

    const data = {
        companyName: formData.get('companyName'),
        contactEmail: formData.get('contactEmail'),
        phoneNumber: formData.get('phoneNumber'),
        address: formData.get('address'),
        facebookUrl: formData.get('facebookUrl'),
        twitterUrl: formData.get('twitterUrl'),
        linkedinUrl: formData.get('linkedinUrl'),
        instagramUrl: formData.get('instagramUrl'),
    };

    await SiteSettings.findOneAndUpdate({}, data, { upsert: true, new: true });
    await logActivity('UPDATE', 'Site Settings', 'Updated general site settings');
    revalidatePath('/');
    return { success: true };
}

// --- Team Members ---
export async function getTeamMembers() {
    await connectToDatabase();
    const members = await TeamMember.find().sort({ createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(members));
}

export async function updateTeamMember(prevState: any, formData: FormData) {
    await connectToDatabase();
    const id = formData.get('id') as string;
    const memberId = id === 'new' ? null : id;

    const data = {
        name: formData.get('name'),
        role: formData.get('role'),
        imageUrl: formData.get('imageUrl'),
        bio: formData.get('bio'),
    };

    if (!memberId) {
        await TeamMember.create(data);
        await logActivity('CREATE', 'Team', `Added new team member: ${data.name}`);
    } else {
        await TeamMember.findByIdAndUpdate(memberId, data);
        await logActivity('UPDATE', 'Team', `Updated team member: ${data.name}`);
    }
    revalidatePath('/about');
    return { success: true };
}

// --- Services ---
export async function getServices() {
    await connectToDatabase();
    const services = await Service.find().lean();
    return JSON.parse(JSON.stringify(services));
}

export async function saveService(prevState: any, formData: FormData) {
    await connectToDatabase();
    const id = formData.get('id') as string;
    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        icon: formData.get('icon'),
        slug: formData.get('slug'),
        imageUrl: formData.get('imageUrl'),
    };

    if (id) {
        await Service.findByIdAndUpdate(id, data);
        await logActivity('UPDATE', 'Service', `Updated service: ${data.title}`);
    } else {
        await Service.create(data);
        await logActivity('CREATE', 'Service', `Created new service: ${data.title}`);
    }
    revalidatePath('/services');
    return { success: true };
}

export async function deleteService(id: string) {
    await connectToDatabase();
    const service = await Service.findById(id);
    await Service.findByIdAndDelete(id);
    await logActivity('DELETE', 'Service', `Deleted service: ${service?.title || id}`);
    revalidatePath('/services');
    return { success: true };
}

// --- Tools ---
export async function getTools() {
    await connectToDatabase();
    const tools = await Tool.find().lean();
    return JSON.parse(JSON.stringify(tools));
}

export async function saveTool(prevState: any, formData: FormData) {
    await connectToDatabase();
    const id = formData.get('id') as string;
    const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        imageUrl: formData.get('imageUrl'),
        link: formData.get('link'),
    };

    if (id) {
        await Tool.findByIdAndUpdate(id, data);
        await logActivity('UPDATE', 'Tool', `Updated tool: ${data.name}`);
    } else {
        await Tool.create(data);
        await logActivity('CREATE', 'Tool', `Created new tool: ${data.name}`);
    }
    revalidatePath('/');
    return { success: true };
}

export async function deleteTool(id: string) {
    await connectToDatabase();
    const tool = await Tool.findById(id);
    await Tool.findByIdAndDelete(id);
    await logActivity('DELETE', 'Tool', `Deleted tool: ${tool?.name || id}`);
    revalidatePath('/');
    return { success: true };
}

// --- Careers ---
export async function getCareers() {
    await connectToDatabase();
    const careers = await Career.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(careers));
}

export async function saveCareer(prevState: any, formData: FormData) {
    await connectToDatabase();
    const id = formData.get('id') as string;
    const data = {
        title: formData.get('title'),
        department: formData.get('department'),
        location: formData.get('location'),
        type: formData.get('type'),
        description: formData.get('description'),
        requirements: formData.get('requirements'),
        isActive: formData.get('isActive') === 'on',
    };

    if (id) {
        await Career.findByIdAndUpdate(id, data);
        await logActivity('UPDATE', 'Career', `Updated career: ${data.title}`);
    } else {
        await Career.create(data);
        await logActivity('CREATE', 'Career', `Created new career: ${data.title}`);
    }
    revalidatePath('/careers');
    return { success: true };
}

export async function deleteCareer(id: string) {
    await connectToDatabase();
    const career = await Career.findById(id);
    await Career.findByIdAndDelete(id);
    await logActivity('DELETE', 'Career', `Deleted career: ${career?.title || id}`);
    revalidatePath('/careers');
    return { success: true };
}

// --- Site Media ---
export async function getSiteMedia() {
    await connectToDatabase();
    const media = await SiteMedia.find().lean();
    // Convert array to object for easier lookup: { 'logo': 'data...', 'home-hero': 'data...' }
    const mediaMap: Record<string, any> = {};
    media.forEach((item: any) => {
        mediaMap[item.name] = item;
    });
    return mediaMap;
}

export async function saveSiteMedia(prevState: any, formData: FormData) {
    await connectToDatabase();
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const data = formData.get('data') as string; // Base64

    if (!name || !data) {
        return { success: false, message: 'Missing required fields' };
    }

    await SiteMedia.findOneAndUpdate(
        { name },
        { name, type, data },
        { upsert: true, new: true }
    );

    await logActivity('UPDATE', 'Media', `Updated media: ${name}`);
    revalidatePath('/');
    return { success: true };
}
