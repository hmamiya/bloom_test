//契約登録
var webdriverio = require('webdriverio');
const testutils = require('../../util/testutils');

describe('contract/create', () => {
  beforeEach(function() {
    beforeEach = testutils.beforeEach();
    return beforeEach;
  });

    it('ログイン処理', () => {
        login = testutils.login(); 
        return login;
    });
    //正常系
    describe('契約登録_正常系', () => {
        //入力する場所と値を指定
        //企業名
        var client_name = {
            selecter: '//input[@name="client_name"]',
            value: '株式会社ドロップシステム'
        };
        //顧問名
        var adviser_name = {
            selecter: '//input[@name="adviser_name"]',
            value: '古市恵美'
        };
        //契約締結日
        var signed_date = {
            selecter: '//input[@name="signed_date"]',
            value: '2018-04-01'
        };
        //契約開始日
        var start_date = {
            selecter: '//input[@name="start_date"]',
            value: '2018-04-01'
        };
        //契約終了日
        var end_date = {
            selecter: '//input[@name="end_date"]',
            value: '2018-09-30'
        };
        //期間（月単位）
        var update_period = {
            selecter: '//input[@name="update_period"]',
            value: '6'
        };
        //業務回数
        var work_times = {
            selecter: '//input[@name="work_times"]',
            value: '1'
        }
        //業務回数補足
        var work_times_comment = {
            selecter: '//input[@name="work_times_comment"]',
            value: '終わるまで頑張ろう'
        }
        //支援内容補足
        var support_memo = {
            selecter: '//input[@name="support_memo"]',
            value: '自動テストで支援するよ'
        }
        //サーチ料（その他金額）
        var search_fee = {
            selecter: '//input[@name="search_fee"]',
            value: '100000'
        }
        //サーチ料支払い期日（その他）
        var search_payment_memo = {
            selecter: '//input[@name="search_payment_memo"]',
            value: '開始月の翌月始め払'
        }
        //コンサルティング料
        var consulting_fee = {
            selecter: '//input[@name="consulting_fee"]',
            value: '100000'
        }
        //コンサルティング料　支払い期日（その他）
        var consulting_payment_memo = {
            selecter: '//input[@name="consulting_payment_memo"]',
            value: '開始月の翌月始め払'
        }
        //インセンティブ報酬内容
        var incentive_content = {
            selecter: '//input[@name="incentive_content"]',
            value: 'ないんかーい'
        }
        // var client_special_note= {
        //     selecter: '//input[@name="client_special_note"]',
        //     value: 'CP2請求先参照'
        // }
        //顧問料
        var adviser_fee= {
            selecter: '//input[@name="adviser_fee"]',
            value: '100000'
        }
        //顧問料 支払期日
        var adviser_payment_type= {
            selecter: '//input[@name="adviser_payment_type"]',
            value: '業務提供月の月末締め翌月末払'
        }
        //顧問料例外
        var adviser_fee_exception= {
            selecter: '//textarea[@name="adviser_fee_exception"]',
            value: '2018年3月1日〜2018年3月31日 100,000円（税別）'
        }
        //契約書
        var consulting_file= {
            selecter: '//input[@name="consulting_file"]',
            value: '/Users/harukamamiya/Desktop/資料/dropsystem/顧問NW/bloom自動テスト仕様書.xlsx'
        }
        it('値を入力して送信', () => {
            //契約一蘭画面から登録画面に遷移
            browser.url('http://54.95.18.112:8084/contract');
            browser.click('//button[text()="登録"]')
            browser.waitUntil(() => {
                return browser.getUrl() === 'http://54.95.18.112:8084/contract/create'
                }, 5000, 'expected text to be different after 5s');
            
            //値の入力
            browser.click('//select[@name="sales_section"]/option[@value="1"]')
            browser.click('//select[@name="sales_person"]/option[last()]')
            browser.click('//select[@name="responsible_person"]/option[@value="1"]')
            browser.setValue(client_name.selecter, client_name.value);
            browser.pause(1000);
            //autocompleteから選択
            // browser.keys("ArrowDown");
            // browser.keys("ArrowDown");
            browser.keys("Enter")
            browser.pause(1000);
            browser.click('//form/div/div[5]/div/select/option[last()]')
            browser.setValue(adviser_name.selecter, adviser_name.value);
            browser.pause(1000);
            //autocompleteから選択
            // browser.keys("ArrowUp");
            // browser.keys("ArrowUp");
            browser.keys("Enter"); 
            browser.pause(1000);
            browser.setValue(signed_date.selecter, signed_date.value);
            browser.setValue(start_date.selecter, start_date.value);
            browser.setValue(end_date.selecter, end_date.value);
            browser.click('#isAutoUpdateRadiosInline1');
            browser.setValue(update_period.selecter, update_period.value);
            browser.setValue(work_times.selecter, work_times.value);
            browser.setValue(work_times_comment.selecter, work_times_comment.value);
            browser.click('//select[@name="support_id"]/option[@value="1"]')
            browser.setValue(support_memo.selecter, support_memo.value);

            browser.click('//select[@name="search_fee_type"]/option[@value="1"]');
            browser.setValue(search_fee.selecter, search_fee.value);
            browser.click('//select[@name="search_payment_type"]/option[@value="99"]');
            browser.setValue(search_payment_memo.selecter, search_payment_memo.value);
            browser.setValue(consulting_fee.selecter, consulting_fee.value);
            browser.click('//select[@name="consulting_payment_type"]/option[@value="99"]');
            browser.setValue(consulting_payment_memo.selecter, consulting_payment_memo.value);
            browser.click('#clientIncentiveRadiosInline1');
            browser.setValue(incentive_content.selecter, incentive_content.value);
            browser.click('//select[@name="client_sending_method"]/option[@value="1"]');

            browser.setValue(adviser_fee.selecter, adviser_fee.value);
            browser.setValue(adviser_payment_type.selecter, adviser_payment_type.value);
            browser.setValue(adviser_fee_exception.selecter, adviser_fee_exception.value);
            browser.click('//select[@name="adviser_sending_method"]/option[@value="1"]');
            browser.setValue(consulting_file.selecter, consulting_file.value);

            //入力完了後、登録ボタン押下
            browser.click('button[type="submit"]').pause(1000);;
                browser.waitUntil(function () {
                    return browser.getUrl() === 'http://54.95.18.112:8084/contract'
                }, 5000, 'expected text to be different after 5s');
        });
        var path = '//table/tbody/tr[1]/';
        it('企業名が表示されること', () => {
            var client_name_confirm = browser.getText(path + 'td[2][text()]');
            expect(client_name_confirm).toEqual(client_name.value);
        })
        it('顧問氏名が表示されること', () => {
            var adviser_name_confirm = browser.getText(path + 'td[3][text()]');
            expect(adviser_name_confirm).toEqual(adviser_name.value);
        })
        it('営業担当が表示されること', () => {
            var sales_confirm = browser.getText(path + 'td[7][text()]');
            expect(sales_confirm).toEqual("JK顧問ﾈｯﾄﾜｰｸ1ﾁｰﾑ 一般社員");
        })
    })
    
});