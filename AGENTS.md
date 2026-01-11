# Livewire

This is the official Livewire repository. Livewire is a full-stack framework for Laravel that allows you to build dynamic front-end applications using PHP instead of JavaScript. It renders on the server and uses a morphing algorithm to patch the DOM with updates.

## Test Migration: Dusk to Playwright

We are currently migrating browser tests from Laravel Dusk to Playwright.

- **Legacy Dusk tests:** `legacy_tests/Browser/`
- **New Playwright tests:** `playwright/`

### Running Playwright Tests

```bash
npx playwright test
```
