import AppLayout from "@/layouts/app-layout";
import { Card, BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { EditButton, DeleteButton } from "@/components/responsive-list";
import { useState } from "react";
import { ConfirmDialog } from "@/components/dialog";
import { DashboardHeader } from "@/components/header";
export default function Show({ card }: { card: Card }) {
    const breadcrumb: BreadcrumbItem[] =[
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Card',
            href: route('card.index'),
        },
        {
            title: card.title,
            href: route('card.show', {card}),
        },
    ];

    const [deleteDialog, setDeleteDialog] = useState<Partial<{
        open: boolean;
        processing: boolean;
    }>>({
        open: false,
        processing: false,
    });
    
    const openDeleteDialog = (): void => {
        setDeleteDialog({ open: true });
    }
    
    const deleteCard = (): void => {
        setDeleteDialog({ processing: true });
        router.delete(route('card.destroy', { card: card.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialog({ processing: false, open: false });
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Card Show" />
            
            <DashboardHeader title={`Card ${card.title}`} />

            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Title</div>
                        <div className="text-sm">{card.title}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Balance</div>
                        <div className="text-sm">{card.balance}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Description</div>
                        <div className="text-sm">{card.description}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Created At</div>
                        <div className="text-sm">{card.created_at}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">Updated At</div>
                        <div className="text-sm">{card.updated_at}</div>
                    </div>
                    <div className="flex gap-2">
                        <EditButton href={route('card.edit', {card})} />
                        <DeleteButton onClick={openDeleteDialog} />
                    </div>
                </div>
            </div>

            <ConfirmDialog 
                isOpen={deleteDialog.open || false} 
                onOpenChange={(open) => setDeleteDialog({ open })} 
                onDelete={() => deleteCard()} 
                processing={deleteDialog.processing || false} 
                model="card"
            />
        </AppLayout>
    );
}
