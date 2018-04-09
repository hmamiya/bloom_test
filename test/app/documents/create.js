//文書登録
var webdriverio = require('webdriverio');
const testutils = require('../../util/testutils');

describe('document/create', () => {
    beforeEach(function() {
      beforeEach = testutils.beforeEach();
      return beforeEach;
    });

    it('ログイン処理', () => {
        login = testutils.login(); 
        return login;
    });
    //正常系
    describe('文書登録_正常系', () => {
        //入力する場所と値を指定
        var document_user = {
          selecter: '//input[@name="document_user"][last()]',
          value: '1'
        };
        var document_content = {
            selecter: '//input[@name="document_content"]',
            value: 'テスト名義'
        };
        var document = {
            selecter: '//input[@name="document"]',
            value: '/Users/harukamamiya/Desktop/bloom自動テスト仕様書_180315.xlsx'
        };
        it('文書登録入力テスト', () => {
            //契約一覧画面に遷移
            browser.url('http://54.95.18.112:8084/contract').pause(1000);
            //一番上の行のIDを取得
            var selected_id = browser.getText('//table/tbody/tr[1]/th');
            console.log(selected_id);
            //一番上の行の詳細に遷移
            browser.click('//table/tbody/tr[1]/td[last()]/a[1]').pause(1000);
            browser.waitUntil(() => {
                            return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + selected_id
                          }, 5000, 'expected text to be different after 5s');
            //文書登録のページに遷移
            browser.click('//button[text() = "文書登録"]');
            browser.waitUntil(() => {
              return browser.getUrl() === 'http://54.95.18.112:8084/document/create/' + selected_id
            }, 5000, 'expected text to be different after 5s');

            //契約IDが一致しているか確認
            var id = browser.getValue('//input[@name="contract_id"]')
            expect(selected_id).toEqualid(id)

            //値の入力
            browser.click('//label[text() = "コンサルティング契約書"]');
            browser.click('//label[text() = "無"]');
            browser.setValue(document_user.selecter, document_user.value);
            browser.setValue(document_content.selecter, document_content.value);
            browser.setValue(document.selecter, document.value);

            //入力完了後、送信
            //TODO:180328遷移先が変わるのであとで変更
            browser.click('button[type="submit"]').pause(1000);
            browser.waitUntil(function () {
              return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + selected_id
            }, 5000, 'expected text to be different after 5s');
        });
        var path = '//div[@class="container"]/div[last()]/div/div/'
        it('文書タイプが表示されること', () => {
            var document_type_confirm = browser.getValue(path + 'div[1]/div/input')
            expect(document_type_confirm).toEqual("コンサルティング契約書");
        })
    })
    //最新の文書を取得
      //TODO:180328遷移先が変わるのであとで変更
      var document_user_confirm
      var document_content_confirm
      // var document_confirm

      //登録内容と表示内容が一致しているか確認
      //TODO:180328遷移先が変わるのであとで確認
      expect(document_user_confirm).toEqual(document_user.value);
      expect(document_content_confirm).toEqual(document_content.value);
      expect(document_confirm).toEqual(document.value);
    
});