import type { FormSchema } from "@/components/DynamicForm";

export const coachFormSchema: FormSchema = {
  title: "Coach Application Form",
  submitText: "Submit Application",
  description:
    "By submitting, you agree to our processing of your information in line with our privacy policy.",
  useMailchimp: true,
  mailchimpFormType: 'coach',
  fields: [
    {
      group: "Personal Info",
      layout: "md:grid-cols-2",
      fields: [
        {
          id: "name",
          name: "name",
          label: "Full Name",
          type: "text",
          placeholder: "Your full name",
          required: true,
        },
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "you@company.com",
          required: true,
        },
        {
          id: "phone",
          name: "phone",
          label: "Phone",
          type: "tel",
          placeholder: "+254 115335322",
        },
        {
          id: "linkedin",
          name: "linkedin",
          label: "LinkedIn",
          type: "url",
          placeholder: "https://linkedin.com/in/you",
        },
      ],
    },
    {
      group: "Professional Info",
      layout: "md:grid-cols-2",
      fields: [
        {
          id: "certs",
          name: "certs",
          label: "Relevant Certifications",
          type: "text",
          placeholder: "ICF PCC, EMCC, etc.",
        },
        {
          id: "expertise",
          name: "expertise",
          label: "Areas of Expertise",
          type: "text",
          placeholder: "Executive coaching, team coaching, EI, etc.",
        },
      ],
    },
    {
      group: "Experience",
      layout: "md:grid-cols-1",
      fields: [
        {
          id: "summary",
          name: "summary",
          label: "Experience Summary",
          type: "textarea",
          placeholder: "Briefly describe your coaching background and impact.",
          rows: 5,
          required: true,
        },
      ],
    },
    {
      group: "Uploads",
      layout: "md:grid-cols-2",
      fields: [
        {
          id: "cv",
          name: "cv",
          label: "CV / Resume Upload",
          type: "file",
          required: true,
        },
        {
          id: "video",
          name: "video",
          label: "Video Introduction / Sample Session (URL)",
          type: "url",
          placeholder: "https://...",
        },
      ],
    },
  ],
};

export const facilitatorFormSchema: FormSchema = {
  title: "Facilitator Application Form",
  submitText: "Submit Application",
  description:
    "By submitting, you agree to our processing of your information in line with our privacy policy.",
  useMailchimp: true,
  mailchimpFormType: 'facilitator',
  fields: [
    {
      group: "Personal Info",
      layout: "md:grid-cols-2",
      fields: [
        {
          id: "name",
          name: "name",
          label: "Full Name",
          type: "text",
          placeholder: "Your full name",
          required: true,
        },
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "you@company.com",
          required: true,
        },
        {
          id: "phone",
          name: "phone",
          label: "Phone",
          type: "tel",
          placeholder: "+254 700 000 000",
        },
        {
          id: "location",
          name: "location",
          label: "Location (City, Country)",
          type: "text",
          placeholder: "Nairobi, Kenya",
          required: true,
        },
      ],
    },
    {
      group: "Professional Background",
      layout: "md:grid-cols-2",
      fields: [
        {
          id: "yearsExperience",
          name: "yearsExperience",
          label: "Years of Facilitation Experience",
          type: "number",
          placeholder: "e.g., 5",
          required: true,
        },
        {
          id: "sectors",
          name: "sectors",
          label: "Sectors of Experience",
          type: "text",
          placeholder: "e.g., Education, Corporate, Non-profit",
          required: true,
        },
        {
          id: "languages",
          name: "languages",
          label: "Languages Spoken",
          type: "text",
          placeholder: "e.g., English, Swahili, French",
          required: true,
        },
        {
          id: "certifications",
          name: "certifications",
          label: "Relevant Certifications",
          type: "text",
          placeholder: "e.g., IAF CPF, ToT, etc.",
        },
      ],
    },
    {
      group: "Facilitation Experience",
      layout: "md:grid-cols-1",
      fields: [
        {
          id: "experience",
          name: "experience",
          label: "Facilitation Experience",
          type: "textarea",
          placeholder:
            "Describe your facilitation experience, including types of groups you've worked with and methodologies you use.",
          rows: 5,
          required: true,
        },
        {
          id: "workshops",
          name: "workshops",
          label: "Sample Workshops/Trainings Facilitated",
          type: "textarea",
          placeholder:
            "List 2-3 examples of workshops or trainings you've facilitated, including audience and outcomes.",
          rows: 4,
          required: true,
        },
      ],
    },
    {
      group: "Additional Information",
      layout: "md:grid-cols-1",
      fields: [
        {
          id: "whyHLCC",
          name: "whyHLCC",
          label: "Why do you want to facilitate with HLCC?",
          type: "textarea",
          placeholder:
            "Tell us why you're interested in working with HLCC and what you can bring to our programs.",
          rows: 4,
          required: true,
        },
      ],
    },
    {
      group: "Uploads",
      layout: "md:grid-cols-2",
      fields: [
        {
          id: "cv",
          name: "cv",
          label: "CV / Resume Upload",
          type: "file",
          required: true,
        },
        {
          id: "sampleMaterials",
          name: "sampleMaterials",
          label: "Sample Facilitation Materials (Optional)",
          type: "file",
          description:
            "Upload sample workshop materials, slides, or handouts you've created.",
        },
      ],
    },
  ],
};
