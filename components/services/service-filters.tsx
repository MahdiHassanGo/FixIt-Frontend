import Link from "next/link";

import type { Category } from "@/lib/types";

type ServiceFiltersProps = {
  categories: Category[];
};

export function ServiceFilters({
  categories,
}: ServiceFiltersProps) {
  return (
    <aside className="h-fit rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">Filter services</h2>

        <Link
          href="/services"
          className="text-sm text-primary hover:underline"
        >
          Reset
        </Link>
      </div>

      <form
        action="/services"
        method="get"
        className="mt-5 space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="searchTerm"
            className="text-sm font-medium"
          >
            Search
          </label>

          <input
            id="searchTerm"
            name="searchTerm"
            type="search"
            placeholder="Plumbing, electrical..."
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="categoryId"
            className="text-sm font-medium"
          >
            Category
          </label>

          <select
            id="categoryId"
            name="categoryId"
            defaultValue=""
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">All categories</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="text-sm font-medium"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            placeholder="Dhaka"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label
              htmlFor="minPrice"
              className="text-sm font-medium"
            >
              Min price
            </label>

            <input
              id="minPrice"
              name="minPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="maxPrice"
              className="text-sm font-medium"
            >
              Max price
            </label>

            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="500"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="minRating"
            className="text-sm font-medium"
          >
            Minimum rating
          </label>

          <select
            id="minRating"
            name="minRating"
            defaultValue=""
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Any rating</option>
            <option value="4">4+ stars</option>
            <option value="3">3+ stars</option>
            <option value="2">2+ stars</option>
            <option value="1">1+ stars</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sortBy"
            className="text-sm font-medium"
          >
            Sort by
          </label>

          <select
            id="sortBy"
            name="sortBy"
            defaultValue="createdAt"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
        </div>

        <input
          type="hidden"
          name="sortOrder"
          value="desc"
        />

        <button
          type="submit"
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Apply filters
        </button>
      </form>
    </aside>
  );
}