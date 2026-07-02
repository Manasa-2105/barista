const API_URL = "https://hj5mz6blp7.execute-api.ap-south-1.amazonaws.com/reservations";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".booking-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Booking...";

    const payload = {
      name: form.querySelector("[name='booking-form-name']").value,
      phone: form.querySelector("[name='booking-form-phone']").value,
      date: form.querySelector("[name='booking-form-date']").value,
      time: form.querySelector("[name='booking-form-time']").value,
      numberOfPeople: form.querySelector("[name='booking-form-number']").value,
      message: form.querySelector("[name='booking-form-message']").value,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Booking failed.");

      alert(`Thanks ${payload.name}! Your reservation is confirmed for ${payload.date} at ${payload.time}.`);
      form.reset();
    } catch (err) {
      alert(`Booking failed: ${err.message}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
