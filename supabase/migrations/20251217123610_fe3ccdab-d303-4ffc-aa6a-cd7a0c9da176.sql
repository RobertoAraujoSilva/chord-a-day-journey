-- Create storage bucket for chord audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('chord-audio', 'chord-audio', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to chord audio files
CREATE POLICY "Public can read chord audio"
ON storage.objects
FOR SELECT
USING (bucket_id = 'chord-audio');