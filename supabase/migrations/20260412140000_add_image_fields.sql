-- Add image_url fields to products and recipes tables
ALTER TABLE public.products ADD COLUMN image_url TEXT;
ALTER TABLE public.recipes ADD COLUMN image_url TEXT;