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
    <Card className="group overflow-hidden rounded-3xl border border-purple-500/20 bg-card hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1.5">
      {/* Background Header Gradient */}
      <div className="h-20 bg-gradient-to-r from-purple-900/40 via-violet-800/20 to-orange-500/20 relative">
        <div className="absolute top-2.5 right-2.5">
          <Badge className="bg-black/70 text-orange-400 text-xs font-bold backdrop-blur-md border border-orange-500/30 gap-1">
            <ShieldCheck className="size-3 text-orange-500" /> Verified Pro
          </Badge>
        </div>
      </div>

      {/* Avatar Container with Radial Ring */}
      <div className="relative -mt-10 mx-auto size-20 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md ring-2 ring-purple-500/50">
        <Image
          src="/technician-avatar.svg"
          alt="Technician profile placeholder"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="text-center space-y-1 p-4 pb-2">
        <CardTitle className="text-base font-extrabold group-hover:text-purple-500 transition-colors">
          {technician.user?.name || "Technician Pro"}
        </CardTitle>
        <div className="flex items-center justify-center gap-1 text-xs font-bold text-orange-500">
          <Star className="size-3.5 fill-orange-500 text-orange-500" />
          <span>{technician.rating.toFixed(1)}</span>
          <span className="text-muted-foreground font-normal">({technician.totalReviews} reviews)</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-xs text-muted-foreground p-4 pt-1 flex-1">
        <div className="flex items-center justify-center gap-1.5 font-semibold">
          <MapPin className="size-3.5 text-purple-500" />
          <span>{technician.location || "Location on request"}</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 font-semibold">
          <BriefcaseBusiness className="size-3.5 text-purple-500" />
          <span>{technician.experienceYears} years experience</span>
        </div>
        <div className="pt-2 text-center">
          <span className="inline-block font-black text-xs text-orange-500 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-xl">
            {formatMoney(technician.pricePerHour)} / hr
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2 border-t border-purple-500/10 bg-purple-500/5">
        <Button asChild className="w-full rounded-xl">
          <Link href={`/technicians/${technician.id}`}>
            View Profile <ArrowRight className="size-3.5 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
