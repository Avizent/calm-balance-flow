import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  SUPPORTED_LANGUAGES,
  type Language,
  type Translations,
  hardcodedTranslations,
} from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const LANGUAGE_LABELS: Record<Language, string> = {
  nl: "Nederlands",
  en: "English",
  fr: "Français",
  pt: "Português (BR)",
};

const SECTION_KEYS: (keyof Translations)[] = [
  "nav",
  "footer",
  "home",
  "over",
  "lessen",
  "prive",
  "tarieven",
  "contact",
  "medicalProfessionals",
];

const SECTION_LABELS: Record<keyof Translations, string> = {
  nav: "Navigation",
  footer: "Footer",
  home: "Home",
  over: "About (Over)",
  lessen: "Classes (Lessen)",
  prive: "Private Sessions (Privé)",
  tarieven: "Pricing (Tarieven)",
  contact: "Contact",
  medicalProfessionals: "Medical Professionals",
};

// Determine if a string value should use a textarea
function shouldUseTextarea(value: string): boolean {
  return value.length > 80 || value.includes("\n");
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  // Cached admin password used for subsequent privileged write calls to the
  // verify-admin edge function. Kept only in component state — never persisted.
  const [adminToken, setAdminToken] = useState<string>("");
  const [defaultLang, setDefaultLang] = useState<Language>("en");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Translation editor state
  const [activeLang, setActiveLang] = useState<Language>("nl");
  const [activeSection, setActiveSection] = useState<keyof Translations>("nav");
  const [allTranslations, setAllTranslations] = useState<Record<Language, Translations> | null>(null);
  const [dirty, setDirty] = useState(false);
  const [savingTranslations, setSavingTranslations] = useState(false);

  useEffect(() => {
    if (!authenticated) return;
    (async () => {
      const [settingsRes, translationsRes] = await Promise.all([
        supabase.from("site_settings").select("default_language").eq("id", "default").single(),
        supabase.from("translations").select("language, content"),
      ]);
      if (settingsRes.data) setDefaultLang(settingsRes.data.default_language as Language);

      // Build translations: merge DB over hardcoded
      const merged = { ...hardcodedTranslations };
      if (translationsRes.data) {
        for (const row of translationsRes.data) {
          const lang = row.language as Language;
          if (SUPPORTED_LANGUAGES.includes(lang)) {
            merged[lang] = deepMergeObj(hardcodedTranslations[lang], row.content as Partial<Translations>) as Translations;
          }
        }
      }
      setAllTranslations(merged);
      setLoading(false);
    })();
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.functions.invoke("verify-admin", {
        body: { password, action: "verify" },
      });
      if (error) throw error;
      if (data?.valid) {
        setAdminToken(password);
        setAuthenticated(true);
      } else {
        toast({ title: "Incorrect password", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error verifying password", variant: "destructive" });
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    const { data, error } = await supabase.functions.invoke("verify-admin", {
      body: {
        password: adminToken,
        action: "update_settings",
        payload: { default_language: defaultLang },
      },
    });
    setSaving(false);
    if (error || data?.error) {
      toast({
        title: "Error saving",
        description: data?.error ?? error?.message ?? "Unknown error",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved ✓",
        description: `Default language set to ${LANGUAGE_LABELS[defaultLang]}`,
      });
    }
  };

  // Update a single value in translations
  const updateValue = useCallback((path: string[], value: unknown) => {
    setAllTranslations((prev) => {
      if (!prev) return prev;
      const langObj = JSON.parse(JSON.stringify(prev[activeLang]));
      let target = langObj;
      for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]];
      }
      target[path[path.length - 1]] = value;
      setDirty(true);
      return { ...prev, [activeLang]: langObj };
    });
  }, [activeLang]);

  const handleSaveTranslations = async () => {
    if (!allTranslations) return;
    setSavingTranslations(true);
    const { error } = await supabase
      .from("translations")
      .update({
        content: allTranslations[activeLang] as unknown as import("@/integrations/supabase/types").Json,
        updated_at: new Date().toISOString(),
      })
      .eq("language", activeLang);
    setSavingTranslations(false);
    if (error) {
      toast({ title: "Error saving translations", description: error.message, variant: "destructive" });
    } else {
      setDirty(false);
      toast({ title: "Translations saved ✓", description: `${LANGUAGE_LABELS[activeLang]} updated.` });
    }
  };

  // Get the current section data
  const sectionData = useMemo(() => {
    if (!allTranslations) return null;
    return allTranslations[activeLang][activeSection];
  }, [allTranslations, activeLang, activeSection]);

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-lg">Admin Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="admin-pw">Password</Label>
                <Input
                  id="admin-pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">Enter</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Site Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Site Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Default Language (for first-time visitors without geo match)</Label>
              <Select value={defaultLang} onValueChange={(v) => setDefaultLang(v as Language)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <SelectItem key={l} value={l}>
                      {LANGUAGE_LABELS[l]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Language priority:</strong></p>
              <ol className="list-decimal ml-4">
                <li>Visitor's saved preference (localStorage)</li>
                <li>Geo-detection via browser timezone</li>
                <li>This admin default</li>
              </ol>
            </div>
            <Button onClick={handleSaveSettings} disabled={saving} className="w-full">
              {saving ? "Saving…" : "Save"}
            </Button>
          </CardContent>
        </Card>

        {/* Translation Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Translation Editor
              {dirty && <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">Unsaved changes</span>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Language Tabs */}
            <Tabs value={activeLang} onValueChange={(v) => { setActiveLang(v as Language); setDirty(false); }}>
              <TabsList className="w-full">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <TabsTrigger key={l} value={l} className="flex-1">
                    {LANGUAGE_LABELS[l]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {SUPPORTED_LANGUAGES.map((l) => (
                <TabsContent key={l} value={l}>
                  {/* Section Selector */}
                  <div className="mb-4">
                    <Label>Section</Label>
                    <Select value={activeSection} onValueChange={(v) => setActiveSection(v as keyof Translations)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SECTION_KEYS.map((s) => (
                          <SelectItem key={s} value={s}>{SECTION_LABELS[s]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fields */}
                  {sectionData && (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                      <SectionEditor
                        data={sectionData}
                        path={[activeSection]}
                        onUpdate={updateValue}
                      />
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>

            <Button onClick={handleSaveTranslations} disabled={savingTranslations || !dirty} className="w-full">
              {savingTranslations ? "Saving…" : dirty ? `Save ${LANGUAGE_LABELS[activeLang]} translations` : "No changes"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

// Recursive editor for a section's data
function SectionEditor({
  data,
  path,
  onUpdate,
}: {
  data: Record<string, unknown>;
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  return (
    <>
      {Object.entries(data).map(([key, value]) => {
        const currentPath = [...path, key];
        const pathKey = currentPath.join(".");

        if (typeof value === "string") {
          return (
            <div key={pathKey} className="space-y-1">
              <Label className="text-xs text-muted-foreground font-mono">{key}</Label>
              {shouldUseTextarea(value) ? (
                <Textarea
                  value={value}
                  onChange={(e) => onUpdate(currentPath, e.target.value)}
                  rows={3}
                />
              ) : (
                <Input
                  value={value}
                  onChange={(e) => onUpdate(currentPath, e.target.value)}
                />
              )}
            </div>
          );
        }

        if (Array.isArray(value)) {
          return (
            <ArrayEditor
              key={pathKey}
              label={key}
              items={value}
              path={currentPath}
              onUpdate={onUpdate}
            />
          );
        }

        if (typeof value === "object" && value !== null) {
          return (
            <div key={pathKey} className="border border-border rounded-md p-3 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground font-mono">{key}</p>
              <SectionEditor data={value as Record<string, unknown>} path={currentPath} onUpdate={onUpdate} />
            </div>
          );
        }

        return null;
      })}
    </>
  );
}

// Array editor with add/remove
function ArrayEditor({
  label,
  items,
  path,
  onUpdate,
}: {
  label: string;
  items: unknown[];
  path: string[];
  onUpdate: (path: string[], value: unknown) => void;
}) {
  const isStringArray = items.length === 0 || typeof items[0] === "string";

  const addItem = () => {
    if (isStringArray) {
      onUpdate(path, [...items, ""]);
    } else {
      // Clone structure of first item with empty values
      const template = items[0] as Record<string, string>;
      const empty: Record<string, string> = {};
      for (const k of Object.keys(template)) {
        empty[k] = "";
      }
      onUpdate(path, [...items, empty]);
    }
  };

  const removeItem = (index: number) => {
    onUpdate(path, items.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-border rounded-md p-3 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground font-mono">{label} ({items.length})</p>
        <Button variant="outline" size="sm" onClick={addItem} type="button">+ Add</Button>
      </div>
      {items.map((item, index) => {
        const itemPath = [...path, String(index)];
        if (typeof item === "string") {
          return (
            <div key={index} className="flex gap-2 items-start">
              <Input
                value={item}
                onChange={(e) => onUpdate(itemPath, e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" onClick={() => removeItem(index)} type="button" className="shrink-0 text-destructive">
                ×
              </Button>
            </div>
          );
        }
        if (typeof item === "object" && item !== null) {
          return (
            <div key={index} className="border border-muted rounded p-2 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">#{index + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removeItem(index)} type="button" className="shrink-0 text-destructive h-6 w-6">
                  ×
                </Button>
              </div>
              {Object.entries(item as Record<string, string>).map(([k, v]) => (
                <div key={k} className="space-y-1">
                  <Label className="text-xs text-muted-foreground font-mono">{k}</Label>
                  {shouldUseTextarea(v) ? (
                    <Textarea
                      value={v}
                      onChange={(e) => onUpdate([...itemPath, k], e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <Input
                      value={v}
                      onChange={(e) => onUpdate([...itemPath, k], e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// Simple deep merge utility
function deepMergeObj(target: unknown, source: unknown): unknown {
  if (!source) return target;
  if (typeof target !== "object" || typeof source !== "object" || target === null || source === null) {
    return source ?? target;
  }
  if (Array.isArray(source)) return source;
  const result: Record<string, unknown> = { ...(target as Record<string, unknown>) };
  for (const key of Object.keys(source as Record<string, unknown>)) {
    const srcVal = (source as Record<string, unknown>)[key];
    const tgtVal = result[key];
    if (srcVal && typeof srcVal === "object" && !Array.isArray(srcVal) && tgtVal && typeof tgtVal === "object" && !Array.isArray(tgtVal)) {
      result[key] = deepMergeObj(tgtVal, srcVal);
    } else if (srcVal !== undefined) {
      result[key] = srcVal;
    }
  }
  return result;
}
