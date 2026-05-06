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

  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#e67e22",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 0",
    opacity: 1,
    transition: "opacity 0.15s",
  };

  if (href) {
    return (
      <Link href={href} style={style} className="hover:opacity-70">
        <ArrowLeft size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button onClick={() => router.back()} style={style} className="hover:opacity-70">
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
