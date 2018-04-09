//企業登録
var webdriverio = require('webdriverio');
const testutils = require('../../util/testutils');

describe('client/create', () => { 
    beforeEach(function() {
        beforeEach = testutils.beforeEach();
        return beforeEach;
    }); 
    it('ログイン処理', () => {
        login = testutils.login(); 
        return login;
    });

    //正常系
    describe('企業変更_正常系', () => {
        //入力する場所と値を指定
        let legal_personality_before = {
            selecter: '//select[@name="legal_personality_before"]/option[@value="6"]'
            // 1 株式会社
            // 2 有限会社
            // 3 合同会社
            // 4 合資会社
            // 5 一般社団法人
            // 6 一般財団法人
        };
        let client_name = {
            selecter: '//input[@name="client_name"]',
            value: '自動テスト変更'
        };
        let legal_personality_after = {
            selecter: '//select[@name="legal_personality_after"]/option[@value="2"]'
            // 1 株式会社
            // 2 有限会社
            // 3 合同会社
            // 4 合資会社
            // 5 一般社団法人
            // 6 一般財団法人
        };
        let kana_name = {
            selecter: '//input[@name="kana_name"]',
            value: 'ジドウテストヘンコウ'
        };
        let cp2_client_id = {
            selecter: '//input[@name="cp2_client_id"]',
            value: '1234567890'
        };
        let coordination_id = {
            selecter: '//input[@name="coordination_id"]',
            value: '9876543210'
        }
        let industry_id = {
            selecter: '//select[@name="industry_id"]/option[@value="1"]'
            // 1 IT・通信
            // 2 インターネット・広告・メディア
            // 3 メーカー（機械・電気）
            // 4 メーカー（素材・化学・食品・化粧品・その他）
            // 5 商社
            // 6 医薬品・医療機器・ライフサイエンス・医療系サービス
            // 7 金融
            // 8 建設・プラント・不動産
            // 9 コンサルティング・専門事務所・監査法人・税理士法人・リサーチ
            // 10 人材サービス・アウトソーシング・コールセンター
            // 11 小売
            // 12 外食
            // 13 運輸・物流
            // 14 エネルギー（電力・ガス・石油・新エネルギー）
            // 15 旅行・宿泊・レジャー
            // 16 警備・清掃
            // 17 理容・美容・エステ
            // 18 教育
            // 19 農林水産・鉱業
            // 20 公社・官公庁・学校・研究施設
            // 21 冠婚葬祭
            // 22 その他
        }
        let url = {
            selecter: '//input[@name="url"]',
            value: 'https://www.testcange.co.jp/'
        };
        let postal_code = {
            selecter: '//input[@name="postal_code"]',
            value: '100-6514'
        };
        // let address2 = {
        //     selecter:  '//input[@name="address2"]',
        //     value: '大手町2-6-2'
        // }
        it('値を入力して送信', () => {
            //企業一覧画面に遷移
            browser.url('http://54.95.18.112:8084/client').pause(1000);;

            //最新の企業の変更画面に遷移
            var id = browser.getText('//tbody/tr[1]/td[1]')
            console.log(id)
            browser.click('//tbody/tr[1]/td[7]/a[2]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/client/' + id + '/edit' 
            }, 5000, 'expected text to be different after 5s');

            browser.click(legal_personality_before.selecter);
            browser.setValue(client_name.selecter, client_name.value);
            // browser.click(legal_personality_after.selecter);
            browser.setValue(kana_name.selecter, kana_name.value);
            browser.setValue(cp2_client_id.selecter, cp2_client_id.value);
            browser.setValue(coordination_id.selecter, coordination_id.value);
            browser.click(industry_id.selecter);
            browser.setValue(postal_code.selecter, postal_code.value);
            browser.setValue(url.selecter, url.value);
            browser.click('#postal_code_search').pause(1000);;
            browser.waitUntil(function () {
                return browser.getValue('#prefecture') === '東京都'
                }, 5000, 'expected text to be different after 5s');
            // browser.setValue(address2.selecter, address2.value);

            //入力完了後、送信
            browser.click('input[type="submit"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/client/'+ id
            }, 5000, 'expected text to be different after 5s');
        });
        var path = '//div[@class="container"][1]/div/div/div/'
        // it('IDが表示されること', () => {
        //     var client_id_confirm = browser.getValue(path + 'div[1]/div/input')
        //     expect(client_id_confirm).toEqual(id)
        // })
        it('企業名が表示されること', () => {
            var client_name_confirm = browser.getValue(path + 'div[2]/div/input');
            expect(client_name_confirm).toEqual("一般財団法人" + client_name.value);
        });
        it('企業カナが表示されること', () => {
            var kana_name_confirm = browser.getValue(path + 'div[3]/div/input');
            expect(kana_name_confirm).toEqual(kana_name.value);
        });
        it('CP2企業IDが表示されること', () => {
            var cp2_client_id_confirm = browser.getValue(path + 'div[4]/div/input');
            expect(cp2_client_id_confirm).toEqual(cp2_client_id.value);
        });
        // it('連携IDが表示されること', () => {
        //     var coordination_id_confirm = browser.getValuet(path + 'div[5]/div/input');
        //     expect(coordination_id_confirm).toEqual(coordination_id.value);
        // });
        // it('業種(10文字)が表示されること', () => {
        //     var industry_confirm = browser.getValue('//tbody/tr[1]/td[4]');
        //     expect(industry_confirm).toEqual("人材サービス・アウト...")
        // });
        it('企業URLが表示されること', () => {
            var url_confirm = browser.getValue(path + 'div[7]/div/input');
            expect(url_confirm).toEqual(url.value)
        });
        it('郵便番号が表示されること', () => {
            var postal_code_confirm = browser.getValue(path + 'div[9]/div/input');
            expect(postal_code_confirm).toEqual(postal_code.value)
        });
        it('都道府県が表示されること', () => {
            var prefecture_confirm = browser.getValue(path + 'div[11]/div/input');
            expect(prefecture_confirm).toEqual("東京都")
        });
        it('市区町村が表示されること', () => {
            var address1_confirm = browser.getValue(path + 'div[12]/div/input');
            expect(address1_confirm).toEqual("千代田区")
        });
        it('町名・番地・建物等が表示されること', () => {
            var address2_confirm = browser.getValue(path + 'div[13]/div/input');
            expect(address2_confirm).toEqual("丸の内新丸の内ビルディング　１４階")
        });
    });

    //異常系（必須）
    xdescribe('企業登録_異常系_必須', () => {
        it('入力せずに送信', () => {
            //企業一覧画面に遷移
            browser.url('http://54.95.18.112:8084/client');

            //登録画面に遷移
            browser.click('//button[text() = "登録"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/client/create'
            }, 5000, 'expected text to be different after 5s');

            browser.click('button[type="submit"]').pause(1000);
        });
        var path = '//div[@class="container"]/div/div/form/div[1]/';
        it('法人格(前)のエラーメッセージ（必須）が表示されること', () => {
            var legal_personality_before_error = browser.getText(path + 'div[1]/div/span/strong')
            expect(legal_personality_before_error).toEqual("法人格(後)が存在しない時、法人格(前)は必須です。")
        });
        it('企業名のエラーメッセージ（必須）が表示されること', () => {
            var client_name_error = browser.getText(path + 'div[2]/div/span/strong')
            expect(client_name_error).toEqual("企業名は必須です。")
        });
        it('法人格(後)のエラーメッセージ（必須）が表示されること', () => {
            var legal_personality_after_error = browser.getText(path + 'div[3]/div/span/strong')
            expect(legal_personality_after_error).toEqual("法人格(前)が存在しない時、法人格(後)は必須です。")
        });
        it('企業カナのエラーメッセージ（必須）が表示されること', () => {
            var kana_name_error = browser.getText(path + 'div[4]/div/span/strong')
            expect(kana_name_error).toEqual("企業カナは必須です。")
        });
        it('業種のエラーメッセージ（必須）が表示されること', () => {
            var industry_id_error = browser.getText(path + 'div[7]/div/span/strong')
            expect(industry_id_error).toEqual("業種は必須です。")
        });
        it('郵便番号のエラーメッセージ（必須）が表示されること', () => {
            var postal_code_error = browser.getText(path + 'div[9]/div/span/strong')
            expect(postal_code_error).toEqual("郵便番号は必須です。")
        });
        it('都道府県のエラーメッセージ（必須）が表示されること', () => {
            var prefecture_error = browser.getText(path + 'div[12]/div/span/strong')
            expect(prefecture_error).toEqual("都道府県は必須です。")
        });
        it('市区町村のエラーメッセージ（必須）が表示されること', () => {
            var address1_error = browser.getText(path + 'div[13]/div/span/strong')
            expect(address1_error).toEqual("市区町村は必須です。")
        });
        it('町名・番地・建物等のエラーメッセージ（必須）が表示されること', () => {
            var address2_error = browser.getText(path + 'div[14]/div/span/strong')
            expect(address2_error).toEqual("町名・番地・建物等は必須です。")
        });
    });

    //異常系（型）
    xdescribe('企業登録_異常系_型', () => {
        //入力する場所と値を指定
        var legal_personality_before = {
            selecter: '//select[@name="legal_personality_before"]/option[@value="1"]'
        };
        var client_name = {
            selecter: '//input[@name="client_name"]',
            value: ' 自動テスト'
        };
        var legal_personality_after = {
            selecter: '//select[@name="legal_personality_after"]/option[@value="2"]'
        };
        var kana_name = {
            selecter: '//input[@name="kana_name"]',
            value: '自動test'
        };
        var cp2_client_id = {
            selecter: '//input[@name="cp2_client_id"]',
            value: '自動test'
        };
        var coordination_id = {
            selecter: '//input[@name="coordination_id"]',
            value: '自動test'
        }
        var industry_id = {
            selecter: '//select[@name="industry_id"]/option[@value="10"]'
        }
        var url = {
            selecter: '//input[@name="url"]',
            value: 'https://www.test.co.jp/'
        };
        var postal_code = {
            selecter: '//input[@name="postal_code"]',
            value: '自動test'
        };
        var prefecture = {
            selecter: '//input[@name="prefecture"]',
            value: '自動test'
        }
        var address1 = {
            selecter:  '//input[@name="address1"]',
            value: '自動test'
        }
        var address2 = {
            selecter:  '//input[@name="address2"]',
            value: '自動test'
        }
        it('想定される型と異なった型で送信', () => {
            //企業一覧画面に遷移
            browser.url('http://54.95.18.112:8084/client');

            //登録画面に遷移
            browser.click('//button[text() = "登録"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/client/create'
            }, 5000, 'expected text to be different after 5s');

            //値の入力
            browser.click(legal_personality_before.selecter);
            browser.setValue(client_name.selecter, client_name.value);
            browser.setValue(kana_name.selecter, kana_name.value);
            browser.setValue(cp2_client_id.selecter, cp2_client_id.value);
            browser.setValue(coordination_id.selecter, coordination_id.value);
            browser.click(industry_id.selecter);
            browser.setValue(url.selecter, url.value);
            browser.setValue(postal_code.selecter, postal_code.value);
            browser.setValue(prefecture.selecter, prefecture.value);
            browser.setValue(address1.selecter, address1.value);
            browser.setValue(address2.selecter, address2.value);

            browser.click('button[type="submit"]').pause(1000);
        });
        var path = '//div[@class="container"]/div/div/form/div[1]/';
        it('企業カナのエラーメッセージ（型）が表示されること', () => {
            var kana_name_error = browser.getText(path + 'div[4]/div/span/strong')
            expect(kana_name_error).toEqual("企業カナの書式が正しくありません。")
        });
        it('CP2企業IDのエラーメッセージ（型）が表示されること', () => {
            var postal_code_error = browser.getText(path + 'div[5]/div/span/strong')
            expect(cp2_client_id_error).toEqual("CP2企業IDの書式が正しくありません。")
        });
        it('連携IDのエラーメッセージ（型）が表示されること', () => {
            var postal_code_error = browser.getText(path + 'div[6]/div/span/strong')
            expect(coordination_id_error).toEqual("連携IDの書式が正しくありません。")
        });
        it('郵便番号のエラーメッセージ（型）が表示されること', () => {
            var postal_code_error = browser.getText(path + 'div[9]/div/span/strong')
            expect(postal_code_error).toEqual("郵便番号の書式が正しくありません。")
        });
    });

    //異常系（文字数）
    xdescribe('企業登録_異常系_文字数', () => {
        //入力する場所と値を指定
        var legal_personality_before = {
            selecter: '//select[@name="legal_personality_before"]/option[@value="1"]'
        };
        var client_name = { //41文字入力
            selecter: '//input[@name="client_name"]',
            value: 'テストテストテストテストテストテストテストテストテストテストテストテストテストテス'
        };
        var legal_personality_after = {
            selecter: '//select[@name="legal_personality_after"]/option[@value="2"]'
        };
        var kana_name = { //21文字入力
            selecter: '//input[@name="kana_name"]',
            value: 'テストテストテストテストテストテストテスト'
        };
        var cp2_client_id = { //12文字入力
            selecter: '//input[@name="cp2_client_id"]',
            value: '123456789012'
        };
        var coordination_id = {
            selecter: '//input[@name="coordination_id"]',
            value: '987654321098'
        }
        var industry_id = {
            selecter: '//select[@name="industry_id"]/option[@value="10"]'
        }
        var url = { //256文字入力
            selecter: '//input[@name="url"]',
            value: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv'
        };
        var postal_code = { //9文字入力
            selecter: '//input[@name="postal_code"]',
            value: '100-00000'
        };
        var prefecture = {
            selecter: '//input[@name="prefecture"]',
            value: '東京都'
        }
        var address1 = { //65文字入力
            selecter:  '//input[@name="address1"]',
            value: 'テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテス'
        }
        var address2 = { //65文字入力
            selecter:  '//input[@name="address2"]',
            value: 'テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテス'
        }
        it('想定される文字数を超えて送信', () => {
            //企業一覧画面に遷移
            browser.url('http://54.95.18.112:8084/client');

            //登録画面に遷移
            browser.click('//button[text() = "登録"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/client/create'
            }, 5000, 'expected text to be different after 5s');

            //値の入力
            browser.click(legal_personality_before.selecter);
            browser.setValue(client_name.selecter, client_name.value);
            browser.setValue(kana_name.selecter, kana_name.value);
            browser.setValue(cp2_client_id.selecter, cp2_client_id.value);
            browser.setValue(coordination_id.selecter, coordination_id.value);
            browser.click(industry_id.selecter);
            browser.setValue(url.selecter, url.value);
            browser.setValue(postal_code.selecter, postal_code.value);
            browser.setValue(prefecture.selecter, prefecture.value);
            browser.setValue(address1.selecter, address1.value);
            browser.setValue(address2.selecter, address2.value);

            browser.click('button[type="submit"]').pause(1000);
        });
        var path = '//div[@class="container"]/div/div/form/div[1]/';
        it('企業名のエラーメッセージ（文字数）が表示されること', () => {
            var client_name_error = browser.getText(path + 'div[2]/div/span/strong')
            expect(client_name_error).toEqual("企業名は40文字以下にしてください。")
        });
        it('企業カナのエラーメッセージ（文字数）が表示されること', () => {
            var kana_name_error = browser.getText(path + 'div[4]/div/span/strong')
            expect(kana_name_error).toEqual("企業カナは20文字以下にしてください。")
        });
        it('CP2企業IDのエラーメッセージ（文字数）が表示されること', () => {
            var cp2_client_id_error = browser.getText(path + 'div[5]/div/span/strong')
            expect(cp2_client_id_error).toEqual("CP2企業IDは11文字以下にしてください。")
        });
        it('連携IDのエラーメッセージ（文字数）が表示されること', () => {
            var coordination_id_error = browser.getText(path + 'div[6]/div/span/strong')
            expect(coordination_id_error).toEqual("連携IDは11文字以下にしてください。")
        });
        it('企業URLのエラーメッセージ（文字数）が表示されること', () => {
            var url_error = browser.getText(path + 'div[8]/div/span/strong')
            expect(url_error).toEqual("企業URLは255文字以下にしてください。")
        });
        it('郵便番号のエラーメッセージ（文字数）が表示されること', () => {
            var postal_code_error = browser.getText(path + 'div[9]/div/span/strong')
            expect(postal_code_error).toEqual("郵便番号は8文字以下にしてください。")
        });
        it('市区町村のエラーメッセージ（文字数）が表示されること', () => {
            var address1_error = browser.getText(path + 'div[13]/div/span/strong')
            expect(address1_error).toEqual("市区町村は64文字以下にしてください。")
        });
        it('町名・番地・建物等のエラーメッセージ（文字数）が表示されること', () => {
            var address2_error = browser.getText(path + 'div[14]/div/span/strong')
            expect(address2_error).toEqual("町名・番地・建物等は64文字以下にしてください。")
        });
    });
});