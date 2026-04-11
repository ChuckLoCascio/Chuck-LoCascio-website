# Design Case Study Knowledge Base

> This file provides product design context, patterns, and principles drawn from real client engagements.
> Reference this when making UI/UX decisions, writing copy, structuring components, or prompting Cursor to generate design-aligned code.

---

## Case Study 1 — Energy Quotient (EQ Sight)

### Context
- **Client:** Energy Quotient
- **Engagement:** Staff Product Designer – 12 Weeks
- **Live product:** https://eq.systems/
- **Figma Prototype:** https://www.figma.com/proto/bCD3FOcGkhSXg3IOMvhgEd/Energy-Quotient?node-id=973-528

### Problem Space
Power quality is a **$200B problem**. 7 in 10 equipment failures of unknown cause are suspected to be power-quality-related. U.S. electricity demand is projected to grow 2–3× by 2050. Industries currently "patch" problems with unsustainable redundancy — backup generators, legacy sensors that can't handle modern grid complexity at scale or in real time — making post-facto root cause analysis extremely difficult.

### Solution & Design Approach
EQ builds the full power-quality stack — raw data → insights → action. Key technical context to inform UI decisions:

- Hardware performs **continuous waveform monitoring at 224,000 data points per second**
- **6 Mb/s lossless data**, memory-safe Rust code
- **Weeks of 24/7 waveform storage** for retrospective investigation
- Low-latency real-time data for both power controls and quality analysis on the same platform

**EQ Sight** is the UX layer: a signal-first diagnostic environment powered by an Agentic AI platform, designed so Facility Managers can rapidly diagnose root cause of power quality events — where every minute of downtime can mean millions in lost revenue.

### Design Principles Applied
- **Speed is the primary value** — every interaction optimised to reduce time-to-diagnosis
- **Signal-first layout** — data and waveforms lead; chrome and decoration stay minimal
- **AI as co-pilot** — surface AI-generated hypotheses inline, not in a separate panel
- **Progressive disclosure** — start with event summary, drill into raw waveform only when needed
- **Expert vocabulary** — Facility Managers are domain experts; don't dumb down labels

### Key Outcome
> *"We no longer have to hire an expert to investigate the root cause."*
> — Facility Manager, Texas Instruments

- Launched EQ Sight UX
- Generated **6 new customer pilots** for Energy Quotient

### Cursor Prompting Tips for This Pattern
```
When building diagnostic dashboards or data-heavy UIs, prioritise:
- Dense information layouts over whitespace-heavy cards
- Inline AI insight callouts rather than modal overlays
- Waveform / time-series chart components with zoom and scrub controls
- Status indicators that communicate severity at a glance (colour + icon + label)
- Actions (investigate, flag, export) contextual to the data row, not in a top toolbar
```

---

## Case Study 2 — BlackRock (Advisor Center Poll)

### Context
- **Client:** BlackRock
- **Engagement:** Staff Product Designer – 12 Weeks
- **Live product:** https://www.blackrock.com/us/financial-professionals

### Problem Space
Financial Advisors (FAs) lack a way to keep their pulse on fast-changing market trends or understand how the broader FA community thinks about relevant topics. Their time is extremely limited — when doing market research, FAs need to know a little about a lot for their clients.

### Solution & Design Approach
A simple, frictionless polling experience: **one click or tap to vote**, clear results display, and educational CTAs to drive further content engagement.

Key design decisions:
- **Competitive landscape audit** to identify fast pattern recognition and familiarity
- **Design system first** — built with defined rules of scale to future-proof the component across breakpoints
- **Motion design** applied to reinforce brand and create delight without distraction
- **5 breakpoints supported:** XL, L, M, S, XS (full responsive web)
- **4 deployment locations:** Advisor Center, BlackRock Homepage, 2 Marketing Pages
- Worked closely with engineering for accessibility compliance and pixel-perfect spec handoff

### Design Principles Applied
- **One primary action** — remove all friction from the core interaction
- **Results as reward** — revealing community data after voting creates engagement loop
- **Brand coherence** — component must look and feel unmistakably BlackRock
- **Scalability over one-offs** — design the system, not just the screen
- **Accessibility non-negotiable** — built to spec with engineering from the start

### Key Outcome
> *"We don't have a component like this today, it looks like BlackRock and gives our Financial Advisors something new and exciting."*
> — BlackRock Advisor Center Stakeholder

- **+34.8% increase** in average monthly signed-in visitors
- **+2.7 article pages** viewed per session
- **500+ votes** in the first poll released
- Released across 4 locations, 5 breakpoints

### Cursor Prompting Tips for This Pattern
```
When building engagement / voting components:
- Single prominent CTA, no competing actions on screen at time of vote
- Animate the results reveal (bar fill, count tick-up) — reward the interaction
- Store vote state in localStorage to prevent double-voting without auth
- Use skeleton loaders, not spinners, while results fetch
- Design the empty state (before any votes) and the voted state as distinct screens
- Always test at mobile-first (XS) before scaling up
```

---

## Case Study 3 — Grabbi (Food Truck Self-Checkout)

### Context
- **Client:** Grabbi
- **Engagement:** Founding Designer – 3 Years
- **Live product:** https://www.grabbishop.com/
- **Instagram:** https://www.instagram.com/Grabbi_App/

### Problem Space
Food trucks at peak hours generate long queues — customers abandon lines, revenue is lost. Average wait: **13 minutes** from order to food ready; up to **20 minutes at peak**. Merchants needed a way to take more orders without adding staff, focusing on cooking rather than order-taking and payment collection.

