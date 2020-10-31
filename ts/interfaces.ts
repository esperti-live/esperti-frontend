 export interface Skills {
  name: string;
  description: string;
  tags: string[];
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
  bio: string;
  editMode: boolean;
}

export interface AvatarProps {
  image_url: string;
  title: string;
  name: string;
  editMode: boolean;
}

export interface SkillsProp {
  skills: Skills[];
  editMode: boolean;
}

export interface SkillProp {
  skill: Skills;
  editMode: boolean;
  removeItem: (item:string) => void;
}


interface Request {
    id: number;
    user: {
      image_url: string;
    },
    title: string;
    tags: string[];
    type: string;
}

export interface RequestProp {
  request: Request
}

export interface NewRequest {
  title: string;
  description: string;
  tags: string[];
}
