"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowLeft, Upload, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface ParsedRow {
  email: string;
  prenom: string;
  nom: string;
  entreprise: string;
  telephone: string;
  prices: Record<string, number>;
}

interface PreviewRow extends ParsedRow {
  error?: string;
}

export default function ImportClientsPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<PreviewRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<{ success: number; errors: string[] } | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!loading && !isAdmin) {
    router.push("/");
    return null;
  }

  // Parse CSV manuel
  function parseCSV(text: string): ParsedRow[] {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map((h) => h.trim());
    const baseColumns = ["email", "prenom", "nom", "entreprise", "telephone"];
    const skuColumns = headers.slice(5);

    const rows: ParsedRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      if (values.length < 5 || !values[0]) continue;

      const prices: Record<string, number> = {};
      for (let j = 5; j < values.length && j < headers.length; j++) {
        const sku = skuColumns[j - 5];
        const priceStr = values[j];
        const price = parseFloat(priceStr);
        if (!isNaN(price) && sku) {
          prices[sku] = price;
        }
      }

      rows.push({
        email: values[0],
        prenom: values[1],
        nom: values[2],
        entreprise: values[3],
        telephone: values[4],
        prices,
      });
    }

    return rows;
  }

  function handleFileChange(f: File) {
    setFile(f);
    f.text().then((text) => {
      const rows = parseCSV(text);
      setPreview(
        rows.map((row) => ({
          ...row,
          error: validateRow(row),
        }))
      );
    });
  }

  function validateRow(row: ParsedRow): string | undefined {
    if (!row.email?.includes("@")) return "Email invalide";
    if (!row.prenom?.trim()) return "Prénom manquant";
    if (!row.nom?.trim()) return "Nom manquant";
    if (!row.entreprise?.trim()) return "Entreprise manquante";
    return undefined;
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dropZoneRef.current?.classList.add("border-orange-500", "bg-orange-50");
  }

  function handleDragLeave() {
    dropZoneRef.current?.classList.remove("border-orange-500", "bg-orange-50");
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dropZoneRef.current?.classList.remove("border-orange-500", "bg-orange-50");
    const files = e.dataTransfer.files;
    if (files[0]) handleFileChange(files[0]);
  }

  async function handleImport() {
    if (preview.length === 0) return;

    const validRows = preview.filter((r) => !r.error);
    if (validRows.length === 0) {
      alert("Aucune ligne valide à importer");
      return;
    }

    setImporting(true);
    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: validRows }),
      });

      const data = await res.json();
      setResults(data);

      if (data.success > 0) {
        setFile(null);
        setPreview([]);
      }
    } catch (error) {
      console.error("Import error:", error);
      setResults({
        success: 0,
        errors: ["Erreur lors de l'import"],
      });
    } finally {
      setImporting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#e67e22" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "#18223b" }}
        >
          <ArrowLeft size={16} /> Retour
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#18223b" }}>
            Import de clients
          </h1>
          <p className="text-sm opacity-70" style={{ color: "#18223b" }}>
            Importez plusieurs clients et leurs prix contractuels en une seule opération
          </p>
        </div>

        {/* Affichage des résultats */}
        {results && (
          <div className="mb-8 rounded-2xl p-6" style={{ backgroundColor: "white" }}>
            <div className="flex items-start gap-4">
              {results.success > 0 ? (
                <>
                  <CheckCircle2 size={24} style={{ color: "#27ae60" }} className="flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-bold mb-2" style={{ color: "#18223b" }}>
                      {results.success} client(s) importé(s) avec succès
                    </h2>
                    {results.errors.length > 0 && (
                      <div className="space-y-1">
                        {results.errors.map((err, i) => (
                          <p key={i} className="text-sm opacity-70" style={{ color: "#18223b" }}>
                            • {err}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle size={24} style={{ color: "#e74c3c" }} className="flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-bold mb-2" style={{ color: "#18223b" }}>
                      Erreurs lors de l'import
                    </h2>
                    <div className="space-y-1">
                      {results.errors.map((err, i) => (
                        <p key={i} className="text-sm opacity-70" style={{ color: "#18223b" }}>
                          • {err}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => {
                setResults(null);
                setFile(null);
                setPreview([]);
              }}
              className="mt-4 px-4 py-2 rounded-lg font-semibold text-sm transition-opacity"
              style={{ backgroundColor: "#e67e22", color: "white" }}
            >
              Importer un autre fichier
            </button>
          </div>
        )}

        {!results && (
          <>
            {/* Zone de dépôt de fichier */}
            <div className="mb-8 rounded-2xl p-8" style={{ backgroundColor: "white" }}>
              <div
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer"
                style={{ borderColor: "#ede9e0" }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={32} className="mx-auto mb-3 opacity-40" style={{ color: "#18223b" }} />
                <h3 className="font-bold mb-1" style={{ color: "#18223b" }}>
                  {file ? file.name : "Déposer votre fichier CSV ici"}
                </h3>
                <p className="text-xs opacity-60" style={{ color: "#18223b" }}>
                  ou cliquez pour parcourir
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {file && (
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "#F7F5F0" }}>
                  <p className="text-sm font-semibold" style={{ color: "#18223b" }}>
                    {file.name} · {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              )}
            </div>

            {/* Aperçu du fichier */}
            {preview.length > 0 && (
              <div className="mb-8 rounded-2xl overflow-hidden" style={{ backgroundColor: "white" }}>
                <div className="p-6 border-b" style={{ borderColor: "#ede9e0" }}>
                  <h2 className="font-bold" style={{ color: "#18223b" }}>
                    Aperçu ({preview.length} lignes)
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: "#F7F5F0" }}>
                        <th className="px-6 py-3 text-left font-semibold" style={{ color: "#18223b" }}>
                          Email
                        </th>
                        <th className="px-6 py-3 text-left font-semibold" style={{ color: "#18223b" }}>
                          Prénom
                        </th>
                        <th className="px-6 py-3 text-left font-semibold" style={{ color: "#18223b" }}>
                          Nom
                        </th>
                        <th className="px-6 py-3 text-left font-semibold" style={{ color: "#18223b" }}>
                          Entreprise
                        </th>
                        <th className="px-6 py-3 text-left font-semibold" style={{ color: "#18223b" }}>
                          Téléphone
                        </th>
                        <th className="px-6 py-3 text-left font-semibold" style={{ color: "#18223b" }}>
                          Statut
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, i) => (
                        <tr
                          key={i}
                          style={{
                            backgroundColor: i % 2 === 0 ? "white" : "#F7F5F0",
                            borderTop: "1px solid #ede9e0",
                          }}
                        >
                          <td className="px-6 py-3" style={{ color: "#18223b" }}>
                            {row.email}
                          </td>
                          <td className="px-6 py-3" style={{ color: "#18223b" }}>
                            {row.prenom}
                          </td>
                          <td className="px-6 py-3" style={{ color: "#18223b" }}>
                            {row.nom}
                          </td>
                          <td className="px-6 py-3" style={{ color: "#18223b" }}>
                            {row.entreprise}
                          </td>
                          <td className="px-6 py-3" style={{ color: "#18223b" }}>
                            {row.telephone}
                          </td>
                          <td className="px-6 py-3">
                            {row.error ? (
                              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: "#e74c3c15", color: "#e74c3c" }}>
                                Erreur
                              </span>
                            ) : (
                              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: "#27ae6015", color: "#27ae60" }}>
                                OK
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Détails des erreurs */}
                {preview.filter((r) => r.error).length > 0 && (
                  <div className="p-6 border-t" style={{ borderColor: "#ede9e0", backgroundColor: "#e74c3c15" }}>
                    <h3 className="font-semibold mb-3 text-sm" style={{ color: "#e74c3c" }}>
                      {preview.filter((r) => r.error).length} ligne(s) avec erreur(s)
                    </h3>
                    <div className="space-y-2">
                      {preview
                        .map((r, i) => ({ ...r, index: i }))
                        .filter((r) => r.error)
                        .map((r) => (
                          <p key={r.index} className="text-xs opacity-80" style={{ color: "#18223b" }}>
                            <strong>Ligne {r.index + 2}</strong> ({r.email}): {r.error}
                          </p>
                        ))}
                    </div>
                  </div>
                )}

                {/* Bouton d'import */}
                <div className="p-6 border-t text-center" style={{ borderColor: "#ede9e0" }}>
                  <button
                    onClick={handleImport}
                    disabled={importing || preview.filter((r) => !r.error).length === 0}
                    className="px-8 py-3 rounded-lg font-bold transition-opacity disabled:opacity-50"
                    style={{
                      backgroundColor: preview.filter((r) => !r.error).length > 0 ? "#e67e22" : "#e67e22",
                      color: "white",
                    }}
                  >
                    {importing ? (
                      <>
                        <Loader2 className="inline mr-2 animate-spin" size={16} />
                        Import en cours...
                      </>
                    ) : (
                      `Importer ${preview.filter((r) => !r.error).length} client(s)`
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
