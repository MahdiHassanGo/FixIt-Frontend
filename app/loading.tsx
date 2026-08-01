import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <div className="mx-auto max-w-7xl space-y-6 px-4 py-12"><Skeleton className="h-10 w-72" /><Skeleton className="h-5 w-full max-w-xl" /><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-80 rounded-2xl" />)}</div></div>;
}

