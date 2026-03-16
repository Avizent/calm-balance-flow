
CREATE TABLE public.site_settings (
  id text PRIMARY KEY DEFAULT 'default',
  default_language text NOT NULL DEFAULT 'en',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO public.site_settings (id, default_language) VALUES ('default', 'en');
