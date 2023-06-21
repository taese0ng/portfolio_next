import { Info, Skill, Settings } from "@/components/Desktop";
import { DockItemType } from "@/interfaces/dock";

const iconUrl = "/assets/icons";

export const itemIDs = {
  myInfo: "myInfo",
  skills: "skills",
  settings: "settings",
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
  {
    id: itemIDs.skills,
    title: "기술스택",
    isOpen: false,
    icon: `${iconUrl}/skill.webp`,
    component: Skill,
    zIndex: 0,
    width: 800,
    height: 500,
    nowOpen: false,
  },
  {
    id: itemIDs.settings,
    title: "환경설정",
    isOpen: false,
    icon: `${iconUrl}/settings.webp`,
    component: Settings,
    zIndex: 0,
    width: 700,
    height: 400,
    nowOpen: false,
  },
];
