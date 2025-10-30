import { test, expect } from "@playwright/test";
import { time } from "console";
import user from "../../../utils/user.json";
import testData from "../../../output/dloa_data_2025-10-29_01.json"; // Change output json file here

const dataIndex = 0; // Change index value to run different data set from json file
const data = testData[dataIndex]; // Don't change this line

test("DLOA Test Script", async ({ page }) => {
  test.setTimeout(600000); // Set test limit time(Can be change)

  await page.goto("http://ngepsit.eperolehan.com.my/home");
  await page.locator('[id="_82_languageId"]').selectOption("en_US");
  await expect(
    page.getByRole("link", { name: "ePerolehan", exact: true })
  ).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Login" })).toBeVisible();
  await page.getByRole("menuitem", { name: "Login" }).dblclick();
  await expect(
    page.getByRole("cell", { name: "Please enter your login credential" })
  ).toBeVisible({timeout:15000});
  await page.locator('[id="username"]').click();
  await page.locator('[id="username"]').fill(user.dloaUser);
  await page.locator('[id="password"]').click();
  await page.locator('[id="password"]').fill(user.dloaPass);
  await page.getByRole("button", { name: "Login" }).dblclick({ force: true });
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Welcome, DESK OFFICER 25010101")).toBeVisible({
    timeout: 15000,
  });
  await page.getByRole("menuitem", { name: "My Application " }).click();
  await page.waitForURL(
    "http://ngepsit.eperolehan.com.my/web/epapp/my-application"
  );
  await page.waitForSelector("text=Create LOA", { state: "visible" });
  await expect(
    page.goto("http://ngepsit.eperolehan.com.my/web/epapp/my-application")
  ).toBeTruthy();

  await page.getByRole("link", { name: "Create LOA" }).click();

  await page.waitForLoadState("load");

  await page.reload();

  await page
    .locator(
      '[id="_scCreateManualSourcing_WAR_NGePportlet_:form:supplierId:supplierIdlovLink"]'
    )
    .click();
  await page
    .locator(
      '[id^="_scCreateManualSourcing_WAR_NGePportlet_:form:"][id$="_label"]'
    ).nth(0)
    .click();
  await page
    .locator(
      '[id^="_scCreateManualSourcing_WAR_NGePportlet_:form:"][id$="_panel"]'
    ).nth(10)
    .getByText("eP No.")
    .click();
  await page
    .locator(
      '[type="text"]'
    ).nth(1)
    .click();
  await page
    .locator(
      '[type="text"]'
    ).nth(1)
    .fill(data.supplier_ep);
  await page
    .locator(
      '[type="text"]'
    ).nth(1)
    .click();

  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("gridcell", { name: data.supplier_name }).dblclick();

  await expect(page.getByRole("button", { name: "Select" })).toBeEnabled();
  await page.getByRole("button", { name: "Select" }).click({ force: true });

  await page.waitForLoadState("load");

  await expect(
    page.locator(
      '[id^="_scCreateManualSourcing_WAR_NGePportlet_:form:"][id$="_header"]'
    ).nth(2)
  ).toBeVisible({ timeout: 10000 });
  await page
    .locator(
      '[id^="_scCreateManualSourcing_WAR_NGePportlet_:form:"][id$="_header"]'
    ).nth(2)
    .click();

  await expect(
    page.locator(
      '[id="_scCreateManualSourcing_WAR_NGePportlet_:form:supplierId:supplierIdlov"]'
    )
  ).toHaveValue(data.supplier_name, { timeout: 15000 });

  //LETTER OF ACCEPTANCE INFORMATION
  //Title Letter of Acceptance
  await page.waitForTimeout( 15000);
  await page
    .locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:title"]')
    .fill(data.tajukSurat, { timeout: 15000 });
  //Procurement Method
  await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procMode_label"]').click({timeout:15000});

const panel = page.locator(
  '[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procMode_panel"]'
).first();
await expect(panel).toBeVisible({ timeout: 30000 });

const option = page.locator(
  '[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procMode_panel"] li[data-label="' +
    data.kaedahPerolehan +
    '"]:visible'
);

await expect(option).toBeVisible({ timeout: 30000 });
await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procMode_panel"]').getByText(data.kaedahPerolehan, { exact: true }).first().click({timeout:15000, force: true});
await page.keyboard.press('Tab');

await page.waitForTimeout(10000);
//If the inserted value fail
const selected = await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procMode_label"]').textContent();

