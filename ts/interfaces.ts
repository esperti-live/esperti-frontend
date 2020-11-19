 export interface Skill {
  name: string;
  description: string;
  profile: number;
}

export interface Expert {
  id: number;
  name: string;
  title: string;
  video_url?: string;
  image?: any;
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
  image?: any;
  title: string;
  name: string;
  editMode: boolean;
  rate: number;
  experience: string;
  id: number
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
    slug: string;
}

export interface RequestProp {
  request: Request
}

export interface NewRequest {
  title: string;
  description: string;
  tags: Tag[];
}

export interface Session {
  user_profile: number;
  expert_profile: number;
  start_time: Date;
  end_time: Date;
  validSession: boolean;
  expertName: string;
  expertSlug: string;
  completed: boolean;
  time: number;
  slug: string;
  id: number;
  paymentTotal: number;
  totalTime: number;
}