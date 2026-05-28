# Light/Dark Theme Testing Checklist

This checklist tests the light/dark theming functionality in the widgemo-demo React app. Run these tests manually in your browser after starting the development server.

## Prerequisites
- [ ] Start the development server: `npm start`
- [ ] Open the app in your browser
- [ ] Ensure you have access to browser developer tools (F12)

## Test Scenarios

### 1. Initial Load with No Saved Theme
**Steps:**
- [ ] Clear localStorage: Open DevTools → Application/Storage → Local Storage → Delete all entries for localhost
- [ ] Refresh the page
- [ ] Check if theme matches your system preference (light/dark mode in OS settings)

**Expected Results:**
- [ ] Theme should automatically match system preference
- [ ] Theme toggle button should show correct icon (sun for light, moon for dark)
- [ ] All UI elements should be styled according to the detected theme

### 2. Theme Toggle Functionality
**Steps:**
- [ ] Click the circular theme toggle button in the navbar
- [ ] Observe immediate visual changes
- [ ] Click again to toggle back

**Expected Results:**
- [ ] Visual theme changes immediately (background, text, borders)
- [ ] Toggle button icon changes (sun ↔ moon)
- [ ] All components update their appearance
- [ ] No page reload required

### 3. Theme Persistence Across Reloads
**Steps:**
- [ ] Set theme to opposite of system preference using toggle
- [ ] Refresh the page (F5 or Ctrl+R)
- [ ] Check if the manually selected theme persists

**Expected Results:**
- [ ] Selected theme should be remembered and applied on reload
- [ ] Theme toggle should show correct icon for saved theme
- [ ] Theme should override system preference until manually changed

### 4. Bootstrap Components Adaptation
**Test each component in both themes:**

#### Buttons
- [ ] Primary buttons (`btn-primary`)
- [ ] Secondary buttons (`btn-secondary`)
- [ ] Outline buttons (`btn-outline-*`)
- [ ] Ghost buttons

#### Cards
- [ ] Card backgrounds and borders
- [ ] Card headers and footers
- [ ] Card text and links

#### Tables
- [ ] Table headers (`thead`)
- [ ] Table body (`tbody`)
- [ ] Row hover effects
- [ ] Alternating rows (`table-striped`)

#### Navbar
- [ ] Navbar background and text
- [ ] Navbar links and dropdowns
- [ ] Active states

#### Forms
- [ ] Input fields
- [ ] Select dropdowns
- [ ] Checkboxes and radio buttons
- [ ] Form validation states

**Expected Results:**
- [ ] All Bootstrap components should adapt to both light and dark themes
- [ ] Text should remain readable (good contrast)
- [ ] Interactive states (hover, focus, active) should work in both themes

### 5. Custom App Elements (--app-* Variables)
**Check these custom elements:**

#### Background Colors
- [ ] `--app-bg-primary` (main backgrounds)
- [ ] `--app-bg-secondary` (secondary backgrounds)
- [ ] `--app-bg-tertiary` (accent backgrounds)

#### Text Colors
- [ ] `--app-text-primary` (main text)
- [ ] `--app-text-secondary` (secondary text)
- [ ] `--app-text-muted` (muted text)

#### Border Colors
- [ ] `--app-border` (borders and dividers)
- [ ] `--app-border-light` (subtle borders)

#### Interactive Elements
- [ ] `--app-hover` (hover states)
- [ ] `--app-focus` (focus states)
- [ ] `--app-active` (active states)

**Expected Results:**
- [ ] All custom elements using CSS variables should change with theme
- [ ] No hard-coded colors should be visible
- [ ] Consistent color scheme throughout the app

### 6. Visual Regression Check
**Look for these issues:**

#### Layout Issues
- [ ] No overlapping elements
- [ ] Proper spacing maintained
- [ ] Text doesn't overflow containers
- [ ] Images and icons display correctly

#### Color Issues
- [ ] No hard-coded colors (check with color picker)
- [ ] Sufficient contrast ratios for accessibility
- [ ] No invisible text on backgrounds

#### Interactive Elements
- [ ] Buttons and links are clickable
- [ ] Form inputs are usable
- [ ] Dropdowns work correctly
- [ ] Modals and overlays display properly

#### Performance
- [ ] No flickering during theme transitions
- [ ] Smooth theme changes
- [ ] No layout shifts

### 7. Retry Path Validation
Use these locations to validate retry behavior end-to-end in the demo:

- [ ] Sandbox top-level retry path in `src/components/sandbox/PreviewPanel.tsx`.
	Trigger an error state in the preview, click retry, and confirm loading/error reset behavior.
- [ ] Config-driven retry path in `src/data/progressiveExamples.tsx` (`progressive-63a-config-driven-retry-error-state`).
	Open "Progressive 63A - Config-Driven Retry (errorState)", click "Retry Fetch", and confirm the demo action modal appears.

