## Directory Details

### `components/`

- **Description:** Contains reusable React components.

### `layouts/`

- **Description:** Contains layout components that define the structure of different pages.

### `pages/`

- **Description:** Contains the different pages of the application as per Next.js conventions.
- **Subdirectories:**
  - `api/`: Contains API routes.

### `public/`

- **Description:** Contains static assets such as images, fonts, etc. These files can be accessed directly via the URL.

### `styles/`

- **Description:** Contains CSS styles for the application. The styles are written in modules and are imported into the components as alias `classes.<style-name>`. Attributes are named in kebab-case. (e.g. `button-primary`)

## Coding Conventions

1. **File Naming:**

   - **Components:** PascalCase.
   - **Pages:** kebab-case.
   - **API Routes:** camelCase.
   - **Images:** kebab-case.
   - **CSS Modules:** PascalCase.

2. **Component Structure:**

- Each component should have the following structure:
  1.  import section
  2.  main function return a JSX (arrow function)
  3.  export default
- In the main function, the JSX should be structured in the following way:
  1. States and Props initialization
  2. Event Handlers (supporting functions)
  3. return (JSX)
