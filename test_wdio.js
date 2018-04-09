var webdriverio = require('webdriverio');

describe('bloomの入力テスト', () => {
    var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    // 20秒まで延ばす
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });
    // it('入力テスト', () => {
    //     browser.setValue('#text', 'テキスト');
    //     browser.setValue('#password', 'パスワード');
    //     browser.setValue('#textarea', 'テキストエリア');
    //     browser.click('#radio_1');
    //     browser.click('#check_1');
    //     browser.click('#select_2');
    //     browser.setValue('#file', '/Users/harukamamiya/Desktop/hedgehog_20180305.jpeg');
    //     browser.pause(3000);
    //     browser.click('#submit');
    //     browser.pause(3000);
    // });  
    it('ログインテスト', () => {
        // browser.windowHandleFullscreen();
        browser.url('http://54.95.18.112:8084/login');
        browser.setValue('#email', 'dbuser');
        browser.setValue('#password', 'dbpassword');
        browser.click('//button[@class="btn btn-indigo waves-effect waves-light"]');
    });
    //顧問登録
    // it('顧問登録入力テスト', () => {
    //     browser.url('http://54.95.18.112:8084/adviser');
    //     // var button = browser.getText('button[type="button"]');
    //     // console.log('Button is' + button);
    //     browser.url('http://54.95.18.112:8084/adviser/create');
    //     // var url = browser.getUrl();
    //     // console.log(url);
    //     browser.setValue('#adviser_name', '自動テスト');
    //     browser.setValue('#cp2_adviser_id', '1234567890');
    //     browser.setValue('#tel', '12-3456-7890');
    //     browser.setValue('#mail', 'auto@test.com');
    //     browser.setValue('#postal_code', '100-0000');
    //     browser.click('#postal_code_search');
    //     browser.waitUntil(function () {
    //         return browser.getValue('#prefecture') === '神奈川県'
    //       }, 5000, 'expected text to be different after 5s');
    //     browser.setValue('#address2', '大手町2-6-2');
    //     browser.click('#reportCollectionMethodRadiosInline1');
    //     browser.setValue('#report_collection_responsible', '自動テスト');
    //     browser.setValue('#report_collection_supplement', '自動テスト');
    //     browser.click('#benefitOneRadiosInline1');
    //     browser.click('button[type="submit"]');
    //     browser.waitUntil(function () {
    //         return browser.getUrl() === 'http://54.95.18.112:8084/adviser'
    //       }, 5000, 'expected text to be different after 5s');
    // });
    // 支払先登録
    // it('支払先登録画面の表示', () => {
    //     // var button = browser.getText('button[type="button"]');
    //     // console.log('Button is' + button);
    //     browser.url('http://54.95.18.112:8084/adviser');
    //     browser.url('http://54.95.18.112:8084/adviser/15');
    //     browser.url('http://54.95.18.112:8084/adviser_payee/15/create');
    //     browser.click('#individualCorporateKubunRadiosInline0');
    //     browser.setValue('#company_name', '自動test');
    //     browser.setValue('#contract_holder', '自動テスト');
    //     browser.setValue('#business_implementer', '自動テスト');
    //     browser.setValue('#agreement_document', '自動テスト');
    //     browser.setValue('#wf_account_registration_id', '1234567890');
    //     browser.setValue('#bank_name', '三菱東京銀行');
    //     browser.setValue('#branch_name', '大手町支店');
    //     browser.setValue('#bank_account_number', '1234567890');
    //     browser.setValue('#account_holder', '自動テスト');
    //     browser.click('button[type="submit"]');
    //     browser.waitUntil(function () {
    //         return browser.getUrl() === 'http://54.95.18.112:8084/adviser/15'
    //       }, 5000, 'expected text to be different after 5s');
    // });
    //企業登録
    // it('顧問登録入力テスト', () => {
    //     browser.url('http://54.95.18.112:8084/client');
    //     browser.url('http://54.95.18.112:8084/client/create');
    //     browser.setValue('#client_name', '自動test');
    //     browser.setValue('#kana_name', 'ジドウテスト');
    //     browser.setValue('#cp2_client_id', '1234567890');
    //     browser.click('option[value="1"]');
    //     browser.setValue('#postal_code', '100-0000');
    //     browser.setValue('#url', 'auto@test.com');
    //     browser.click('#postal_code_search');
    //     browser.waitUntil(function () {
    //         return browser.getValue('#prefecture') === '東京都'
    //       }, 5000, 'expected text to be different after 5s');
    //     browser.setValue('#address2', '大手町2-6-2');
    //     browser.click('button[type="submit"]');
    //     browser.waitUntil(function () {
    //         return browser.getUrl() === 'http://54.95.18.112:8084/client'
    //       }, 5000, 'expected text to be different after 5s');
    // });
    //請求先登録
    // it('顧問登録入力テスト', () => {
    //     browser.url('http://54.95.18.112:8084/client');
    //     browser.url('http://54.95.18.112:8084/client/13');
    //     browser.url('http://54.95.18.112:8084/client_billing/13/create');
    //     browser.setValue('#section', '自動テスト');
    //     browser.setValue('#post', '自動テスト');
    //     browser.setValue('#client_officer', '自動テスト');
    //     browser.setValue('#mail', 'auto@test.com');
    //     browser.setValue('#tel', '12-3456-7890');
    //     browser.setValue('#fax', '12-3456-7890');
    //     browser.setValue('#postal_code', '100-0000');
    //     browser.click('#postal_code_search');
    //     browser.waitUntil(function () {
    //         return browser.getValue('#prefecture') === '東京都'
    //       }, 5000, 'expected text to be different after 5s');
    //     browser.setValue('#address2', '大手町2-6-2');
    //     browser.click('option[value="1"]');
    //     browser.click('button[type="submit"]');
    //     browser.waitUntil(function () {
    //         return browser.getUrl() === 'http://54.95.18.112:8084/client/13'
    //       }, 5000, 'expected text to be different after 5s');
    // });
    //契約登録
    // it('契約登録入力テスト', () => {
    //     browser.url('http://54.95.18.112:8084/contract');
    //     // browser.getText('//tr[1]')
    //     browser.url('http://54.95.18.112:8084/contract/create');
    //     browser.setValue('#application_date', '2018-03-15');
    //     browser.click('//select[@name="sales_section"]/option[@value="1"]')
    //     browser.click('//select[@name="sales_person"]/option[@value="1"]')
    //     browser.setValue('#client_name', '自動test');
    //     browser.pause(1000);
    //     browser.keys("Enter"); 
    //         browser.waitUntil(function () {
    //             return browser.getText('#client_id') !== null
    //           }, 5000, 'expected text to be different after 1s');
    //     // browser.setValue('#client_id', '13');
    //     // browser.setValue('#client_code', '');
    //     browser.setValue('#adviser_name', '自動テスト');
    //     browser.pause(1000);
    //     browser.keys("Enter"); 
    //         browser.waitUntil(function () {
    //             return browser.getText('#adviser_id') !== null
    //           }, 5000, 'expected text to be different after 1s');
    //     // browser.setValue('#adviser_id', '10');
    //     browser.click('#typeRadiosInline1');
    //     browser.click('//select[@name="original_contract_type"]/option[@value="1"]')
    //     browser.setValue('#original_contract_id', '');
    //     browser.setValue('#type_memo', '自動テスト');
    //     browser.setValue('#start_date', '2018-03-15');
    //     browser.setValue('#end_date', '2018-03-15');
    //     browser.click('#isAutoUpdateRadiosInline1');
    //     browser.setValue('#update_period', '6');
    //     browser.setValue('#work_times', '1');
    //     browser.setValue('#work_times_comment', '自動テスト');
    //     browser.click('//select[@name="support_id"]/option[@value="1"]')
    //     browser.setValue('#support_memo', '自動テスト');

    //     browser.click('//select[@name="search_fee_type"]/option[@value="1"]');
    //     browser.setValue('#search_fee', '10000');
    //     browser.click('//select[@name="search_payment_type"]/option[@value="99"]');
    //     browser.setValue('#search_payment_memo', '自動テスト');
    //     browser.setValue('#consulting_fee', '10000');
    //     browser.click('//select[@name="consulting_payment_type"]/option[@value="99"]');
    //     browser.setValue('#consulting_payment_memo', '自動テスト');
    //     browser.click('#clientIncentiveRadiosInline1');
    //     browser.setValue('#client_incentive_content', '自動テスト');
    //     browser.setValue('#client_expense', '自動テスト');
    //     browser.setValue('#client_expense_payment', '自動テスト');
    //     browser.setValue('#client_note', '自動テスト');
    //     browser.setValue('#client_signed_date', '2018-03-15');
    //     browser.click('//select[@name="client_sending_method"]/option[@value="1"]');
    //     browser.setValue('#client_sending_method_other', '自動テスト');
    //     browser.setValue('#client_special_note', '自動テスト');

    //     browser.setValue('#adviser_fee', '10000');
    //     browser.setValue('#adviser_payment_type', '自動テスト');
    //     browser.setValue('#adviser_fee_exception', '自動テスト');
    //     browser.click('#adviserIncentiveRadiosInline1');
    //     browser.setValue('#adviser_incentive_content', '自動テスト');
    //     browser.setValue('#adviser_expense', '自動テスト');
    //     browser.setValue('#adviser_expense_payment', '自動テスト');
    //     browser.setValue('#adviser_note', '自動テスト');
    //     browser.setValue('#adviser_signed_date', '2018-03-15');
    //     browser.click('//select[@name="adviser_sending_method"]/option[@value="1"]');
    //     browser.setValue('#adviser_sending_method_other', '自動テスト');
    //     browser.setValue('#adviser_special_note', '自動テスト');
    //     browser.click('button[type="submit"]');

    //     browser.pause(3000)
    //         browser.waitUntil(function () {
    //             return browser.getUrl() === 'http://54.95.18.112:8084/contract'
    //           }, 5000, 'expected text to be different after 5s');
    //     });
    //     browser.pause(3000)
    //覚書登録
    // it('覚書登録入力テスト', () => {
    // browser.url('http://54.95.18.112:8084/contract');
    // //一番上の行の詳細を開く
    // //待たないと1を呼んできてしまうことがある
    // browser.pause(1000);
    // var id = browser.getText('//table/tbody/tr[1]/th');
    // console.log(id);
    // browser.url('http://54.95.18.112:8084/contract/' + id);
    // browser.waitUntil(function () {
    //               return browser.getUrl() === 'http://54.95.18.112:8084/contract/11'
    //             }, 5000, 'expected text to be different after 5s');
    // browser.click('//button[text() = "覚書登録"]')
    // browser.waitUntil(function () {
    //   return browser.getUrl() === 'http://54.95.18.112:8084/memo/create/11'
    // }, 5000, 'expected text to be different after 5s');
    // browser.click('//select[@name="draft_type"]/option[@value="1"]');
    // browser.setValue('#contract_content', '自動テスト');
    // browser.setValue('#contract_content_file', '/Users/harukamamiya/Desktop/bloom自動テスト仕様書_180315.xlsx');
    // browser.click('button[type="submit"]');

    // browser.pause(3000)
    //         browser.waitUntil(function () {
    //             return browser.getUrl() === 'http://54.95.18.112:8084/memo'
    //           }, 5000, 'expected text to be different after 5s');
    // });

    //ユーザ登録
    // it('ユーザ登録入力テスト', () => {
    //   browser.url('http://54.95.18.112:8084/user');
    //   browser.click('//button[text() = "登録"]');
    //   browser.waitUntil(function () {
    //                   return browser.getUrl() === 'http://54.95.18.112:8084/user/create'
    //                 }, 5000, 'expected text to be different after 5s');
    //   browser.setValue('#user_name', '自動テスト');
    //   browser.pause(1000)
    //   browser.click('//select[@name="authority"]/option[@value="User"]');
    //   browser.click('//select[@name="section"]/option[@value="1"]');
    //   browser.click('//select[@name="post"]/option[@value="1"]');
    //   browser.setValue('#mail', 'https://www.test.co.jp/');
    //   browser.setValue('#password', 'autotest');
    //   browser.click('button[type="submit"]');
    //   browser.pause(3000)
    //         browser.waitUntil(function () {
    //             return browser.getUrl() === 'http://54.95.18.112:8084/user'
    //           }, 5000, 'expected text to be different after 5s');
    //   var user_name = browser.getText('//table/tbody/tr[1]/td[1]');
    //   console.log(user_name);
    // });

    // 文書登録
    // it('文書登録入力テスト', () => {
    //   browser.url('http://54.95.18.112:8084/contract').pause(1000);
    //   //一番上の行のIDを取得
    //   var id = browser.getText('//table/tbody/tr[1]/th');
    //   console.log(id);
    //   //一番上の行の詳細に遷移
    //   browser.click('//table/tbody/tr[1]/td[last()]/a').pause(1000);
    //   browser.waitUntil(() => {
    //                   return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + id
    //                 }, 5000, 'expected text to be different after 5s');
    //   //文書登録のページに遷移
    //   browser.click('//button[text() = "文書登録"]');
    //   browser.waitUntil(() => {
    //     return browser.getUrl() === 'http://54.95.18.112:8084/document/create/' + id
    //   }, 5000, 'expected text to be different after 5s');
    //   //入力
    //   browser.click('//label[text() = "コンサルティング契約書"]');
    //   browser.click('//label[text() = "無"]');
    //   browser.setValue('#document_user', '1');
    //   browser.setValue('#document_content', '自動テスト');
    //   browser.setValue('#document', '/Users/harukamamiya/Desktop/bloom自動テスト仕様書_180315.xlsx');
    //   //送信
    //   browser.click('button[type="submit"]').pause(1000);
    //   browser.waitUntil(function () {
    //     return browser.getUrl() === 'http://54.95.18.112:8084/document'
    //   }, 5000, 'expected text to be different after 5s');
    //   var contract_id = browser.getText('//table/tbody/tr[last()]/td[1]');
    //   console.log(contract_id);
    //   if (contract_id === id) {
    //     console.log("OK");
    //   }else{
    //     console.log("error");
    //   }
    // });

    //請求支払い登録
    // it('請求支払い登録入力テスト', () => {
    //   browser.url('http://54.95.18.112:8084/billing_payment').pause(1000);
    //   browser.click('//button[text() = "登録"]');
    //   browser.waitUntil(function () {
    //     return browser.getUrl() === 'http://54.95.18.112:8084/billing_payment/create'
    //   }, 5000, 'expected text to be different after 5s');
    //   //入力
    //   browser.setValue('#contract_id', '11');
    //   browser.click('//label[text() = "コンサルティング契約書"]');
    //   browser.click('//label[text() = "無"]');
    //   browser.setValue('#document_user', '1');
    //   browser.setValue('#document_content', '自動テスト');
    //   browser.setValue('#document', '/Users/harukamamiya/Desktop/bloom自動テスト仕様書_180315.xlsx');
    // });
});