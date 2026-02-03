
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export function getIcon(iconName: string): LucideIcon {
    // @ts-ignore - Dynamic access to icons
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.HelpCircle; // Default to HelpCircle if not found
}
