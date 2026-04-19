# PRD — Cool QR Codes Studio

## 1. Product Overview

**Working title:** Cool QR Codes Studio  
**Product type:** Web application  
**Goal:** Let users generate visually striking, customizable, and reliably scannable QR codes for links or text, with support for themes, logos/images, export, and optional placement of QR codes into specific moments/regions of a video using VideoDB.

The product should feel like a **design studio for branded QR codes**, not a plain utility generator.

---

## 2. Problem Statement

Most QR generators are functional but boring. The better-looking ones are often either:
- too limited in customization,
- not trustworthy in scan reliability,
- missing export quality for real-world use,
- missing reusable presets/templates,
- or unable to place a QR code into video content cleanly.

Users want QR codes that are:
- visually distinctive,
- on-brand,
- easy to design,
- safe to scan,
- exportable for web/print/social,
- and optionally composable into video assets.

---

## 3. Vision

Create the easiest way to make **cool, branded, scannable QR codes** and apply them across digital media, including images, social graphics, and video.

---

## 4. Product Goals

### Primary goals
1. Generate QR codes from text or URLs.
2. Make QR codes highly customizable and visually premium.
3. Preserve scan reliability while styling.
4. Offer fast, live preview-based editing.
5. Support high-quality exports for common use cases.
6. Support QR placement into user-uploaded videos using VideoDB timeline editing.

### Secondary goals
1. Make theme presets a core experience.
2. Enable reusable brand kits.
3. Support future analytics/short-link integrations.
4. Support saving and sharing QR design projects.

---

## 5. Target Users

### Primary users
- creators and freelancers
- startup founders
- marketers
- social media managers
- event organizers
- restaurants/cafes
- personal brand owners

### Secondary users
- agencies making branded assets
- teams producing promo videos
- ecommerce sellers linking product pages
- educators sharing resources quickly

---

## 6. Core Use Cases

1. User enters a website URL and generates a branded QR code.
2. User creates a QR code with a center logo and exports SVG for print.
3. User picks a preset theme like Neon, Luxury Gold, or Glass.
4. User uploads a brand logo and saves a reusable visual style.
5. User wants warnings if the QR may become hard to scan.
6. User exports a QR for Instagram story or poster use.
7. User uploads a video and overlays the QR code in a chosen region and time range.
8. User creates a CTA frame like “Scan Me” around the QR.
9. User duplicates a design and makes channel-specific variations.

---

## 7. Scope

## In Scope for V1
- QR generation from URL or plain text
- live QR preview
- custom styling controls
- logo/image embedding
- design themes/presets
- branded frames and labels
- export to PNG and SVG
- scanability guardrails/warnings
- project save/load
- basic brand kit support
- video upload + QR overlay workflow via VideoDB

## Out of Scope for V1
- dynamic short links + analytics backend
- user billing/subscriptions
- collaborative multi-user editing
- native mobile apps
- AI-generated brand identity from scratch
- animated QR video/GIF output generated locally
- complex timeline animation/keyframing for overlays

---

## 8. Product Principles

1. **Cool first, but scannable always.**
2. **Preset-driven for fast wins.**
3. **Advanced controls available, but not required.**
4. **Exports should be production-ready.**
5. **Video QR placement should feel simple, not like a full video editor.**

---

## 9. Functional Requirements

## 9.1 QR Content Input
Users must be able to:
- enter a URL
- enter plain text
- optionally support standard QR content types in future:
  - Wi-Fi
  - phone number
  - email
  - vCard
  - event

### Requirements
- support content length validation
- show generated QR instantly on input change
- auto-sanitize obvious URL formatting issues where safe
- allow choosing QR error correction level, defaulting to **High**

---

## 9.2 QR Styling Studio
Users must be able to customize:
- foreground color
- background color
- transparency/background opacity where supported
- gradients
- dot/module style
- corner eye style
- corner eye color
- quiet zone / padding
- border/frame
- CTA text (e.g. “Scan Me”, “View Menu”, “Watch Now”)

### Dot styles
- square
- rounded
- dots/circles
- classy / extra-rounded
- diamond
- pixel

### Eye styles
- square
- rounded
- leaf / soft
- bold / modern
- branded style variants

### Requirements
- all styling changes should render in real time
- system should prevent invalid combinations where possible
- contrast between foreground and background should be checked

---

## 9.3 Themes / Presets
Users must be able to apply one-click visual themes.

### Initial theme set
- Minimal Monochrome
- Cyber Neon
- Glassmorphism
- Sunset Gradient
- Luxury Gold
- Retro Pixel
- Corporate Clean
- Pastel Cute
- Dark Tech
- Creator Pop

### Requirements
- applying a theme should update multiple style properties at once
- users can tweak a theme after applying it
- users can save a custom theme as a personal preset in later phases

