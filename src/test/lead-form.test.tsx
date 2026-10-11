import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LeadForm } from "@/components/site/LeadForm";
import { I18nProvider } from "@/i18n";

describe("LeadForm", () => {
  it("shows validation errors and keeps a truthful delivery notice", () => {
    render(
      <I18nProvider>
        <LeadForm quote />
      </I18nProvider>,
    );

    expect(screen.getByRole("note")).toHaveTextContent("not sent or saved");
    fireEvent.submit(screen.getByRole("button", { name: "Check Quote Request" }).closest("form")!);

    expect(screen.getByText("Enter your name (up to 100 characters).")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Include the country code, e.g. +91 9876543210.")).toBeInTheDocument();
    expect(screen.getByText("Choose a service.")).toBeInTheDocument();
    expect(screen.getByText("Tell us a little more (20+ characters).")).toBeInTheDocument();
    expect(
      screen.getByText("Confirm that you understand your information will not be sent or saved."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("prefills a service and never presents client-side validation as a submission", () => {
    render(
      <I18nProvider>
        <LeadForm quote initialService="web" />
      </I18nProvider>,
    );
    const form = screen.getByRole("button", { name: "Check Quote Request" }).closest("form")!;

    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Alex Example" } });
    fireEvent.change(screen.getByLabelText("Email *"), { target: { value: "alex@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone (with country code) *"), {
      target: { value: "+91 9876543210" },
    });
    fireEvent.change(screen.getByLabelText("Project description *"), {
      target: { value: "We need a responsive company website." },
    });
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "I understand that this form does not send or save my information. *",
      }),
    );
    expect(screen.getByLabelText("Service required *")).toHaveValue("web");

    fireEvent.submit(form);

    expect(screen.getByRole("status")).toHaveTextContent("nothing has been sent or saved");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Alex Example");
    expect(screen.getByRole("button", { name: "Check Quote Request" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Alex Updated" } });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
