import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  submitWaitlist,
  waitlistSchema,
  type WaitlistPayload,
} from "@/lib/waitlist";

interface WaitlistFormProps {
  variant?: "hero" | "compact";
  formId?: string;
}

export const WaitlistForm = ({
  variant = "hero",
  formId = "waitlist",
}: WaitlistFormProps) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistPayload>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", phone: "", smsConsent: false },
    mode: "onBlur",
  });

  const phone = watch("phone");
  const smsConsent = watch("smsConsent");
  const phoneEntered = Boolean(phone && phone.trim().length > 0);

  const onSubmit = async (values: WaitlistPayload) => {
    try {
      await submitWaitlist({
        ...values,
        smsConsent: phoneEntered ? Boolean(values.smsConsent) : false,
      });
      setSubmitted(true);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "glass-card flex items-start gap-4 p-6 sm:p-7",
          variant === "hero" ? "w-full" : "w-full",
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Check className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold text-foreground">
            You&apos;re on the list.
          </p>
          <p className="text-sm text-muted-foreground">
            Sentinel launch updates are coming.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "glass-card w-full p-5 sm:p-6",
        variant === "hero" && "sm:p-7",
      )}
      noValidate
    >
      <div className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor={`${formId}-email`}
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            Email
          </label>
          <Input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            className="h-12 rounded-xl border-border/70 bg-secondary/50 text-base placeholder:text-muted-foreground/60 focus-visible:ring-primary/60"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label
            htmlFor={`${formId}-phone`}
            className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            Phone
            <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground/70">
              Optional
            </span>
          </label>
          <Input
            id={`${formId}-phone`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+1 (555) 000 0000"
            aria-invalid={Boolean(errors.phone)}
            className="h-12 rounded-xl border-border/70 bg-secondary/50 text-base placeholder:text-muted-foreground/60 focus-visible:ring-primary/60"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* SMS consent */}
        <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/30 p-3.5">
          <Checkbox
            id={`${formId}-sms`}
            checked={Boolean(smsConsent) && phoneEntered}
            disabled={!phoneEntered}
            onCheckedChange={(c) => setValue("smsConsent", Boolean(c))}
            className="mt-0.5 h-5 w-5 rounded-md border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <label
            htmlFor={`${formId}-sms`}
            className={cn(
              "text-xs leading-relaxed",
              phoneEntered ? "text-foreground/90" : "text-muted-foreground/70",
            )}
          >
            Text me Sentinel launch updates at this number.
          </label>
        </div>
        {errors.smsConsent && (
          <p className="-mt-2 text-xs text-destructive">
            {errors.smsConsent.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-premium group flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-wide"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Joining…
            </>
          ) : (
            <>
              Join the Waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
          No spam. Launch updates only. Unsubscribe anytime.
        </p>

        <p className="text-[10px] leading-relaxed text-muted-foreground/70">
          By joining, you agree to receive email updates from Sentinel. If you
          enter your phone number and opt into SMS, you agree to receive launch
          updates by text. Msg &amp; data rates may apply. Reply STOP to
          unsubscribe.
        </p>
      </div>
    </form>
  );
};
