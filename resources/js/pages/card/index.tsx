import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Card, BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { DashboardHeader } from "@/components/header";
import { ActionHeaderCell, AutoHeaderCell, ListHeader, ResponsiveList, SmallHeaderCell, WideHeaderCell, ListItem, SmallInfoCell, AutoInfoCell, WideInfoCell, ActionCell, DeleteButton, EditButton, ShowButton } from "@/components/responsive-list";
import { ConfirmDialog } from '@/components/dialog';
import { toast } from "sonner";

const breadcrumb: BreadcrumbItem[] =[
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Card',
        href: route('card.index'),
    },
];

export default function Index({ cards, success } : { cards: Card[], success: string }) {

    useEffect(() => {
        if (success) {
            console.log(success);
            toast.success(success);
        }
        return router.on('success', (event) => {
            console.log(event.detail.page.props.success);
          toast.success(event.detail.page.props.success as string);
        })
      }, [])
    
    const [deleteDialog, setDeleteDialog] = useState<Partial<{
        open: boolean;
        id: number | null;
        processing: boolean;
    }>>({
        open: false,
        id: null,
        processing: false,
    });

    const deleteCard = (): void => {
        setDeleteDialog({ processing: true });
        router.delete(route('card.destroy', { card: deleteDialog.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteDialog({ processing: false, open: false, id: null });
            },
        });
    }

    const openDeleteDialog = (id: number): void => {
        setDeleteDialog({ open: true, id });
    }

    return(
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Card List" />

            <DashboardHeader 
                title="Card List" 
                href={route('card.create')} 
            />

            <ResponsiveList>
                <ListHeader>
                    <SmallHeaderCell>ID</SmallHeaderCell>
                    <AutoHeaderCell>Title</AutoHeaderCell>
                    <WideHeaderCell>Balance</WideHeaderCell>
                    <WideHeaderCell>Created At</WideHeaderCell>
                    <WideHeaderCell>Updated At</WideHeaderCell>
                    <ActionHeaderCell>Actions</ActionHeaderCell>
                </ListHeader>

                {cards.map((card) => (
                    <ListItem key={card.id}>
                        <SmallInfoCell label="ID" value={card.id.toString()} />
                        <AutoInfoCell label="Title" value={card.title} />
                        <WideInfoCell label="Balance" value={card.balance.toString()} />
                        <WideInfoCell label="Created At" value={card.created_at} />
                        <WideInfoCell label="Updated At" value={card.updated_at} />
                        <ActionCell> 
                            <ShowButton href={route('card.show', {card})} />
                            <EditButton href={route('card.edit', {card})} />
                            <DeleteButton onClick={() => openDeleteDialog(card.id)} />
                        </ActionCell>
                    </ListItem>
                ))}  
            </ResponsiveList>

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