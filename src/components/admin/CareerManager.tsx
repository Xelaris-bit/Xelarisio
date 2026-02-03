'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { saveCareer, deleteCareer } from '@/app/admin/data-actions';
import { useToast } from "@/hooks/use-toast";

import { useRouter } from 'next/navigation';

export default function CareerManager({ initialData }: { initialData: any[] }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [currentCareer, setCurrentCareer] = useState<any>(null);
    const { toast } = useToast();

    const handleOpen = (career: any = null) => {
        setCurrentCareer(career);
        setIsOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this job posting?")) {
            try {
                await deleteCareer(id);
                toast({ title: "Career Deleted", description: "Job posting has been removed." });
                router.refresh();
            } catch (error) {
                toast({ title: "Error", description: "Failed to delete job.", variant: "destructive" });
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (currentCareer && currentCareer._id) {
            formData.append('id', currentCareer._id);
        }

        // Checkbox 'isActive' will be 'on' if checked, missing if not. 
        // Backend expects 'on' for true.

        try {
            const result = await saveCareer(null, formData);
            if (result.success) {
                toast({ title: "Success", description: "Job posting saved successfully." });
                setIsOpen(false);
                router.refresh();
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to save job.", variant: "destructive" });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Job Vacancies</h2>
                <Button onClick={() => handleOpen()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Job
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData && initialData.length > 0 ? (
                            initialData.map((career) => (
                                <TableRow key={career._id}>
                                    <TableCell className="font-medium">{career.title}</TableCell>
                                    <TableCell>{career.department}</TableCell>
                                    <TableCell>{career.location}</TableCell>
                                    <TableCell>{career.type}</TableCell>
                                    <TableCell>{career.isActive ? 'Active' : 'Draft'}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpen(career)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(career._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">No job postings found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{currentCareer ? 'Edit Job Posting' : 'Add New Job'}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Job Title</Label>
                                <Input id="title" name="title" defaultValue={currentCareer?.title} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Input id="department" name="department" defaultValue={currentCareer?.department} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" defaultValue={currentCareer?.location} placeholder="e.g. Remote / NYC" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Input id="type" name="type" defaultValue={currentCareer?.type} placeholder="Full-time" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Markdown supported)</Label>
                            <Textarea id="description" name="description" defaultValue={currentCareer?.description} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="requirements">Requirements</Label>
                            <Textarea id="requirements" name="requirements" defaultValue={currentCareer?.requirements} placeholder="List requirements..." />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isActive"
                                name="isActive"
                                defaultChecked={currentCareer ? currentCareer.isActive : true}
                            />
                            <Label htmlFor="isActive">Active (Visible on website)</Label>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit">Save Job</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
