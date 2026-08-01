import Link from "next/link";
import { Filter, RotateCcw, Search, MapPin, DollarSign, Star, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/types";

export type ServiceFilterValues = {
  searchTerm?: string;
  categoryId?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  sortBy?: string;
  sortOrder?: string;
};

type ServiceFiltersProps = {
  categories: Category[];
  initial?: ServiceFilterValues;
};

export function ServiceFilters({
  categories,
  initial = {},
}: ServiceFiltersProps) {
  return (
    <aside className="h-fit rounded-3xl border border-purple-500/20 bg-card p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between gap-3 border-b border-purple-500/15 pb-4">
        <h2 className="font-extrabold text-base flex items-center gap-2 text-foreground">
          <Filter className="size-4 text-orange-500" /> Filter Services
        </h2>

        <Link
          href="/services"
          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="size-3" /> Reset
        </Link>
      </div>

      <form
        action="/services"
        method="get"
        className="space-y-5"
      >
        {/* Search Term */}
        <div className="space-y-1.5">
          <label
            htmlFor="searchTerm"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-purple-500" />
            <input
              id="searchTerm"
              name="searchTerm"
              type="search"
              defaultValue={initial.searchTerm || ""}
              placeholder="Plumbing, electrical..."
              className="h-11 w-full rounded-2xl border border-purple-500/20 bg-background pl-9 pr-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label
            htmlFor="categoryId"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={initial.categoryId || ""}
            className="h-11 w-full rounded-2xl border border-purple-500/20 bg-background px-3 text-sm font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition cursor-pointer"
          >
            <option value="">All Categories</option>
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

        {/* Location */}
        <div className="space-y-1.5">
          <label
            htmlFor="location"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-purple-500" />
            <input
              id="location"
              name="location"
              type="text"
              defaultValue={initial.location || ""}
              placeholder="Enter city or area..."
              className="h-11 w-full rounded-2xl border border-purple-500/20 bg-background pl-9 pr-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label
              htmlFor="minPrice"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Min Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-orange-500" />
              <input
                id="minPrice"
                name="minPrice"
                type="number"
                min="0"
                step="0.01"
                defaultValue={initial.minPrice || ""}
                placeholder="0"
                className="h-11 w-full rounded-2xl border border-purple-500/20 bg-background pl-7 pr-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="maxPrice"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Max Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-orange-500" />
              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                min="0"
                step="0.01"
                defaultValue={initial.maxPrice || ""}
                placeholder="500"
                className="h-11 w-full rounded-2xl border border-purple-500/20 bg-background pl-7 pr-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>
          </div>
        </div>

        {/* Min Rating */}
        <div className="space-y-1.5">
          <label
            htmlFor="minRating"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            Minimum Rating
          </label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-orange-500 fill-orange-500" />
            <select
              id="minRating"
              name="minRating"
              defaultValue={initial.minRating || ""}
              className="h-11 w-full rounded-2xl border border-purple-500/20 bg-background pl-9 pr-3 text-sm font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition cursor-pointer"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars ★★★★</option>
              <option value="3">3+ Stars ★★★</option>
              <option value="2">2+ Stars ★★</option>
              <option value="1">1+ Stars ★</option>
            </select>
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-1.5">
          <label
            htmlFor="sortBy"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            Sort By
          </label>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-purple-500" />
            <select
              id="sortBy"
              name="sortBy"
              defaultValue={initial.sortBy || "createdAt"}
              className="h-11 w-full rounded-2xl border border-purple-500/20 bg-background pl-9 pr-3 text-sm font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition cursor-pointer"
            >
              <option value="createdAt">Newest First</option>
              <option value="price">Price</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        <input
          type="hidden"
          name="sortOrder"
          value={initial.sortOrder || "desc"}
        />

        <Button
          type="submit"
          className="w-full rounded-2xl shadow-lg shadow-purple-600/30"
        >
          Apply Filters
        </Button>
      </form>
    </aside>
  );
}
