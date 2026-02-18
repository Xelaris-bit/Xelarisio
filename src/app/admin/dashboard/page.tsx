import { getSiteSettings, getTeamMembers, getServices, getTools, getCareers, getSiteMedia } from "../data-actions";
import { LogOut } from "lucide-react";
import { logout } from "../actions";
import { Button } from "@/components/ui/button";
import { cookies } from 'next/headers';
import { getActivities } from "../activity-actions";
import { getManagers } from "../manager-actions";
import DashboardTabs from "@/components/admin/DashboardTabs";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // 1. Get Session Info
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    let role = 'GUEST';
    let permissions: string[] = [];

    if (sessionCookie) {
        try {
            const session = JSON.parse(sessionCookie.value);
            role = session.role;
            permissions = session.permissions || [];
        } catch (e) {
            // Legacy cookie support (just "true" string) -> Treat as Super Admin
            if (sessionCookie.value === 'true') {
                role = 'SUPER_ADMIN';
                permissions = ['all'];
            }
        }
    }

    const isSuperAdmin = role === 'SUPER_ADMIN';

    // Helper to check access
    const hasAccess = (perm: string) => isSuperAdmin || permissions.includes(perm);

    // 2. Fetch Data
    const [settings, teamMembers, services, tools, careers, media, activities, managers] = await Promise.all([
        getSiteSettings(),
        getTeamMembers(),
        getServices(),
        getTools(),
        getCareers(),
        getSiteMedia(),
        getActivities(),
        isSuperAdmin ? getManagers() : Promise.resolve([]) // Only fetch managers if Super Admin
    ]);

    return (
        <div className="min-h-screen bg-[url('/grid-pattern.svg')] bg-cover bg-fixed p-4 md:p-8 relative">
            {/* Background Overlay for better readability */}
            <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

            {/* Glassmorphism Container */}
            <div className="relative z-10 mx-auto max-w-7xl rounded-3xl border border-white/20 bg-white/10 p-4 md:p-8 shadow-2xl backdrop-blur-xl">

                <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md">Admin Dashboard</h1>
                        <p className="text-white/70">
                            {isSuperAdmin ? 'Super Admin Control Panel' : 'Manager Dashboard'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Show Role Badge */}
                        <div className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-md border border-white/10">
                            {role === 'SUPER_ADMIN' ? '👑 Super Admin' : '👤 Manager'}
                        </div>
                        <form action={logout}>
                            <Button variant="destructive" className="gap-2 shadow-lg hover:bg-red-600/90 rounded-full px-6">
                                <LogOut className="h-4 w-4" /> Logout
                            </Button>
                        </form>
                    </div>
                </div>

                <DashboardTabs
                    role={role}
                    permissions={permissions}
                    data={{
                        settings,
                        teamMembers,
                        services,
                        tools,
                        careers,
                        media,
                        activities,
                        managers
                    }}
                />
            </div>
        </div>
    );
}
