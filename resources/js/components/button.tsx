import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";

function CreateButton({ href }: { href: string }) {
    return (
        <Link 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-green-500 hover:bg-green-600 text-white p-3 dark:bg-green-600 dark:hover:bg-green-700" 
            href={href}
            >
            Create 
            <PlusIcon className="w-4 h-4 ms-2" />
        </Link>
    )
}

function LinkButton({ href, children, variant = 'default', className }: { href: string, children: React.ReactNode, variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost', className?: string }) {
    return (
        <Link href={href}>
            <Button variant={variant} className={cn({className, 'cursor-pointer' : true})}>
                {children}
            </Button>
        </Link>
    )
}


export { CreateButton, LinkButton };