if (selected === '- Select One -') {
  await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procMode_label"]').click();
  await expect(panel).toBeVisible({ timeout: 30000 });
  await panel.getByText(data.kaedahPerolehan, { exact: true }).first().click({force: true});
  await page.keyboard.press('Tab');
} 

//Quotation / Tender Type
await page.waitForTimeout(10000);
await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:qtType_label"]').click({ timeout: 15000 });

const qtTypePanel = page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:qtType_panel"]');
await expect(qtTypePanel).toBeVisible({ timeout: 30000 });

await qtTypePanel.getByText(data.jenisTender, { exact: true }).click({ timeout: 30000 });

await page.keyboard.press('Tab');
await page.waitForTimeout(10000);
if(await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:qtType_label"]').textContent() === 'Special Item / Item In Pk 7'){
  await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:justificationId_label"]')).toBeVisible({ timeout: 30000 });
  await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:justificationId_label"]').click();
  await page.locator('id="_scCreateManualSourcing_WAR_NGePportlet_:form:justificationId_panel"').getByText(data.sebabSpecialItem, { exact: true }).click({ timeout: 30000 });
  await page.keyboard.press('Tab');
}

//Procurement Type Category
  await page
    .locator(
      '[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procTypeBoCategory_label"]'
    )
    .click();
  await page
    .locator(
      '[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procTypeBoCategory_panel"]'
    )
    .getByText(data.kategoriPerolehan)
    .click({ timeout: 30000 });

  //File Reference No.
  await page
    .locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fileNoId"]')
    .type(data.noRujukanFail);
  await page
    .locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fileExtNo"]')
    .type("25");

  //Procurement Category
  await page
    .locator(
      '[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procBoCategory_label"]'
    )
    .click();
  await page
    .locator(
      '[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procBoCategory_panel"]'
    )
    .getByText(data.kaedahPerolehan2)
    .click();

    //LOA Offered Price
    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaAmtId"]').click();
    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaAmtId"]').type(`${data.tawaranHargaSST}`);

    //Fulfilment Type
    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fulfilId_label"]').click();
    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fulfilId_panel"]').getByText(data.jenisPemenuhan).first().click({force: true});
    await page.keyboard.press('Tab');

    await page.waitForTimeout(5000); 

    const selectedFulfilment = await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fulfilId_label"]').textContent();

    if (selectedFulfilment === '- Select One -') {
      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fulfilId_label"]').click();
      await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fulfilId_panel"]')).toBeVisible({ timeout: 30000 });
      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fulfilId_panel"]').getByText(data.jenisPemenuhan, { exact: true }).first().click({force: true});
      await page.keyboard.press('Tab');
    } 

    //CONTRACT DETAILS
    //Contract Type
    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:contractType_label"]').click();
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:contractType_panel"]')).toBeVisible({ timeout: 30000 });
    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:contractType_panel"]').getByText("Ministry").click({force: true});
    await page.keyboard.press('Tab');

    const selectedContract = await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:contractType_label"]').textContent();

    if (selectedContract === '- Select One -') {
      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:contractType_label"]').click();
      await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:contractType_panel"]')).toBeVisible({ timeout: 30000 });
      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:contractType_panel"]').getByText("Ministry", { exact: true }).first().click({force: true});
      await page.keyboard.press('Tab');
    } 


    //Contract Period (Month)
