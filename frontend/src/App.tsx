import { FormEvent, useState } from "react";
import { supabase, supabaseIsConfigured } from "./lib/supabase";
import "./App.css";

type AttendanceChoice = "attending" | "not_attending";

export default function App() {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceChoice>("attending");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!supabase) {
      setErrorMessage(
        "The RSVP service has not been connected yet. Please try again later."
      );
      return;
    }

    const cleanedGuestName = guestName.trim();

    if (cleanedGuestName.length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("rsvp_responses").insert({
      guest_name: cleanedGuestName,
      attendance,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(
        "We could not submit your response. Please check your connection and try again."
      );
      return;
    }

    setHasSubmitted(true);
  }

  if (hasSubmitted) {
    return (
      <main className="page-shell">
        <section className="invitation-card confirmation-card">
          <p className="eyebrow">MEMBESO · 27 DECEMBER 2026</p>
          <h1>Thank you for responding</h1>
          <p className="intro">
            Your RSVP has been received. We appreciate you taking the time to
            respond to our family's invitation.
          </p>
          <p className="confirmation-note">
            If you need to correct your response, please contact the family
            member who sent you the invitation.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="invitation-card">
        <p className="eyebrow">A FAMILY CELEBRATION</p>
        <h1>Membeso</h1>
        <p className="event-date">Sunday, 27 December 2026</p>
        <div className="ornament" aria-hidden="true">✦</div>
        <p className="intro">
          You are warmly invited to our family's membeso occasion, marking the
          conclusion of lobola negotiations.
        </p>

        <div className="details-panel">
          <p>Please let us know whether you will be joining us.</p>
        </div>

        <form onSubmit={handleSubmit} className="rsvp-form">
          <label htmlFor="guest-name">Your full name</label>
          <input
            id="guest-name"
            name="guest-name"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            placeholder="Enter your full name"
            required
          />

          <fieldset>
            <legend>Will you be attending?</legend>
            <label className="choice">
              <input
                type="radio"
                name="attendance"
                value="attending"
                checked={attendance === "attending"}
                onChange={() => setAttendance("attending")}
              />
              Yes, I will attend
            </label>
            <label className="choice">
              <input
                type="radio"
                name="attendance"
                value="not_attending"
                checked={attendance === "not_attending"}
                onChange={() => setAttendance("not_attending")}
              />
              Regretfully, I cannot attend
            </label>
          </fieldset>

          {!supabaseIsConfigured && (
            <p className="setup-warning">
              The website is awaiting its database configuration.
            </p>
          )}

          {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}

          <button type="submit" disabled={isSubmitting || !supabaseIsConfigured}>
            {isSubmitting ? "Submitting…" : "Submit RSVP"}
          </button>
        </form>
        <p className="footer-note">Thank you for responding.</p>
      </section>
    </main>
  );
}
