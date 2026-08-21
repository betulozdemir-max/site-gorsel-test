const { test, expect } = require('@playwright/test');

test('Site Düzen ve Görsel Kayma Testi', async ({ page }) => {
  // 1. Sitemizi açıyoruz (networkidle kaldırıldı, hızlı yükleme için domcontentloaded eklendi)
  await page.goto('https://takvim.com.tr', { waitUntil: 'domcontentloaded' });

  // 2. Sürekli değişen reklam ve dinamik ögeleri CSS ile tamamen gizliyoruz
  await page.addStyleTag({
    content: `
      iframe, 
      [id*="google_ads"], 
      [class*="reklam"], 
      .banner { display: none !important; }
    `
  });

  // 3. Sayfanın oturması için 3 saniye bekle
  await page.waitForTimeout(3000);

  // 4. Sadece layout/düzen denetimi için ekran görüntüsü al
  await expect(page).toHaveScreenshot('anasayfa-layout-baseline.png', {
    fullPage: true,
    mask: [
      page.locator('.headline'),     // Manşet alanı
      page.locator('.slider'),       // Slider/Manşet görseli
      page.locator('.last-news')     // Son dakika şeridi
    ],
    maxDiffPixelRatio: 0.05 
  });
});