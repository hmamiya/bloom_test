//請求支払い登録_180406変更
var webdriverio = require('webdriverio');
const testutils = require('../../util/testutils');

describe('billing_payments/create', () => {
    beforeEach(function() {
      beforeEach = testutils.beforeEach();
      return beforeEach;
    });
    it('ログイン処理', () => {
        login = testutils.login(); 
        return login;
    });

    //正常系
    describe('請求支払登録_正常系', () => {
        //入力する場所と値を指定
        //TODO:180328_契約一覧から最新のIDを持ってくるように変更
        var contract_id = {
          selecter: '//input[@name="contract_id"]',
          value: '11'
        };
        var consulting_month = {
          selecter: '//input[@name="consulting_month"]',
          value: '2018-03'
        };
        var billing_expected_date = {
          selecter: '//input[@name="billing_expected_date"]',
          value: '2018-03-31'
        };
        var payment_expected_date = {
          selecter: '//input[@name="payment_expected_date"]',
          value: '2018-03-31'
        };
        var search_fee = {
          selecter: '//input[@name="search_fee"]',
          value: '100000'
        };
        var search_payment_deadline = {
          selecter: '//input[@name="search_payment_deadline"]',
          value: '2018-03-31'
        };
        var search_remarks = {
          selecter: '//input[@name="search_remarks"]',
          value: 'サーチ料備考'
        } 
        var consulting_fee = {
          selecter: '//input[@name="consulting_fee"]',
          value: '100000'
        };
        var consulting_payment_deadline = {
          selecter: '//input[@name="consulting_payment_deadline"]',
          value: '2018-03-31'
        };
        var consulting_remarks = {
          selecter: '//input[@name="consulting_remarks"]',
          value: 'コンサルティング料備考'
        }
        var adviser_fee = {
          selecter: '//input[@name="adviser_fee"]',
          value: '10000'
        };
        var adviser_payment_deadline = {
          selecter: '//input[@name="adviser_payment_deadline"]',
          value: '2018-03-31'
        };
        var adviser_remarks = {
          selecter: '//input[@name="adviser_remarks"]',
          value: '顧問料備考'
        }
        var advances_1 = {
          selecter: '//input[@name="advances_1"]',
          value: 'その他料金1'
        }
        var billing_price_type_1 = {
          selecter: '//input[@name="billing_price_type_1"]',
          value: '立替え金'
        }
        var advances_billing_deadline_1 = {
          selecter: '//input[@name="advances_billing_deadline_1"]',
          value: '2018-04-30'
        }
        var advances_payment_deadline_1 = {
          selecter: '//input[@name="advances_payment_deadline_1"]',
          value: '2018-04-30'
        }
        var advances_remarks_1 = {
          selecter: '//input[@name="advances_remarks_1"]',
          value: 'その他料金1備考'
        }
        var billing_incentive = {
          selecter: '//input[@name="billing_incentive"]',
          value: '10000'
        };
        var incentive_billing_deadline = {
          selecter: '//input[@name="incentive_billing_deadline"]',
          value: '2018-03-31'
        };
        var payment_incentive = {
          selecter: '//input[@name="payment_incentive"]',
          value: '10000'
        };
        var incentive_payment_deadline = {
          selecter: '//input[@name="incentive_payment_deadline"]',
          value: '2018-03-31'
        };
        var incentive_remarks = {
          selecter: '//input[@name="incentive_remarks"]',
          value: 'インセンティブ備考'
        }
        var business_report = {
          selecter: '//input[@name="business_report"]',
          value: '/Users/harukamamiya/Desktop/資料/dropsystem/顧問NW/bloom自動テスト仕様書.xlsx'
        };
        var advances_evidence = {
          selecter: '//input[@name="advances_evidence"]',
          value: '/Users/harukamamiya/Desktop/資料/dropsystem/顧問NW/bloom自動テスト仕様書.xlsx'
        };
        var incentive_evidence = {
          selecter: '//input[@name="incentive_evidence"]',
          value: '/Users/harukamamiya/Desktop/資料/dropsystem/顧問NW/bloom自動テスト仕様書.xlsx'
        };
        var red_data = {
          selecter: '//input[@name="red_data"]',
          value: ''
        };
        var red_data_remarks = {
          selecter: '//input[@name="red_data_remarks"]',
          value: ''
        };
        it('値を入力して送信', () => {
            //請求支払い一覧画面に遷移
            browser.url('http://54.95.18.112:8084/billing_payment').pause(1000);
            //登録画面に遷移
            browser.click('//button[text() = "登録"]');
            browser.waitUntil(function () {
              return browser.getUrl() === 'http://54.95.18.112:8084/billing_payment/create'
            }, 5000, 'expected text to be different after 5s');

            //入力
            browser.setValue(contract_id.selecter, contract_id.value);
            browser.pause(1000);
            browser.keys("Enter");
            browser.setValue(consulting_month.selecter, consulting_month.value);
            browser.setValue(billing_expected_date.selecter, billing_expected_date.value);
            browser.setValue(payment_expected_date.selecter, payment_expected_date.value);
            browser.setValue(search_fee.selecter, search_fee.value);
            browser.click('//input[contains(@name, "search_payment_deadline_type") and contains(@value, "2")]');
            browser.setValue(search_payment_deadline.selecter, search_payment_deadline.value);
            browser.click('//input[contains(@name, "s_billing_sales_confirmation") and contains(@value, "1")]');
            browser.setValue(search_remarks.selecter, search_remarks.value);
            browser.setValue(consulting_fee.selecter, consulting_fee.value);
            browser.click('//input[contains(@name, "consulting_payment_deadline_type") and contains(@value, "2")]');
            browser.setValue(consulting_payment_deadline.selecter, consulting_payment_deadline.value);
            browser.click('//input[contains(@name, "c_billing_sales_confirmation") and contains(@value, "1")]');
            browser.setValue(consulting_remarks.selecter, consulting_remarks.value);
            browser.setValue(adviser_fee.selecter, adviser_fee.value);
            browser.click('//input[contains(@name, "adviser_payment_deadline_type") and contains(@value, "99")]');
            browser.setValue(adviser_payment_deadline.selecter, adviser_payment_deadline.value);
            browser.click('//input[contains(@name, "a_billing_sales_confirmation") and contains(@value, "1")]');
            browser.setValue(adviser_remarks.selecter, adviser_remarks.value);
            browser.setValue(advances_1.selecter, advances_1.value);
            browser.setValue(billing_price_type_1.selecter, billing_price_type_1.value)
            browser.click('//input[contains(@name, "tax_type_1") and contains(@value, "0")]');
            browser.click('//input[contains(@name, "advances_billing_deadline_type_1") and contains(@value, "3")]');
            browser.setValue(advances_billing_deadline_1.selecter, advances_billing_deadline_1.value)
            browser.click('//input[contains(@name, "b_adva_billing_sales_confirmation_1") and contains(@value, "1")]');
            browser.click('//input[contains(@name, "advances_payment_deadline_type_1") and contains(@value, "3")]');
            browser.setValue(advances_payment_deadline_1.selecter, advances_payment_deadline_1.value)
            browser.click('//input[contains(@name, "adva_billing_sales_confirmation_1") and contains(@value, "1")]');
            browser.setValue(advances_remarks_1.selecter, advances_remarks_1.value);
            browser.setValue(billing_incentive.selecter, billing_incentive.value);
            browser.click('//input[contains(@name, "incentive_billing_deadline_type") and contains(@value, "99")]');
            browser.setValue(incentive_billing_deadline.selecter, incentive_billing_deadline.value);
            browser.click('//input[contains(@name, "b_i_billing_sales_confirmation") and contains(@value, "1")]');
            browser.setValue(payment_incentive.selecter, payment_incentive.value);
            browser.click('//input[contains(@name, "incentive_payment_deadline_type") and contains(@value, "3")]');
            browser.setValue(incentive_payment_deadline.selecter, incentive_payment_deadline.value);
            browser.click('//input[contains(@name, "p_i_billing_sales_confirmation") and contains(@value, "1")]');
            browser.setValue(incentive_remarks.selecter, incentive_remarks.value);
            browser.setValue(business_report.selecter, business_report.value);
            browser.setValue(advances_evidence.selecter, advances_evidence.value);
            browser.setValue(incentive_evidence.selecter, incentive_evidence.value);
            browser.click('//select[@name="red_data_type"]/option[@value="1"]')
            browser.setValue(red_data.selecter, red_data.value);
            browser.setValue(red_data_remarks.selecter, red_data_remarks.value);
            //入力完了後、送信
            browser.click('button[type="submit"]');
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/billing_payment'
              }, 5000, 'expected text to be different after 5s');
        });
        it('契約IDが表示されること', () => {
            var contract_id_confirm = browser.getText('//tbody/tr[1]/td[1]');
            expect(contract_id_confirm).toEqual(contract_id.value);
        })
        it('コンサルティング年月が表示されること', () => {
            var consulting_month_confirm = browser.getText('//tbody/tr[1]/td[4]');
            expect(consulting_month_confirm).toEqual(consulting_month.value);
        })
    })
});