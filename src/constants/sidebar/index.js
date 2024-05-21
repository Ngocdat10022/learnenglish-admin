import {
  IconConversation,
  IconHome,
  IconLearn,
  IconVideo,
} from "@/accsets/icons";

export const MOCKUPDATA_SIDEBAR = [
  {
    id: 0,
    icon: <IconHome className="w-[32px] hover:text-black" />,
    name: " Users",
    path: "/dashboard/users",
  },
  {
    id: 1,
    icon: <IconHome className="w-[32px] hover:text-black" />,
    name: " Category",
    path: "/dashboard/category",
  },
  {
    id: 2,
    icon: <IconLearn className="w-[32px] hover:text-black" />,
    name: "Lesson",
    path: "/dashboard/lesson",
  },
  {
    id: 3,
    icon: <IconVideo className="w-[32px] hover:text-black" />,
    name: "Vocabulary",
    path: "/dashboard/vocabulary",
  },
  {
    id: 4,
    icon: <IconVideo className="w-[32px] hover:text-black" />,
    name: "Quizzes",
    path: "/dashboard/quizzes",
  },
  {
    id: 5,
    icon: <IconConversation className="w-[32px] hover:text-black" />,
    name: "Statistical",
    path: "/dashboard/statistical",
  },
];
