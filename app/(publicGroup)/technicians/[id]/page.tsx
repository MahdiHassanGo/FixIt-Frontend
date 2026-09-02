import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefcaseBusiness, CalendarDays, Check, MapPin, ShieldAlert, ShieldCheck, Star, Wrench } from "lucide-react";
import { BookingForm } from "@/components/customer/booking-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api";
import { getCurrentUser, getTechnician } from "@/lib/data";
import { formatMoney, titleCase } from "@/lib/format";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ serviceId?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const technician = await getTechnician((await params).id);
    return { title: technician?.user?.name || "Technician" };
  } catch {
    return { title: "Technician" };
  }
}

export default async function TechnicianProfilePage({ params, searchParams }: Props) {
  const { id } = await params;
  let technician;

  try {
    technician = await getTechnician(id);
    if (!technician) notFound();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const [user, resolvedSearch] = await Promise.all([getCurrentUser(), searchParams]);
  const activeServices = (technician.services || []).filter((service) => service.isActive !== false);
  const selectedService = activeServices.find((service) => service.id === resolvedSearch.serviceId) || activeServices[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-teal-950 via-teal-900 to-slate-950 p-6 text-white shadow-2xl sm:p-8">
        <div className="absolute -right-20 -top-24 size-72 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="relative grid items-center gap-6 sm:grid-cols-[150px_minmax(0,1fr)]">
          <div className="relative mx-auto size-36 overflow-hidden rounded-3xl border-4 border-white/15 bg-white/10 shadow-xl">
            <Image src="/technician-avatar.svg" alt={`${technician.user?.name || "Technician"} profile`} fill className="object-cover" priority />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200"><ShieldCheck className="size-3.5" /> Verified professional</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-bold"><Star className="size-3.5 fill-amber-400 text-amber-400" /> {technician.rating.toFixed(1)} ({technician.totalReviews})</span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{technician.user?.name || "Technician"}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">{technician.bio || "This technician has not added a professional bio yet."}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-semibold text-white/80 sm:justify-start">
              <span className="flex items-center gap-1.5"><BriefcaseBusiness className="size-4 text-teal-300" /> {technician.experienceYears} years experience</span>
              <span className="flex items-center gap-1.5"><MapPin className="size-4 text-teal-300" /> {technician.location || "Location not specified"}</span>
              <span className="flex items-center gap-1.5"><Wrench className="size-4 text-teal-300" /> {activeServices.length} active service{activeServices.length === 1 ? "" : "s"}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="min-w-0 space-y-8">
          <section>
            <h2 className="text-2xl font-black tracking-tight">Skills and specialties</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {technician.skills.length
                ? technician.skills.map((skill) => <span key={skill} className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-sm font-semibold text-primary"><Check className="size-3.5" /> {skill}</span>)
                : <p className="text-sm text-muted-foreground">No skills listed yet.</p>}
            </div>
          </section>

          <section>
            <div><h2 className="text-2xl font-black tracking-tight">Available services</h2><p className="mt-1 text-sm text-muted-foreground">Choose a service to update the booking panel.</p></div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {activeServices.map((service) => {
                const selected = service.id === selectedService?.id;
                return (
                  <Card key={service.id} className={selected ? "border-primary ring-2 ring-primary/10" : "transition hover:border-primary/40"}>
                    <CardHeader className="border-b border-border/60 pb-4">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <p className="text-xl font-black text-primary">{formatMoney(service.price)}</p>
                    </CardHeader>
                    <CardContent className="space-y-4 p-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                      <Button asChild variant={selected ? "default" : "outline"} size="sm" className="w-full">
                        <Link href={`/technicians/${id}?serviceId=${service.id}`}>{selected ? "Selected" : "Select service"}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
              {!activeServices.length ? <p className="text-sm text-muted-foreground">This technician has no active services.</p> : null}
            </div>
          </section>

          <section>
            <div><h2 className="text-2xl font-black tracking-tight">Weekly availability</h2><p className="mt-1 text-sm text-muted-foreground">Declared working windows for booking requests.</p></div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {technician.availability?.length
                ? technician.availability.filter((slot) => slot.isAvailable).map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
                    <span className="flex items-center gap-2 font-semibold"><CalendarDays className="size-4 text-primary" /> {titleCase(slot.dayOfWeek)}</span>
                    <span className="text-sm font-bold text-muted-foreground">{slot.startTime}–{slot.endTime}</span>
                  </div>
                ))
                : <p className="text-sm text-muted-foreground">No availability has been configured.</p>}
            </div>
          </section>

          <section>
            <div><h2 className="text-2xl font-black tracking-tight">Customer reviews</h2><p className="mt-1 text-sm text-muted-foreground">Feedback from completed FixItNow bookings.</p></div>
            <div className="mt-4 grid gap-4">
              {technician.reviews?.length
                ? technician.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-bold">{review.customer?.name || "Customer"}</p>
                        <span className="flex items-center gap-1 text-sm font-bold text-amber-600"><Star className="size-4 fill-current" /> {review.rating}/5</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.comment || "No written comment."}</p>
                    </CardContent>
                  </Card>
                ))
                : <p className="text-sm text-muted-foreground">No reviews yet.</p>}
            </div>
          </section>
        </div>

        <Card className="h-fit lg:sticky lg:top-24">
          <CardHeader className="border-b border-border/60 pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Booking request</p>
            <CardTitle className="text-2xl">Book this technician</CardTitle>
            {selectedService ? <p className="text-sm text-muted-foreground">{selectedService.title} · <strong className="text-foreground">{formatMoney(selectedService.price)}</strong></p> : null}
          </CardHeader>
          <CardContent className="p-5 sm:p-6">
            {!selectedService ? (
              <p className="text-sm text-muted-foreground">This technician has no active services.</p>
            ) : !user ? (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-muted-foreground">Log in with a customer account to choose a date and submit a booking request.</p>
                <Button asChild className="w-full"><Link href={`/login?redirectTo=${encodeURIComponent(`/technicians/${id}?serviceId=${selectedService.id}`)}`}>Login to book</Link></Button>
              </div>
            ) : user.role !== "CUSTOMER" ? (
              <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-4">
                <p className="flex items-center gap-2 font-bold text-amber-800"><ShieldAlert className="size-4" /> Customer account required</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Technician and admin accounts cannot create customer bookings.</p>
              </div>
            ) : (
              <BookingForm serviceId={selectedService.id} availability={technician.availability || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
