
CREATE POLICY "Allow update on site_settings"
  ON public.site_settings
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
