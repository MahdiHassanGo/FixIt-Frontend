import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import type { Service } from "@/lib/types";

const categoryImages: Record<string, string> = {
  plumbing: "/services/plumbing.svg",
  electrical: "/services/electrical.svg",
  cleaning: "/services/cleaning.svg",
  painting: "/services/painting.svg",
};

export function ServiceCard({ service }: { service: Service }) {
  const category = service.category?.name?.toLowerCase() || "general";
  const image = categoryImages[category] || "/services/general.svg";

  return (
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] bg-muted">
        <Image src={image} alt={`${service.title} illustration`} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{service.category?.name || "Home Service"}</span>
          <span className="flex items-center gap-1">
            <Star className="size-4 fill-current text-amber-500" />
            {service.technician?.rating?.toFixed(1) || "0.0"}
          </span>
        </div>
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4" /> {service.location || "Location not specified"}
        </p>
        <p className="font-semibold text-primary">From {formatMoney(service.price)}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/technicians/${service.technicianId}`}>Technician</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href={`/technicians/${service.technicianId}?serviceId=${service.id}`}>Book</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

