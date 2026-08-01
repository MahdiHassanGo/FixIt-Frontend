import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefcaseBusiness, MapPin, Star } from "lucide-react";
import { BookingForm } from "@/components/customer/booking-form";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api";
import { formatMoney, titleCase } from "@/lib/format";
import { getCurrentUser, getTechnician } from "@/lib/data";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ serviceId?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try { const technician = await getTechnician((await params).id); return { title: technician.user?.name || "Technician" }; }
  catch { return { title: "Technician" }; }
}

export default async function TechnicianProfilePage({ params, searchParams }: Props) {
  const { id } = await params;
  let technician;
  try { technician = await getTechnician(id); }
  catch (error) { if (error instanceof ApiError && error.status === 404) notFound(); throw error; }
  const user = await getCurrentUser();
  const requestedServiceId = (await searchParams).serviceId;
  const selectedService = technician.services?.find((service) => service.id === requestedServiceId) || technician.services?.[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <Card><CardContent className="grid gap-6 p-6 sm:grid-cols-[130px_1fr]"><div className="relative mx-auto size-32 overflow-hidden rounded-full bg-muted"><Image src="/technician-avatar.svg" alt="Technician profile placeholder" fill /></div><div><h1 className="text-3xl font-bold">{technician.user?.name}</h1><div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-1"><Star className="size-4 fill-current text-amber-500" />{technician.rating.toFixed(1)} ({technician.totalReviews} reviews)</span><span className="flex items-center gap-1"><BriefcaseBusiness className="size-4" />{technician.experienceYears} years</span><span className="flex items-center gap-1"><MapPin className="size-4" />{technician.location || "Not specified"}</span></div><p className="mt-4 text-muted-foreground">{technician.bio || "No bio has been added yet."}</p><div className="mt-4 flex flex-wrap gap-2">{technician.skills.map((skill) => <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{skill}</span>)}</div></div></CardContent></Card>

          <section><h2 className="text-2xl font-bold">Services</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{technician.services?.map((service) => <Card key={service.id} className={service.id === selectedService?.id ? "border-primary" : ""}><CardHeader><CardTitle className="text-lg">{service.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{service.description}</p><p className="mt-3 font-semibold">{formatMoney(service.price)}</p><Button asChild variant="outline" size="sm" className="mt-4"><Link href={`/technicians/${id}?serviceId=${service.id}`}>Select</Link></Button></CardContent></Card>)}</div></section>

          <section><h2 className="text-2xl font-bold">Weekly availability</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{technician.availability?.length ? technician.availability.map((slot) => <div key={slot.id} className="flex items-center justify-between rounded-xl border p-4"><span>{titleCase(slot.dayOfWeek)}</span><span className="text-sm text-muted-foreground">{slot.startTime}–{slot.endTime}</span></div>) : <p className="text-muted-foreground">No availability has been configured.</p>}</div></section>

          <section><h2 className="text-2xl font-bold">Customer reviews</h2><div className="mt-4 space-y-4">{technician.reviews?.length ? technician.reviews.map((review) => <Card key={review.id}><CardContent className="p-5"><div className="flex items-center justify-between"><p className="font-medium">{review.customer?.name || "Customer"}</p><span className="flex items-center gap-1 text-sm text-amber-600"><Star className="size-4 fill-current" />{review.rating}</span></div><p className="mt-2 text-sm text-muted-foreground">{review.comment || "No written comment."}</p></CardContent></Card>) : <p className="text-muted-foreground">No reviews yet.</p>}</div></section>
        </div>

        <Card className="h-fit lg:sticky lg:top-24"><CardHeader><CardTitle>Book this technician</CardTitle>{selectedService ? <p className="text-sm text-muted-foreground">{selectedService.title} · {formatMoney(selectedService.price)}</p> : null}</CardHeader><CardContent>{!selectedService ? <p className="text-muted-foreground">This technician has no active services.</p> : !user ? <Button asChild className="w-full"><Link href={`/login?redirectTo=${encodeURIComponent(`/technicians/${id}?serviceId=${selectedService.id}`)}`}>Login to book</Link></Button> : user.role !== "CUSTOMER" ? <div className="space-y-3"><StatusBadge status="DECLINED" /><p className="text-sm text-muted-foreground">Only customer accounts can create bookings.</p></div> : <BookingForm serviceId={selectedService.id} availability={technician.availability || []} />}</CardContent></Card>
      </div>
    </div>
  );
}

