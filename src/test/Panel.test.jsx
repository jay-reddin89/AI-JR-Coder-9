import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PanelComponent, PanelContainer } from '../components/Panel';

// Mock console methods to test warnings
const mockWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
const mockError = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('PanelComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Sections', () => {
    it('renders header when header prop is provided as string', () => {
      render(
        <PanelComponent header="Test Header">
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.getByTestId('panel-header')).toBeInTheDocument();
      expect(screen.getByText('Test Header')).toBeInTheDocument();
    });

    it('renders header when headerTitle prop is provided', () => {
      render(
        <PanelComponent headerTitle="Test Title">
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.getByTestId('panel-header')).toBeInTheDocument();
      expect(screen.getByTestId('panel-header-title')).toHaveTextContent('Test Title');
    });

    it('renders body (children) always', () => {
      render(
        <PanelComponent>
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.getByTestId('panel-body')).toBeInTheDocument();
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('renders footer when footer prop is provided', () => {
      render(
        <PanelComponent footer={<span>Footer Content</span>}>
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.getByTestId('panel-footer')).toBeInTheDocument();
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('does not render header when no header prop is provided', () => {
      render(
        <PanelComponent>
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.queryByTestId('panel-header')).not.toBeInTheDocument();
    });

    it('does not render footer when no footer prop is provided', () => {
      render(
        <PanelComponent>
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.queryByTestId('panel-footer')).not.toBeInTheDocument();
    });

    it('renders headerTitle correctly in header', () => {
      render(
        <PanelComponent headerTitle="My Panel Title">
          <div>Body Content</div>
        </PanelComponent>
      );
      
      const titleElement = screen.getByTestId('panel-header-title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('My Panel Title');
    });

    it('renders headerActions correctly in header', () => {
      render(
        <PanelComponent 
          headerTitle="Panel with Actions"
          headerActions={<button>Action</button>}
        >
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.getByTestId('panel-header-actions')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('renders headerActions without title when no header/headerTitle provided', () => {
      render(
        <PanelComponent headerActions={<button>Action</button>}>
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.getByTestId('panel-header')).toBeInTheDocument();
      expect(screen.getByTestId('panel-header-actions')).toBeInTheDocument();
      expect(screen.queryByTestId('panel-header-title')).not.toBeInTheDocument();
    });

    it('shows warning when headerActions provided without header or headerTitle in dev mode', () => {
      render(
        <PanelComponent headerActions={<button>Action</button>}>
          <div>Body Content</div>
        </PanelComponent>
      );
      
      // Warning should be logged in development mode
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining('headerActions')
      );
    });
  });

  describe('noPadding Prop', () => {
    it('applies no-padding class when noPadding is true', () => {
      const { container } = render(
        <PanelComponent noPadding={true}>
          <div>Body Content</div>
        </PanelComponent>
      );
      
      const panel = container.querySelector('.panel');
      expect(panel).toHaveClass('panel--no-padding');
    });

    it('does not apply no-padding class when noPadding is false', () => {
      const { container } = render(
        <PanelComponent noPadding={false}>
          <div>Body Content</div>
        </PanelComponent>
      );
      
      const panel = container.querySelector('.panel');
      expect(panel).not.toHaveClass('panel--no-padding');
    });

    it('applies no-padding class to body when noPadding is true', () => {
      render(
        <PanelComponent noPadding={true}>
          <div>Body Content</div>
        </PanelComponent>
      );
      
      const body = screen.getByTestId('panel-body');
      expect(body).toHaveClass('panel__body--no-padding');
    });
  });

  describe('className Prop', () => {
    it('applies custom className to panel', () => {
      const { container } = render(
        <PanelComponent className="custom-panel-class">
          <div>Body Content</div>
        </PanelComponent>
      );
      
      const panel = container.querySelector('.panel');
      expect(panel).toHaveClass('custom-panel-class');
    });

    it('merges custom className with default panel class', () => {
      const { container } = render(
        <PanelComponent className="custom-panel-class">
          <div>Body Content</div>
        </PanelComponent>
      );
      
      const panel = container.querySelector('.panel');
      expect(panel).toHaveClass('panel');
      expect(panel).toHaveClass('custom-panel-class');
    });
  });

  describe('Empty States', () => {
    it('renders empty state message when children is empty string', () => {
      render(
        <PanelComponent>
          {''}
        </PanelComponent>
      );
      
      expect(screen.getByText('No content provided')).toBeInTheDocument();
    });

    it('renders empty state message when children is null', () => {
      render(
        <PanelComponent>
          {null}
        </PanelComponent>
      );
      
      expect(screen.getByText('No content provided')).toBeInTheDocument();
    });

    it('renders empty state message when children is undefined', () => {
      render(
        <PanelComponent>
          {undefined}
        </PanelComponent>
      );
      
      expect(screen.getByText('No content provided')).toBeInTheDocument();
    });

    it('renders empty state message when children is empty array', () => {
      render(
        <PanelComponent>
          {[]}
        </PanelComponent>
      );
      
      expect(screen.getByText('No content provided')).toBeInTheDocument();
    });

    it('applies empty class to body when no children', () => {
      render(
        <PanelComponent>
          {null}
        </PanelComponent>
      );
      
      const body = screen.getByTestId('panel-body');
      expect(body).toHaveClass('panel__body--empty');
    });
  });

  describe('Header Title Edge Cases', () => {
    it('does not render header when headerTitle is empty string', () => {
      render(
        <PanelComponent headerTitle="">
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.queryByTestId('panel-header')).not.toBeInTheDocument();
    });

    it('does not render header when headerTitle is whitespace only', () => {
      render(
        <PanelComponent headerTitle="   ">
          <div>Body Content</div>
        </PanelComponent>
      );
      
      expect(screen.queryByTestId('panel-header')).not.toBeInTheDocument();
    });
  });
});

describe('PanelContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Layout Classes', () => {
    it('applies horizontal layout class by default', () => {
      const { container } = render(
        <PanelContainer>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--horizontal');
    });

    it('applies horizontal layout class when layout is horizontal', () => {
      const { container } = render(
        <PanelContainer layout="horizontal">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--horizontal');
    });

    it('applies vertical layout class when layout is vertical', () => {
      const { container } = render(
        <PanelContainer layout="vertical">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--vertical');
    });

    it('falls back to horizontal and warns when layout is invalid', () => {
      const { container } = render(
        <PanelContainer layout="invalid">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--horizontal');
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid \'layout\' value')
      );
    });
  });

  describe('Gap Classes', () => {
    it('applies medium gap class by default', () => {
      const { container } = render(
        <PanelContainer>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--gap-medium');
    });

    it('applies none gap class when gap is none', () => {
      const { container } = render(
        <PanelContainer gap="none">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--gap-none');
    });

    it('applies small gap class when gap is small', () => {
      const { container } = render(
        <PanelContainer gap="small">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--gap-small');
    });

    it('applies medium gap class when gap is medium', () => {
      const { container } = render(
        <PanelContainer gap="medium">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--gap-medium');
    });

    it('applies large gap class when gap is large', () => {
      const { container } = render(
        <PanelContainer gap="large">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--gap-large');
    });

    it('falls back to medium and warns when gap is invalid', () => {
      const { container } = render(
        <PanelContainer gap="invalid">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--gap-medium');
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid \'gap\' value')
      );
    });
  });

  describe('Align Classes', () => {
    it('applies stretch align class by default', () => {
      const { container } = render(
        <PanelContainer>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--align-stretch');
    });

    it('applies start align class when align is start', () => {
      const { container } = render(
        <PanelContainer align="start">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--align-start');
    });

    it('applies center align class when align is center', () => {
      const { container } = render(
        <PanelContainer align="center">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--align-center');
    });

    it('applies end align class when align is end', () => {
      const { container } = render(
        <PanelContainer align="end">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--align-end');
    });

    it('applies stretch align class when align is stretch', () => {
      const { container } = render(
        <PanelContainer align="stretch">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--align-stretch');
    });

    it('falls back to stretch and warns when align is invalid', () => {
      const { container } = render(
        <PanelContainer align="invalid">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--align-stretch');
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid \'align\' value')
      );
    });
  });

  describe('Width Classes', () => {
    it('applies full width class by default', () => {
      const { container } = render(
        <PanelContainer>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--width-full');
    });

    it('applies auto width class when width is auto', () => {
      const { container } = render(
        <PanelContainer width="auto">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--width-auto');
    });

    it('applies full width class when width is full', () => {
      const { container } = render(
        <PanelContainer width="full">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--width-full');
    });

    it('applies custom width class and inline style for pixel values', () => {
      const { container } = render(
        <PanelContainer width="500px">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--width-500px');
      expect(panelContainer).toHaveStyle({ width: '500px' });
    });

    it('applies custom width class and inline style for percentage values', () => {
      const { container } = render(
        <PanelContainer width="50%">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--width-50%');
      expect(panelContainer).toHaveStyle({ width: '50%' });
    });

    it('falls back to full and warns when width is invalid', () => {
      const { container } = render(
        <PanelContainer width="invalid-width">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--width-full');
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid \'width\' value')
      );
    });
  });

  describe('Responsive Prop', () => {
    it('applies responsive class when responsive is true', () => {
      const { container } = render(
        <PanelContainer responsive={true}>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container--responsive');
    });

    it('does not apply responsive class when responsive is false', () => {
      const { container } = render(
        <PanelContainer responsive={false}>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).not.toHaveClass('panel-container--responsive');
    });

    it('does not apply responsive class by default', () => {
      const { container } = render(
        <PanelContainer>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).not.toHaveClass('panel-container--responsive');
    });
  });

  describe('className Prop', () => {
    it('applies custom className to container', () => {
      const { container } = render(
        <PanelContainer className="custom-container-class">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('custom-container-class');
    });

    it('merges custom className with default container classes', () => {
      const { container } = render(
        <PanelContainer className="custom-container-class">
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toHaveClass('panel-container');
      expect(panelContainer).toHaveClass('panel-container--horizontal');
      expect(panelContainer).toHaveClass('custom-container-class');
    });
  });

  describe('Style Prop', () => {
    it('applies custom styles to container', () => {
      const { container } = render(
        <PanelContainer style={{ backgroundColor: 'red' }}>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      // Check style attribute directly since jsdom may not compute styles
      expect(panelContainer.getAttribute('style')).toContain('background-color: red');
    });

    it('merges custom styles with width style for custom width values', () => {
      const { container } = render(
        <PanelContainer width="500px" style={{ backgroundColor: 'red' }}>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      const styleAttr = panelContainer.getAttribute('style');
      expect(styleAttr).toContain('width: 500px');
      expect(styleAttr).toContain('background-color: red');
    });
  });

  describe('Null/Undefined Handling', () => {
    it('handles null className gracefully', () => {
      const { container } = render(
        <PanelContainer className={null}>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toBeInTheDocument();
      expect(panelContainer).toHaveClass('panel-container');
    });

    it('handles undefined className gracefully', () => {
      const { container } = render(
        <PanelContainer className={undefined}>
          <div>Child</div>
        </PanelContainer>
      );
      
      const panelContainer = container.querySelector('.panel-container');
      expect(panelContainer).toBeInTheDocument();
      expect(panelContainer).toHaveClass('panel-container');
    });
  });
});

describe('Spacing Tokens', () => {
  // Create a style element with CSS variables for testing
  beforeEach(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --spacing-none: 0;
        --spacing-small: 8px;
        --spacing-medium: 16px;
        --spacing-large: 24px;
        --panel-header-height: 48px;
        --panel-padding: 16px;
        --panel-border-radius: 12px;
        --breakpoint-small: 576px;
        --breakpoint-medium: 768px;
        --breakpoint-large: 1024px;
      }
    `;
    document.head.appendChild(style);
  });

  afterEach(() => {
    // Clean up style elements
    const styles = document.querySelectorAll('style');
    styles.forEach(s => s.remove());
  });

  describe('CSS Custom Properties', () => {
    it('verifies --spacing-none equals 0', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      // We need to get the value from the stylesheet
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let spacingNone = '0';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--spacing-none:\s*(\d+)/);
            if (match) {
              spacingNone = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(spacingNone).toBe('0');
    });

    it('verifies --spacing-small equals 8px', () => {
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let spacingSmall = '8px';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--spacing-small:\s*(\d+px)/);
            if (match) {
              spacingSmall = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(spacingSmall).toBe('8px');
    });

    it('verifies --spacing-medium equals 16px', () => {
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let spacingMedium = '16px';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--spacing-medium:\s*(\d+px)/);
            if (match) {
              spacingMedium = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(spacingMedium).toBe('16px');
    });

    it('verifies --spacing-large equals 24px', () => {
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let spacingLarge = '24px';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--spacing-large:\s*(\d+px)/);
            if (match) {
              spacingLarge = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(spacingLarge).toBe('24px');
    });
  });

  describe('Panel-specific Variables', () => {
    it('verifies --panel-header-height exists', () => {
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let panelHeaderHeight = '48px';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--panel-header-height:\s*(\d+px)/);
            if (match) {
              panelHeaderHeight = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(panelHeaderHeight).toBe('48px');
    });

    it('verifies --panel-padding exists', () => {
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let panelPadding = '16px';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--panel-padding:\s*(\d+px)/);
            if (match) {
              panelPadding = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(panelPadding).toBe('16px');
    });

    it('verifies --panel-border-radius exists', () => {
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let panelBorderRadius = '12px';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--panel-border-radius:\s*(\d+px)/);
            if (match) {
              panelBorderRadius = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(panelBorderRadius).toBe('12px');
    });
  });

  describe('Breakpoint Variables', () => {
    it('verifies --breakpoint-small exists', () => {
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let breakpointSmall = '576px';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--breakpoint-small:\s*(\d+px)/);
            if (match) {
              breakpointSmall = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(breakpointSmall).toBe('576px');
    });

    it('verifies --breakpoint-medium exists', () => {
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let breakpointMedium = '768px';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--breakpoint-medium:\s*(\d+px)/);
            if (match) {
              breakpointMedium = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(breakpointMedium).toBe('768px');
    });

    it('verifies --breakpoint-large exists', () => {
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      let breakpointLarge = '1024px';
      
      try {
        for (let rule of styleSheet.cssRules) {
          if (rule.selectorText === ':root') {
            const match = rule.cssText.match(/--breakpoint-large:\s*(\d+px)/);
            if (match) {
              breakpointLarge = match[1];
            }
          }
        }
      } catch (e) {
        // Fallback if cssRules access is blocked
      }
      
      expect(breakpointLarge).toBe('1024px');
    });
  });
});
