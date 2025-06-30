export const sidePanelData = {
  left: [
    {
      label: "Tools",
      value: "tools",
    },
    {
      label: "Layers",
      value: "layers",
    },
  ],
  activeLeft: "tools",
  activeRight: "properties",
  right: [
    {
      label: "Properties",
      value: "properties",
    },
    {
      label: "Settings",
      value: "settings",
    },
    {
      label: "History",
      value: "history",
    },
  ],
};

export const menubarData = {
  file: {
    label: "File",
    items: [
      {
        label: "New Canvas",
        shortcut: "Ctrl+N",
      },
    ],
  },
};

export type ActionType =
  | "SET_LEFT_PANEL"
  | "SET_RIGHT_PANEL"
  | "NEW_CANVAS"
  | "OPEN_FILE";

export interface SidePanelAction {
  type: ActionType;
  payload: { type: "left" | "right"; value: string };
}

export function sidepanelReducer(
  state: typeof sidePanelData,
  action: SidePanelAction
) {
  switch (action.type) {
    case "SET_LEFT_PANEL":
      return { ...state, activeLeft: action.payload.value };
    case "SET_RIGHT_PANEL":
      return { ...state, activeRight: action.payload.value };
    default:
      return state;
  }
}
