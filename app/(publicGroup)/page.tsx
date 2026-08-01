import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ShieldCheck, Star, Wrench, Sparkles, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="flex flex-col gap-16 pb-16 overflow-hidden">
      {/* Landing Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-950/20 via-background to-orange-500/10 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-purple-500/20">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 size-96 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Left Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-extrabold text-purple-600 dark:text-purple-300 shadow-xs">
              <ShieldCheck className="size-4 text-orange-500" />
              <span>Verified Pro Home Services Marketplace</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                Fix home problems <br />
                <span className="gradient-text">without the hassle.</span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0">
                Browse rated local technicians, book time slots in real time, process safe Stripe checkout payments, and track your repairs from a personalized dashboard.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button asChild size="lg" className="rounded-2xl shadow-xl shadow-purple-600/35">
                <Link href="/services">
                  Browse Services <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-2xl shadow-xl shadow-orange-500/35">
                <Link href="/register">Join FixItNow</Link>
              </Button>
            </div>

            {/* Micro Feature Badges */}
            <div className="pt-4 border-t border-purple-500/15 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-bold text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-purple-500" /> Certified Experts
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="size-4 text-orange-500" /> Stripe Protected
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-4 text-purple-400" /> Real-time Dispatch
              </span>
            </div>
          </div>

          {/* Right Hero Image (Using user's provided /home.png) */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-card p-2 shadow-2xl hover-lift">
              <Image
                src="/home.png"
                alt="FixItNow Home Services"
                width={800}
                height={600}
                priority
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 mb-10">
          <Badge variant="outline" className="rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-300 border-purple-500/30 bg-purple-500/10">
            Simple 3-Step Flow
          </Badge>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
            How FixItNow Works
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Wrench,
              step: "01",
              title: "Choose a Service",
              text: "Filter by category, price, location, and technician ratings to find your perfect fix.",
            },
            {
              icon: CalendarCheck,
              step: "02",
              title: "Schedule & Confirm",
              text: "Pick an available date within the technician's weekly working schedule.",
            },
            {
              icon: Star,
              step: "03",
              title: "Pay & Review",
              text: "Pay securely via Stripe upon acceptance and rate your completed service.",
            },
          ].map((item) => (
            <Card key={item.title} className="relative overflow-hidden rounded-3xl border border-purple-500/20 p-2 hover-lift">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-purple-500/15 text-purple-500">
                    <item.icon className="size-6" />
                  </div>
                  <span className="text-3xl font-black text-orange-500/40">{item.step}</span>
                </div>
                <h3 className="text-xl font-extrabold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Services Grid */}
      <section className="bg-purple-950/10 py-16 border-y border-purple-500/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Popular Services"
              title="Featured Home Services"
              description="Explore popular repair and maintenance services available right now."
            />
            <Button asChild variant="outline" className="rounded-xl hidden sm:inline-flex border-purple-500/30">
              <Link href="/services">
                View All Services <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesResponse.data.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center sm:hidden pt-4">
            <Button asChild variant="outline" className="w-full rounded-xl border-purple-500/30">
              <Link href="/services">
                View All Services <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top-Rated Technicians Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <SectionHeading
          eyebrow="Certified Professionals"
          title="Top-Rated Technicians"
          description="Experienced technicians sorted by ratings and customer reviews."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {techniciansResponse.data.map((technician) => (
            <TechnicianCard key={technician.id} technician={technician} />
          ))}
        </div>
      </section>
    </div>
  );
}
