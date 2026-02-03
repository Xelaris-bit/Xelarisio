'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';
import { Activity, LogIn, LogOut, Edit, Plus, Trash2, ShieldAlert } from 'lucide-react';
import { clearActivities } from '@/app/admin/activity-actions';
import { useToast } from "@/hooks/use-toast";

type ActivityLogProps = {
    activities?: any[];
    isSuperAdmin?: boolean;
};

import { useRouter } from 'next/navigation';

export default function ActivityLog({ activities = [], isSuperAdmin = false }: ActivityLogProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isClearing, setIsClearing] = useState(false);

    const getIcon = (action: string) => {
        switch (action) {
            case 'LOGIN': return <LogIn className="h-4 w-4" />;
            case 'LOGOUT': return <LogOut className="h-4 w-4" />;
            case 'UPDATE': return <Edit className="h-4 w-4" />;
            case 'CREATE': return <Plus className="h-4 w-4" />;
            case 'DELETE': return <Trash2 className="h-4 w-4" />;
            default: return <Activity className="h-4 w-4" />;
        }
    };

    const getColor = (action: string) => {
        switch (action) {
            case 'LOGIN': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
            case 'LOGOUT': return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
            case 'UPDATE': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
            case 'CREATE': return 'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20';
            case 'DELETE': return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
            default: return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
        }
    };

    async function handleClear() {
        if (!confirm('Are you sure you want to clear the ENTIRE activity log? This cannot be undone.')) return;

        setIsClearing(true);
        const result = await clearActivities();
        setIsClearing(false);

        if (result.success) {
            toast({ title: "Success", description: result.message });
            router.refresh();
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
    }

    return (
        <Card className="border-slate-200 bg-white/60 backdrop-blur-md shadow-xl text-slate-950">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                        <Activity className="h-6 w-6 text-accent" />
                        System Activity Log
                    </CardTitle>
                    <p className="text-slate-500 mt-1">Track all admin logins, logouts, and content updates.</p>
                </div>
                {isSuperAdmin && activities.length > 0 && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleClear}
                        disabled={isClearing}
                        className="gap-2"
                    >
                        <ShieldAlert className="h-4 w-4" />
                        {isClearing ? 'Clearing...' : 'Clear Log'}
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                        {activities.length === 0 ? (
                            <div className="text-center text-slate-500 py-10">
                                No activity recorded yet.
                            </div>
                        ) : (
                            activities.map((log: any) => (
                                <div
                                    key={log._id}
                                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white/80 p-4 transition-colors hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getColor(log.action)}`}>
                                            {getIcon(log.action)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                {log.action} <span className="text-slate-400">•</span> {log.target}
                                            </p>
                                            <p className="text-sm text-slate-600">
                                                {log.details}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="outline" className="border-slate-300 text-slate-600">
                                            {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                                        </Badge>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {new Date(log.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
