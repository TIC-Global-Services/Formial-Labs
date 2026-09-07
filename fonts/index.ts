import localFont from "next/font/local";

export const aeonik = localFont({
  src: [
    {
      path: "./aeonik/Aeonik-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./aeonik/Aeonik-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./aeonik/Aeonik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./aeonik/Aeonik-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
});

export const obviously = localFont({
  src: [
    {
      path: "./obviously/ObviouslyWide-Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./obviously/ObviouslyWide-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./obviously/ObviouslyWide-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-obviously",
});
