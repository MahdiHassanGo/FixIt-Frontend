import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
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
    <Card className="group overflow-hidden rounded-3xl border border-purple-500/20 bg-card hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1.5">
      {/* Service Illustration Header Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={`${service.title} illustration`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Category Badge Pill */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-background/90 text-purple-600 dark:text-purple-300 backdrop-blur-md border border-purple-500/30 font-bold shadow-xs">
            {service.category?.name || "Home Service"}
          </Badge>
        </div>

        {/* Solar Orange Rating Badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-xs font-black text-orange-400 backdrop-blur-md border border-orange-500/30 shadow-xs">
            <Star className="size-3.5 fill-orange-500 text-orange-500" />
            <span>{service.technician?.rating?.toFixed(1) || "5.0"}</span>
          </div>
        </div>

        {/* Solar Orange Price Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-block rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-3.5 py-1 text-sm font-black text-white shadow-md shadow-orange-500/30">
            {formatMoney(service.price)}
          </span>
        </div>
      </div>

      <CardHeader className="space-y-1 p-5 pb-2">
        <CardTitle className="line-clamp-1 text-lg font-extrabold group-hover:text-purple-500 transition-colors">
          {service.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 px-5 py-2">
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
          <MapPin className="size-3.5 text-orange-500 shrink-0" />
          <span className="truncate">{service.location || "Location on request"}</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-5 pt-3 border-t border-purple-500/10 bg-purple-500/5">
        <Button asChild variant="outline" size="sm" className="flex-1 rounded-xl">
          <Link href={`/technicians/${service.technicianId}`}>Pro Details</Link>
        </Button>
        <Button asChild size="sm" variant="secondary" className="flex-1 rounded-xl">
          <Link href={`/technicians/${service.technicianId}?serviceId=${service.id}`}>
            Book Service <ArrowRight className="size-3.5 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
