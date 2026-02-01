# Markdown Style Guide

## Headings

Use ATX-style headings with space after #:

```markdown
# H1 - Main title (use once)
## H2 - Major sections
### H3 - Subsections
#### H4 - Details
```

## Text Formatting

- **Bold**: Use for emphasis, UI elements
- *Italic*: Use for technical terms, introductions
- `Code`: Use for inline code, file names, commands
- ~~Strikethrough~~: Use for deprecated features

## Lists

### Unordered Lists

```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

### Ordered Lists

```markdown
1. First step
2. Second step
3. Third step
```

## Code Blocks

Use fenced code blocks with language specification:

````markdown
```javascript
function example() {
  return true;
}
```

```bash
npm install package
```
````

## Links

```markdown
[Link text](https://example.com)
[Internal link](#section-name)
[Reference link][ref]

[ref]: https://example.com
```

## Images

```markdown
![Alt text](path/to/image.png)
![Alt text](path/to/image.png "Optional title")
```

## Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

## Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```

## Horizontal Rules

```markdown
---
```

## Best Practices

1. **Line length**: Keep lines under 80 characters
2. **Blank lines**: Use blank lines between sections
3. **Consistency**: Use consistent formatting throughout
4. **Accessibility**: Always include alt text for images
5. **Links**: Use descriptive link text (not "click here")