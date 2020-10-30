 interface Skills {
  name: string;
  experience: number;
  endorsements: number;
  description: string;
  image_url: string;
  technologies: string[];
}

export interface Expert {
  name: string;
  tag: string;
  video_url: string;
  image_url: string;
  introduction: string;
  about: string;
  language: string;
  timezone: string;
  socials: string[];
  skills: Skills[];
}


export interface AboutProps {
  introduction: string;
  about: string;
  language: string;
  timezone: string;
  socials: string[];
}

export interface AvatarProps {
  image_url: string;
  tag: string;
  name: string;
  editMode: boolean;
}

export interface SkillsProp {
  skills: Skills[]
}

export interface SkillProp {
  skill: Skills
}