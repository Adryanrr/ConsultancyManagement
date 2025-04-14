import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

interface ItemSideBarProps {
  icone?: any;
  texto: string;
  href: string;
  border?: boolean;
  hasChevronDown?: boolean;
  isActive?: boolean;
}

export default function ItemSideBar(props: ItemSideBarProps) {
  return (
    <Link href={props.href} className="text-sm">
      <div
        className={`flex items-center gap-2 p-2.5 rounded-sm  ${
          props.border === false ? "" : "border border-gray-400/10"
        } hover:bg-slate-400/15 dark:hover:bg-black/30 ${props.isActive ? 'bg-slate-400/35 dark:bg-[#1b1e36] text-black dark:text-white' : ''}`}
      >
        {props.icone && <props.icone size={16} stroke={1.5} />}
        <div className="justify-between flex items-center flex-1">
          {props.texto}
          {props.hasChevronDown && <FaChevronDown size={13} />}
        </div>
      </div>
    </Link>
  );
}
