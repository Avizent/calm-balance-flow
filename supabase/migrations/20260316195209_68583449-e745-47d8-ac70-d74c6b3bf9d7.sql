
-- Create translations table
CREATE TABLE public.translations (
  language text PRIMARY KEY,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- Anyone can read translations
CREATE POLICY "Anyone can read translations"
  ON public.translations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can update translations (protected by admin password in app layer)
CREATE POLICY "Allow update on translations"
  ON public.translations
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow insert for seeding
CREATE POLICY "Allow insert on translations"
  ON public.translations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
