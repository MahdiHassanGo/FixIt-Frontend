import type { Metadata } from "next";
import { Plus, Wrench } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { DeleteServiceButton } from "@/components/technician/delete-service-button";
import { ServiceForm } from "@/components/technician/service-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories, getMyServices } from "@/lib/data";
import { formatMoney } from "@/lib/format";

export const metadata: Metadata = { title: "Manage Services" };

export default async function TechnicianServicesPage() {
  const [categories, services] = await Promise.all([getCategories(), getMyServices()]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Service catalog"
        title="Profile and services management"
        description="Create listings, update prices and descriptions, and control whether each service appears in the public marketplace."
      />

      <Card>
        <CardHeader className="border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Plus className="size-5" /></span>
            <div><CardTitle>Create a service</CardTitle><p className="text-sm text-muted-foreground">Add a new public service listing.</p></div>
          </div>
        </CardHeader>
        <CardContent className="p-5 sm:p-6"><ServiceForm categories={categories} /></CardContent>
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight">My services</h2>
          <p className="mt-1 text-sm text-muted-foreground">Edit the details or remove a listing from the marketplace.</p>
        </div>

        {services.length ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader className="flex-row items-start justify-between gap-4 border-b border-border/60 pb-5">
                  <div className="min-w-0">
                    <CardTitle className="truncate text-xl">{service.title}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{service.category?.name || "Uncategorized"} · {formatMoney(service.price)}</p>
                  </div>
                  <Badge variant={service.isActive ? "default" : "secondary"}>{service.isActive ? "Active" : "Inactive"}</Badge>
                </CardHeader>
                <CardContent className="space-y-5 p-5 sm:p-6">
                  <ServiceForm categories={categories} service={service} />
                  <div className="border-t border-border/60 pt-4"><DeleteServiceButton serviceId={service.id} /></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState icon={Wrench} title="No services published" description="Use the form above to create your first service listing." />
        )}
      </section>
    </div>
  );
}
