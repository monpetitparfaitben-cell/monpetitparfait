"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Search, CheckCircle, Clock, XCircle, ChevronRight } from "lucide-react";
import { createSupabaseBrowserClient, DBProfile, DBContract } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface ClientWithContract extends DBProfile {
  contracts: DBContract[];
}

const STATUS_CONFIG = {
  approved: { label: "Approuvé", icon: CheckCircle, color: "#27ae60", bg: "#27ae6015" },
  pending: { label: "En attente", icon: Clock, color: "#e67e22", bg: "#e67e2215" },
  suspended: { label: "Suspendu", icon: XCircle, color: "#e74c3c", bg: "#e74c3c15" },
};

export default function AdminClientsPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [clients, setClients] = useState<ClientWithContract[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) router.push("/");
  }, [isAdmin, loading, router]);

  useEffect(() => {
    async function loadClients() {
      const { data } = await supabase
        .from("profiles")
        .select("*, contracts(*)")
        .order("created_at", { ascending: false });

      if (data) setClients(data as ClientWithContract[]);
      setFetching(false);
    }
    if (isAdmin) loadClients();
  }, [isAdmin, supabase]);

  const filtered = clients.filter((c) => {
    const matchSearch =
      !search ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company?.toLowerCase().includes(search.toLowerCase()) ||
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.account_status === filter;
    return matchSearch && matchFilter;
  });

  const approveClient = async (id: string) => {
    await supabase
      .from("profiles")
      .update({ account_status: "approved" })
      .eq("id", id);
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, account_status: "approved" } : c))
    );
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#e67e22" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium mb-6 opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#18223b" }}>
          <ArrowLeft size={16} /> Admin
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#18223b" }}>Gestion des clients</h1>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#e67e2215", color: "#e67e22" }}
            >
              {clients.filter((c) => c.account_status === "pending").length} en attente
            </span>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" style={{ color: "#18223b" }} />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "white", border: "1.5px solid #ede9e0", color: "#18223b" }}
            />
          </div>
          <div className="flex gap-2">
            {(["all", "pending", "approved"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor: filter === f ? "#18223b" : "white",
                  color: filter === f ? "white" : "#18223b",
                  border: `1.5px solid ${filter === f ? "#18223b" : "#ede9e0"}`,
                }}
              >
                {f === "all" ? "Tous" : f === "pending" ? "En attente" : "Approuvés"}
              </button>
            ))}
          </div>
        </div>

        {/* Liste clients */}
        <div className="space-y-3">
          {filtered.map((client) => {
            const status = STATUS_CONFIG[client.account_status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
            const activeContract = client.contracts?.find((c) => c.is_active);

            return (
              <div
                key={client.id}
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{ backgroundColor: "white" }}
              >
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: "#18223b" }}
                >
                  {(client.first_name?.[0] ?? client.email[0]).toUpperCase()}
                </div>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-sm truncate" style={{ color: "#18223b" }}>
                      {client.first_name
                        ? `${client.first_name} ${client.last_name ?? ""}`
                        : client.email}
                    </p>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs opacity-60 truncate" style={{ color: "#18223b" }}>
                    {client.email}
                    {client.company && ` · ${client.company}`}
                  </p>
                  {activeContract && (
                    <p className="text-xs mt-1 font-medium" style={{ color: "#e67e22" }}>
                      🤝 {activeContract.name}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {client.account_status === "pending" && (
                    <button
                      onClick={() => approveClient(client.id)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#27ae60" }}
                    >
                      Approuver
                    </button>
                  )}
                  <Link
                    href={`/admin/clients/${client.id}`}
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-70"
                    style={{ backgroundColor: "#F7F5F0", color: "#18223b" }}
                  >
                    Gérer <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: "white" }}>
              <p className="opacity-50 text-sm" style={{ color: "#18223b" }}>Aucun client trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
