# CampusConnect

CampusConnect is a responsive campus portal for students. It presents announcements, campus events, class schedules, student resources, lost-and-found listings, and campus clubs in one modern web interface.

The project is a static front-end application built with vanilla HTML, CSS, and JavaScript. It does not require a build step or back-end server.

## Features

- Personalized dashboard with a time-based greeting and the current date
- Campus announcements with category labels and recent update information
- Campus event listings with generated dates and join actions
- Timetable view for the current weekday and a five-day week selector
- Student resources with category filters
- Lost-and-found listings with reporting and item-detail actions
- Clubs and societies with membership actions
- Global search that opens announcements and filters visible results
- Category and weekday filtering
- Modal dialogs and toast notifications for user actions
- Mobile sidebar navigation
- Keyboard shortcut: `Ctrl+K` or `Cmd+K` to focus search
- Responsive layouts for desktop, tablet, and mobile screens

## Technology Stack

- HTML5
- CSS3
- JavaScript (ES6)
- Google Fonts: DM Sans and Manrope

No framework, package manager, database, or API is required.

## Project Structure

```text
CampusConnect/
|-- index.html    # Page structure, sidebar, top bar, and app container
|-- styles.css    # Complete visual system and responsive layouts
|-- app.js        # Sample data, page rendering, filters, search, and interactions
`-- README.md     # Project documentation
```

## Getting Started

### Option 1: Open directly

Open `index.html` in a browser.

### Option 2: Run a local server

Using Python:

```powershell
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

Using Node.js with the optional `npx` HTTP server:

```powershell
npx serve .
```

A local server is recommended because it keeps browser and resource-loading behavior consistent.

## Navigation

Use the sidebar to open:

- Overview
- Announcements
- Events
- Timetable
- Lost & found
- Resources
- Clubs & societies

On smaller screens, use the menu button in the top bar to open or close the sidebar.

## Data and Interactions

The application currently uses in-memory JavaScript sample data in `app.js`. It does not persist changes to a database or local storage.

Examples of demo interactions include:

- Filtering content by category
- Changing the selected timetable day
- Searching campus announcements
- Joining an event or club
- Opening a lost-and-found details dialog
- Reporting an item
- Showing success feedback with toast notifications

Page navigation and most interactions are handled by delegated click events in `app.js`.

## Customization

### Update sample content

Edit the arrays near the top of `app.js`:

- `announcements`
- `events`
- `schedule`
- `resources`
- `lostItems`
- `clubs`

### Change colors and typography

Edit the CSS variables and component styles in `styles.css`. The project loads Google Fonts from the internet through `index.html`.

### Change the campus or student profile

Update the campus name, profile details, or avatar text in `index.html`, and update the dashboard greeting in `app.js` if needed.

## Browser Compatibility

CampusConnect is suitable for current versions of Chrome, Edge, Firefox, and Safari. An internet connection is needed for the Google Fonts loaded by `index.html`; system fallbacks are used if the fonts are unavailable.
