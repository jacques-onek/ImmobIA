import { ManagerSibarLink } from "@/types";
import { GoHomeFill } from "react-icons/go";
import { MdAddHomeWork } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { TbWorldShare } from "react-icons/tb";
import { LuChartPie } from "react-icons/lu"; 
import { TbUserShare } from "react-icons/tb";

export const navLinks = [
    {
     title:"Home",
     href:"/estate"
    },
    {
        title:"Buy",
        href:"/estate/Buy"
    },
    {
        title:"Rent",
        href:"/estate/Rent"
    },
    {
        title:"Sell",
        href:"/estate/Sell"
    },
    {
        title:"Add property",
        href:"/estate/Add-property"
    }
]
export const ManagerSideBarLink : ManagerSibarLink[] = [
    {
        icon:LuChartPie,
        title:"Dashboard",
        route:"/manager/dashboard"
    },
    {
        icon:GoHomeFill,
        title:"Mes Proprietes",
        route:"/manager/Properties"
    },
    {
        icon:MdAddHomeWork,
        title:"Ajoutez propiete",
        route:"/manager/create/property"
    },
    {
        icon:TbUserShare,
        title:"Clients",
        route:"/manager/clients"
    },
    {
        icon:MdBookmarkAdded,
        title:"Enregistre",
        route:"/manager/bookmark"
    },
    {
        icon:TbWorldShare,
        title:"Campagne",
        route:"/manager/create/campagne"
    },

]