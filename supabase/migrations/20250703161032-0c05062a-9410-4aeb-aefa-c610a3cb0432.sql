
-- Create a storage bucket for chord audio files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'chord-audio',
  'chord-audio',
  true,
  5242880, -- 5MB limit
  ARRAY['audio/mpeg', 'audio/wav', 'audio/ogg']
);

-- Create RLS policies for the audio bucket
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'chord-audio');

CREATE POLICY "Public Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'chord-audio');
