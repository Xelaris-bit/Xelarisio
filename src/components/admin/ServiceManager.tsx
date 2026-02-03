'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveService, deleteService } from '@/app/admin/data-actions';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

export default function ServiceManager({ initialData }: { initialData: any[] }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [currentService, setCurrentService] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { toast } = useToast();

    const handleOpen = (service: any = null) => {
        setCurrentService(service);
        setSelectedImage(service?.imageUrl || null);
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
        if (confirm("Are you sure you want to delete this service?")) {
            await deleteService(id);
            toast({ title: "Service Deleted", description: "Service removed successfully." });
            router.refresh();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (currentService && currentService._id) {
            formData.append('id', currentService._id);
        }

        // Add image if selected
        // Add image if selected, OR explicit empty string if removed
        if (selectedImage) {
            formData.append('imageUrl', selectedImage);
        } else {
            formData.append('imageUrl', '');
        }

        const result = await saveService(null, formData);
        if (result.success) {
            toast({ title: "Success", description: "Service saved successfully." });
            setIsOpen(false);
            router.refresh();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Services</h2>
                <Button onClick={() => handleOpen()} className="bg-primary text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Service
                </Button>
            </div>

            <div className="rounded-md border bg-white/90 backdrop-blur-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Icon</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialData && initialData.length > 0 ? (
                            initialData.map((service) => (
                                <TableRow key={service._id}>
                                    <TableCell className="font-medium">{service.icon}</TableCell>
                                    <TableCell>{service.title}</TableCell>
                                    <TableCell>{service.slug}</TableCell>
                                    <TableCell>
                                        {service.imageUrl ? (
                                            <Image src={service.imageUrl} alt="Service" width={40} height={40} className="rounded object-cover" />
                                        ) : <span className="text-muted-foreground text-xs">No Image</span>}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpen(service)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(service._id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No services found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{currentService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" defaultValue={currentService?.title} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (URL)</Label>
                                <Input id="slug" name="slug" defaultValue={currentService?.slug} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={currentService?.description} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="icon">Icon Name (Lucide React)</Label>
                            <Input id="icon" name="icon" defaultValue={currentService?.icon || 'Code'} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Service Image</Label>
                            <div className="flex gap-4 items-center">
                                {selectedImage ? (
                                    <div className="flex items-center gap-2">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                                            <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedImage(null);
                                                // Clear file input if possible
                                                const fileInput = document.getElementById('image') as HTMLInputElement;
                                                if (fileInput) fileInput.value = '';
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="h-16 w-16 rounded-md border border-dashed flex items-center justify-center text-muted-foreground bg-muted/50">
                                        <ImageIcon className="h-6 w-6 opacity-50" />
                                    </div>
                                )}
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="max-w-[250px]" />
                            </div>
                            <p className="text-xs text-muted-foreground">Recommended size: 600x400px (3:2 aspect ratio)</p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit">Save Service</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
