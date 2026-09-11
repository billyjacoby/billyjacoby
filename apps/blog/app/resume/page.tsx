import { ProjectCard } from '@/components/resume/project-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { RESUME_DATA } from '@/data/resume-data';
import { GlobeIcon, MailIcon } from 'lucide-react';
import { Metadata } from 'next';

import { PrintButton } from '@/components/PrintButton';

import '@/css/resume-print.scss';

export const metadata: Metadata = {
  title: `Resume | ${RESUME_DATA.name}`,
  description: RESUME_DATA.about,
  alternates: {
    canonical: `${RESUME_DATA.personalWebsiteUrl}/resume`,
  },
  openGraph: {
    type: 'profile',
    title: `${RESUME_DATA.name} — ${RESUME_DATA.about}`,
    description: RESUME_DATA.summary,
    url: `${RESUME_DATA.personalWebsiteUrl}/resume`,
    images: [RESUME_DATA.avatarUrl],
  },
  twitter: {
    card: 'summary',
    title: `${RESUME_DATA.name} — ${RESUME_DATA.about}`,
    description: RESUME_DATA.summary,
    images: [RESUME_DATA.avatarUrl],
  },
};

/**
 * Structured data so resume parsers and search engines can read the page
 * as a person rather than as prose.
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: RESUME_DATA.name,
  description: RESUME_DATA.summary,
  url: RESUME_DATA.personalWebsiteUrl,
  image: RESUME_DATA.avatarUrl,
  email: `mailto:${RESUME_DATA.contact.email}`,
  jobTitle: RESUME_DATA.work[0].title,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brodheadsville',
    addressRegion: 'PA',
    addressCountry: 'US',
  },
  worksFor: {
    '@type': 'Organization',
    name: RESUME_DATA.work[0].company,
  },
  alumniOf: RESUME_DATA.education.map((education) => ({
    '@type': 'CollegeOrUniversity',
    name: education.school,
  })),
  knowsAbout: RESUME_DATA.skills,
  sameAs: RESUME_DATA.contact.social.map((social) => social.url),
};

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="resume-print-hidden">
        <PrintButton />
      </div>
      <div className="container relative mx-auto overflow-auto p-4 pt-0 md:p-16 md:pt-4 print:p-0">
        <section className="resume-root mx-auto w-full max-w-2xl space-y-8 print:space-y-6 print:bg-white print:text-black">
          <div className="resume-header flex items-center justify-between">
            <div className="flex-1 space-y-1.5">
              <h1 className="resume-name text-2xl font-bold">
                {RESUME_DATA.name}
              </h1>
              <p className="resume-tagline text-muted-foreground max-w-md text-pretty font-mono text-sm">
                {RESUME_DATA.about}
              </p>
              <p className="text-muted-foreground resume-print-hidden max-w-md items-center text-pretty font-mono text-xs">
                <a
                  className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlobeIcon className="h-3 w-3" aria-hidden="true" />
                  {RESUME_DATA.location}
                </a>
              </p>
              <div className="text-muted-foreground resume-print-hidden flex gap-x-1 pt-1 font-mono text-sm">
                {RESUME_DATA.contact.email ? (
                  <Button
                    className="h-8 w-8"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a
                      href={`mailto:${RESUME_DATA.contact.email}`}
                      aria-label={`Email ${RESUME_DATA.name}`}
                    >
                      <MailIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
                {RESUME_DATA.contact.social.map((social) => (
                  <Button
                    key={social.name}
                    className="h-8 w-8"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${RESUME_DATA.name} on ${social.name}`}
                    >
                      <social.icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ))}
              </div>

              {/*
                Print-only contact line: hidden on screen, shown when printing.

                NOTE: "print-only" is a VISUAL treatment, not a privacy one.
                This markup is still in the served HTML and in the RSC payload,
                so the phone number remains scrapeable by anyone reading the
                page source. To actually keep it out of the public document it
                would need to be fetched client-side behind a check, or served
                from a separate gated PDF route.
              */}
              <div className="resume-contact-print hidden">
                <span>{RESUME_DATA.location}</span>
                <span className="resume-contact-sep">|</span>
                <span>{RESUME_DATA.contact.email}</span>
                <span className="resume-contact-sep">|</span>
                <span>{RESUME_DATA.contact.printOnlyTel}</span>
              </div>
            </div>

            <Avatar className="resume-print-hidden h-28 w-28">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
          </div>

          <Section className="resume-section">
            <h2 className="resume-section-heading text-xl font-bold">About</h2>
            <p className="resume-summary text-muted-foreground text-pretty font-mono text-sm">
              {RESUME_DATA.summary}
            </p>
          </Section>

          <Section className="resume-section">
            <h2 className="resume-section-heading text-xl font-bold">
              Work Experience
            </h2>
            {RESUME_DATA.work.map((work) => {
              const link = 'link' in work ? work.link : undefined;

              return (
                <Card key={work.company} className="resume-entry">
                  <CardHeader className="resume-entry-head">
                    <div className="resume-entry-line flex flex-wrap items-center gap-x-2 text-base">
                      <h3 className="resume-entry-title font-semibold leading-none">
                        {work.title}
                      </h3>
                      <span className="resume-entry-sep hidden">·</span>
                      {link ? (
                        <a
                          className="resume-entry-company text-muted-foreground font-mono text-sm hover:underline"
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {work.company}
                        </a>
                      ) : (
                        <span className="resume-entry-company text-muted-foreground font-mono text-sm">
                          {work.company}
                        </span>
                      )}
                      <span className="resume-entry-dates ml-auto text-sm tabular-nums text-gray-500 print:ml-0">
                        {work.start} – {work.end}
                      </span>
                      <span className="resume-entry-sep hidden">·</span>
                      <span className="resume-entry-badges inline-flex gap-x-1">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="resume-entry-body mt-2 text-xs">
                    <ul className="resume-highlights list-disc space-y-1 pl-4 print:pl-0">
                      {work.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </Section>

          <Section className="resume-section">
            <h2 className="resume-section-heading text-xl font-bold">Skills</h2>
            <div className="resume-print-hidden flex flex-wrap gap-1">
              {RESUME_DATA.skills.map((skill) => {
                return <Badge key={skill}>{skill}</Badge>;
              })}
            </div>
            {/* Print renders skills as a single comma-separated run, as in the PDF. */}
            <p className="resume-skills-print hidden">
              {RESUME_DATA.skills.join(', ')}
            </p>
          </Section>

          <Section className="resume-section">
            <h2 className="resume-section-heading text-xl font-bold">
              Education
            </h2>
            {RESUME_DATA.education.map((education) => (
              <Card
                key={education.school}
                className="resume-entry resume-education-entry"
              >
                <CardHeader className="resume-entry-head">
                  <div className="resume-entry-line flex flex-wrap items-center gap-x-2 text-base">
                    <h3 className="resume-education-degree font-semibold leading-none">
                      {education.degree}
                    </h3>
                    <span className="resume-entry-sep hidden">·</span>
                    <span className="resume-education-school text-muted-foreground font-mono text-sm">
                      {education.school}
                    </span>
                    <span className="resume-education-date ml-auto text-sm tabular-nums text-gray-500 print:ml-0">
                      {education.date}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </Section>

          {RESUME_DATA.projects.length > 0 && (
            <Section className="resume-print-hidden scroll-mb-16">
              <div>
                <h2 className="text-xl font-bold">Projects</h2>
                <div className="-mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {RESUME_DATA.projects.map((project) => {
                    return (
                      <ProjectCard
                        key={project.title}
                        title={project.title}
                        description={project.description}
                        tags={project.techStack}
                        link={'link' in project ? project.link.href : undefined}
                      />
                    );
                  })}
                </div>
              </div>
            </Section>
          )}
        </section>
      </div>
    </main>
  );
}
