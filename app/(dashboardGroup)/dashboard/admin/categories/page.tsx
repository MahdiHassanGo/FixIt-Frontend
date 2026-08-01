import type { Metadata } from "next";
import { CategoryForm } from "@/components/admin/category-form";
import { DeleteCategoryButton } from "@/components/admin/delete-category-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = { title: "Category Management" };

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return <div className="space-y-8"><div><h1 className="text-3xl font-bold">Category management</h1><p className="text-muted-foreground">Create, edit, and delete service categories through real backend endpoints.</p></div><Card><CardHeader><CardTitle>Create category</CardTitle></CardHeader><CardContent><CategoryForm /></CardContent></Card><div className="grid gap-5 lg:grid-cols-2">{categories.map((category) => <Card key={category.id}><CardHeader><CardTitle>{category.name}</CardTitle></CardHeader><CardContent className="space-y-4"><CategoryForm category={category} /><DeleteCategoryButton categoryId={category.id} /><p className="text-xs text-muted-foreground">Deletion can fail if services still reference this category. The backend will return that relation error safely.</p></CardContent></Card>)}</div></div>;
}

