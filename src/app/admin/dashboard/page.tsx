import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsForm from "@/components/admin/SettingsForm";
import TeamManager from "@/components/admin/TeamManager";
import ServiceManager from "@/components/admin/ServiceManager";
import CareerManager from "@/components/admin/CareerManager";
import ToolManager from "@/components/admin/ToolManager";
import MediaManager from "@/components/admin/MediaManager";
import { getSiteSettings, getTeamMembers, getServices, getTools, getCareers, getSiteMedia } from "../data-actions";
import { LogOut } from "lucide-react";
import { logout } from "../actions";
import { Button } from "@/components/ui/button";

import { cookies } from 'next/headers';
import ActivityLog from "@/components/admin/ActivityLog";
import ManagerManager from "@/components/admin/ManagerManager"; // Import ManagerManager
import { getActivities } from "../activity-actions";
import { getManagers } from "../manager-actions"; // Import getManagers

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

                <Tabs defaultValue={hasAccess('settings') ? "settings" : (isSuperAdmin ? "managers" : (permissions[0] || "activity"))} className="space-y-6">
                    <TabsList className="bg-black/20 p-1 backdrop-blur-md border border-white/10 rounded-xl w-full justify-start h-auto flex-wrap">
                        {/* Super Admin Only: Managers Tab */}
                        {isSuperAdmin && (
                            <TabsTrigger value="managers" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">👥 Managers</TabsTrigger>
                        )}

                        {/* Conditionally Render Tabs */}
                        {hasAccess('settings') && <TabsTrigger value="settings" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">General Settings</TabsTrigger>}
                        {hasAccess('media') && <TabsTrigger value="media" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Images & Logo</TabsTrigger>}
                        {hasAccess('team') && <TabsTrigger value="team" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Team</TabsTrigger>}
                        {hasAccess('services') && <TabsTrigger value="services" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Services</TabsTrigger>}
                        {hasAccess('careers') && <TabsTrigger value="careers" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Careers</TabsTrigger>}
                        {hasAccess('tools') && <TabsTrigger value="tools" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Tools</TabsTrigger>}

                        {/* Activity Log - Restricted access */}
                        {hasAccess('activity') && <TabsTrigger value="activity" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-lg px-6 py-3 ml-1 my-1">Activity Log</TabsTrigger>}
                    </TabsList>

                    <div className="rounded-2xl bg-white/80 border border-white/10 p-6 backdrop-blur-sm shadow-inner text-foreground">
                        {isSuperAdmin && <TabsContent value="managers"><ManagerManager initialManagers={managers} /></TabsContent>}

                        {hasAccess('settings') && <TabsContent value="settings"><SettingsForm initialData={settings} /></TabsContent>}
                        {hasAccess('media') && <TabsContent value="media"><MediaManager initialMedia={media} /></TabsContent>}
                        {hasAccess('team') && <TabsContent value="team"><TeamManager initialData={teamMembers} /></TabsContent>}
                        {hasAccess('services') && <TabsContent value="services"><ServiceManager initialData={services} /></TabsContent>}
                        {hasAccess('careers') && <TabsContent value="careers"><CareerManager initialData={careers} /></TabsContent>}
                        {hasAccess('tools') && <TabsContent value="tools"><ToolManager initialData={tools} /></TabsContent>}
                        {hasAccess('activity') && <TabsContent value="activity"><ActivityLog activities={activities} isSuperAdmin={isSuperAdmin} /></TabsContent>}
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
