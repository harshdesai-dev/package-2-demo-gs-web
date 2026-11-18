# GrowthSathi — Package 02 Gym Website Demo

A static, responsive, eight-page gym website prototype built with HTML, CSS and vanilla JavaScript. No build step or third-party JavaScript dependency is required.

## Run locally
- Open index.html, or
- Run python -m http.server 8000 from the project folder and visit http://localhost:8000.

## Included pages
Home, About, Facilities & Services, Membership & Pricing, Trainers, Class Timetable, Gallery and Contact.

## Enquiry flow
- The contact form validates the visitor's name and an Indian mobile number (10 digits, starting 6–9; optional +91 formatting is accepted).
- Membership plan selection is carried from the membership page into the WhatsApp enquiry.
- WhatsApp opens an editable prefilled message. The visitor must review and tap Send.
- The form uses POST as a no-JavaScript fallback so personal details are never placed in a GET query string. A static host will not process that POST; the on-page no-script notice explains that JavaScript is required for the WhatsApp flow.
- No enquiry is stored or transmitted to GrowthSathi by this static demo.

## Before showing or launching for a client
Replace all fictional Ironform content, sample facilities, trainer profiles, timetable, prices, phone/WhatsApp number, address, opening hours, imagery and social links with client-approved details. Verify image licences and permission for trainer photographs. Confirm the correct destination WhatsApp number; it is currently a demo placeholder in assets/app.js.

## Analytics
GA4 is part of the proposed Package 02 scope but is not active in this generic demo. Add the client's real GA4 Measurement ID only after the client has supplied it and the applicable privacy/consent requirements have been reviewed. Do not publish a fake or shared measurement ID. The repository currently does not collect analytics.

## Scope boundary
This is an informational marketing website and enquiry funnel only. It does not include a backend, database, authentication, admin dashboard, online payments, membership management, live class booking, CRM, automated WhatsApp messaging or AI assistant. Membership prices and class schedules shown are placeholders, not live data.

## QA note
Source-level fixes and static checks are applied on branch fix/package-02-quality-pass. A real browser/device test and client-specific content/analytics configuration are still required before production handover.