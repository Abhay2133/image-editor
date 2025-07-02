import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { useTheme } from "next-themes";

type ItemType = "separator" | "submenu" | "item" | "checkbox" | "radio";

type MenuItem = {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  type?: ItemType;
  checked?: boolean; // For checkbox items
  items?: MenuItem[]; // For submenus
  disabled?: boolean; // Optional property to disable the item
};

type Menu = {
  label: string;
  items: MenuItem[];
};

const MenuItemContainer = ({ item }: { item: MenuItem }) => {
  if (item.type === "separator") {
    return <MenubarSeparator key={item.label} />;
  } else if (item.type === "submenu" || item?.items?.length) {
    return (
      <MenubarSub key={item.label}>
        <MenubarSubTrigger>{item.label}</MenubarSubTrigger>
        <MenubarSubContent>
          {item.items?.map((_item, idx) => (
            <MenuItemContainer item={_item} key={_item.label + idx} />
          ))}
        </MenubarSubContent>
      </MenubarSub>
    );
  } else if (item.type === "radio") {
    return (
      <MenubarRadioItem
        key={item.label}
        onClick={item.onClick}
        disabled={item.disabled}
        value={item.label}
      >
        {item.label}
      </MenubarRadioItem>
    );
  } else if (item.type === "checkbox") {
    return (
      <MenubarCheckboxItem
        key={item.label}
        onClick={item.onClick}
        disabled={item.disabled}
        checked={item.checked}
      >
        {item.label}
      </MenubarCheckboxItem>
    );
  } else {
    return (
      <MenubarItem key={item.label} onClick={item.onClick}>
        {item.label}
        {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
      </MenubarItem>
    );
  }
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
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
        {
          label: "Theme",
          type: "submenu",
          items: [
            {
              label: "Light",
              checked: theme === "light",
              disabled: theme === "light",
              type: "checkbox",
              onClick: () => {
                setTheme("light");
              },
            },
            {
              label: "Dark",
              checked: theme === "dark",
              disabled: theme === "dark",
              type: "checkbox",
              onClick: () => {
                setTheme("dark");
              },
            },
            {
              label: "System",
              checked: theme === "system",
              disabled: theme === "system",
              type: "checkbox",
              onClick: () => {
                setTheme("system");
              },
            },
          ],
        },
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
  return (
    <Menubar className="pr-0 border-r-0">
      {menubarData.map((menu) => (
        <MenubarMenu key={menu.label}>
          <MenubarTrigger>{menu.label}</MenubarTrigger>
          <MenubarContent>
            {menu.items.map((item, idx) => (
              <MenuItemContainer item={item} key={item.label + idx} />
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
      <Button
        className="ml-auto flex cursor-pointer gap-2 items-center active:translate-y-0.5"
        style={{ borderRadius: "0px" }}
      >
        Export
        <ExternalLinkIcon size={16} />
      </Button>
    </Menubar>
  );
}
