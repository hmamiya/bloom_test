//顧問変更_180406修正
var webdriverio = require('webdriverio');
const testutils = require('../../util/testutils');

describe('adviser/create', () => {
    beforeEach(function() {
        beforeEach = testutils.beforeEach();
        return beforeEach;
    });
    it('ログイン処理', () => {
        login = testutils.login(); 
        return login;
    });

    //正常系
    describe('顧問登録_正常系', () => {
        //入力する場所と値を指定
        var adviser_name = {
            selecter: '//input[@name="adviser_name"]',
            value: '自動テスト変更さん'
        };
        var cp2_adviser_id = {
            selecter: '//input[@name="cp2_adviser_id"]',
            value: '9876543210'
        };
        var tel = {
            selecter: '//input[@name="tel"]',
            value: '98-7654-3210'
        };
        var mail = {
            selecter: '//input[@name="mail"]',
            value: 'auto@testchange.com'
        };
        var postal_code = {
            selecter: '//input[@name="postal_code"]',
            value: '100-0000'
        };
        // var prefecture = {
        //     selecter: '//input[@name="prefecture"]',
        //     value: '東京都'
        // };
        // var address1 = {
        //     selecter: '//input[@name="address1"]',
        //     value: '千代田区'
        // };
        // var address2 = {
        //     selecter: '//input[@name="address2"]',
        //     value: '丸の内新丸の内ビルディング'
        // };
        var report_collection_responsible = {
            selecter: '//input[@name="report_collection_responsible"]',
            value: '自動テスト変更担当者'
        };
        var report_collection_supplement = {
            selecter: '//input[@name="report_collection_supplement"]',
            value: '変更するよ'
        };
        it('値を入力して送信', () => {
            //顧問一覧画面に遷移
            browser.url('http://54.95.18.112:8084/adviser');
            //登録画面に遷移
            var id = browser.getText('//tbody/tr[1]/td[1]')
            browser.click('//tbody/tr[1]/td[9]/a[2]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/adviser/' + id + '/edit'
            }, 5000, 'expected text to be different after 5s');

            //値の入力
            browser.setValue(adviser_name.selecter, adviser_name.value);
            browser.setValue(cp2_adviser_id.selecter, cp2_adviser_id.value);
            browser.setValue(tel.selecter, tel.value);
            browser.setValue(mail.selecter, mail.value);
            browser.setValue(postal_code.selecter, postal_code.value);
            // browser.click('#postal_code_search');
            // browser.waitUntil(function () {
            //     return browser.getValue('#prefecture') === '東京都'
            // }, 5000, 'expected text to be different after 5s');
            // browser.setValue(address2.selecter, address2.value);
            browser.click('//select[@name="report_collection_method"]/option[@value="1"]');
            browser.setValue(report_collection_responsible.selecter, report_collection_responsible.value);
            browser.setValue(report_collection_supplement.selecter, report_collection_supplement.value);
            browser.click('#benefitOneRadiosInline1');

            //入力完了後、送信
            browser.click('button[type="submit"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/adviser'
            }, 5000, 'expected text to be different after 5s');
        });
        var path = '//div[@class="container"][1]/div/div/'
        it('顧問名が表示されること', () => {
            var adviser_name_confirm = browser.getText(path + 'p');
            expect(adviser_name_confirm).toEqual(adviser_name.value);
        })
        it('CP2顧問IDが表示されること', () => {
            var cp2_adviser_id_confirm = browser.getValue(path + 'div/div[2]/div/input');
            expect(cp2_adviser_id_confirm).toEqual(cp2_adviser_id.value);
        })
        it('電話番号が表示されること', () => {
            var tel_confirm = browser.getValue(path + 'div/div[3]/div/input');
            expect(tel_confirm).toEqual(tel.value);
        })
        it('メールアドレスが表示されること', () => {
            var mail_confirm = browser.getValue(path + 'div/div[4]/div/input');
            expect(mail_confirm).toEqual(mail.value);
        })
        it('ベネフィットワンが表示されること', () => {
            var benefitOne_confirm = browser.getValue(path + 'div/div[5]/div/input');
            expect(benefitOne_confirm).toEqual("未加入");
        })
        it('郵便番号が表示されること', () => {
            var postal_code_confirm = browser.getValue(path + 'div/div[6]/div/input');
            expect(postal_code_confirm).toEqual(postal_code.value);
        })
        it('都道府県が表示されること', () => {
            var prefecture_confirm = browser.getValue(path + 'div/div[7]/div/input');
            expect(prefecture_confirm).toEqual("東京都");
        })
        it('市区町村が表示されること', () => {
            var address1_confirm = browser.getValue(path + 'div/div[8]/div/input');
            expect(address1_confirm).toEqual("千代田区");
        })
        it('番地等が表示されること', () => {
            var address2_confirm = browser.getValue(path + 'div/div[9]/div/input');
            expect(address2_confirm).toEqual("丸の内新丸の内ビルディング");
        })
        it('業務報告書回収方法が表示されること', () => {
            var report_collection_method_confirm = browser.getValue(path + 'div/div[10]/div/input');
            expect(report_collection_method_confirm).toEqual("メール");
        })
        it('業務報告書回収担当が表示されること', () => {
            var report_collection_responsible_confirm = browser.getValue(path + 'div/div[11]/div/input');
            expect(report_collection_responsible_confirm).toEqual(report_collection_responsible.value);
        })
        it('業務報告書回収補足が表示されること', () => {
            var report_collection_supplement_confirm = browser.getValue(path + 'div/div[12]/div/input');
            expect(rreport_collection_supplement_confirm).toEqual(rreport_collection_supplement.value);
        })
         
    });

    //異常系（必須）
    xdescribe('顧問登録_異常系_必須', () => {
        it('入力せずに送信', () => {
            //顧問一覧画面に遷移
            browser.url('http://54.95.18.112:8084/adviser');
            //登録画面に遷移
            browser.click('//button[text() = "登録"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/adviser/create'
            }, 5000, 'expected text to be different after 5s');

            browser.click('button[type="submit"]').pause(1000);
        });

        var path = '//div[@class="container"]/div/div/form/div[1]/';
        it('顧問名のエラーメッセージ（必須）が表示されること', () => {
            var adviser_name_error = browser.getText(path + 'div[1]/div/span/strong')
            expect(adviser_name_error).toEqual("顧問名は必須です。")
        })
        it('CP2顧問IDのエラーメッセージ（必須）が表示されること', () => {
            var cp2_adviser_id_error = browser.getText(path + 'div[2]/div/span/strong')
            expect(cp2_adviser_id_error).toEqual("CP2顧問IDは必須です。")
        })
        it('電話番号のエラーメッセージ（必須）が表示されること', () => {
            var tel_error = browser.getText(path + 'div[3]/div/span/strong')
            expect(tel_error).toEqual("電話番号は必須です。")
        })
        it('メールアドレスのエラーメッセージ（必須）が表示されること', () => {
            var mail_error = browser.getText(path + 'div[4]/div/span/strong')
            expect(mail_error).toEqual("メールアドレスは必須です。")
        })
        it('郵便番号のエラーメッセージ（必須）が表示されること', () => {
            var postal_code_error = browser.getText(path + 'div[5]/div/span/strong')
            expect(postal_code_error).toEqual("郵便番号は必須です。")
        })
        it('都道府県のエラーメッセージ（必須）が表示されること', () => {
            var prefecture_error = browser.getText(path + 'div[8]/div/span/strong')
            expect(prefecture_error).toEqual("都道府県は必須です。")
        })
        it('市区町村のエラーメッセージ（必須）が表示されること', () => {
            var address1_error = browser.getText(path + 'div[9]/div/span/strong')
            expect(address1_error).toEqual("市区町村は必須です。")
        })
        it('町名・番地・建物等のエラーメッセージ（必須）が表示されること', () => {
            var address2_error = browser.getText(path + 'div[10]/div/span/strong')
            expect(address2_error).toEqual("町名・番地・建物等は必須です。")
        })
        it('業務報告書回収担当のエラーメッセージ（必須）が表示されること', () => {
            var report_collection_responsible_error = browser.getText(path + 'div[12]/div/span/strong')
            expect(report_collection_responsible_error).toEqual("業務報告書回収担当は必須です。")
        })
        it('のエラーメッセージ（必須）が表示されること', () => {
            var report_collection_supplement_error = browser.getText(path + 'div[13]/div/span/strong')
            expect(report_collection_supplement_error).toEqual("業務報告書回収補足は必須です。")
        })
         
    });

    //異常系（型）
    xdescribe('顧問登録_異常系_型', () => {
        //入力する場所と値を指定
        var adviser_name = {
            selecter: '//input[@name="adviser_name"]',
            value: '自動テストさん'
        };
        var cp2_adviser_id = {
            selecter: '//input[@name="cp2_adviser_id"]',
            value: '自動テスト'
        };
        var tel = {
            selecter: '//input[@name="tel"]',
            value: '自動テスト'
        };
        var mail = {
            selecter: '//input[@name="mail"]',
            value: '自動テスト'
        };
        var postal_code = {
            selecter: '//input[@name="postal_code"]',
            value: '自動テスト'
        };
        var prefecture = {
            selecter: '//input[@name="prefecture"]',
            value: '東京都'
        };
        var address1 = {
            selecter: '//input[@name="address1"]',
            value: '千代田区'
        };
        var address2 = {
            selecter: '//input[@name="address2"]',
            value: '大手町2-6-2'
        };
        var report_collection_responsible = {
            selecter: '//input[@name="report_collection_responsible"]',
            value: '自動テスト'
        };
        var report_collection_supplement = {
            selecter: '//input[@name="report_collection_supplement"]',
            value: '自動テスト'
        };
        it('想定される型と異なった型で送信', () => {
            //顧問一覧画面に遷移
            browser.url('http://54.95.18.112:8084/adviser');
            //登録画面に遷移
            browser.click('//button[text() = "登録"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/adviser/create'
            }, 5000, 'expected text to be different after 5s');

            //値の入力
            browser.setValue(adviser_name.selecter, adviser_name.value);
            browser.setValue(cp2_adviser_id.selecter, cp2_adviser_id.value);
            browser.setValue(tel.selecter, tel.value);
            browser.setValue(mail.selecter, mail.value);
            browser.setValue(postal_code.selecter, postal_code.value);
            browser.setValue(prefecture.selecter, prefecture.value);
            browser.setValue(address1.selecter, address1.value);
            browser.setValue(address2.selecter, address2.value);
            browser.click('//select[@name="report_collection_method"]/option[@value="1"]');
            browser.setValue(report_collection_responsible.selecter, report_collection_responsible.value);
            browser.setValue(report_collection_supplement.selecter, report_collection_supplement.value);
            browser.click('#benefitOneRadiosInline1');

            browser.click('button[type="submit"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/adviser'
            }, 5000, 'expected text to be different after 5s');
        });

        var path = '//div[@class="container"]/div/div/form/div[1]/';
        it('CP2顧問IDのエラーメッセージ（型）が表示されること', () => {
            var cp2_adviser_id_error = browser.getText(path + 'div[2]/div/span/strong')
            expect(cp2_adviser_id_error).toEqual("CP2顧問IDの書式が正しくありません")
        })
        it('電話番号のエラーメッセージ（型）が表示されること', () => {
            var tel_error = browser.getText(path + 'div[3]/div/span/strong')
            expect(tel_error).toEqual("電話番号の書式が正しくありません")
        })
        it('メールアドレスのエラーメッセージ（型）が表示されること', () => {
            var mail_error = browser.getText(path + 'div[4]/div/span/strong')
            expect(mail_error).toEqual("メールアドレスの書式が正しくありません")
        })
        it('郵便番号のエラーメッセージ（型）が表示されること', () => {
            var postal_code_error = browser.getText(path + 'div[5]/div/span/strong')
            expect(postal_code_error).toEqual("郵便番号の書式が正しくありません")
        })         
    });

    //異常系（文字数）
    xdescribe('顧問登録_異常系_文字数', () => {
        //入力する場所と値を指定
        var adviser_name = { //41
            selecter: '//input[@name="adviser_name"]',
            value: 'テストテストテストテストテストテストテストテストテストテストテストテストテストテス'
        };
        var cp2_adviser_id = {
            selecter: '//input[@name="cp2_adviser_id"]',
            value: '123456789012'
        };
        var tel = { //21
            selecter: '//input[@name="tel"]',
            value: '123456789012345678901'
        };
        var mail = { //256
            selecter: '//input[@name="mail"]',
            value: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv'            
        };
        var postal_code = { //9
            selecter: '//input[@name="postal_code"]',
            value: '100-00000'
        };
        var prefecture = { //11
            selecter: '//input[@name="prefecture"]',
            value: '東京都'
        };
        var address1 = { //41
            selecter: '//input[@name="address1"]',
            value: 'テストテストテストテストテストテストテストテストテストテストテストテストテストテス'
        };
        var address2 = { //256
            selecter: '//input[@name="address2"]',
            value: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv'
        };
        var report_collection_responsible = { //51
            selecter: '//input[@name="report_collection_responsible"]',
            value: 'テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト'
        };
        var report_collection_supplement = { //256
            selecter: '//input[@name="report_collection_supplement"]',
            value: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv'
        };
        it('想定される文字数を超えて送信', () => {
            //顧問一覧画面に遷移
            browser.url('http://54.95.18.112:8084/adviser');
            //登録画面に遷移
            browser.click('//button[text() = "登録"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/adviser/create'
            }, 5000, 'expected text to be different after 5s');

            //値の入力
            browser.setValue(adviser_name.selecter, adviser_name.value);
            browser.setValue(cp2_adviser_id.selecter, cp2_adviser_id.value);
            browser.setValue(tel.selecter, tel.value);
            browser.setValue(mail.selecter, mail.value);
            browser.setValue(postal_code.selecter, postal_code.value);
            browser.setValue(prefecture.selecter, prefecture.value);
            browser.setValue(address1.selecter, address1.value);
            browser.setValue(address2.selecter, address2.value);
            browser.click('//select[@name="report_collection_method"]/option[@value="1"]');
            browser.setValue(report_collection_responsible.selecter, report_collection_responsible.value);
            browser.setValue(report_collection_supplement.selecter, report_collection_supplement.value);
            browser.click('#benefitOneRadiosInline1');

            browser.click('button[type="submit"]').pause(1000);
        });
        var path = '//div[@class="container"]/div/div/form/div[1]/';
        it('顧問名のエラーメッセージ（文字数）が表示されること', () => {
            var adviser_name_error = browser.getText(path + 'div[1]/div/span/strong');
            expect(adviser_name_error).toEqual("顧問名は40文字以下にしてください。")
        })
        it('CP2顧問IDのエラーメッセージ（文字数）が表示されること', () => {
            var cp2_adviser_id_error = browser.getText(path + 'div[2]/div/span/strong')
            expect(cp2_adviser_id_error).toEqual("CP2顧問IDは11文字以下にしてください。")
        })
        it('電話番号のエラーメッセージ（文字数）が表示されること', () => {
            var tel_error = browser.getText(path + 'div[3]/div/span/strong')
            expect(tel_error).toEqual("電話番号は20文字以下にしてください。")
        })
        it('メールアドレスのエラーメッセージ（文字数）が表示されること', () => {
            var mail_error = browser.getText(path + 'div[4]/div/span/strong')
            expect(mail_error).toEqual("メールアドレスは255文字以下にしてください。")
        })
        it('郵便番号のエラーメッセージ（文字数）が表示されること', () => {
            var postal_code_error = browser.getText(path + 'div[5]/div/span/strong')
            expect(postal_code_error).toEqual("郵便番号は8文字以下にしてください。")
        })         
        it('都道府県のエラーメッセージ（文字数）が表示されること', () => {
            var prefecture_error = browser.getText(path + 'div[8]/div/span/strong')
            expect(prefecture_error).toEqual("都道府県は10文字以下にしてください。")
        })
        it('市区町村のエラーメッセージ（文字数）が表示されること', () => {
            var address1_error = browser.getText(path + 'div[9]/div/span/strong')
            expect(address1_error).toEqual("市区町村は40文字以下にしてください。")
        })
        it('町名・番地・建物等のエラーメッセージ（文字数）が表示されること', () => {
            var address2_error = browser.getText(path + 'div[10]/div/span/strong')
            expect(address2_error).toEqual("町名・番地・建物等は255文字以下にしてください。")
        })
        it('業務報告書回収担当のエラーメッセージ（文字数）が表示されること', () => {
            var eport_collection_responsible_error = browser.getText(path + 'div[11]/div/span/strong')
            expect(address2_error).toEqual("業務報告書回収担当は50文字以下にしてください。")
        })
        it('業務報告書回収補足のエラーメッセージ（文字数）が表示されること', () => {
            var report_collection_supplement_error = browser.getText(path + 'div[13]/div/span/strong')
            expect(report_collection_supplement_error).toEqual("業務報告書回収補足は255文字以下にしてください。")
        });
    });
});