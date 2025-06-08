import { TextInput, Form, FormContainer, NumberInput, TextareaInput } from "@/components/form";
import { DashboardHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Card, BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Edit({card}: {card: Card}){
    const breadcrumbs: BreadcrumbItem[] = [
        {
            'title' : 'Dashboard',
            'href' : route('dashboard')
        },
        {
            'title' : 'Card',
            'href' : route('card.index')
        },
        {
            'title' : card.title,
            'href' : route('card.show', {card: card.id})
        },
        {
            'title' : 'Edit',
            'href' : route('card.edit', {card: card.id})
        },
    ];

    interface CardForm {
        title: string;
        balance: number;
        description: string;
    }

    const { data, setData, put, errors, processing } = useForm<Required<CardForm>>({
        title: card.title, 
        balance: card.balance,
        description: card.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('card.update', {card: card.id}));
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Card"/>

            <DashboardHeader title="Edit Card" />
            
            <FormContainer>
                <Form onSubmit={submit}>
                    <TextInput label="Title" name="title" value={data.title} onChange={e => setData('title', e.target.value)} errors={errors.title} />

                    <NumberInput label="Balance" name="balance" value={data.balance} onChange={e => setData('balance', Number(e.target.value))} errors={errors.balance} />

                    <TextareaInput label="Description" name="description" value={data.description} onChange={e => setData('description', e.target.value)} errors={errors.description} />

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Updating ...' : 'Update'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}