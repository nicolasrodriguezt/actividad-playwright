import { test, expect } from '@playwright/test';
 
test.describe('Carrito de compras', () => {
 
  // Se ejecuta ANTES de CADA prueba de este grupo
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
  });
 
  test('CP-006 El catálogo muestra 6 productos', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
 
  test('CP-004 Agregar un producto', async ({ page }) => {
    const mochila = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await mochila.getByRole('button', { name: 'Add to cart' }).click();
 
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
 
  test('CP-007 Agregar y quitar un producto', async ({ page }) => {
    const mochila = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await mochila.getByRole('button', { name: 'Add to cart' }).click();
    await mochila.getByRole('button', { name: 'Remove' }).click();
 
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  });
 
  test('CP-008 El producto aparece en la página del carrito', async ({ page }) => {
    const mochila = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await mochila.getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.shopping_cart_link').click();
 
    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });
});
