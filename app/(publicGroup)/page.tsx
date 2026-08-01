import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ShieldCheck, Star, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { TechnicianCard } from "@/components/shared/technician-card";
import { getServices, getTechnicians } from "@/lib/data";

export default async function HomePage() {
  const [servicesResponse, techniciansResponse] = await Promise.all([
    getServices("limit=6&sortBy=createdAt&sortOrder=desc"),
    getTechnicians("limit=4&sortBy=rating&sortOrder=desc"),
  ]);

  return (
    <>
      <section className="overflow-hidden bg-gradient-to-br from-primary/10 via-background to-amber-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium text-primary"><ShieldCheck className="size-4" /> Verified home service professionals</p>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Fix home problems without the usual hassle.</h1>
              <p className="max-w-xl text-lg text-muted-foreground">Browse services, compare technician profiles, request a time slot, pay securely through Stripe, and track every booking from one dashboard.</p>
            </div>
            <div className="flex flex-wrap gap-3"><Button asChild size="lg"><Link href="/services">Browse services <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline"><Link href="/register">Join FixItNow</Link></Button></div>
          </div>
          <div className="relative"><Image src="/hero-home-services.svg" alt="Illustration of trusted home services" width={800} height={600} priority className="w-full rounded-3xl shadow-xl" /></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[{ icon: Wrench, title: "Choose a service", text: "Search by category, location, rating, and price." },{ icon: CalendarCheck, title: "Request a time", text: "Select a date within the technician's working schedule." },{ icon: Star, title: "Pay and review", text: "Pay after acceptance, then review completed work." }].map((item) => <Card key={item.title}><CardContent className="p-6"><item.icon className="size-8 text-primary" /><h2 className="mt-4 text-xl font-semibold">{item.title}</h2><p className="mt-2 text-sm text-muted-foreground">{item.text}</p></CardContent></Card>)}
        </div>
      </section>

      <section className="bg-muted/40"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="flex items-end justify-between gap-6"><SectionHeading eyebrow="Popular choices" title="Featured services" description="Current active services returned by your existing backend." /><Button asChild variant="outline" className="hidden sm:inline-flex"><Link href="/services">View all</Link></Button></div><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{servicesResponse.data.map((service) => <ServiceCard key={service.id} service={service} />)}</div></div></section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><SectionHeading eyebrow="Professionals" title="Top-rated technicians" description="Profiles are sorted by rating through the public technician endpoint." /><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{techniciansResponse.data.map((technician) => <TechnicianCard key={technician.id} technician={technician} />)}</div></section>
    </>
  );
}

