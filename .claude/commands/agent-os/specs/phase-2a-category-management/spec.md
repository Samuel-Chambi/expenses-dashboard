# Category Management — Spec

## Context

Phase 2a. Categories currently only exist as seeded data. This adds a `/categories` page with full CRUD, matching the expenses feature pattern.

## Tasks

- [x] T-1: Save spec documentation
- [ ] T-2: Color picker + category schema + server actions
- [ ] T-3: Category list page (data table)
- [ ] T-4: Add/Edit category dialog + delete dialog

## What Will Be Built

- **Shared Component:** ColorPicker (preset grid + hex input)
- **Server Actions:** createCategory, updateCategory, deleteCategory (with expense count check)
- **Pages:** `/categories` with data table
- **Components:** CategoriesTable, CategoriesActionDialog, CategoriesDeleteDialog, CategoriesProvider

## Acceptance Criteria

- Categories table shows name, color swatch, expense count, created date
- Can create category with name + color picker
- Duplicate name shows error toast
- Can edit category name and color
- Can delete category with 0 expenses
- Cannot delete category with active expenses (disabled + warning)
- App compiles and runs without errors
