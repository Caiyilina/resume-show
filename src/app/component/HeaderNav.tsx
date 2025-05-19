"use client";
import React, { memo } from "react";
import logo from "/public/logo.svg";
import githubIcon from "/public/github.svg";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const HeaderNav = memo(() => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const navList = [
    { name: "预览", path: "/resume-demo" },
    { name: "admin", path: "/admin" },
    { name: "edit", path: "/resume-edit" },
  ];
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md border-b-2 border-gray-100">
      <div className="flex items-center md:ml-8">
        <Link href="/">
          <Image
            src={logo}
            alt="ResumeShow Logo"
            className="h-8 min-w-40 w-auto"
            priority
          />
        </Link>
      </div>
      <nav
        aria-label="Site Nav Bar"
        className="flex items-center space-x-6 gap-2 text-md font-medium md:mr-8"
      >
        {navList.map((nav) => {
          return (
            <Link
              key={nav.path}
              href={nav.path}
              className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
            >
              {nav.name}
            </Link>
          );
        })}
        <div className="ml-1 mt-1">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubIcon.src}
              alt="GitHub"
              className="h-8 w-8 sm:h-6 sm:w-6 hover:scale-110 transition-transform duration-200"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
});
HeaderNav.displayName = "HeaderNav";

export default HeaderNav;
