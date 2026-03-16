"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const BLOCKED_LOCAL_PARTS = [
  "test", "testing", "fake", "example", "asdf", "qwerty", "aaa",
  "bbb", "abc", "123", "admin", "info", "noreply", "no-reply",
  "nobody", "spam", "junk", "temp", "tmp",
];

const BLOCKED_LOCAL_REGEX = new RegExp(
  `^(${BLOCKED_LOCAL_PARTS.join("|")})(\\.|\\d+)?$`
);

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "throwaway.email", "guerrillamail.com",
  "sharklasers.com", "grr.la", "guerrillamailblock.com", "pokemail.net",
  "spam4.me", "binkmail.com", "bobmail.info", "chammy.info", "devnullmail.com",
  "dispostable.com", "emailisvalid.com", "emeil.in", "emeil.ir", "fakeinbox.com",
  "filzmail.com", "haltospam.com", "harakirimail.com", "jet-renovation.fr",
  "jetable.fr.nf", "koszmail.pl", "kurzepost.de", "lhsdv.com", "lroid.com",
  "mailexpire.com", "mailforspam.com", "mailinator.net", "mailnesia.com",
  "mailnull.com", "mailshell.com", "mailsiphon.com", "mailzilla.com",
  "mailtothis.com", "mezimages.net", "mintemail.com", "meltmail.com",
  "mt2015.com", "mytempemail.com", "nobulk.com", "noclickemail.com",
  "nogmailspam.info", "nomail.xl.cx", "nomail2me.com", "nospam.ze.tc",
  "nothingtoseehere.ca", "nowmymail.com", "objectmail.com", "obobbo.com",
  "onewaymail.com", "owlpic.com", "pjjkp.com", "politikerclub.de",
  "punkass.com", "putthisinyouremail.com", "quickinbox.com",
  "reallymymail.com", "recode.me", "regbypass.com", "rhyta.com",
  "rklips.com", "rmqkr.net", "royal.net", "sharklasers.com",
  "shieldemail.com", "skeefmail.com", "slaskpost.se", "slipry.net",
  "spambob.net", "spambox.us", "spamcero.com", "spamday.com",
  "spamfree24.org", "spamgourmet.com", "spamherelots.com",
  "spamhereplease.com", "spamhole.com", "spamify.com", "spaminator.de",
  "spamkill.info", "spaml.de", "spammotel.com", "spamobox.com",
  "spamslicer.com", "spamspot.com", "spamthis.co.uk", "spamtrail.com",
  "superrito.com", "superstachel.de", "suremail.info", "tempail.com",
  "tempalias.com", "tempe4mail.com", "tempemail.co.za", "tempemail.net",
  "tempinbox.com", "tempinbox.co.uk", "tempmail.eu", "tempmaildemo.com",
  "tempmailer.com", "tempomail.fr", "temporaryemail.net",
  "temporaryforwarding.com", "temporaryinbox.com", "temporarymailaddress.com",
  "thanksnospam.info", "thankyou2010.com", "thc.st", "tittbit.in",
  "trashmail.at", "trashmail.com", "trashmail.io", "trashmail.me",
  "trashmail.net", "trashymail.com", "trashymail.net", "yopmail.com",
  "yopmail.fr", "yopmail.net", "za.com", "zehnminutenmail.de",
  "zippymail.info", "10minutemail.com", "20minutemail.com",
  "guerrillamail.info", "guerrillamail.net", "guerrillamail.org",
  "guerrillamail.de", "grr.la", "guerrillamailblock.com",
]);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [emailError, setEmailError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailError("");

    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string).trim().toLowerCase();
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const [localPart, domain] = email.split("@");
    if (BLOCKED_LOCAL_REGEX.test(localPart)) {
      setEmailError("Please use a real email address, not a test one.");
      return;
    }
    if (DISPOSABLE_DOMAINS.has(domain)) {
      setEmailError("Disposable email addresses are not allowed.");
      return;
    }

    setStatus("submitting");

    const formData = new FormData(form);
    const data: Record<string, string> = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
      name: `${formData.get("firstname")} ${formData.get("lastname")}`,
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };
    if (formData.get("botcheck")) {
      data.botcheck = String(formData.get("botcheck"));
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        console.error("Web3Forms error:", json.message);
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <CheckCircle2 className="size-10 text-emerald-500" />
        <p className="text-lg font-medium">Message sent!</p>
        <p className="text-sm text-muted-foreground">
          I&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-card border border-border/50 p-4 md:p-8 dark:border-transparent dark:bg-black">
      <form onSubmit={handleSubmit}>
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" name="firstname" placeholder="Your first name" type="text" required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" name="lastname" placeholder="Your last name" type="text" required />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
            required
            onChange={() => emailError && setEmailError("")}
          />
          {emailError && (
            <p className="text-xs text-red-500">{emailError}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Tell me about your project..."
            className="shadow-input dark:placeholder-text-neutral-600 flex w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600 resize-none"
          />
        </LabelInputContainer>

        <HoverBorderGradient
          as="button"
          containerClassName="rounded-xl w-full disabled:opacity-50 disabled:pointer-events-none"
          className="bg-black text-white dark:bg-zinc-950 ring-1 ring-white/20 flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              Send Message
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/hbg:translate-x-1" />
            </span>
          )}
        </HoverBorderGradient>

        {status === "error" && (
          <p className="mt-4 text-sm text-red-500 text-center">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>
    </div>
  );
}
