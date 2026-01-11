import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => await page.goto('actions.blade.php'))

test('basic action', async ({ page }) => {
    let button = page.locator('#foo')
    let output = page.locator('#output')
    
    await button.click()

    await expect(output).toHaveText('foo')
})
