-- Remove the overly-permissive write policies that allowed any anonymous
-- visitor with the public URL to overwrite site settings and translations.
-- Writes now flow exclusively through the verify-admin edge function, which
-- validates the admin password server-side and uses the service role key
-- (bypassing RLS) to perform the update.

DROP POLICY IF EXISTS "Allow update on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow update on translations" ON public.translations;
DROP POLICY IF EXISTS "Allow insert on translations" ON public.translations;

-- Public SELECT policies remain in place so the site can read content
-- without authentication.
