# SQL Query Component

Executes SQL queries against relational databases and returns structured results. Supports PostgreSQL, MySQL, SQLite, and SQL Server.

## Overview

The SQL Query component connects to a database, executes a SQL query, and returns the results as structured records. It supports parameterized queries to prevent SQL injection, connection pooling, and transaction management.

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | Yes | SQL query to execute |
| `connection_string` | `secret` | Yes | Database connection URI (e.g., `postgresql://user:pass@host:5432/db`) |
| `parameters` | `dict` | No | Query parameters for parameterized queries |
| `database_type` | `dropdown` | No | Database type: `postgresql`, `mysql`, `sqlite`, `mssql` (auto-detected from URI) |
| `max_rows` | `int` | No | Maximum rows to return (default: 1000) |
| `timeout` | `int` | No | Query timeout in seconds (default: 30) |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `records` | `list[dict]` | Query results as a list of dictionaries |
| `columns` | `list[string]` | Column names from the result set |
| `row_count` | `int` | Number of rows returned |
| `text` | `string` | Results formatted as a text table |

## Usage Example

```python
from custom_components import SQLQueryComponent

sql = SQLQueryComponent()
result = sql.run(
    query="SELECT name, email, plan FROM users WHERE created_at > :since",
    connection_string="postgresql://admin:secret@localhost:5432/myapp",
    parameters={"since": "2024-01-01"}
)
print(f"Found {result.row_count} users")
```

## Security

- Always use parameterized queries (`WHERE id = :id`) instead of string interpolation to prevent SQL injection.
- Connection strings are treated as secrets and never logged.
- The component uses read-only connections by default. Enable write mode explicitly for INSERT/UPDATE/DELETE operations.

## Common Use Cases

- Fetching user data for personalized LLM responses
- Loading training examples from a database
- Querying analytics data for report generation
- Validating data against business rules stored in tables
