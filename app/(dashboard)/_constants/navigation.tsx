import { SettingsIcon, UserIcon } from "lucide-react"
import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go"

export const routes = [
    {
        label: "Home",
        href: "",
        icon: GoHome,
        activeIcon: GoHomeFill,
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: "Members",
        href: "/members",
        icon: UserIcon,
        activeIcon: UserIcon,
    },
]