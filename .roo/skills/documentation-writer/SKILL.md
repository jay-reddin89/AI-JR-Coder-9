---
name: documentation-writer
description: Create comprehensive technical documentation, READMEs, API documentation, and user guides. Use when writing project documentation, API docs, tutorials, or README files.
---

# Documentation Writer

Create clear, comprehensive technical documentation for projects of any size.

## When to use

- Writing or updating README files
- Creating API documentation
- Writing technical tutorials or guides
- Documenting architecture decisions
- Creating user manuals
- Generating code documentation from comments

## When NOT to use

- For code implementation (use code mode instead)
- For debugging (use debug mode instead)
- For security audits (use security-auditor instead)

## Inputs required

- Project purpose and features
- Target audience (developers, users, etc.)
- Code structure and key components
- API endpoints (if documenting APIs)
- Existing documentation (if updating)

## Workflow

1. **Understand the audience**
   - Identify who will read the documentation
   - Determine their technical level
   - Define the purpose of the document

2. **Gather information**
   - Review codebase structure
   - Identify key features and functionality
   - Collect code examples

3. **Structure the document**
   - Create clear headings and sections
   - Include table of contents for long docs
   - Use consistent formatting

4. **Write content**
   - Start with overview/introduction
   - Include installation/setup instructions
   - Provide usage examples
   - Add troubleshooting section

5. **Review and refine**
   - Check for clarity and completeness
   - Verify code examples work
   - Ensure consistent terminology

## Examples

### README structure

```markdown
# Project Name

Brief description of what the project does.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install my-package
\`\`\`

## Usage

\`\`\`javascript
import { myFunction } from 'my-package';

myFunction();
\`\`\`

## API Reference

### myFunction()

Description of the function.

**Parameters:**
- `param1` (string): Description

**Returns:**
- (boolean): Description

## Contributing

Guidelines for contributing.

## License

MIT
```

## Best Practices

- Use clear, concise language
- Include code examples for all features
- Keep README under 500 lines (split if needed)
- Use proper Markdown formatting
- Include screenshots for UI features
- Add badges for build status, version, license

## Files

- `assets/readme_template.md` - README template
- `references/markdown_style_guide.md` - Markdown formatting guide