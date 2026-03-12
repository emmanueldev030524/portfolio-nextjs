"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const BLOCKED_LOCAL_PARTS = [
  "test", "testing", "fake", "example", "asdf", "qwerty", "aaa",
  "bbb", "abc", "123", "admin", "info", "noreply", "no-reply",
  "nobody", "spam", "junk", "temp", "tmp",
];

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

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

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
    if (BLOCKED_LOCAL_PARTS.some((p) => localPart === p || localPart.startsWith(`${p}.`) || localPart.match(new RegExp(`^${p}\\d+$`)))) {
      setEmailError("Please use a real email address, not a test one.");
      return;
    }
    if (DISPOSABLE_DOMAINS.has(domain)) {
      setEmailError("Disposable email addresses are not allowed.");
      return;
    }

    setStatus("submitting");

    const data = new FormData(form);
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
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
    <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-4 md:p-8 dark:bg-black">
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

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:pointer-events-none"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </span>
          ) : (
            <>Send Message &rarr;</>
          )}
          <BottomGradient />
        </button>

        {status === "error" && (
          <p className="mt-4 text-sm text-red-500 text-center">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>
    </div>
  );
}
