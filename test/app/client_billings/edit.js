//企業請求先変更_180406修正
var webdriverio = require('webdriverio');
const testutils = require('../../util/testutils');

describe('client_billings/create', () => {
    beforeEach(function() {
        beforeEach = testutils.beforeEach();
        return beforeEach;
    });
    it('ログイン処理', () => {
        login = testutils.login(); 
        return login;
    });

    //正常系
    describe('企業請求先変更_正常系', () => {
        //入力する場所と値を指定
        var section = {
            selecter: '//input[@name="section"]',
            value: 'テスト変更部門'
        };
        var post = {
            selecter: '//input[@name="post"]',
            value: 'テスト変更隊長'
        };
        var client_officer = {
            selecter: '//input[@name="client_officer"]',
            value: '自動テスト変更'
        };
        var mail = {
            selecter: '//input[@name="mail"]',
            value: 'auto@testchange.com'
        };
        var tel = {
            selecter: '//input[@name="tel"]',
            value: '09-8765-4321'
        };
        var fax = {
            selecter: '//input[@name="fax"]',
            value: '12-3456-7890'
        };
        var postal_code = {
            selecter: '//input[@name="postal_code"]',
            value: '100-6514'
        };
        // var address2 = {
        //     selecter: '//input[@name="address2"]',
        //     value: '大手町2-6-2'
        // };
        it('値を入力して送信', () => {
            //企業一覧画面に遷移
            browser.url('http://54.95.18.112:8084/client').pause(1000);
            //一番上の行のIDを取得
            var id = browser.getText('//table/tbody/tr[1]/td[1]');
            console.log(id);
            //一番上の行の詳細画面に遷移
            browser.click('//table/tbody/tr[1]/td[last()]/a[1]').pause(1000);
            browser.waitUntil(() => {
                return browser.getUrl() === 'http://54.95.18.112:8084/client/' + id
                }, 5000, 'expected text to be different after 5s');
            //請求先変更画面に遷移
            //とりあえず一番下
            var client_billing_id = browser.getValue('//div[@class="container"][last()]/div/div/div/div[1]/div/input')
            browser.click('//div[@class="container"][last()]/div/a/button')
            browser.waitUntil(() => {
                return browser.getUrl() === 'http://54.95.18.112:8084/client_billing/' + client_billing_id + '/edit'
                }, 5000, 'expected text to be different after 5s');

            //値の入力
            browser.setValue(section.selecter, section.value);
            browser.setValue(post.selecter, post.value);
            browser.setValue(client_officer.selecter, client_officer.value);
            browser.setValue(mail.selecter, mail.value);
            browser.setValue(tel.selecter, tel.value);
            browser.setValue(fax.selecter, fax.value);
            browser.setValue(postal_code.selecter, postal_code.value);
            browser.click('#postal_code_search').pause(1000);
            browser.waitUntil(function () {
                return browser.getValue('#prefecture') === '東京都'
            }, 5000, 'expected text to be different after 5s');
            // browser.setValue(address2.selecter, address2.value);
            browser.click('option[value="1"]');

            //入力後、登録ボタン押下
            browser.click('button[type="submit"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/client/' + id
            }, 5000, 'expected text to be different after 5s');         
        });
        var path = '//div[@class="container"][last()]/div/div/'

        it('担当部門が表示されること', () => {
            var section_confirm = browser.getValue(path + 'div/div[2]/div/input');
            expect(section_confirm).toEqual(section.value);
        });
        it('担当役職が表示されること', () => {
            var post_confirm = browser.getValue(path + 'div/div[3]/div/input');
            expect(post_confirm).toEqual(post.value);
        });
        it('担当者名が表示されること', () => {
            var client_officer_confirm = browser.getValue(path + 'div/div[4]/div/input');
            expect(client_officer_confirm).toEqual(client_officer.value);
        });
        it('メールアドレスが表示されること', () => {
           var mail_confirm = browser.getValue(path + 'div/div[5]/div/input');
            expect(mail_confirm).toEqual(mail.value);
        });
        it('電話番号が表示されること', () => {
            var tel_confirm = browser.getValue(path + 'div/div[6]/div/input');
            expect(tel_confirm).toEqual(tel.value);
        });
        it('FAXが表示されること', () => {
            var fax_confirm = browser.getValue(path + 'div/div[7]/div/input'); 
            expect(fax_confirm).toEqual(fax.value);
        });
        it('送付方法が表示されること', () => {
            var client_billing_sending_info_confirm = browser.getValue(path + 'div/div[8]/div/input'); 
            expect(client_billing_sending_info_confirm).toEqual("メール")
        });           
        it('郵便番号が表示されること', () => {
            var postal_code_confirm = browser.getValue(path + 'div/div[9]/div/input');
            expect(postal_code_confirm).toEqual(postal_code.value);            
        });
        it('都道府県が表示されること', () => {
            var prefecture_confirm = browser.getValue(path + 'div/div[11]/div/input');
            expect(prefecture_confirm).toEqual("東京都");           
        });
        it('市区町村が表示されること', () => {
            var address1_confirm = browser.getValue(path + 'div/div[12]/div/input');
            expect(address1_confirm).toEqual("千代田区");
        });
        it('町名・番地・建物等が表示されること', () => {
            var address2_confirm = browser.getValue(path + 'div/div[13]/div/input');
            expect(address2_confirm).toEqual("丸の内新丸の内ビルディング　１４階");
        });
    })
});