# Panel.jsx Specification

## Summary

The Panel.jsx file implements a flexible, reusable UI component system for creating card-like panels and container layouts in React applications. It provides two main components: `PanelComponent` for individual panels with customizable headers, bodies, and footers, and `PanelContainer` for organizing multiple panels in responsive layouts. The system emphasizes developer experience with prop validation, development warnings, and accessibility-friendly rendering patterns, supporting both simple content display and complex interactive UIs.

## Files

- **Panel.jsx**: Core React component file exporting `PanelComponent` and `PanelContainer`, including utility functions like `cn` for class name management. Handles rendering logic, prop validation, and conditional UI structures.

## Goals

- Enable creation of consistent, modular UI panels that can be composed into dashboards or forms without repetitive boilerplate code.
- Provide flexible slot-based rendering for headers, content, and footers while maintaining semantic HTML structure and accessibility.
- Support responsive layouts for panels using CSS Grid or Flexbox, with configurable gaps, alignments, and widths to adapt to different screen sizes.
- Improve developer productivity through runtime prop validation and console warnings in development mode to catch common misuse early.
- Ensure graceful handling of edge cases like missing content or invalid props, preventing UI breakage while providing clear feedback.

## Details

### Utility Functions

- **`cn(...classes)`**: A class name utility that filters out falsy values and joins valid CSS classes with spaces. Used throughout to conditionally apply styles based on props (e.g., `noPadding`, `layout`). This promotes clean, readable class composition without manual string concatenation.

### PanelComponent

This component renders a single panel with three main slots: header, body (required), and footer. It uses a slot-based API for flexibility, allowing consumers to pass React nodes, strings, or JSX for each section.

#### Props and Validation
- **header** (ReactNode, optional): Custom header content. Renders directly if no title or actions are present.
- **headerTitle** (string, optional): Simple text title for the header. Treated as empty if falsy or whitespace-only.
- **headerActions** (ReactNode, optional): Action elements (e.g., buttons) for the header. Warns in dev mode if provided without a title or header to avoid orphaned actions.
- **children** (ReactNode, required): Body content. Displays "No content provided" placeholder if empty or missing.
- **footer** (ReactNode, optional): Custom footer content.
- **className** (string, optional): Additional CSS classes applied to the root element.
- **noPadding** (boolean, default: false): Removes default padding from the body when true, applying `panel__body--no-padding` class.

#### Rendering Logic
- **Header Rendering**:
  - Conditionally renders only if `header`, `headerTitle`, or `headerActions` is provided.
  - Uses flex layout (`panel__header`) when both actions and (title/header) exist for side-by-side alignment.
  - Applies specialized classes:
    - `panel__header--actions-only`: For actions without title/header.
    - `panel__header--content-only`: For title or custom header without actions.
  - Title is wrapped in `<span className="panel__header-title">` with data-testid for testing.
  - Custom `header` renders directly in content area if no title/actions conflict.

- **Body Rendering**:
  - Always present with `panel__body` class.
  - Applies `panel__body--empty` if no children, showing placeholder text.
  - Padding is conditional via `noPadding` prop.

- **Footer Rendering**:
  - Conditionally renders `panel__footer` only if `footer` is provided.

- **Root Structure**:
  - `<div className="panel">` with optional modifiers like `panel--no-padding`.
  - Includes `data-testid` attributes (`panel-component`, `panel-header`, etc.) for e2e testing.

- **Edge Cases Handled**:
  - Null/undefined props are normalized (e.g., `effectiveHeader = header ?? null`).
  - Empty strings for `headerTitle` are treated as no title.
  - Development warnings for invalid configurations (e.g., actions without title).

#### Business Decisions
- Prioritizes semantic structure: Headers use flex for logical grouping of title and actions, ensuring screen reader compatibility.
- Empty state handling improves UX by providing feedback instead of blank space.
- Prop validation focuses on usability warnings rather than hard errors, allowing flexible usage while guiding best practices.
- No default styling assumptions; relies on external CSS (e.g., `styles.css`) for themes, enabling easy customization.

### PanelContainer

This component acts as a layout wrapper for multiple `PanelComponent` instances, using CSS classes to apply grid or flex arrangements.

#### Props and Validation
- **children** (ReactNode, required): Typically an array of `PanelComponent` elements.
- **layout** (string, default: "horizontal"): Layout direction. Valid: `['horizontal', 'vertical']`. Invalid values warn and fallback to "horizontal".
- **gap** (string, default: "medium"): Spacing between children. Valid: `['none', 'small', 'medium', 'large']`. Falls back to "medium" on invalid.
- **width** (string, default: "full"): Container width. Supports "auto", "full", or CSS values (e.g., "500px", "50%"). Invalid custom values warn and fallback to "full".
- **align** (string, default: "stretch"): Child alignment. Valid: `['start', 'center', 'end', 'stretch']`. Falls back to "stretch".
- **responsive** (boolean, default: false): Applies responsive classes (e.g., stacks vertically on mobile).
- **className** (string, optional): Additional classes.
- **style** (object, optional): Inline styles, merged with custom width if applicable.

#### Rendering Logic
- Single `<div>` root with dynamic classes:
  - Base: `panel-container`.
  - Layout: `panel-container--horizontal` or `--vertical`.
  - Gap: `panel-container--gap-medium` (etc.).
  - Width: `panel-container--width-full` (etc.); custom widths applied via inline `style.width`.
  - Align: `panel-container--align-stretch` (etc.).
  - Responsive: `panel-container--responsive` if true.
- Children render directly inside without wrappers, assuming they are panels.
- `data-testid="panel-container"` for testing.

#### Business Decisions
- Layout validation ensures predictable behavior; fallbacks prevent layout breakage from typos.
- Width flexibility supports both predefined ("auto"/"full") and custom CSS values, balancing simplicity with power.
- Responsive prop enables mobile-first designs without requiring media queries in consumer code.
- No direct child validation (e.g., enforcing `PanelComponent` children) to avoid restricting composition, but assumes panel-like usage.
- Inline styles only for width to minimize conflicts with CSS classes; other styles pass through unchanged.

### Overall Design Philosophy
- **Modularity**: Components are self-contained, composable, and don't rely on global state or context.
- **Accessibility**: Uses semantic elements, ARIA-friendly structure (e.g., titles in spans), and test attributes.
- **Performance**: Lightweight with no heavy dependencies; conditional rendering avoids unnecessary DOM nodes.
- **Testing Support**: Data-testids and class-based selectors facilitate unit/integration/visual tests (as seen in `src/test/` files).
- **Extensibility**: CSS classes follow BEM-like naming for easy overriding; no inline styles except for validated widths.
- **Error Handling**: Dev-mode warnings promote best practices without runtime errors in production.

This specification captures the intentional design choices for robustness, flexibility, and maintainability in UI composition.