/*     await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaContractDuration"]').click();
    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaContractDuration"]').fill(`${data.tempohKontrak}`);

    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaContractDuration"]').evaluate(el => {
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      (el as HTMLElement).blur();  
    });

const fillContractPeriod = await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaContractDuration"]').textContent();

    if (fillContractPeriod === '') {
      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaContractDuration"]').click();
      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaContractDuration"]').invoke(`${data.tempohKontrak}`);

      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaContractDuration"]').evaluate(el => {
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        (el as HTMLElement).blur();  
      });
    }  */

    await page.waitForTimeout(5000);
    const contractField = page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaContractDuration"]');

    await contractField.type(`${data.tempohKontrak}`);

    await contractField.evaluate(el => {
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      (el as HTMLElement).blur();  
    });

    await page.waitForTimeout(5000);

    const value = await contractField.inputValue();
    if (!value || value.trim() === '') {
      await contractField.evaluate((el, v) => {
        (el as HTMLInputElement).value = v;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        (el as HTMLElement).blur();
      }, `${data.tempohKontrak}`);
    }

    await page.waitForTimeout(5000);
    //Contract Effective Date
    // Contract Effective Date
    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:effdate_input"]').evaluate(el => el.removeAttribute('readonly'));

    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:effdate_input"]')
      .evaluate((el, value) => (el as HTMLInputElement).value = value, `${data.tarikhKuatkuasaKontrak}`);

    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:effdate_input"]')
      .evaluate(el => el.dispatchEvent(new Event("change", { bubbles: true })));

    const currentValue = await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:effdate_input"]').inputValue();

    if (currentValue === '') {
      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:effdate_input"]')
        .evaluate((el, value) => (el as HTMLInputElement).value = value, `${data.tarikhKuatkuasaKontrak}`);

      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:effdate_input"]')
        .evaluate(el => el.dispatchEvent(new Event("change", { bubbles: true })));

      await page.waitForTimeout(5000);
    }

    //Verify All Information Inserted
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:title"]')).toHaveValue(data.tajukSurat, { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procMode_label"]')).toHaveText(data.kaedahPerolehan, { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:qtType_label"]')).toHaveText(data.jenisTender, { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procTypeBoCategory_label"]')).toHaveText(data.kategoriPerolehan, { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fileNoId"]')).toHaveValue(data.noRujukanFail, { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fileExtNo"]')).toHaveValue("25", { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:procBoCategory_label"]')).toHaveText(data.kaedahPerolehan2, { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:fulfilId_label"]')).toHaveText(data.jenisPemenuhan, { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:contractType_label"]')).toHaveText("Ministry", { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:loaContractDuration"]')).toHaveValue(`${data.tempohKontrak}`, { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:effdate_input"]')).toHaveValue(`${data.tarikhKuatkuasaKontrak}`, { timeout: 15000 });
    
    //Click Letter of Acceptance And Attachment
    const loaButton = page.getByRole('link', { name: 'Letter Of Acceptance And Attachment' });

    // Ensure visible before clicking
    await loaButton.scrollIntoViewIfNeeded();
    await page.getByRole('link', { name: 'Letter Of Acceptance And Attachment' }).click();

    await page.waitForLoadState("load");
    await page.waitForTimeout(5000);

    //LETTER OF ACCEPTANCE SIGNER
     await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:govSignDate_input"]')
      .evaluate((el, value) => (el as HTMLInputElement).value = value, `${data.tarikhKuatkuasaKontrak}`);

    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:govSignDate_input"]')
      .evaluate(el => el.dispatchEvent(new Event("change", { bubbles: true })));

    await page.locator('[id^="_scCreateManualSourcing_WAR_NGePportlet_:form:lovUser"]').nth(3).click();

    await page.locator('[id^="_scCreateManualSourcing_WAR_NGePportlet_:form:"][id$="_label"]').nth(0).click();
    await page.locator('[id^="_scCreateManualSourcing_WAR_NGePportlet_:form:"][id$="_panel"]').getByText("User Name").click();
    await page.locator('[type="text"]').nth(1).click();
    await page.locator('[type="text"]').nth(1).fill("Siti Roveah Binti Simon");
    await page.locator('[type="text"]').nth(1).click();
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("gridcell", { name: "Siti Roveah Binti Simon" }).dblclick();
    await expect(page.getByRole("button", { name: "Select" })).toBeEnabled();
    await page.getByRole("button", { name: "Select" }).dblclick({ force: true });

    await page.waitForTimeout(15000);

    const govSignDate = await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:govSignDate_input"]').inputValue();
    let loopGovSignDate = 0;

    while (govSignDate === '' && loopGovSignDate < 3) {
      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:govSignDate_input"]')
        .evaluate((el, value) => (el as HTMLInputElement).value = value, `${data.tarikhKuatkuasaKontrak}`);

      await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:govSignDate_input"]')
        .evaluate(el => el.dispatchEvent(new Event("change", { bubbles: true })));

      await page.waitForTimeout(5000);
      loopGovSignDate++;
    }

    //Verify Signer
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:govSignDate_input"]')).toHaveValue(`${data.tarikhKuatkuasaKontrak}`, { timeout: 15000 });
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:lovUser:lovUserlov"]')).toHaveValue("Siti Roveah Binti Simon ", { timeout: 15000 });

    //ZONE/ITEM DETAILS
    const zoneButton = page.getByRole('link', { name: 'Zone / Item Details' });

    // Ensure visible before clicking
    await zoneButton.scrollIntoViewIfNeeded();
    await page.getByRole('link', { name: 'Zone / Item Details' }).click();

    await page.waitForTimeout(10000);
    await page.getByLabel(`${data.jenisBarang}`).check();
    await page.waitForTimeout(5000);
    /* await page.getByLabel(`${data.zon}`).check();
    if(`${data.zon}` === 'Yes'){
      //condition yes here
    } */
    await page.locator('[title="Enable PTJ add line to key in new item."]').first().click();
    await page.waitForTimeout(5000);
    await page.locator('[id*=":questionTbl:0:itemName"]').first().fill(data.productSpec);
    await page.locator('[id*=":questionTbl:0:uom_input"]').click();
    await page.locator('[id*=":questionTbl:0:uom_input"]').press('CapsLock');
    await page.locator('[id*=":questionTbl:0:uom_input"]').fill('J');
    await page.locator('[id*=":questionTbl:0:uom_input"]').press('CapsLock');
    await page.locator('[id*=":questionTbl:0:uom_input"]').fill('J20');
    await page.waitForTimeout(10000);
    await page.getByText(data.productUOM).click();
    await page.locator('[id*=":questionTbl:0:uom_input"]').fill(data.productUOM);
    await page.locator('select[id*=":questionTbl:0:priceType"]').selectOption('294');
    await page.locator('[id*=":questionTbl:0:qty"]').nth(1).click()
    await page.locator('[id*=":questionTbl:0:qty"]').nth(1).fill(`${data.serviceQty}`);
    await page.locator('[id*=":questionTbl:0:ratePerUom"]').nth(1).click();
    await page.locator('[id*=":questionTbl:0:ratePerUom"]').nth(1).fill(`${data.serviceQty}`);

    await page.waitForTimeout(10000);

    const productUOM =  await page.locator('[id*=":questionTbl:0:uom_input"]').inputValue();
    let loopProductUOM = 0;

     while (productUOM === '' && loopProductUOM < 3) {
      await page.locator('[id*=":questionTbl:0:uom_input"]').click();
      await page.locator('[id*=":questionTbl:0:uom_input"]').press('CapsLock');
      await page.locator('[id*=":questionTbl:0:uom_input"]').fill('J');
      await page.locator('[id*=":questionTbl:0:uom_input"]').press('CapsLock');
      await page.locator('[id*=":questionTbl:0:uom_input"]').fill('J20');
      await page.waitForTimeout(10000);
      await page.getByText(data.productUOM).click();
      await page.locator('[id*=":questionTbl:0:uom_input"]').fill(data.productUOM);
      loopProductUOM++;
    }

    await page.waitForTimeout(10000);

    //Verify Product
    /* await expect(page.locator('[id*=":questionTbl:0:itemName"]').first()).toHaveValue(data.productSpec);
    await expect(page.locator('[id*=":questionTbl:0:uom_input"]')).toHaveValue(data.productUOM);
    await expect(page.locator('[id*=":questionTbl:0:qty"]').nth(1)).toHaveValue(`${data.serviceQty}`);
    await expect(page.locator('[id*=":questionTbl:0:ratePerUom"]').nth(1)).toHaveValue(`${data.serviceQty}` + '.00');
 */
    //PAYMENT DEDUCTION
    const paymentButton = page.getByRole('link', { name: 'Payment Deduction' });

    await paymentButton.scrollIntoViewIfNeeded();
    await page.getByRole('link', { name: 'Payment Deduction' }).click();

    await page.waitForLoadState("load");
    
    await page.getByRole("button", { name: "Add" }).click();

    await page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:deductTbl:0:deductionType"]').selectOption({ label: 'Royalty Fee' });

    //Verify Deduction Type
    await expect(page.locator('[id="_scCreateManualSourcing_WAR_NGePportlet_:form:deductTbl:0:deductionType"]')).toHaveValue('140');

    await page.waitForTimeout(5000);

    //BANK DETAILS
     const bankButton = page.getByRole('link', { name: 'Bank Details' });

    await bankButton.scrollIntoViewIfNeeded();
    await page.getByRole('link', { name: 'Bank Details' }).click();

    await page.waitForLoadState("load");

    await page.waitForTimeout(5000);

    await expect(page.getByText('Bank Details').nth(1)).toBeVisible();

    await page.waitForTimeout(5000);

    await page.getByRole('button', { name: 'Submit' }).click(); //for submit DLOA

    //Verify expected result
    
    //Logout

});
