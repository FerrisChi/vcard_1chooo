import type { VCardIconType } from "@/types/config";

export type Resume = {
  educations: Education;
  professionalExperiences: ProfessionalExperience;
  projects: Project;
  others: Other;
};

/**
 * TODO: https://github.com/1chooo/1chooo.com/issues/98
 */
export type ResumeProps = {
  name: string;
  title: string;
  items: {
    icon: VCardIconType;
    title: string;
    text: string;
  }[];
};

export type Education = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type AwardLeaderships = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type TeachingExperience = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type ProfessionalExperience = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type NormalItem = {
  titleMarkdown: string;
  contentMarkdown: string;
}

export type Other = {
  icon: VCardIconType;
  title: string;
  items: NormalItem[];
}

export type Project = {
  icon: VCardIconType;
  title: string;
  items: NormalItem[];
}