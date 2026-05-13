---
name: Retro 32-Bit System
colors:
  surface: '#faf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#faf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e8'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3e4949'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#6e7979'
  outline-variant: '#bdc9c8'
  surface-tint: '#006a6a'
  primary: '#006565'
  on-primary: '#ffffff'
  primary-container: '#008080'
  on-primary-container: '#e3fffe'
  inverse-primary: '#76d6d5'
  secondary: '#4b53bc'
  on-secondary: '#ffffff'
  secondary-container: '#8991fe'
  on-secondary-container: '#1b218f'
  tertiary: '#595a5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#727373'
  on-tertiary-container: '#fafaf9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#93f2f2'
  primary-fixed-dim: '#76d6d5'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#004f4f'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bfc2ff'
  on-secondary-fixed: '#00006e'
  on-secondary-fixed-variant: '#3239a3'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#faf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  headline-lg:
    fontFamily: Arimo
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  headline-md:
    fontFamily: Arimo
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  body-md:
    fontFamily: Arimo
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Arimo
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
  button-text:
    fontFamily: Arimo
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 12px
spacing:
  border-width: 1px
  bevel-width: 2px
  padding-xs: 2px
  padding-sm: 4px
  padding-md: 8px
  margin-window: 16px
  gutter: 4px
---

## Brand & Style

This design system is a faithful reconstruction of the mid-90s personal computing revolution. It prioritizes a tactile, skeuomorphic interface that relies on simulated depth and industrial precision. The brand personality is unapologetically functional, technical, and nostalgic, evoking the era of the first 32-bit consumer operating systems.

The visual style is defined by a strict "beveled" logic where light sources are fixed (top-left), creating a world of extruded buttons and recessed wells. It avoids modern abstractions like transparency or rounded corners in favor of high-contrast, pixel-perfect structural integrity.

## Colors

The palette is anchored by the iconic desktop Teal, used exclusively for the background workspace to provide a high-contrast foundation for "Silver" UI windows. 

- **Surface & Base:** All windows, buttons, and frames use the standard 'Silver' gray (#C0C0C0).
- **The 3D Logic:** Depth is created using a four-color light model. Highlights use pure White (#FFFFFF), while depth and borders use 'Dark Gray' (#808080) and 'Black' (#000000) to simulate shadows.
- **State Indicators:** 'Navy' Blue (#000080) is reserved for active title bars and selected list items, ensuring the user always knows where the system focus lies.

## Typography

This system utilizes **Arimo** to replicate the clean, high-legibility sans-serif feel of MS Sans Serif. To maintain the 32-bit aesthetic, font sizes remain small and strictly aligned to a pixel grid.

Typography is never anti-aliased in a way that blurs the edges; it should feel crisp and functional. Bold weights are used sparingly, primarily for title bars and column headers. All text defaults to black (#000000) unless placed on an active Navy title bar, where it switches to white.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy within individual windows. Content does not "flow" in a modern sense but is contained within rigid, recessed boxes.

- **Window Margins:** Windows should have an 8px internal padding from the frame to the content area.
- **Button Spacing:** Standard command buttons (OK, Cancel) should be grouped with a 6px gap.
- **Alignment:** All elements must align to a 2px grid increment to ensure the 3D bevels do not overlap or create visual "noise."
- **Nesting:** Complex layouts use "Fieldsets"—groups of related controls surrounded by a 1px recessed border with a text label interrupting the top-left line.

## Elevation & Depth

Elevation is achieved through a strict "light-source" rule. The sun always shines from the top-left.

- **Raised Elements (Buttons, Window Frames):** Top and left edges use a 1px White highlight. Bottom and right edges use a 1px Black shadow, with an inner 1px Dark Gray shadow to soften the transition.
- **Recessed Elements (Input Fields, Content Wells):** The logic is reversed. Top and left edges use Black and Dark Gray shadows. Bottom and right edges use White highlights. This creates an "inset" look.
- **Z-Index:** Visual depth is literal. The active window sits "above" others by virtue of its Navy title bar; inactive windows use a Gray title bar and are visually layered behind using standard stack order. No drop shadows are permitted.

## Shapes

The design system uses a **Sharp (0)** roundedness setting. Every element—from the largest window to the smallest checkbox—must have 90-degree corners. The illusion of shape is created solely through the 1px and 2px beveled lines. Circular elements, like Radio Buttons, are rendered as pixelated approximations of circles rather than smooth vectors.

## Components

### Windows & Title Bars
Windows are the primary container. They feature a 2px beveled frame and a title bar (18px height). The title bar contains a 16x16 icon on the left and a "Close" button block on the right.

### Command Buttons
Buttons must appear raised. When in the "active" or "pressed" state, the bevel reverses (top-left goes dark, bottom-right goes light) and the label text shifts 1px down and to the right to simulate physical depression.

### Input Fields & Wells
Inputs are recessed white boxes with a 2px inset border. The text cursor is a simple 1px blinking black line.

### Tabs
Tabs are located at the top of a content area, using the same "raised" bevel logic as buttons, but the bottom border is removed on the active tab to "merge" it into the content pane below.

### Icons
Icons must use a limited 16-color palette with black outlines. Dithering (checkerboard pixel patterns) should be used instead of gradients to create shading.