---

## 9.4 Logo / Image Embedding
Users must be able to upload a logo/image and place it inside the QR.

### Requirements
- center image upload
- resize logo within safe bounds
- optional background shape behind logo (circle, rounded square, square)
- automatic recommendation for max logo size
- warning when logo size may reduce scanability
- support transparent PNG at minimum

---

## 9.5 Frames / Branded Layouts
Users should be able to place the QR inside a designed frame.

### Examples
- Scan Me
- Visit Site
- Menu
- Pay Here
- RSVP
- Watch Video

### Requirements
- allow frame padding and CTA text
- support theme-coordinated frame styles
- export full framed composition, not just bare QR

---

## 9.6 Export
Users must be able to export:
- PNG
- SVG

### Future export targets
- PDF print sheet
- WebP
- transparent PNG presets for overlays

### Requirements
- export at multiple sizes
- offer presets for web/social/print
- preserve vector quality in SVG
- allow transparent background if design permits

---

## 9.7 Scanability / Safety System
The app must actively help users avoid creating broken QR codes.

### Safety checks
- contrast too low
- logo too large
- dense content with too much styling
- quiet zone too small
- module size too small for export target
- overuse of transparency/background noise

### Outputs
- scanability score or status
- warning banners
- corrective suggestions

### Requirements
- warnings should appear before export
- non-blocking by default, but severe issues may require confirmation
- defaults should bias toward reliable designs

---

## 9.8 Saved Projects
Users should be able to:
- create a project
- save current QR configuration
- reopen/edit saved projects
- duplicate a project
- rename/delete a project

### Project data includes
- content payload
- design settings
- theme selection
- uploaded logo reference
- export preferences
- video overlay settings if used

---

## 9.9 Brand Kits
Users should be able to define reusable brand preferences.

### Brand kit includes
- primary/secondary colors
- preferred fonts for frames/labels
- logo asset
- default theme/preset
- default CTA text

### V1 scope
- one simple brand kit per user or per project

---

## 9.10 Video QR Overlay via VideoDB
Users must be able to upload a video and place their generated QR onto a selected section of the video.

This is not intended to be a full-featured nonlinear editor. It is a guided workflow for placing a QR overlay on a video with minimal friction.

### User workflow
1. User generates/designs a QR code.
2. User uploads a video file or provides a video URL.
3. System uploads the video asset to VideoDB.
4. User sets:
   - overlay start time
   - overlay end time
   - overlay position
   - overlay size/scale
   - optional CTA text or frame
5. System creates a VideoDB timeline composition with:
   - base video track
   - QR image overlay track
   - optional text overlay track
6. User previews the playable stream.
7. User exports/downloads the composited video.

### Overlay controls
- start time / end time
- duration
- position presets:
  - top-left
  - top-right
  - bottom-left
  - bottom-right
  - center
- optional custom positioning in later versions
- scale/size
- opacity
- optional background plate behind QR for contrast

### VideoDB specification requirements
The system should use VideoDB’s server-side editing workflow rather than local ffmpeg-based processing.

#### Proposed implementation pattern
- upload source video to a VideoDB collection
- upload generated QR image asset to the same collection
- use `Timeline`, `Track`, `Clip`, `VideoAsset`, `ImageAsset`, and optionally `TextAsset`
- place the source video on a base track
- place the QR image as an overlay clip on a higher track over the desired time range
- optionally place CTA text on another overlay track
- render using `generate_stream()`
- provide a player link and optional download

#### Initial VideoDB design constraints
- prefer predefined overlay positions over freeform drag initially
- use simple static overlays only in V1
- no animated entrance/exit in V1 unless VideoDB transition support proves clean for image clips
- keep video export as a follow-up step after QR design, not mixed into the main editing UI

### Video feature acceptance goals
- user can add a QR to any uploaded video
- user can choose where it appears and for how long
- preview loads successfully
- output remains visually clear and scan-friendly

---

## 10. User Experience Requirements

## 10.1 Main App Layout
Suggested primary layout:
- left panel: content + design controls
- center panel: live preview
- right panel: export / scanability / project actions

Alternative responsive mobile layout:
- stacked controls
- sticky preview
- simplified export bar

---

## 10.2 Key Screens
1. Landing page
2. Studio/editor page
3. Export modal
4. Saved projects page
5. Video overlay flow page/modal
6. Brand kit settings page

---

## 10.3 Interaction Model
- instant preview updates
- presets visible early
- advanced controls tucked into accordion sections
- warnings shown contextually
- video flow shown as an optional second step after QR creation

---

## 11. Non-Functional Requirements

### Performance
- preview updates should feel real time
- export should complete quickly for QR-only workflows
- video preview composition may be asynchronous but should surface progress

