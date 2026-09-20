import {
  person,
  site,
  experience,
  skills,
  education,
  achievements,
} from "@/shared/constants/content.constants";

/**
 * JSON-LD @graph. Derived entirely from lib/data.ts so it can never drift
 * from what is rendered on the page.
 */
export function buildGraph() {
  const current = experience[0].roles[0];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: person.name,
        url: site.url,
        image: `${site.url}/sayan.png`,
        email: `mailto:${person.email}`,
        jobTitle: person.role,
        description: person.tagline,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressCountry: "IN",
        },
        worksFor: {
          "@type": "Organization",
          name: person.company,
          ...(experience[0].url ? { url: experience[0].url } : {}),
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: education.school,
        },
        award: achievements.map((a) => a.text),
        knowsAbout: skills,
        sameAs: [person.links.github, person.links.linkedin, person.links.npm],
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Developer",
          occupationalCategory: "15-1252.00",
          skills: skills.join(", "),
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          educationalLevel: "Bachelor's Degree",
          name: education.degree,
          recognizedBy: {
            "@type": "CollegeOrUniversity",
            name: education.school,
          },
        },
        mainEntityOfPage: { "@id": `${site.url}/#website` },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: "en",
        about: { "@id": `${site.url}/#person` },
        publisher: { "@id": `${site.url}/#person` },
      },
    ],
  };
}