### 8. Loading and Error Runtime Validation
- [ ] Open the state examples in `src/data/widgemoExamples.tsx` and compare the two built-in loading indicators.
	Expected: `content-loading-state-skeleton` renders skeleton placeholders, while `content-loading-state-spinner` renders a spinner indicator (not the same visual treatment).
- [ ] Validate loading renderer override behavior using `content-loading-state-renderer-override`.
	Expected: custom loading UI renders the "Custom Loading Renderer" block, confirming `loadingState.renderer` overrides built-in indicator rendering.
- [ ] Compare warning vs error severity using `content-error-state` and `content-error-state-severity-error`.
	Expected: `severity: "warning"` and `severity: "error"` present distinct visual tones in runtime UI.
- [ ] Confirm retry path remains obvious in the warning example.
	Expected: `content-error-state` shows a visible "Try Again" action, and triggering it emits the demo action event.

### 9. Registry In Action Validation
- [ ] Open the Cashflow dashboard page (`src/components/CashflowDashboardPage.tsx`) and confirm the "Registry in Action" callout is visible near the top of Command Center.
	Expected: callout references custom icons, custom renderAs formatting, and custom mode usage.
- [ ] In the Transactions Intelligence area, confirm the in-context note is visible and the table shows rich transaction formatting.
	Expected: custom renderAs behavior is user-observable (transaction metadata, compact value/status styling).
- [ ] In the Events area, confirm the in-context note is visible above the timeline widget.
	Expected: custom `cashflow-timeline` mode is clearly identified as the rendering path.
- [ ] Open Simplified Test (`src/components/SimplifiedTest.tsx`) and confirm there is no prominent synthetic registry PASS/FAIL table in the main demo flow.
	Expected: primary showcase experience remains product-focused rather than test-harness focused.

### 10. ContainerFrame In Context Validation
- [ ] Open the Progressive Examples page and find the "ContainerFrame In Context" showcase group near the top of the examples area.
	Expected: seven product-like examples are visible with one-line captions under each widget.
- [ ] Confirm border/shadow differences are visually obvious between the borderless inline shell, rounded forecast shell, and square settlement shell.
	Expected: at least one example has no outer shell, one has rounded shadowed chrome, and one has square/no-shadow framing.
- [ ] Confirm the accent review shell shows explicit frame styling.
	Expected: border color, border width, and a custom radius are all visible together on the outer shell.
- [ ] Confirm the **borderless** example ("Embedded approvals strip") still has a visible background surface behind the table.
	Expected: the card background is present; only the border line and shadow are absent. The widget still reads as a card-like block.
- [ ] Confirm the **shellless** example ("Shellless queue") has no background surface and blends into the dashed host wrapper.
	Expected: the widget background is transparent; the table and header float directly on the host surface with no surrounding card chrome. The dashed host border must be visible through/around the widget, not behind a white card.
- [ ] Toggle between light and dark mode while both examples are visible.
	Expected: shellless adapts to the host surface in both modes (transparent, no card shape); borderless retains a distinct background in both modes.
- [ ] Confirm the two planning shells demonstrate overflow behavior.
	Expected: the clipped variant hides the wide content at the frame edge, while the scrollable variant exposes scrollbars in the narrow shell.
- [ ] Scrollable planning shell must expose a scrollable region while clipped planning shell must not.
	Expected: both cards use the same shell size and content, but only the scrollable variant allows access to hidden rows/columns.

### 11. System Preference Change Detection (Optional)
**If implemented:**
- [ ] Change OS theme preference while app is open
- [ ] Check if app detects and adapts to system change
- [ ] Verify this only works when no manual theme is saved

**Expected Results:**
- [ ] App should respond to system theme changes
- [ ] Should not override manually saved preferences

## Testing Tips

### Browser DevTools Usage
- **Inspect Elements**: Right-click → Inspect to check CSS variables
- **Color Picker**: Use eyedropper to verify no hard-coded colors
- **Console**: Check for any theme-related errors
- **Application Tab**: Monitor localStorage for theme persistence

### Manual Testing Workflow
1. Test in both light and dark modes
2. Test on different screen sizes (responsive design)
3. Test with different browsers (Chrome, Firefox, Safari, Edge)
4. Test with browser zoom levels (90%, 100%, 110%)

### Common Issues to Watch For
- Hard-coded colors in component styles
- Missing CSS variable fallbacks
- Theme not applying to dynamically created elements
- localStorage conflicts with other apps
- System preference detection failures

## Test Results Summary
- [ ] All tests passed
- [ ] Issues found (list below):
- [ ] Notes/observations:

---

**Test Date:** __________
**Browser:** __________
**OS Theme:** Light / Dark
**Tester:** __________</content>
<parameter name="filePath">/home/chunto/projects/widgemo-demo/tests.md