//顧問支払先変更_180406修正
var webdriverio = require('webdriverio');
const testutils = require('../../util/testutils');

describe('bloomの入力テスト', () => {
    beforeEach(function() {
        beforeEach = testutils.beforeEach();
        return beforeEach;
    });

    it('ログイン処理', () => {
        login = testutils.login(); 
        return login;
    });
    describe('顧問支払先変更_正常系', () => {
        //入力する場所と値を指定
        var contract_holder = {
            selecter: '//input[@name="contract_holder"]',
            value: 'テスト変更名義'
        };
        var business_implementer = {
            selecter: '//input[@name="business_implementer"]',
            value: 'テスト変更顧問名'
        };
        var agreement_document = {
            selecter: '//input[@name="agreement_document"]',
            value: '/Users/harukamamiya/Desktop/資料/dropsystem/顧問NW/bloom自動テスト仕様書_180326.xlsx'
        };
        var wf_account_registration_id = {
            selecter: '//input[@name="wf_account_registration_id"]',
            value: '1928374650'
        };
        var bank_name = {
            selecter: '//input[@name="bank_name"]',
            value: '三菱東京銀行'
        };
        var branch_name = {
            selecter: '//input[@name="branch_name"]',
            value: '大手町支店'
        };
        var bank_account_number = {
            selecter: '//input[@name="bank_account_number"]',
            value: '1234567890'
        };
        var account_holder = {
            selecter: '//input[@name="account_holder"]',
            value: 'テスト　メイギ'
        };
        it('値を入力して送信', () => {
            //顧問一覧画面に遷移
            browser.url('http://54.95.18.112:8084/adviser').pause(1000);
            //一番上の行のIDを取得
            var id = browser.getText('//table/tbody/tr[1]/td[1]');
            console.log(id);
            //一番上の行の詳細画面に遷移
            browser.click('//table/tbody/tr[1]/td[last()]/a[1]').pause(1000);
            browser.waitUntil(() => {
                return browser.getUrl() === 'http://54.95.18.112:8084/adviser/' + id
                }, 5000, 'expected text to be different after 5s');
            //支払先変更画面に遷移
            //とりあえず一番下
            var adviser_payees_id =  browser.getValue('//form[last()]/div[@class="container"]/div/div/div/div[1]/div/input')
            console.log(adviser_payees_id)
            browser.click('//form[last()]/div[@class="container"]/div/a/button')
            browser.waitUntil(() => {
                return browser.getUrl() === 'http://54.95.18.112:8084/adviser_payee/' + adviser_payees_id + '/edit'
                }, 5000, 'expected text to be different after 5s');

            //値の入力
            browser.click('#individualCorporateKubunRadiosInline0');
            // browser.setValue(company_name.selecter, company_name.value);
            browser.setValue(contract_holder.selecter, contract_holder.value);
            browser.setValue(business_implementer.selecter, business_implementer.value);
            browser.setValue(agreement_document.selecter, agreement_document.value).pause(1000);
            browser.setValue(wf_account_registration_id.selecter, wf_account_registration_id.value);
            browser.setValue(bank_name.selecter, bank_name.value);
            browser.setValue(branch_name.selecter, branch_name.value);
            // browser.click('//select[@name="deposit_type"]/option[@value="0"]')
            browser.setValue(bank_account_number.selecter, bank_account_number.value);
            browser.setValue(account_holder.selecter, account_holder.value);
            browser.click('input[type="submit"]');

            //入力完了後、登録ボタン押下
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/adviser/' + id
            }, 5000, 'expected text to be different after 5s');
        });
        //最新の顧問支払先を取得
        var path = '//form[last()]/div/div/div/div/'
        it('個人・法人区分が表示されること', () => {
            var individual_corporate_kubun = browser.getValue(path + 'div[3]/div/input');
            expect(individual_corporate_kubun).toEqual("個人");
        })
        it('契約名義が表示されること', () => {
            var contract_holder_confirm = browser.getValue(path + 'div[4]/div/input');
            expect(contract_holder_confirm).toEqual(contract_holder.value);
        })
        it('業務実施者が表示されること', () => {
            var business_implementer_confirm = browser.getValue(path + 'div[5]/div/input');
            expect(business_implementer_confirm).toEqual(business_implementer.value);
            
        })
        it('個人情報提供同意書が表示されること', () => {
            var agreement_document_confirm = browser.getValue(path + 'div[6]/div/input');
            expect(agreement_document_confirm).toEqual("public/agreement_document/bloom自動テスト仕様書_180326.xls");

        })
        it('WF口座番号IDが表示されること', () => {
            var wf_account_registration_id_confirm = browser.getValue(path + 'div[7]/div/input');
            expect(wf_account_registration_id_confirm).toEqual(wf_account_registration_id.value);

        })
        it('銀行名が表示されること', () => {
            var bank_name_confirm = browser.getValue(path + 'div[8]/div/input');
            expect(bank_name_confirm).toEqual(bank_name.value);

        })
        it('支店名が表示されること', () => {
            var branch_name_confirm = browser.getValue(path + 'div[9]/div/input')
            expect(branch_name_confirm).toEqual(branch_name.value);

        })
        it('預金種別が表示されること', () => {
            var deposit_type_confirm = browser.getValue(path + 'div[10]/div/input')
            expect(deposit_type_confirm).toEqual("普通");

        })
        it('口座番号が表示されること', () => {
            var bank_account_number_confirm = browser.getValue(path + 'div[11]/div/input');
            expect(bank_account_number_confirm).toEqual(bank_account_number.value);

        })
        it('口座名義が表示されること', () => {
            var account_holder_confirm = browser.getValue(path + 'div[12]/div/input');
            expect(account_holder_confirm).toEqual(account_holder.value);

        });
    })
    
});