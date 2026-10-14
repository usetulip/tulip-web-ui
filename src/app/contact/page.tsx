"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import contactData from "@/data/contact.json";
import homeData from "@/data/home.json";
import { Container } from "@/components/layout/Container";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { FaqSection } from "@/components/sections/common/FaqSection";
import { CtaBanner } from "@/components/sections/common/CtaBanner";
import { Mail, Phone, MapPin, ExternalLink, ChevronRight, Check, Sparkles } from "lucide-react";

function ContactForm() {
  const { form } = contactData;
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const messageParam = searchParams.get("message");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price?: string;
    period?: string;
  } | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (messageParam) {
      setMessage(messageParam);
    } else if (planParam) {
      const matched = homeData.pricing.plans.find(
        (p) =>
          p.name.toLowerCase() === planParam.toLowerCase() ||
          p.id.toLowerCase() === planParam.toLowerCase()
      );

      if (matched) {
        setSelectedPlan({
          name: matched.name,
          price: matched.price,
          period: matched.period,
        });
        setMessage(
          `Hi, I am interested in the ${matched.name} plan (${matched.price}${matched.period}). Could you please share more details and how we can get started?`
        );
      } else {
        setSelectedPlan({ name: planParam });
        setMessage(
          `Hi, I am interested in the ${planParam} plan. Could you please share more details and how we can get started?`
        );
      }
    }
  }, [planParam, messageParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="rounded-[28px] md:rounded-[36px] bg-white p-7 sm:p-10 md:p-14 shadow-sm border border-[rgba(30,13,1,0.08)] max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1e0d01] font-heading mb-1.5 leading-tight">
          {form.title}
        </h2>
        <p className="text-sm text-[#1e0d01]/60">{form.description}</p>
      </div>

      {selectedPlan && (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl bg-[#fff8f3] border border-[#f97518]/25 p-3.5 sm:px-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1e0d01]">
            <Sparkles className="h-4 w-4 text-[#f97518] shrink-0" />
            <span>
              Selected Plan:{" "}
              <strong className="font-bold text-[#f97518]">{selectedPlan.name}</strong>
              {selectedPlan.price && (
                <span className="text-neutral-500 font-normal">
                  {" "}
                  ({selectedPlan.price}{selectedPlan.period})
                </span>
              )}
            </span>
          </div>
        </div>
      )}

      {submitted ? (
        <div className="rounded-2xl bg-orange-50/70 border border-orange-200/80 p-8 text-center flex flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f97518] text-white mb-4 shadow-sm">
            <Check className="h-6 w-6 stroke-[3]" />
          </div>
          <h3 className="text-xl font-bold text-[#1e0d01] mb-2 font-heading">
            Thank You!
          </h3>
          <p className="text-sm text-[#1e0d01]/70 max-w-md">
            Your message has been received. Our team typically responds within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1e0d01] mb-1.5">
                {form.fields.firstName.label}
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={form.fields.firstName.placeholder}
                className="w-full rounded-xl border border-neutral-200/90 bg-white px-4 py-3 text-sm text-[#1e0d01] placeholder:text-neutral-400 focus:border-[#f97518] focus:ring-1 focus:ring-[#f97518] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1e0d01] mb-1.5">
                {form.fields.lastName.label}
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={form.fields.lastName.placeholder}
                className="w-full rounded-xl border border-neutral-200/90 bg-white px-4 py-3 text-sm text-[#1e0d01] placeholder:text-neutral-400 focus:border-[#f97518] focus:ring-1 focus:ring-[#f97518] outline-none transition-all"
              />
            </div>
          </div>

          {/* Email & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1e0d01] mb-1.5">
                {form.fields.email.label}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={form.fields.email.placeholder}
                className="w-full rounded-xl border border-neutral-200/90 bg-white px-4 py-3 text-sm text-[#1e0d01] placeholder:text-neutral-400 focus:border-[#f97518] focus:ring-1 focus:ring-[#f97518] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1e0d01] mb-1.5">
                {form.fields.phone.label}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={form.fields.phone.placeholder}
                className="w-full rounded-xl border border-neutral-200/90 bg-white px-4 py-3 text-sm text-[#1e0d01] placeholder:text-neutral-400 focus:border-[#f97518] focus:ring-1 focus:ring-[#f97518] outline-none transition-all"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-semibold text-[#1e0d01] mb-1.5">
              {form.fields.message.label}
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={form.fields.message.placeholder}
              className="w-full rounded-xl border border-neutral-200/90 bg-white px-4 py-3 text-sm text-[#1e0d01] placeholder:text-neutral-400 focus:border-[#f97518] focus:ring-1 focus:ring-[#f97518] outline-none transition-all resize-none"
            />
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="privacy-check"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-[#f97518] focus:ring-[#f97518] cursor-pointer"
            />
            <label
              htmlFor="privacy-check"
              className="text-xs text-[#1e0d01]/70 cursor-pointer select-none"
            >
              {form.privacy.prefix}
              <Link
                href={form.privacy.linkHref}
                className="text-[#f97518] hover:underline font-semibold"
              >
                {form.privacy.linkLabel}
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-1.5 rounded-full bg-[#f97518] hover:bg-[#e65f00] text-white py-3.5 px-6 text-sm font-bold shadow-md shadow-[#f97518]/25 hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 mt-2"
          >
            <span>{isSubmitting ? "Sending..." : form.submitButton.label}</span>
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const { hero, map, infoCards } = contactData;

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "mail":
      case "email":
        return <Mail className="h-5 w-5 stroke-[1.8]" />;
      case "phone":
        return <Phone className="h-5 w-5 stroke-[1.8]" />;
      case "map-pin":
      case "address":
      default:
        return <MapPin className="h-5 w-5 stroke-[1.8]" />;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Contact Hero & Form Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-14 md:pb-20">
        <Container>
          {/* Centered Heading */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#1e0d01] font-heading mb-4 leading-[1.12]">
              {hero.title}
            </h1>
            <p className="text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed max-w-2xl">
              {hero.description}
            </p>
          </div>

          {/* Contact Form Card wrapped in Suspense for useSearchParams */}
          <Suspense
            fallback={
              <div className="rounded-[28px] md:rounded-[36px] bg-white p-7 sm:p-10 md:p-14 shadow-sm border border-[rgba(30,13,1,0.08)] max-w-2xl mx-auto min-h-[400px] flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#f97518] border-t-transparent" />
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </Container>
      </section>

      {/* Map & Contact Info Section */}
      <section className="relative overflow-hidden">
        <SectionFrame showTopBorder={true} showBottomBorder={false} showCorners={true}>
          <Container className="py-14 md:py-20">
            <div className="rounded-[28px] md:rounded-[36px] overflow-hidden border border-[rgba(30,13,1,0.08)] shadow-sm bg-white">
              {/* Google Map Container */}
              <div className="relative w-full h-[360px] sm:h-[420px] bg-neutral-100 overflow-hidden">
                <iframe
                  src={map.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ryplix HQ Location Map"
                  className="w-full h-full grayscale-[25%] contrast-[1.05]"
                />

                {/* Open in Maps Button */}
                <a
                  href={map.openInMapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-lg bg-white/95 hover:bg-white px-3 py-1.5 text-xs font-bold text-neutral-800 shadow-md border border-neutral-200 backdrop-blur-sm transition-all"
                >
                  <span>{map.openInMapsText}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-neutral-600" />
                </a>
              </div>

              {/* 3 Contact Info Channels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100 p-7 sm:p-10 md:p-12 bg-white">
                {infoCards.map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="flex flex-col items-center text-center p-4 sm:p-6 first:pt-0 md:first:pt-6 last:pb-0 md:last:pb-6"
                  >
                    {/* Icon */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200/70 text-neutral-800 mb-4 shadow-2xs">
                      {getIcon(card.icon || card.label)}
                    </div>

                    {/* Label */}
                    <h3 className="text-lg font-bold text-[#1e0d01] font-heading mb-1">
                      {card.label}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#1e0d01]/60 mb-4">
                      {card.description}
                    </p>

                    {/* Action Link getting exact href from JSON */}
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm font-bold text-[#f97518] hover:underline break-all transition-colors"
                    >
                      {card.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </SectionFrame>
      </section>

      <FaqSection />
      <CtaBanner />
    </div>
  );
}
