import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <Card className="group overflow-hidden rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Service Illustration Header Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={`${service.title} illustration`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Pill Badge Overlay */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-background/95 text-foreground backdrop-blur-md border border-border/40 font-semibold shadow-xs">
            {service.category?.name || "Home Service"}
          </Badge>
        </div>

        {/* Rating Overlay */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-bold text-amber-600 backdrop-blur-md shadow-xs border border-border/40">
            <Star className="size-3.5 fill-amber-500 text-amber-500" />
            <span>{service.technician?.rating?.toFixed(1) || "5.0"}</span>
          </div>
        </div>

        {/* Floating Price Chip */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-block rounded-xl bg-primary/90 px-3 py-1 text-sm font-extrabold text-primary-foreground backdrop-blur-md shadow-sm">
            {formatMoney(service.price)}
          </span>
        </div>
      </div>

      <CardHeader className="space-y-1 p-5 pb-2">
        <CardTitle className="line-clamp-1 text-lg font-bold group-hover:text-primary transition-colors">
          {service.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 px-5 py-2">
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <MapPin className="size-3.5 text-primary shrink-0" />
          <span className="truncate">{service.location || "Location on request"}</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-5 pt-3 border-t border-border/40 bg-muted/20">
        <Button asChild variant="outline" size="sm" className="flex-1 rounded-xl">
          <Link href={`/technicians/${service.technicianId}`}>Pro Details</Link>
        </Button>
        <Button asChild size="sm" className="flex-1 rounded-xl">
          <Link href={`/technicians/${service.technicianId}?serviceId=${service.id}`}>
            Book Service <ArrowRight className="size-3.5 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
