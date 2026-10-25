"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

export default function ToastProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("auth") !== "required") return;

    toast.error("এই পৃষ্ঠাটি দেখতে সাইন ইন করুন।");
    url.searchParams.delete("auth");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [pathname]);

  return (
    <div data-rht-toaster="">
      <Toaster position="top-center" />
    </div>
  );
}
