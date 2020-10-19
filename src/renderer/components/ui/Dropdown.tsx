import React from "react";
import clsx from "clsx";
import useToggle from "../utils/useToggle";
import { AnimatePresence, motion } from "framer-motion";

type ItemProps = {
  text: string;
  onClick?(): void;
};

function Item({ text, onClick }: ItemProps) {
  return (
    <div
      onClick={onClick}
      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
    >
      {text}
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="border-t border-gray-100"></div>
      <div className="py-1">{children}</div>
      <div className="border-t border-gray-100"></div>
    </React.Fragment>
  );
}

type HeaderProps = {
  text: string;
};

function Header({ text }: HeaderProps) {
  return (
    <div className="px-4 py-3">
      <p className="text-sm leading-5 font-medium text-gray-900 truncate">
        {text}
      </p>
    </div>
  );
}

type Props = {
  open?: boolean;
  label: string;
  origin?: "left" | "right";
  children: React.ReactNode;
};

// Note: this is to be used as a dropdown menu of sorts, there is a separate
// Select component more suited to form usage.
export default function Dropdown({
  open = false,
  label,
  origin = "left",
  children,
}: Props) {
  const [visible, { toggle }] = useToggle(open);

  // TODO: maybe use context to store reference to this, so children may close it
  // when clicked?

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            onClick={toggle}
          >
            {label}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className={clsx(
              origin === "left"
                ? "origin-top-left left-0"
                : "origin-top-right right-0",
              "absolute mt-2 w-56 rounded-md shadow-lg"
            )}
          >
            <div
              className="rounded-md bg-white shadow-xs"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="border-t border-gray-100"></div>
              <div className="py-1">{children}</div>
              <div className="border-t border-gray-100"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Dropdown.Item = Item;
Dropdown.Section = Section;
Dropdown.Header = Header;
