import React from 'react';

// Helper function to combine class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// PanelComponent - individual panel with slot-based structure
export function PanelComponent({
  header,
  headerTitle,
  headerActions,
  children,
  footer,
  className = "",
  noPadding = false,
}) {
  // Development mode check for warnings
  const isDev = process.env.NODE_ENV !== 'production';

  // Validate headerActions without header/headerTitle
  if (isDev && headerActions != null && !header && !headerTitle) {
    console.warn(
      '[PanelComponent] Warning: `headerActions` is provided but `header` or `headerTitle` is missing. ' +
      'Actions will be rendered without a title.'
    );
  }

  // Handle empty string for headerTitle (treat as no header)
  const effectiveHeaderTitle = headerTitle && headerTitle.trim() !== '' ? headerTitle : null;

  // Handle null/undefined optional props gracefully
  const effectiveHeader = header ?? null;
  const effectiveFooter = footer ?? null;
  const effectiveClassName = className ?? '';

  // Build CSS class names
  const panelClasses = cn(
    "panel",
    noPadding && "panel--no-padding",
    effectiveClassName
  );

  // Check if children is missing or empty
  const hasChildren = children != null && 
    (typeof children !== 'string' || children.trim() !== '') &&
    (Array.isArray(children) ? children.length > 0 : true);

  const bodyClasses = cn(
    "panel__body",
    noPadding && "panel__body--no-padding",
    !hasChildren && "panel__body--empty"
  );

  // Determine header content
  const hasHeaderActions = headerActions != null;
  const hasHeaderTitle = effectiveHeaderTitle != null;
  const hasHeaderContent = effectiveHeader != null;
  
  // Get the title text
  const titleText = effectiveHeaderTitle || (typeof effectiveHeader === "string" ? effectiveHeader : null);
  
  // Determine if we need the flex layout wrapper
  // Flex layout is needed when we have both actions AND (title or header content)
  const needsFlexLayout = hasHeaderActions && (hasHeaderTitle || hasHeaderContent);
  
  // Determine if we have title-only header (headerTitle without actions)
  const hasTitleOnly = hasHeaderTitle && !hasHeaderActions;

  // Build header classes based on content type
  const getHeaderClasses = () => {
    if (needsFlexLayout) {
      return "panel__header";
    }
    if (hasHeaderActions && !hasHeaderTitle && !hasHeaderContent) {
      return "panel__header panel__header--actions-only";
    }
    return "panel__header panel__header--content-only";
  };

  return (
    <div className={panelClasses} data-testid="panel-component">
      {/* Header slot - conditionally rendered */}
      {(effectiveHeader || effectiveHeaderTitle || headerActions) && (
        <div className={getHeaderClasses()} data-testid="panel-header">
          {needsFlexLayout ? (
            <>
              <div className="panel__header-content">
                {titleText ? (
                  <span className="panel__header-title" data-testid="panel-header-title">{titleText}</span>
                ) : (
                  effectiveHeader
                )}
              </div>
              <div className="panel__header-actions" data-testid="panel-header-actions">
                {headerActions}
              </div>
            </>
          ) : hasTitleOnly ? (
            <div className="panel__header-content">
              <span className="panel__header-title" data-testid="panel-header-title">{titleText}</span>
            </div>
          ) : hasHeaderActions ? (
            <div className="panel__header-actions" data-testid="panel-header-actions">
              {headerActions}
            </div>
          ) : (
            effectiveHeader
          )}
        </div>
      )}
      
      {/* Body slot - always rendered (required) */}
      <div className={bodyClasses} data-testid="panel-body">
        {hasChildren ? children : <span className="panel__empty-text">No content provided</span>}
      </div>
      
      {/* Footer slot - conditionally rendered */}
      {effectiveFooter && (
        <div className="panel__footer" data-testid="panel-footer">
          {effectiveFooter}
        </div>
      )}
    </div>
  );
}

// Valid prop values for validation
const VALID_LAYOUTS = ['horizontal', 'vertical'];
const VALID_GAPS = ['none', 'small', 'medium', 'large'];
const VALID_ALIGNS = ['start', 'center', 'end', 'stretch'];

// PanelContainer component - layout wrapper for organizing panels
export function PanelContainer({
  children,
  layout = "horizontal",
  gap = "medium",
  width = "full",
  align = "stretch",
  responsive = false,
  className = "",
  style = {},
}) {
  // Development mode check for warnings
  const isDev = process.env.NODE_ENV !== 'production';

  // Validate layout prop
  const effectiveLayout = VALID_LAYOUTS.includes(layout) ? layout : 'horizontal';
  if (isDev && !VALID_LAYOUTS.includes(layout)) {
    console.warn(
      `[PanelContainer] Warning: Invalid 'layout' value "${layout}". ` +
      `Valid options are: ${VALID_LAYOUTS.join(', ')}. ` +
      `Falling back to "horizontal".`
    );
  }

  // Validate gap prop
  const effectiveGap = VALID_GAPS.includes(gap) ? gap : 'medium';
  if (isDev && !VALID_GAPS.includes(gap)) {
    console.warn(
      `[PanelContainer] Warning: Invalid 'gap' value "${gap}". ` +
      `Valid options are: ${VALID_GAPS.join(', ')}. ` +
      `Falling back to "medium".`
    );
  }

  // Validate align prop
  const effectiveAlign = VALID_ALIGNS.includes(align) ? align : 'stretch';
  if (isDev && !VALID_ALIGNS.includes(align)) {
    console.warn(
      `[PanelContainer] Warning: Invalid 'align' value "${align}". ` +
      `Valid options are: ${VALID_ALIGNS.join(', ')}. ` +
      `Falling back to "stretch".`
    );
  }

  // Handle null/undefined className
  const effectiveClassName = className ?? '';

  // Handle width prop with invalid custom values
  let effectiveWidth = width;
  if (width !== 'auto' && width !== 'full') {
    // Check if width is a valid CSS width value
    const isValidWidth = typeof width === 'string' && 
      /^\d+(\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|ex|ch|cm|mm|in|pt|pc)?$/.test(width.trim());
    
    if (!isValidWidth) {
      if (isDev) {
        console.warn(
          `[PanelContainer] Warning: Invalid 'width' value "${width}". ` +
          `Expected "auto", "full", or a valid CSS width (e.g., "500px", "50%"). ` +
          `Falling back to "full".`
        );
      }
      effectiveWidth = 'full';
    }
  }

  // Build CSS class names based on props
  const containerClasses = cn(
    "panel-container",
    `panel-container--${effectiveLayout}`,
    `panel-container--gap-${effectiveGap}`,
    `panel-container--width-${effectiveWidth}`,
    `panel-container--align-${effectiveAlign}`,
    responsive && "panel-container--responsive",
    effectiveClassName
  );

  // Handle custom width values (e.g., "500px", "50%")
  const customStyle = effectiveWidth !== "auto" && effectiveWidth !== "full"
    ? { ...style, width: effectiveWidth }
    : style;

  return (
    <div className={containerClasses} style={customStyle} data-testid="panel-container">
      {children}
    </div>
  );
}

export default { PanelComponent, PanelContainer };
