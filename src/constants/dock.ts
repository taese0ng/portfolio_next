import { Modals } from "@/components/Desktop";
import { DockItemType } from "@/interfaces/dock";

const {
  Info,
  Award,
  // Certificate,
  // Skill,
  // History,
  // Project,
  // Notion,
  // Settings,
  // DinoGame,
} = Modals;

const iconUrl = "/assets/icons";

export const itemIDs = {
  myInfo: "myInfo",
  awards: "awards",
  certificates: "certificates",
  skills: "skills",
  finder: "finder",
  settings: "settings",
  histories: "histories",
  projects: "projects",
  notion: "notion",
  dinoGame: "dinoGame",
};

export const itemList: Array<DockItemType> = [
  {
    id: itemIDs.myInfo,
    title: "내 정보",
    isOpen: false,
    icon: `${iconUrl}/myInfo.webp`,
    component: Info,
    zIndex: 0,
    nowOpen: false,
  },
  //   {
  //     id: itemIDs.notion,
  //     title: "notion",
  //     isOpen: false,
  //     icon: `${iconUrl}/notion.webp`,
  //     component: Notion,
  //     zIndex: 0,
  //     width: 800,
  //     height: 500,
  //     nowOpen: false,
  //     resizeable: true,
  //   },
  {
    id: itemIDs.awards,
    title: "수상경력",
    isOpen: false,
    icon: `${iconUrl}/award.webp`,
    component: Award,
    zIndex: 0,
    width: 800,
    height: 500,
    nowOpen: false,
  },
  //   {
  //     id: itemIDs.certificates,
  //     title: "자격증",
  //     isOpen: false,
  //     icon: `${iconUrl}/certificate.webp`,
  //     component: Certificate,
  //     zIndex: 0,
  //     width: 600,
  //     height: 400,
  //     nowOpen: false,
  //   },
  //   {
  //     id: itemIDs.skills,
  //     title: "기술스택",
  //     isOpen: false,
  //     icon: `${iconUrl}/skill.webp`,
  //     component: Skill,
  //     zIndex: 0,
  //     width: 800,
  //     height: 500,
  //     nowOpen: false,
  //   },
  //   {
  //     id: itemIDs.histories,
  //     title: "히스토리",
  //     isOpen: false,
  //     icon: `${iconUrl}/history.webp`,
  //     component: History,
  //     zIndex: 0,
  //     isAbsoluteHeader: true,
  //     width: 800,
  //     height: 500,
  //     nowOpen: false,
  //     resizeable: true,
  //   },
  //   {
  //     id: itemIDs.projects,
  //     title: "프로젝트",
  //     isOpen: false,
  //     icon: `${iconUrl}/finder.webp`,
  //     component: Project,
  //     zIndex: 0,
  //     isAbsoluteHeader: true,
  //     width: 800,
  //     height: 500,
  //     nowOpen: false,
  //     resizeable: true,
  //   },
  //   {
  //     id: itemIDs.dinoGame,
  //     title: "DinoGame",
  //     isOpen: false,
  //     icon: `${iconUrl}/dinoGame.webp`,
  //     component: DinoGame,
  //     zIndex: 0,
  //     isFull: true,
  //     nowOpen: false,
  //   },
  //   {
  //     id: itemIDs.settings,
  //     title: "환경설정",
  //     isOpen: false,
  //     icon: `${iconUrl}/settings.webp`,
  //     component: Settings,
  //     zIndex: 0,
  //     width: 700,
  //     height: 400,
  //     nowOpen: false,
  //   },
];
