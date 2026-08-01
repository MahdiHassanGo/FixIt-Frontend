import type { Metadata } from "next";
import { DeleteServiceButton } from "@/components/technician/delete-service-button";
import { ServiceForm } from "@/components/technician/service-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/format";
import { getCategories, getMyServices } from "@/lib/data";

export const metadata: Metadata = { title: "Manage Services" };

export default async function TechnicianServicesPage() {
  const [categories, services] = await Promise.all([getCategories(), getMyServices()]);
  return <div className="space-y-8"><div><h1 className="text-3xl font-bold">Profile and services management</h1><p className="text-muted-foreground">Create, update, activate, or soft-remove your own services.</p></div><Card><CardHeader><CardTitle>Create a service</CardTitle></CardHeader><CardContent><ServiceForm categories={categories} /></CardContent></Card><section className="space-y-4"><h2 className="text-2xl font-bold">My services</h2>{services.map((service) => <Card key={service.id}><CardHeader className="flex-row items-start justify-between"><div><CardTitle className="text-lg">{service.title}</CardTitle><p className="text-sm text-muted-foreground">{service.category?.name} · {formatMoney(service.price)}</p></div><Badge variant={service.isActive ? "default" : "secondary"}>{service.isActive ? "Active" : "Inactive"}</Badge></CardHeader><CardContent className="space-y-5"><ServiceForm categories={categories} service={service} /><DeleteServiceButton serviceId={service.id} /></CardContent></Card>)}{!services.length ? <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">Create your first service above.</div> : null}</section></div>;
}

