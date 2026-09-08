"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Navlinks } from "./constants/links";

const navVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
};

const panelVariants: Variants = {
  hidden: { x: "-100%", transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
  show: { x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const menuListVariants: Variants = {
  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  const textColor = isHome ? "text-white" : "text-primary";
  
  const logoSrc = isHome
    ? "/assets/logo/logo_light.svg"
    : "/assets/logo/logo_dark.svg";

  return (
    <header className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="show"
        className={`relative z-10 mx-auto grid h-20 grid-cols-3 items-center px-6 min-[1200px]:flex min-[1200px]:justify-between min-[1200px]:px-12`}
      >
        <motion.button
          variants={itemVariants}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
          className={`justify-self-start transition-opacity hover:opacity-70 min-[1200px]:hidden ${textColor}`}
        >
          {open ? (
            <X size={22} strokeWidth={1.5} />
          ) : (
            <Menu size={22} strokeWidth={1.5} />
          )}
        </motion.button>

        <motion.div variants={itemVariants} className="justify-self-center">
          <Link
            href="/"
            className={`min-[1200px]:h-20 min-[1200px]:items-center  min-[1200px]:pr-6 min-[1200px]:flex`}
          >
            <Image
              src={logoSrc}
              alt="Formial Labs"
              width={100}
              height={28}
              priority
              className="h-10 w-auto min-[1200px]:h-14"
            />
          </Link>
        </motion.div>

        <ul className="hidden items-center gap-8 min-[1200px]:flex">
          {Navlinks.map((link) => (
            <motion.li key={link.name} variants={itemVariants}>
              <Link
                href={link.href}
                className={` text-xs font-obviously uppercase transition-opacity hover:opacity-70 ${textColor}`}
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.div
          variants={itemVariants}
          className="hidden justify-self-end items-center min-[1200px]:flex min-[1200px]:h-full min-[1200px]:pl-6"
        >
          <Link
            href="/free-skin-assesment"
            className="flex h-11 items-center gap-2 pl-1 pr-5 transition-opacity hover:opacity-90 min-[1200px]:h-14 min-[1200px]:gap-3 min-[1200px]:pl-1.5 min-[1200px]:pr-6"
            style={{
              backgroundImage: "url(/assets/common/button-bg.png)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Image
              src="/assets/common/button-bottle.png"
              alt=""
              width={44}
              height={44}
              className="h-9 w-9 shrink-0 min-[1200px]:h-12 min-[1200px]:w-12"
            />
            <span className="whitespace-nowrap text-xs font-medium font-obviously text-right uppercase text-white">
              Find Your <br /> Formulation
            </span>
          </Link>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-0 bg-black/40 min-[1200px]:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="fixed inset-y-0 left-0 z-10 flex w-[80%] max-w-xs flex-col bg-white shadow-xl min-[1200px]:hidden"
          >
            <div className="flex items-center justify-end px-6 py-6">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-primary transition-opacity hover:opacity-70"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <motion.ul
              variants={menuListVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col px-6"
            >
              {Navlinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  variants={menuItemVariants}
                  className={
                    index !== Navlinks.length - 1
                      ? "border-b border-primary/10"
                      : ""
                  }
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 text-base font-medium font-obviously uppercase text-primary transition-opacity hover:opacity-70 active:opacity-70"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
