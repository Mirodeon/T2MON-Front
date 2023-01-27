import React from "react";

type HomeSwitchProps = {
  screen: boolean;
  setScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeSwitch = ({ screen, setScreen }: HomeSwitchProps) => {
  return (
    <div className="container_switch_home" onClick={() => setScreen(!screen)}>
      <div className="switch_settings">
        {screen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="cyan"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="cyan"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M5 8v12h14V8H5zm0-2h14V4H5v2zm15 16H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 10h4v4H7v-4zm0 6h10v2H7v-2zm6-5h4v2h-4v-2z" />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default HomeSwitch;
