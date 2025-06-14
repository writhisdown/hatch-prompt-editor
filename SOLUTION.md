# Solution 

## Getting Started
- clone repo
- In terminal run 'npm i'
- Once dependencies are installed, enter 'npm run dev' in the terminal
- visit local hose URL
- to run cypress tests in the browser, enter `npx cypress open` in a new terminal

## Summary

This project simulates an AI prompt interface that enables users to toggle between a markdown editor and a rendered HTML preview. The core functionality resides in `Editor.tsx` and `InteractiveBadge.tsx`.

The Editor component renders a content card that initially displays a stylized, non-editable HTML preview of a placeholder markdown script. Users can enter editing mode by clicking or tabbing into the “Edit” button at the bottom right of the card. In editing mode, a `<textarea>` preserves markdown formatting, allowing users to directly modify the content, including inserting function placeholder tags.

These placeholder tags simulate callable AI functions like ending a conversation or transferring a call. Upon exiting the editor (on blur), the component re-renders the HTML view. In this view, function placeholders are replaced by interactive badges.

Each badge provides options to modify or remove the associated function, and all changes are reflected in both the markdown and the rendered HTML. Markdown input is sanitized and persisted to local storage to maintain state across sessions, ensuring a consistent user experience.


## Stack Choices

### React Markdown
[react-markdown](https://github.com/remarkjs/react-markdown)
This is crucial for this project to parse and render user-authored markdown as React components. This approach provides structured control over markdown nodes and enables the dynamic rendering of custom elements. It is easy to use and highly customizable, featuring a wide array of plugins and configuration options. It safely renders markdown without using dangerouslySetInnerHTML and can efficiently parse large documents.

### React String Replace 
[react-string-replace](https://github.com/iansinnott/react-string-replace)
Enables dynamic replacement of specific markdown patterns (e.g., `<% function ID %>`) with custom React components. This is essential for transforming structured placeholder syntax into interactive UI elements. The setup process is quick, and it integrates well with react-markdown.

### DOMPurify
[DOMPurify](https://github.com/cure53/DOMPurify)
A mature and reputable tool for sanitization that ensures all user-inputted markdown content is sanitized before storage or rendering, protecting the app from potential XSS attacks and malicious content.

### UI Components & Styling

### shadcn/ui
[shadcn](https://ui.shadcn.com/)
A modern, accessible, headless UI library built on Radix primitives. It provides an efficient way to build accessible components while remaining style-agnostic. Specifically, this project utilizes Button, Dialog, Tooltip, Popover, and Toast components to complete this feature.

### Class Variance Authority 
[class-variance-authority](https://cva.style/docs)
Great for authoring complex Tailwind logic in a clean, declarative manner. This was ideal for managing styles for variants such as intent (i.e. success | pending | info), sizes, and compound variants, particularly for use in the button component as part of the interactive badges.

### Tailwind Typography Plugin
[tailwindcss-typography](https://tailwindcss.com/)
The Typography plugin (@tailwindcss/typography) is particularly useful for managing markdown readability with optimized default settings.

### State Management

### React useState / Custom Hooks
The project employs native React state via `useState` and a custom hook, `useLocalStorage`, to manage user input and persist markdown content across sessions. This approach eliminates the need for heavier state management solutions like Redux or Zustand in this context.

The `useLocalStorage` hook combines React state with local browser storage and DOMPurify sanitization to safely preserve the editing session, avoiding `useEffect` to enhance the user experience upon reload or revisit.

### Testing

### Cypress
Cypress was selected as the preferred testing tool for its ability to perform real DOM rendering. Its component-level testing features facilitated rapid validation of the core behaviors of `Editor.tsx` and `Interactivebadge.tsx`.


## Trade offs

### Navigation
This project opts for a button-based toggle to switch between the markdown editor and rendered HTML view. This approach was chosen over relying on focus-based toggling (e.g., auto-switching when a div or textarea gains focus), which led to inconsistent behavior and a subpar user experience — especially with unintended mode switches during keyboard navigation.

### Toggling views
However, using two separate elements (textarea and div) to represent the same content introduces visual and behavioral discontinuities. For instance, switching views can lead to layout shifts or a “jumping” scroll position. Implementing a scroll position tracker or synchronizing scroll state between views could help smooth the experience.

### Mobile experience
On mobile, the current editing experience is functional but not fully optimized. The layout reflows correctly at smaller breakpoints, but toggling between markdown and HTML views may feel clunky without a clearly positioned, mobile-friendly toggle button. Additionally, interactive badges rely on hover-triggered tooltips, which aren’t accessible on touch devices. While tooltips are generally considered a desktop-only feature, this limitation may still impact accessibility for users on tablets or hybrid devices. From a product standpoint, this may be a lesser issue, as most customers are likely working from an office or desktop rather than a mobile device.

### Performance 
Re-rendering intricate markdown with dynamic features like tooltips and popovers may impact performance in larger documents.

### Content persistence
`localStorage` retains markdown content, yet it does not support sync across multiple sessions or devices. A backend solution is necessary for collaboration or multi-user workflows.

### Security
Markdown is sanitized using DOMPurify prior to rendering, but enhancing functionality (such as adding support for extra HTML or custom markdown syntax) will necessitate thorough sanitization to prevent XSS vulnerabilities.
 

## Working and not Working

### Working

### Local Storage and Sanitization
Markdown content is reliably stored in localStorage, with string inputs sanitized using DOMPurify to prevent XSS vulnerabilities.


### Initial State Management
After clearing the markdown input, the placeholder script is properly reinstated, providing a fallback experience.


### Markdown and Badge Serialization
The use of react-markdown and react-string-replace facilitates effective parsing and rendering of markdown content and functional badges into styled HTML. Key formatting elements (headings, emphasis, lists) are generally maintained and displayed correctly.

### Tooltip description
Tooltips render the correct description per each function badge on mouse over.

### Needs Improvement

### Badge Interaction Bugs:

- When multiple badges are present, swapping one function badge may affect another. This may be due to improper key handling or unintended state sharing between badge instances.

**Possible Solution:** Ensure each badge is uniquely keyed by its exact placeholder string and verify that state updates are isolated. Memoizing badge components or using useCallback more consistently may prevent unintended re-renders.

**Badge Rendering in Lists:**

When markdown placeholders appear within list items, `react-string-replace` struggles to insert components correctly. It seems to require wrapping elements in a `<p>` tag (as observed in the implementation), which disrupts semantic HTML and layout.

**Possible Solution:** Replace react-string-replace with remark plugins to more precisely control how placeholders are replaced within various markdown node types (e.g., paragraphs, list items, etc.).

**Inconsistent Spacing / Line Breaks:**

Some line breaks and white space from the original markdown aren't preserved in the HTML view.

**Possible Solution:** Use remark-gfm for GitHub-style markdown support, which may more effectively handle soft line breaks and spacing. A more robust rich text editor library like Tip Tap may also be useful, but it seems excessive for this scope.


## General Improvements

**Comprehensive Testing:** Dedicate additional time to conducting unit and integration tests, ensuring reliability in all components and state updates.
 
**Enhanced Mobile Experience:** Optimize UI responsiveness and interaction patterns for mobile users by incorporating touch-friendly elements and enhancing layout behavior.
 
**Styling & Transitions:** Add animations and transitions to create smoother visual shifts between editing and preview modes.
 
**Accessibility Enhancements:** Guarantee full keyboard navigability, the use of semantic HTML, correct ARIA attributes, and support for screen readers across all components.
 
**Scroll Sync:** Implement scroll position tracking to ensure a synchronized experience between markdown editing and preview views.