### Reliability
- generated QR should remain scannable under default settings
- exports should be deterministic
- project saves should not lose uploaded assets/settings

### Accessibility
- keyboard navigable controls
- sufficient default contrast in UI
- labels/tooltips for styling terms

### Security
- validate uploaded assets
- sanitize user text shown in frames/labels
- signed upload handling for media if needed

---

## 12. Success Metrics

### Product metrics
- QR generation completion rate
- export completion rate
- preset usage rate
- project save rate
- video overlay usage rate

### Quality metrics
- scan success rate in internal test set
- export failure rate
- video composition success rate

### UX metrics
- time to first successful QR export
- time to create a video QR overlay

---

## 13. Technical Direction

## 13.1 Recommended Stack
### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- component library such as shadcn/ui

### QR generation/rendering
- `qr-code-styling` as the primary QR design/rendering library
- SVG-first where possible for high-quality output

### Persistence
- simple app database for projects/users/assets
- object storage for logos and generated exports

### Video integration
- VideoDB Python or service integration for upload, timeline editing, preview stream, and download workflow

---

## 13.2 Suggested Data Model (High Level)

### User
- id
- name
- email
- created_at

### Project
- id
- user_id
- name
- content_type
- content_value
- theme_id
- design_json
- logo_asset_id
- brand_kit_id
- created_at
- updated_at

### BrandKit
- id
- user_id
- name
- colors_json
- logo_asset_id
- typography_json

### Asset
- id
- user_id
- type (`logo`, `export`, `video`, `qr-image`)
- storage_url
- metadata_json

### VideoOverlayJob
- id
- project_id
- source_video_asset_id
- qr_asset_id
- start_time
- end_time
- position
- scale
- opacity
- videodb_video_id
- videodb_stream_url
- status
- metadata_json

---

## 14. Integrations

## 14.1 VideoDB Integration Spec
### Inputs
- source video file or URL
- QR image asset generated by app
- overlay timing and placement settings

### Operations
- upload source video to VideoDB collection
- upload QR image to collection as image asset
- create timeline with source video and QR overlay
- generate preview stream URL
- optionally download final result

### Outputs
- VideoDB stream URL
- player URL
- final downloadable video asset

### Future enhancements
- support adding subtitles and QR together
- support scene search to suggest the best QR placement windows
- support “avoid faces/main subject” placement later via video understanding

---

## 15. Risks and Mitigations

### Risk 1: Stylish QRs become unscannable
**Mitigation:** conservative defaults, warning system, export recommendations, optional scan tests.

### Risk 2: Too many controls overwhelm users
**Mitigation:** presets first, advanced sections hidden by default.

### Risk 3: Video editing scope expands too much
**Mitigation:** keep V1 to guided overlays only with limited placement controls.

### Risk 4: Poor quality exports for print
**Mitigation:** SVG-first and print-safe size presets.

### Risk 5: Video render latency
**Mitigation:** asynchronous preview state, clear progress messaging, use VideoDB server-side processing.

---

## 16. Open Questions

1. Do we want authentication in V1, or anonymous local-session projects first?
2. Should dynamic QR/analytics be part of V1.5 or a later paid tier?
3. Do we want freeform drag placement for video overlays in V1 or keep preset positions only?
4. Should the video overlay tool allow CTA text under the QR in the same composition?
5. Should we support structured QR types like Wi-Fi and vCard in V1 or V2?
6. Do we want downloadable print sheets/poster mockups in early versions?

---

## 17. Milestones

### Milestone 1 — QR Studio MVP
- input + preview
- core styling
- themes
- logo upload
- PNG/SVG export
- scanability warnings

### Milestone 2 — Persistence + Brand Layer
- saved projects
- brand kits
- reusable presets

### Milestone 3 — VideoDB Overlay
- video upload
- QR overlay controls
- preview stream
- rendered video output

### Milestone 4 — Polish
- responsive design
- stronger warnings
- onboarding
- better templates and presets

---

## 18. Recommended V1 Build Order

1. Build QR rendering engine wrapper
2. Build live preview editor
3. Add preset/theme system
4. Add logo/image support
5. Add export pipeline
6. Add scanability checks
7. Add persistence/projects
8. Add brand kits
9. Add VideoDB overlay workflow

---

## 19. Go/No-Go Review Criteria

Approve implementation if this PRD aligns with the intended product direction:
- premium-looking QR code design studio
- URL/text to styled QR in a single flow
- export-ready assets
- scanability-safe defaults
- optional but clean video overlay step using VideoDB

If approved, next deliverables should be:
1. technical architecture doc
2. UX wireframe/spec
3. MVP backlog with implementation phases
4. initial app scaffold
