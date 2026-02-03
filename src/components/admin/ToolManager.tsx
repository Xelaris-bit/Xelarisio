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
import { saveTool, deleteTool } from '@/app/admin/data-actions';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

import { useRouter } from 'next/navigation';

export default function ToolManager({ initialData }: { initialData: any[] }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [currentTool, setCurrentTool] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { toast } = useToast();

    const handleOpen = (tool: any = null) => {
        setCurrentTool(tool);
        setSelectedImage(tool?.imageUrl || null);
        setIsOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this tool?")) {
            await deleteTool(id);
            toast({ title: "Tool Deleted", description: "Tool removed successfully." });
            router.refresh();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (currentTool && currentTool._id) {
            formData.append('id', currentTool._id);
        }

        if (selectedImage) {
            formData.set('imageUrl', selectedImage);
        }

        const result = await saveTool(null, formData);
        if (result.success) {
            toast({ title: "Success", description: "Tool saved successfully." });
            setIsOpen(false);
            router.refresh();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tools & Technologies</h2>
                <Button onClick={() => handleOpen()} className="bg-primary text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Tool
                </Button>
            </div>

            <div className="rounded-md border bg-white/90 backdrop-blur-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Icon</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData && initialData.length > 0 ? (
                            initialData.map((tool) => (
                                <TableRow key={tool._id}>
                                    <TableCell>
                                        {tool.imageUrl ? (
                                            <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                                                <Image src={tool.imageUrl} alt={tool.name} fill className="object-contain p-1" />
                                            </div>
                                        ) : <span className="text-xs text-muted-foreground">No Icon</span>}
                                    </TableCell>
                                    <TableCell className="font-medium">{tool.name}</TableCell>
                                    <TableCell className="max-w-xs truncate" title={tool.description}>{tool.description}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpen(tool)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(tool._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No tools found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentTool ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue={currentTool?.name} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={currentTool?.description} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Tool Icon/Logo</Label>
                            <div className="flex gap-4 items-center">
                                {selectedImage && (
                                    <div className="relative h-16 w-16 overflow-hidden rounded-md border text-center flex items-center justify-center">
                                        <Image src={selectedImage} alt="Preview" fill className="object-contain p-1" />
                                    </div>
                                )}
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link">Link (Optional)</Label>
                            <Input id="link" name="link" defaultValue={currentTool?.link} />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit">Save Tool</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
