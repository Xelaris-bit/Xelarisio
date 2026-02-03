'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, Trash2, Edit as EditIcon, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { createManager, deleteManager, updateManager } from '@/app/admin/manager-actions';
import { useRouter } from 'next/navigation';

type Manager = {
    _id: string;
    username: string;
    permissions: string[];
    createdAt: string;
};

type ManagerManagerProps = {
    initialManagers: Manager[];
};

const PERMISSIONS = [
    { id: 'media', label: 'Images & Logos' },
    { id: 'services', label: 'Services' },
    { id: 'careers', label: 'Careers' },
    { id: 'tools', label: 'Tools' },
    { id: 'activity', label: 'Activity Log' },
];

export default function ManagerManager({ initialManagers = [] }: ManagerManagerProps) {
    const router = useRouter();
    const [managers, setManagers] = useState<Manager[]>(initialManagers);
    const [isLoading, setIsLoading] = useState(false);
    const [editingManager, setEditingManager] = useState<Manager | null>(null);
    const { toast } = useToast();

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        let result;

        if (editingManager) {
            result = await updateManager(editingManager._id, formData);
        } else {
            result = await createManager(null, formData);
        }

        setIsLoading(false);

        setIsLoading(false);

        if (result && result.success) {
            toast({ title: "Success", description: result.message });
            setEditingManager(null);
            router.refresh();
        } else {
            toast({ title: "Error", description: result?.message || 'Action failed', variant: "destructive" });
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this manager?')) return;

        const result = await deleteManager(id);
        if (result.success) {
            toast({ title: "Deleted", description: result.message });
            setManagers(managers.filter(m => m._id !== id));
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
    }

    function startEdit(manager: Manager) {
        setEditingManager(manager);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function cancelEdit() {
        setEditingManager(null);
    }

    return (
        <div className="space-y-6">
            <Card className="border-slate-200 bg-white/60 backdrop-blur-md shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900">
                        {editingManager ? <EditIcon className="h-5 w-5 text-primary" /> : <UserPlus className="h-5 w-5 text-primary" />}
                        {editingManager ? `Edit Manager: ${editingManager.username}` : 'Create New Manager'}
                    </CardTitle>
                    <CardDescription>
                        {editingManager ? 'Update permissions or change password (leave blank to keep current).' : 'Create a dedicated login for a manager and assign specific permissions.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="manager_dave"
                                    required
                                    defaultValue={editingManager?.username || ''}
                                    disabled={!!editingManager}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder={editingManager ? "Leave blank to keep current" : "••••••••"}
                                    required={!editingManager}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Permissions</Label>
                            <div className="flex flex-wrap gap-4">
                                {PERMISSIONS.map((perm) => (
                                    <div key={perm.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`perm-${perm.id}`}
                                            name="permissions"
                                            value={perm.id}
                                            defaultChecked={editingManager ? editingManager.permissions.includes(perm.id) : false}
                                            key={`${editingManager ? 'edit' : 'create'}-${perm.id}`}
                                        />
                                        <Label htmlFor={`perm-${perm.id}`} className="font-normal cursor-pointer">{perm.label}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (editingManager ? <EditIcon className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />)}
                                {editingManager ? 'Update Manager' : 'Create Manager'}
                            </Button>
                            {editingManager && (
                                <Button type="button" variant="outline" onClick={cancelEdit}>
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white/60 backdrop-blur-md shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900">
                        <Users className="h-5 w-5 text-primary" />
                        Active Managers
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {managers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-6 text-slate-500">
                                        No managers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                managers.map((manager) => (
                                    <TableRow key={manager._id}>
                                        <TableCell className="font-medium">{manager.username}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {manager.permissions.map(p => (
                                                    <Badge key={p} variant="secondary" className="text-xs">
                                                        {PERMISSIONS.find(perm => perm.id === p)?.label || p}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-sm">
                                            {new Date(manager.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => startEdit(manager)} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                                                    <EditIcon className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete(manager._id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
