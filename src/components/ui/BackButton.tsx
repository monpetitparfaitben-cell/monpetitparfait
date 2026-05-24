"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export default function BackButton({ href, label = "Retour" }: BackButtonProps) {
  const router = useRouter();

  const className =
    "group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-md active:scale-95";

  const style = {
    backgroundColor: "white",
    color: "#18223b",
    border: "1.5px solid #e8e4dc",
  };

  const inner = (
    <>
      <span
        className="flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 group-hover:-translate-x-0.5"
        style={{ backgroundColor: "#F7F5F0" }}
      >
        <ArrowLeft size={13} style={{ color: "#e67e22" }} />
      </span>
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={() => router.back()} className={className} style={style}>
      {inner}
    </button>
  );
}
