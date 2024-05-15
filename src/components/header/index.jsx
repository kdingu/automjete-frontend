import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Container from "@/components/container";
import { connect, useDispatch } from "react-redux";
import sessionSlice from "@/store/features/session/slice";
import Sidebar from "../sidebar";
import AuthenticationForm from "../authentication-form";
import SvgIcon from "../svg-icon";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { getHeaderSelectors } from "./selectors";
import css from "./styles.module.css";
import MenuItem from "../menu-item";
import { useRouter } from "next/router";
import { addListener } from "@reduxjs/toolkit";
import { eraseCookie } from "@/helpers/utilities/utils";
import { SESSION_EXPIRED_ERROR, SESSION_KEY } from "@/configs/constants";

const Header = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const router = useRouter();

  const MENU = useMemo(() => {
    return [
      {
        title: t("searchPageLabel"),
        link: "/search",
      }
    ];
  }, [t]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);

  const navigate = (url) => () => {
    router.push(url);
    router.reload();
  };

  useEffect(() => {
    if (props.sessionError === SESSION_EXPIRED_ERROR) eraseCookie(SESSION_KEY);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [props.userLoggedIn]);

  useEffect(() => {
    if (!isSidebarOpen) {
      dispatch(sessionSlice.actions.resetAuthError());
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const unsub = dispatch(
      addListener({
        predicate: (action, newState, oldState) => {
          if (action.type === sessionSlice.actions.loginSuccess().type)
            return true;

          return false;
        },
        effect: (action, store) => {
          toast.success("Hi User! You are now signed in.");
        },
      })
    );

    return () => unsub();
  }, []);

  return (
    <header
      className={`Header z-20 border-b border-gray-100 ${isMenuMobileOpen ? "fixed top-0 w-full bg-white" : css.menuShadow}`}
    >
      <div className="bg-blue-800 py-2">
        <Container>
          <div className="hidden gap-3 text-xs lg:flex">
            {props.categories.map((ctg) => (
              <a
                key={ctg.id}
                className="cursor-pointer text-white transition hover:!text-gray-400"
                href={`/?category=${ctg.slug}`}
              >
                {ctg.name}
              </a>
            ))}
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex items-center justify-between pb-2 pt-2">
          <div
            className="flex flex-col items-center lg:hidden"
            onClick={() => setIsMenuMobileOpen(!isMenuMobileOpen)}
          >
            <div aria-hidden="true" className="relative h-4 w-4">
              <div
                aria-hidden="true"
                className={`${isMenuMobileOpen ? css.menuOpen : css.menuClosed}`}
              ></div>
            </div>
            <span>Menu</span>
          </div>
          <Link href={`/${router.query.category ? `?category=${router.query.category}` : ''}`}>
            <SvgIcon name="logo" />
          </Link>
          <div className="hidden w-full lg:block">
            <div className="group flex w-max gap-5 pl-10 text-gray-600">
              {MENU.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            {props.userLoggedIn ? (
              <div className="flex">
                <Link href="/saved">
                  <div className="flex cursor-pointer flex-col items-center fill-gray-700 text-sm text-gray-700 transition hover:fill-black hover:text-black">
                    <SvgIcon name="heart" />
                    <span>Saved</span>
                  </div>
                </Link>
                <Link className="ml-3" href="/account">
                  <div className="flex cursor-pointer flex-col items-center fill-gray-700 text-sm text-gray-700 transition hover:fill-black hover:text-black">
                    <SvgIcon name="accountLogo" />
                    <span>Account</span>
                  </div>
                </Link>
              </div>
            ) : (
              <div
                className="flex cursor-pointer flex-col items-center fill-gray-700 text-sm text-gray-700 transition hover:fill-black hover:text-black"
                onClick={() => setIsSidebarOpen(true)}
              >
                <SvgIcon name="accountLogo" />
                <span>Login</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 text-xs lg:hidden">
            <div className="flex flex-col items-center">
              <SvgIcon name="heart" />
              <div>Saved</div>
            </div>
            <div className="flex flex-col items-center">
              <SvgIcon name="search" />
              <div>Search</div>
            </div>
          </div>
          <Sidebar
            open={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
          >
            <AuthenticationForm />
          </Sidebar>
        </div>
      </Container>
      {isMenuMobileOpen && (
        <div
          className={`fixed top-[61px] z-10 h-[calc(100vh-62px)] w-full bg-white lg:hidden ${css.menuMobileShadow}`}
        >
          {props.userLoggedIn ? (
            <Link href="/account">
              <div className="flex cursor-pointer items-center gap-2 border-b border-gray-300 fill-gray-700 p-4 pt-6 text-base text-gray-700 transition hover:fill-black hover:text-black">
                <SvgIcon name="accountLogo" />
                <span>Account</span>
              </div>
            </Link>
          ) : (
            <div
              className="flex cursor-pointer items-center gap-2 border-b border-gray-300 fill-gray-700 p-4 pt-6 text-base text-gray-700 transition hover:fill-black hover:text-black"
              onClick={() => setIsSidebarOpen(true)}
            >
              <SvgIcon name="accountLogo" />
              <span>Login</span>
            </div>
          )}
          <div className="w-full">
            <div className="group mt-8 flex w-max flex-col gap-8 pl-4 text-sm font-bold text-gray-600">
              {MENU.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default connect(getHeaderSelectors)(Header);
