import { Certificate } from "@/interfaces/certificates";

const certificateUrl = "/assets/certificates";

export const certificateList: Array<Certificate> = [
  {
    id: "OPIC Japanese",
    title: "OPIC Japanese",
    src: `${certificateUrl}/OPIC_Japanese.webp`,
    class: "IH",
  },
];
