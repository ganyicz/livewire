import { test, expect } from '@playwright/test'
import { noPendingLivewireRequests } from './utils'

test('actions', async ({ page }) => {
    await page.goto('actions.blade.php')

    let output = page.locator('#output')

    /**
     * Basic action (click).
     */
    await page.locator('#foo').click()
    await expect(output).toHaveText('foo')

    /**
     * Action with params.
     */
    await page.locator('#bar').click()
    await expect(output).toHaveText('barbell')

    /**
     * Action with various parameter formatting differences.
     */
    await page.locator('#ball').click()
    await expect(output).toHaveText('abcdef')

    /**
     * Action with no params, but still parenthesis.
     */
    await page.locator('#bowl').click()
    await expect(output).toHaveText('foo')

    /**
     * Action with no params, but still parenthesis and having some spaces.
     */
    await page.locator('#baw').click()
    await expect(output).toHaveText('foo')

    /**
     * Action on multiple lines
     */
    await page.locator('#fizzfuzz').click()
    await expect(output).toHaveText('fizzfuzz')

    /**
     * wire:click.self
     */
    await page.locator('#baz\\.inner').click()
    await expect(output).toHaveText('fizzfuzz')
    await page.locator('#baz\\.outer').dispatchEvent('click')
    await expect(output).toHaveText('baz')

    /**
     * Blur event and click event get sent together
     */
    await page.locator('#bop\\.input').click() // Focus.
    await expect(output).toHaveText('baz')
    await page.locator('#bop\\.button').click()
    await expect(output).toHaveText('bazbop')

    /**
     * Two keydowns
     */
    await page.locator('#bob').press('Enter')
    await expect(output).toHaveText('bazbopbob')

    /**
     * If listening for "enter", other keys don't trigger the action.
     */
    await page.locator('#lob').press('k')
    await page.waitForTimeout(150)
    await expect(output).not.toContainText('lob')
    await page.locator('#lob').press('Enter')
    await expect(output).toHaveText('lob')

    /**
     * keydown.shift.enter
     */
    await page.locator('#law').press('Shift+Enter')
    await expect(output).toHaveText('law')

    /**
     * keydown.space
     */
    await page.locator('#spa').press('Space')
    await expect(output).toHaveText('spa')

    /**
     * Elements are marked as read-only during form submission
     */
    let blogButton = page.locator('#blog\\.button')
    let blogInput = page.locator('#blog\\.input')
    let blogInputIgnored = page.locator('#blog\\.input\\.ignored')

    await expect(blogButton).not.toHaveAttribute('disabled')
    await expect(blogInput).not.toHaveAttribute('readonly')
    await expect(blogInputIgnored).not.toHaveAttribute('readonly')

    await blogButton.click()

    await expect(blogButton).toHaveAttribute('disabled', '')
    await expect(blogInput).toHaveAttribute('readonly', '')
    await expect(blogInputIgnored).not.toHaveAttribute('readonly')

    await page.evaluate(noPendingLivewireRequests)

    await expect(blogButton).not.toHaveAttribute('disabled')
    await expect(blogInput).not.toHaveAttribute('readonly')

    /**
     * Elements are un-marked as readonly when form errors out.
     */
    let booButton = page.locator('#boo\\.button')

    await booButton.click()

    await expect(booButton).toHaveAttribute('disabled', '')
    await expect(blogButton).not.toHaveAttribute('disabled')

    await expect(page.locator('#livewire-error')).toBeVisible()

    // Close the error modal...
    await page.keyboard.press('Escape')

    /**
     * keydown.debounce
     */
    await page.locator('#bap').press('x')
    await page.waitForTimeout(50)
    await expect(output).not.toContainText('bap')
    await expect(output).toHaveText('bap')
})
