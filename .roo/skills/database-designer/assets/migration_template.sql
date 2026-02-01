-- Migration: [description]
-- Created: [date]

-- Up Migration
BEGIN;

-- Create table
CREATE TABLE IF NOT EXISTS table_name (
    id SERIAL PRIMARY KEY,
    column_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_column_name ON table_name(column_name);

-- Add foreign key
ALTER TABLE table_name 
    ADD CONSTRAINT fk_related_table 
    FOREIGN KEY (related_id) 
    REFERENCES related_table(id) 
    ON DELETE CASCADE;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_table_name_updated_at 
    BEFORE UPDATE ON table_name 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

COMMIT;

-- Down Migration
-- BEGIN;
-- DROP TRIGGER IF EXISTS update_table_name_updated_at ON table_name;
-- DROP FUNCTION IF EXISTS update_updated_at_column();
-- ALTER TABLE table_name DROP CONSTRAINT IF EXISTS fk_related_table;
-- DROP INDEX IF EXISTS idx_column_name;
-- DROP TABLE IF EXISTS table_name;
-- COMMIT;