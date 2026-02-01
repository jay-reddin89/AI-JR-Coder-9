# SQL Patterns and Best Practices

## Table Design

### Primary Keys
- Use `SERIAL` or `BIGSERIAL` for auto-incrementing integers
- Consider UUID for distributed systems
- Always have a primary key

### Foreign Keys
```sql
CONSTRAINT fk_user_id 
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE
```

### Common Constraints
- `NOT NULL` for required fields
- `UNIQUE` for unique values
- `CHECK` for data validation
- `DEFAULT` for default values

## Indexing Strategies

### When to Index
- Columns used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY

### Index Types
```sql
-- B-tree (default)
CREATE INDEX idx_name ON table(column);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE active = true;

-- Composite index
CREATE INDEX idx_name_email ON users(name, email);
```

## Query Optimization

### Avoid N+1 Queries
Instead of:
```sql
-- N+1 problem
SELECT * FROM users;
-- Then for each user:
SELECT * FROM posts WHERE user_id = ?;
```

Use:
```sql
-- Single query with JOIN
SELECT u.*, p.* 
FROM users u 
LEFT JOIN posts p ON u.id = p.user_id;
```

### Use EXPLAIN ANALYZE
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

## Normalization

### First Normal Form (1NF)
- Atomic values only
- No repeating groups

### Second Normal Form (2NF)
- Must be in 1NF
- No partial dependencies

### Third Normal Form (3NF)
- Must be in 2NF
- No transitive dependencies