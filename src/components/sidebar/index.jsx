import React from "react";
import css from "./styles.module.css";
import SvgIcon from "../svg-icon";

const Sidebar = ({ open = true, children, closeSidebar }) => {
  return (
    open && (
      <div className="absolute">
        <div className={css.Sidebar} onClick={() => closeSidebar()}></div>
        <div className={css.SidebarBody}>
          <div className={css.SidebarHeader}>
            <span
              className={css.SidebarCloseIcon}
              onClick={() => closeSidebar()}
            >
              <SvgIcon name="close" />
            </span>
          </div>
          <div className={css.SidebarContent}>{children}</div>
        </div>
      </div>
    )
  );
};

export default Sidebar;
