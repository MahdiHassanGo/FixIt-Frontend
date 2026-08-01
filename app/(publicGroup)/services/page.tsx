import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { ServiceFilters, type ServiceFilterValues } from "@/components/services/service-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { getCategories, getServices } from "@/lib/data";

export const metadata: Metadata = { title: "Browse Services" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ServicesPage({ searchParams }: Props) {
  const raw = await searchParams;
  const filterKeys = ["searchTerm", "categoryId", "location", "minPrice", "maxPrice", "minRating", "sortBy", "sortOrder"] as const;
  const initial: ServiceFilterValues = {};

  for (const key of filterKeys) {
    const value = raw[key];
    if (typeof value === "string") initial[key] = value;
  }

  const apiParams = new URLSearchParams();
  for (const key of ["searchTerm", "categoryId", "location", "minPrice", "maxPrice", "page", "sortBy", "sortOrder"]) {
    const value = raw[key];
    if (typeof value === "string" && value) apiParams.set(key, value);
  }
  apiParams.set("limit", "9");

  const [categories, servicesResponse] = await Promise.all([
    getCategories(),
    getServices(apiParams.toString()),
  ]);

  const minRating = Number(initial.minRating || 0);
  const services = minRating > 0
    ? servicesResponse.data.filter((service) => (service.technician?.rating || 0) >= minRating)
    : servicesResponse.data;

  const paginationParams = new URLSearchParams(apiParams);
  if (initial.minRating) paginationParams.set("minRating", initial.minRating);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/8 via-card to-amber-500/8 p-6 sm:p-8">
        <SectionHeading
          eyebrow="Service marketplace"
          title="Find a trusted expert for the job"
          description="Search by service, category, area, rating, or price. Results update as you refine the filters."
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)]">
        <ServiceFilters key={paginationParams.toString()} categories={categories} initial={initial} />
        <section className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing <strong className="text-foreground">{services.length}</strong> service{services.length === 1 ? "" : "s"} on this page
            </p>
            {servicesResponse.meta ? <p className="text-xs font-semibold text-muted-foreground">{servicesResponse.meta.total} total listings</p> : null}
          </div>

          {services.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => <ServiceCard key={service.id} service={service} />)}
            </div>
          ) : (
            <EmptyState icon={SearchX} title="No matching services" description="Try clearing one or more filters or use a broader search term." />
          )}

          <Pagination meta={servicesResponse.meta} searchParams={paginationParams} />
        </section>
      </div>
    </div>
  );
}
