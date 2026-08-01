import type { Metadata } from "next";
import { ServiceFilters } from "@/components/services/service-filters";
import { Pagination } from "@/components/shared/pagination";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { getCategories, getServices } from "@/lib/data";

export const metadata: Metadata = { title: "Browse Services" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ServicesPage({ searchParams }: Props) {
  const raw = await searchParams;
  const params = new URLSearchParams();
  const allowed = ["searchTerm", "categoryId", "location", "minPrice", "maxPrice", "page", "sortBy", "sortOrder"];
  allowed.forEach((key) => {
    const value = raw[key];
    if (typeof value === "string" && value) params.set(key, value);
  });
  params.set("limit", "9");

  const [categories, servicesResponse] = await Promise.all([getCategories(), getServices(params.toString())]);
  const minRating = Number(typeof raw.minRating === "string" ? raw.minRating : 0);
  const services = minRating > 0 ? servicesResponse.data.filter((service) => (service.technician?.rating || 0) >= minRating) : servicesResponse.data;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Marketplace" title="Find the right home service" description="Use backend-supported filters for category, location, and price. Rating is applied to the technician data embedded in each service result." />
      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <ServiceFilters categories={categories} />
        <div>
          <p className="mb-5 text-sm text-muted-foreground">Showing {services.length} service{services.length === 1 ? "" : "s"} on this page.</p>
          {services.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{services.map((service) => <ServiceCard key={service.id} service={service} />)}</div> : <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">No services match the selected filters.</div>}
          <Pagination meta={servicesResponse.meta} searchParams={params} />
        </div>
      </div>
    </div>
  );
}

