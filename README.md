# G-TEC Education — Next.js site

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Built from the `G-TEC Landing.dc.html` design.

- Pages: `/` (full landing), `/about`, `/courses`, `/courses/[slug]` (7 programmes), `/centres`, `/students`, `/news`, 404.
- Every page ends with the enquiry section (`#enquire`); on a course page the form preselects that course.
- Content (courses, countries, affiliations, testimonials, news, contact, footer links) lives in `lib/data.ts`.
- Sections are in `components/sections.tsx`; scroll reveals, counters, hero parallax and card spotlight in `components/Motion.tsx`.
- Enquiries are validated server-side (`app/actions.ts`) and appended to `data/enquiries.jsonl`.
- Loader video: put the clip at `public/video/loading.mp4`.
