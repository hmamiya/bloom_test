var webdriverio = require('webdriverio');
const testutils = require('../../util/testutils');

describe('bloomの入力テスト', () => {
    var originalTimeout;
  beforeEach(function() {
    beforeEach = testutils.beforeEach();
    return beforeEach;
  });

    it('ログイン処理', () => {
        login = testutils.login(); 
        return login;
    });
//覚書登録
    it('覚書_異常系_必須テスト', () => {

      //入力する場所と値を指定
      var contract_content = {
        selecter: '//textarea[@name="contract_content"]',
        value: ''
      };
      var contract_content_file = {
          selecter: '//input[@name="contract_content_file"]',
          value: ''
      };

      //契約一覧画面に遷移
      browser.url('http://54.95.18.112:8084/contract').pause(1000);

      //一番上の行の契約IDを取得
      var selected_id = browser.getText('//table/tbody/tr[1]/th');
      console.log(selected_id);

      //一番上の行の詳細に遷移
      browser.click('//table/tbody/tr[1]/td[last()]/a[1]').pause(1000);
      // browser.url('http://54.95.18.112:8084/contract/' + id);
      browser.waitUntil(function () {
                    return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + selected_id
                  }, 5000, 'expected text to be different after 5s');
      //覚書登録の画面に遷移
      browser.click('//button[text() = "覚書登録"]')
      browser.waitUntil(function () {
        return browser.getUrl() === 'http://54.95.18.112:8084/memo/create/' + selected_id
      }, 5000, 'expected text to be different after 5s');

      //契約IDが一致しているか確認
      var id = browser.getValue('//input[@name="contract_id"]');
      expect(selected_id).toEqual(id)

      //値の入力
      browser.setValue(contract_content.selecter, contract_content.value);
      browser.setValue(contract_content_file.selecter, contract_content_file.value);

      //送信ボタン押下
      browser.click('button[type="submit"]').pause(1000);
      
      //エラーメッセージを取得
      var path = '//div[@class="container"]/div/div/form/div[1]/';

      var contract_content_error = browser.getText(path + 'div[7]/div/span/strong')

      //エラーメッセージが正しいか確認
      expect(contract_content_error).toEqual('文書タイプは必須です。')

    });
});