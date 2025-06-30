import "./sidepanel.css";

export default function SidePanel({
  sidePanelOptions,
  flip = false,
  value,
  onChange
}: {
  sidePanelOptions: {
    label: string;
    value: string;
    onClick?: (value: string) => void;
  }[];
  flip?: boolean;
  value: string;
  onChange?: (value: string) => void;
}) {
  return (
    <aside className="w-8">
      <div className="">
        {sidePanelOptions.map((option, index) => (
          <button
            key={index}
            onClick={() =>
              (option.onClick && option.onClick(option.value)) ||
              (onChange && onChange(option.value))
            }
            value={option.value}
            aria-label={option.label}
            title={option.label}
            type="button"
            className={
              "side-panel-option box-border px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer" +
              (option.value === value ? " dark:bg-gray-800 bg-gray-200" : "") + 
              (flip ? " rotate-180" : "")
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
