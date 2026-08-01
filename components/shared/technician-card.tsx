import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/format";
import type { TechnicianProfile } from "@/lib/types";

export function TechnicianCard({ technician }: { technician: TechnicianProfile }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative mx-auto mt-6 size-24 overflow-hidden rounded-full bg-muted">
        <Image src="/technician-avatar.svg" alt="Technician profile placeholder" fill className="object-cover" />
      </div>
      <CardHeader className="text-center">
        <CardTitle>{technician.user?.name || "Technician"}</CardTitle>
        <p className="flex items-center justify-center gap-1 text-sm text-amber-600">
          <Star className="size-4 fill-current" /> {technician.rating.toFixed(1)} ({technician.totalReviews})
        </p>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-2"><MapPin className="size-4" />{technician.location || "Not specified"}</p>
        <p className="flex items-center gap-2"><BriefcaseBusiness className="size-4" />{technician.experienceYears} years experience</p>
        <p className="font-semibold text-foreground">{formatMoney(technician.pricePerHour)} / hour</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full"><Link href={`/technicians/${technician.id}`}>View profile</Link></Button>
      </CardFooter>
    </Card>
  );
}

