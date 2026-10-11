import { useState, type FormEvent } from "react";
import { AlertCircle, Info } from "lucide-react";
import { services } from "@/lib/site";
import { useI18n } from "@/i18n";
import { localizeService, siteText, type SiteCopyKey } from "@/i18n/site-content";

const field =
  "w-full rounded-xl border border-input bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary";
type FormField = "name" | "email" | "phone" | "service" | "description" | "acknowledgement";
type FormErrorKey = Extract<
  SiteCopyKey,
  | "form.error.name"
  | "form.error.email"
  | "form.error.phone"
  | "form.error.service"
  | "form.error.description"
  | "form.error.acknowledgement"
>;

export function LeadForm({
  quote = false,
  initialService,
}: {
  quote?: boolean;
  initialService?: string;
}) {
  const [errors, setErrors] = useState<Partial<Record<FormField, FormErrorKey>>>({});
  const [validated, setValidated] = useState(false);
  const { t } = useI18n();

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Partial<
      Record<FormField, string>
    >;
    const err: Partial<Record<FormField, FormErrorKey>> = {};
    if (!d.name?.trim() || (d.name?.length ?? 0) > 100) err.name = "form.error.name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? "")) err.email = "form.error.email";
    if (!/^\+\d{1,3}[\s-]?\d{6,12}$/.test((d.phone ?? "").trim())) err.phone = "form.error.phone";
    if (!d.service) err.service = "form.error.service";
    if (!d.description?.trim() || (d.description?.trim().length ?? 0) < 20)
      err.description = "form.error.description";
    if (d.acknowledgement !== "accepted") err.acknowledgement = "form.error.acknowledgement";
    setErrors(err);
    setValidated(!Object.keys(err).length);
  }

  const E = ({ k }: { k: FormField }) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1 text-xs text-destructive" role="alert">
        {errors[k] ? t(errors[k]) : null}
      </p>
    ) : null;
  const selectedService = services.some((service) => service.slug === initialService)
    ? initialService
    : "";

  return (
    <div>
      <div
        className="mb-5 flex gap-3 rounded-xl border border-primary/30 bg-accent p-4 text-sm"
        role="note"
      >
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p>{t("form.deliveryNote")}</p>
      </div>
      {validated && (
        <div
          className="mb-5 flex gap-3 rounded-xl border border-primary/30 bg-accent p-4 text-sm"
          role="status"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p>{t("form.checkedNote")}</p>
        </div>
      )}
      <form
        onSubmit={submit}
        onChange={() => setValidated(false)}
        noValidate
        className="grid gap-5 rounded-2xl border bg-card p-6 md:grid-cols-2 md:p-8"
      >
        <div>
          <label htmlFor="lead-name" className="mb-1 block text-sm">
            {t("form.name")}
          </label>
          <input
            id="lead-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={field}
          />
          <E k="name" />
        </div>
        <div>
          <label htmlFor="lead-company" className="mb-1 block text-sm">
            {t("form.company")}
          </label>
          <input id="lead-company" name="company" autoComplete="organization" className={field} />
        </div>
        <div>
          <label htmlFor="lead-email" className="mb-1 block text-sm">
            {t("form.email")}
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={field}
          />
          <E k="email" />
        </div>
        <div>
          <label htmlFor="lead-phone" className="mb-1 block text-sm">
            {t("form.phone")}
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            maxLength={20}
            autoComplete="tel"
            placeholder={t("form.phone.placeholder")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={field}
          />
          <E k="phone" />
        </div>
        <div>
          <label htmlFor="lead-service" className="mb-1 block text-sm">
            {t("form.service")}
          </label>
          <select
            id="lead-service"
            name="service"
            required
            defaultValue={selectedService}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={field}
          >
            <option value="" disabled>
              {t("form.select")}
            </option>
            {services.map((original) => {
              const service = localizeService(original, t);
              return (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              );
            })}
            <option value="other">{t("form.other")}</option>
          </select>
          <E k="service" />
        </div>
        <div>
          <label htmlFor="lead-contact" className="mb-1 block text-sm">
            {t("form.contact")}
          </label>
          <select id="lead-contact" name="contact" className={field}>
            <option>{t("form.contact.email")}</option>
            <option>{t("form.contact.phone")}</option>
          </select>
        </div>
        {quote && (
          <>
            <div>
              <label htmlFor="lead-budget" className="mb-1 block text-sm">
                {t("form.budget")}
              </label>
              <select id="lead-budget" name="budget" className={field}>
                <option>{t("form.budget.unsure")}</option>
                {[1, 2, 3, 4].map((index) => (
                  <option key={index}>{siteText(t, `form.budget.${index}`)}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="lead-timeline" className="mb-1 block text-sm">
                {t("form.timeline")}
              </label>
              <select id="lead-timeline" name="timeline" className={field}>
                <option>{t("form.timeline.flexible")}</option>
                {[1, 2, 3].map((index) => (
                  <option key={index}>{siteText(t, `form.timeline.${index}`)}</option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="md:col-span-2">
          <label htmlFor="lead-description" className="mb-1 block text-sm">
            {t("form.description")}
          </label>
          <textarea
            id="lead-description"
            name="description"
            required
            minLength={20}
            rows={5}
            maxLength={2000}
            placeholder={t("form.description.placeholder")}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "description-error" : undefined}
            className={field}
          />
          <E k="description" />
        </div>
        <div className="md:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="lead-acknowledgement"
              name="acknowledgement"
              type="checkbox"
              value="accepted"
              required
              aria-invalid={Boolean(errors.acknowledgement)}
              aria-describedby={errors.acknowledgement ? "acknowledgement-error" : undefined}
              className="mt-1 h-4 w-4 shrink-0 accent-primary"
            />
            <label htmlFor="lead-acknowledgement" className="text-sm text-muted-foreground">
              {t("form.acknowledgement")}
            </label>
          </div>
          <E k="acknowledgement" />
        </div>
        <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary/90 md:col-span-2 md:justify-self-start">
          {quote ? t("form.button.quote") : t("form.button.contact")}
        </button>
      </form>
    </div>
  );
}
