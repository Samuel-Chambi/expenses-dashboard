# UI Components

## Libraries

- **Components:** shadcn/ui (Radix primitives)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Forms:** react-hook-form + @hookform/resolvers
- **Validation:** Zod
- **Styling:** Tailwind CSS
- **Toasts:** Sonner

## Rules

- Use `cn()` from `lib/utils` for conditional/merged classes
- No inline styles — always Tailwind classes
- Form validation schemas use Zod, resolved via `@hookform/resolvers/zod`
- Prefer shadcn/ui components over custom implementations
- Icons: import from `lucide-react`, never use raw SVGs
- New shadcn components: add via `npx shadcn@latest add <component>`
