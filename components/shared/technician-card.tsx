import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, MapPin, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/format";
import type { TechnicianProfile } from "@/lib/types";

export function TechnicianCard({ technician }: { technician: TechnicianProfile }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-border/70 bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Background Decorative Header Banner */}
      <div className="h-20 bg-gradient-to-r from-teal-500/20 via-primary/10 to-amber-500/20 relative">
        <div className="absolute top-2 right-2">
          <Badge className="bg-background/95 text-primary text-xs font-semibold backdrop-blur-md gap-1">
            <ShieldCheck className="size-3 text-primary" /> Verified Pro
          </Badge>
        </div>
      </div>

      {/* Avatar Container with Radial Ring */}
      <div className="relative -mt-10 mx-auto size-20 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md ring-2 ring-primary/30">
        <Image
          src="/technician-avatar.svg"
          alt="Technician profile placeholder"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="text-center space-y-1 p-4 pb-2">
        <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">
          {technician.user?.name || "Technician Pro"}
        </CardTitle>
        <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-600">
          <Star className="size-3.5 fill-amber-500 text-amber-500" />
          <span>{technician.rating.toFixed(1)}</span>
          <span className="text-muted-foreground font-normal">({technician.totalReviews} reviews)</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-xs text-muted-foreground p-4 pt-1 flex-1">
        <div className="flex items-center justify-center gap-1.5 font-medium">
          <MapPin className="size-3.5 text-primary" />
          <span>{technician.location || "Location on request"}</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 font-medium">
          <BriefcaseBusiness className="size-3.5 text-primary" />
          <span>{technician.experienceYears} years experience</span>
        </div>
        <div className="pt-2 text-center">
          <span className="inline-block font-extrabold text-sm text-foreground bg-secondary/80 px-3 py-1 rounded-xl">
            {formatMoney(technician.pricePerHour)} / hr
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2 border-t border-border/40 bg-muted/20">
        <Button asChild className="w-full rounded-xl">
          <Link href={`/technicians/${technician.id}`}>
            View Profile <ArrowRight className="size-3.5 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
