import type { Metadata } from "next";
import { FolderCog, Plus } from "lucide-react";
import { CategoryForm } from "@/components/admin/category-form";
import { DeleteCategoryButton } from "@/components/admin/delete-category-button";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = { title: "Category Management" };

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Marketplace structure"
        title="Category management"
        description="Create and maintain the service categories used by filters and technician listings."
      />

      <Card>
        <CardHeader className="border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Plus className="size-5" /></span>
            <div><CardTitle>Create category</CardTitle><p className="text-sm text-muted-foreground">Add a new service group to the marketplace.</p></div>
          </div>
        </CardHeader>
        <CardContent className="p-5 sm:p-6"><CategoryForm /></CardContent>
      </Card>

      <section className="space-y-4">
        <div><h2 className="text-2xl font-black tracking-tight">Existing categories</h2><p className="mt-1 text-sm text-muted-foreground">Edit names and descriptions or remove categories that are no longer referenced.</p></div>
        {categories.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="border-b border-border/60 pb-5"><CardTitle>{category.name}</CardTitle></CardHeader>
                <CardContent className="space-y-5 p-5 sm:p-6">
                  <CategoryForm category={category} />
                  <div className="border-t border-border/60 pt-4">
                    <DeleteCategoryButton categoryId={category.id} />
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Deletion is safely rejected when active services still reference this category.</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState icon={FolderCog} title="No categories available" description="Create the first category using the form above." />
        )}
      </section>
    </div>
  );
}
