import { CreateButton } from "@/components/button";

function DashboardHeader({ title, href = null }: { title: string, href?: string | null }) {
    return (
        <div className="p-4 flex justify-between">
            <div className="text-2xl font-bold">{title}</div>
            <div>
                {href && <CreateButton href={href} />}
            </div>
        </div>
    )
}

export  { DashboardHeader };
