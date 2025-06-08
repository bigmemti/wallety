import { DashboardHeader } from "@/components/header";
import { TextInput, Form, FormContainer, NumberInput, TextareaInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

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
        'title' : 'Create',
        'href' : route('card.create')
    },
];

interface CardForm {
    title: string;
    balance: number;
    description: string;
}

export default function Create(){
    const { post, data, setData, errors, processing } = useForm<Required<CardForm>>({
        title: '', 
        balance: 0,
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('card.store'));
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Card" />
            
            <DashboardHeader title="Create Card" />

            <FormContainer>
                <Form onSubmit={submit}>
                    <TextInput label="Title" name="title" value={data.title} onChange={e => setData('title', e.target.value)} errors={errors.title} />

                    <NumberInput label="Balance" name="balance" value={data.balance} onChange={e => setData('balance', Number(e.target.value))} errors={errors.balance} />

                    <TextareaInput label="Description" name="description" value={data.description} onChange={e => setData('description', e.target.value)} errors={errors.description} />

                    <Button disabled={processing} className="cursor-pointer mt-4 w-full">{processing ? 'Creating ...' : 'Create'}</Button>
                </Form>
            </FormContainer>
        </AppLayout>
    )
}