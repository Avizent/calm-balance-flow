import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_LANGUAGES, type Language } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const LANGUAGE_LABELS: Record<Language, string> = {
  nl: "Nederlands",
  en: "English",
  fr: "Français",
  pt: "Português (BR)",
};

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [defaultLang, setDefaultLang] = useState<Language>("en");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!authenticated) return;
    (async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("default_language")
        .eq("id", "default")
        .single();
      if (data) setDefaultLang(data.default_language as Language);
      setLoading(false);
    })();
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      toast({ title: "Incorrect password", variant: "destructive" });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({ default_language: defaultLang, updated_at: new Date().toISOString() })
      .eq("id", "default");
    setSaving(false);
    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved ✓", description: `Default language set to ${LANGUAGE_LABELS[defaultLang]}` });
    }
  };

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
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
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
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Saving…" : "Save"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
