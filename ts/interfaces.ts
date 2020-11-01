 export interface Skill {
  name: string;
  description: string;
  profile: number;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  video_url?: string;
  image_url?: string;
  slug: string;
  bio?: string;
  skills?: Skill[];
}


export interface AboutProps {
  bio: string;
  editMode: boolean;
  userId: number;
}

export interface AvatarProps {
  image_url: string;
  title: string;
  name: string;
  editMode: boolean;
}

export interface SkillsProp {
  skills: Skill[];
  editMode: boolean;
  userId: number;
}

export interface SkillProp {
  skill: Skill;
  editMode: boolean;
  removeItem: (item:string) => void;
}


export interface Tag {
  id: number;
  name: string;
}

export interface Request {
    id: number;
    user: {
      image_url: string;
    },
    title: string;
    tags: Tag[];
    type: string;
}

export interface RequestProp {
  request: Request
}

export interface NewRequest {
  title: string;
  description: string;
  tags: Tag[];
}
