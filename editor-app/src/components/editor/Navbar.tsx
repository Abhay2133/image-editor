import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditor } from "@/context/editor";
import { Button } from "../ui/button";
import { ExternalLinkIcon } from "lucide-react";

type MenuItem = {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  type?: "separator";
};

type Menu = {
  label: string;
  items: MenuItem[];
};

const menubarData: Menu[] = [
  {
    label: "File",
    items: [
      {
        label: "New Canvas",
        shortcut: "Ctrl+N",
        onClick: () => {},
      },
      {
        label: "Open File",
        shortcut: "Ctrl+O",
        onClick: () => {},
      },
      // {
      //   label: "Open Project",
      //   onClick: () => {},
      // },
      // {
      //   label: "Save Project",
      //   shortcut: "Ctrl+S",
      //   onClick: () => {},
      // },
      // {
      //   label: "Save as Project",
      //   onClick: () => {},
      // },
      // {
      //   label: "Export Project",
      //   shortcut: "Ctrl+E",
      //   onClick: () => {},
      // },
      { type: "separator", label: "" },
      {
        label: "Share",
        shortcut: "Alt+S",
        onClick: () => {},
      },
      { type: "separator", label: "" },
      {
        label: "Print",
        shortcut: "Ctrl+P",
        onClick: () => {},
      },
    ],
  },
  // Add more menus here if needed
];

export default function Navbar() {
  return (
    <Menubar className="pr-0 border-r-0">
      {menubarData.map((menu) => (
        <MenubarMenu key={menu.label}>
          <MenubarTrigger>{menu.label}</MenubarTrigger>
          <MenubarContent>
            {menu.items.map((item, idx) =>
              item.type === "separator" ? (
                <MenubarSeparator key={idx} />
              ) : (
                <MenubarItem key={item.label} onClick={item.onClick}>
                  {item.label}
                  {item.shortcut && (
                    <MenubarShortcut>{item.shortcut}</MenubarShortcut>
                  )}
                </MenubarItem>
              )
            )}
          </MenubarContent>
        </MenubarMenu>
      ))}
      <Button className="ml-auto flex cursor-pointer gap-2 items-center active:translate-y-0.5" style={{ borderRadius: "0px" }}>
        Export
        <ExternalLinkIcon size={16}/>
      </Button>
    </Menubar>
  );
}
