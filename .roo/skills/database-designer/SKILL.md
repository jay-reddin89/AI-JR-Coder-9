---
name: database-designer
description: Design database schemas, write migrations, optimize queries, and create ER diagrams. Use when designing databases, creating tables, writing migrations, or optimizing SQL queries.
---

# Database Designer

Design and optimize database schemas with best practices for relational and NoSQL databases.

## When to use

- Designing new database schemas
- Creating or modifying database tables
- Writing migration scripts
- Optimizing slow SQL queries
- Creating Entity-Relationship (ER) diagrams
- Normalizing database structures
- Setting up indexes for performance

## When NOT to use

- For API testing (use api-tester instead)
- For application code debugging (use debug mode instead)
- For general coding tasks (use code mode instead)

## Inputs required

- Database type (PostgreSQL, MySQL, MongoDB, etc.)
- Entity requirements and relationships
- Existing schema (if modifying)
- Query performance issues (if optimizing)

## Workflow

1. **Analyze requirements**
   - Identify entities and their attributes
   - Determine relationships (1:1, 1:N, M:N)
   - Choose appropriate data types

2. **Design schema**
   - Create normalized table structure
   - Define primary and foreign keys
   - Plan indexes for common queries

3. **Write migrations**
   - Generate DDL statements
   - Include rollback procedures
   - Document schema changes

4. **Optimize queries**
   - Analyze query execution plans
   - Suggest index additions
   - Refactor inefficient queries

## Examples

### Creating a users table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### Migration script template

```sql
-- Up migration
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Down migration
DROP TABLE IF EXISTS posts;
```

## Troubleshooting

- **Slow queries**: Check for missing indexes, N+1 queries, or full table scans
- **Deadlocks**: Review transaction ordering and lock contention
- **Migration failures**: Ensure rollback scripts are tested

## Files

- `references/sql_patterns.md` - Common SQL patterns and best practices
- `assets/migration_template.sql` - Migration script template