### Solution & Design Approach
A self-checkout platform bridging the **physical-to-digital experience**:

- **iOS App Clips + Android Instant Apps** — no app download required for customers
- **SmartMenu board** with built-in NFC tap technology — scan QR or tap to pay
- **React web merchant platform** for onboarding and menu management
- Field research approach: visited food truck parks, observed real queue behaviour, interviewed operators, onboarded first 10 merchants in San Francisco personally

Design iterated in the field with real users — "on the ground intel" over assumed personas.

### Design Principles Applied
- **10-second task completion** — the entire order flow must be completable in under 10 seconds
- **No account required** — App Clips/Instant Apps remove every onboarding barrier
- **Merchant as user too** — the back-end merchant platform is as important as the consumer app
- **Physical integration** — design considers the real-world context (outdoor, bright sun, noisy, one hand free)
- **Trust through branding** — branded SmartMenu board creates legitimacy at the truck

### Key Outcome
> *"I just used Grabbi for the first time, it took 10 seconds, I didn't have to wait in line I did it all from my phone — it is super convenient. I love this thing."*
> — Grabbi Customer

> *"I just relied on Grabbi when I was by myself. The people just went crazy, a sea of people in front of me... just ding ding ding."*
> — John, owner of The Smoke Stop BBQ

- **$60,000+ in transactional volume** generated (0→1)
- Shipped iOS App Clips + Android Instant Apps consumer experience
- Designed React web merchant platform
- Signed and onboarded **first 10 merchants** in San Francisco
- Designed SmartMenu board with NFC + QR

### Cursor Prompting Tips for This Pattern
```
When building checkout or order-flow UIs:
- Optimise for thumb reach — primary actions bottom-center on mobile
- Reduce steps ruthlessly — every extra tap is a drop-off risk
- Show item visuals (images) — food is emotional, not just functional
- Order confirmation must be immediate and unambiguous (full-screen success state)
- Merchant dashboard: real-time order queue view is the hero screen, not analytics
- NFC / QR entry points: design for outdoor readability (high contrast, large targets)
```

---

## Case Study 4 — SVB (Back Office Online Banking)

### Context
- **Client:** Silicon Valley Bank (SVB)
- **Engagement:** Staff Product Designer – 3 Years

### Problem Space
Internal back-office administrators for SVB's banking clients needed feature parity with the legacy system in order to migrate to SVB Go Online Banking. Required back-office capabilities:
- Adding Users
- Adding Client Services
- Editing Users, Client Services & Company Permissions

Migration could not happen until administrators had full feature parity — blocking the client base from moving to the modern platform.

### Solution & Design Approach
- Worked closely with the business to align with client needs and technical requirements
- Established user workflows for repeat administrative tasks
- Maintained and contributed to the **design system** for all UI components
- Tight engineering collaboration for deployment, QA, and spec handoff

### Design Principles Applied
- **Task completion over delight** — back-office tools optimise for speed and accuracy, not aesthetics
- **Parity first, then improvement** — don't redesign what admins already know; migrate the mental model
- **Error prevention** — admin actions (permissions, user roles) are high-stakes; confirm destructive actions
- **Design system contribution** — every new component feeds back into the shared system
- **Self-service as the goal** — reduce reliance on support cases through clear, capable UI

### Key Outcome
- **86% of existing clients** migrated from legacy system to SVB Go Online Banking
- **51% reduction in service cases** — back-office admins self-serving successfully
- Delivered **Positive Pay** feature — improving fraud detection and security

### Cursor Prompting Tips for This Pattern
```
When building admin / back-office tools:
- Table-first layouts — admins manage lists of users, permissions, services
- Inline editing preferred over navigating to a separate edit page
- Role/permission selectors: use clear labels with descriptions, not just checkboxes
- Confirmation modals for destructive or permission-changing actions (not toast-only)
- Bulk actions (select all, bulk edit) are essential for admin efficiency
- Audit trail / activity log component: who changed what, and when
```

---

## Cross-Project Design Principles

These themes appear consistently across all engagements and should inform every design decision in this codebase:

| Principle | Description |
|---|---|
| **Speed is a feature** | Whether diagnosing power events or ordering food, time-to-value is the primary metric. |
| **Design systems scale** | Every component should be built to live in a system, not as a one-off. |
| **Engineering partnership** | Design is only done when it's built to spec and QA'd together. |
| **Real-world research** | Desk research is the start. Field research (food trucks, stakeholder interviews) is where the real insights live. |
| **AI as workflow, not gimmick** | AI features (EQ Sight) are integrated into the task flow, not bolted on as a chatbot. |
| **Accessibility is baseline** | All components ship accessible — not as an afterthought. |
| **Measure outcomes** | Every project has a quantified outcome. Design decisions should be tied to metrics. |

---

## How to Use This File in Cursor

Reference this file when prompting Cursor to generate or improve UI components. Example prompts:

```
# Reference design knowledge when building a data dashboard:
"Following the signal-first diagnostic principles in DESIGN-KNOWLEDGE.md,
build a dashboard component that surfaces AI insights inline with the data table."

# Reference when building a voting/polling component:
"Using the BlackRock poll case study patterns in DESIGN-KNOWLEDGE.md,
create a one-click poll component with animated results reveal and localStorage vote persistence."

# Reference when building an admin table:
"Following the SVB back-office principles in DESIGN-KNOWLEDGE.md,
build a users table with inline editing, role selectors, and a confirmation modal for permission changes."
```

Add this file to your Cursor context by opening it alongside any file you're working on, or reference it explicitly in your prompts.
