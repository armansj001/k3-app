"use client";

import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("./homeClient"), {
  ssr: false,
});

export default function Page() {
  return <HomeClient />;
    }
