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
    it('覚書変更入力テスト', () => {

      //入力する場所と値を指定
      var content = {
        selecter: '//textarea[@name="content"]',
        value: 'テスト契約書の内容を更新するよ'
      };
      var file_path = {
          selecter: '//input[@name="file_path"]',
          value: '/Users/harukamamiya/Desktop/資料/dropsystem/顧問NW/bloom自動テスト仕様書.xlsx'
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

      //企業ID、企業名、顧問ID、顧問名を取得
      var selected_client_id = browser.getValue('//div[@class="form-group row"][1]/div[6]/div/input')
      var selected_client = browser.getValue('//div[@class="form-group row"][1]/div[7]/div/input[2]')
      var selected_adviser_id = browser.getValue('//div[@class="form-group row"][1]/div[8]/div/input')
      var selected_adviser = browser.getValue('//div[@class="form-group row"][1]/div[9]/div/input')

      //覚書一覧の画面に遷移
      browser.click('//button[text() = "関連覚書一覧"]')
      browser.waitUntil(function () {
        return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + selected_id + '/memo'
      }, 5000, 'expected text to be different after 5s');
      //企業名・顧問名を確認する
      var title = browser.getText('//h2')
      expect(title).toEqual("【契約】企業："+selected_client+"＿顧問："+selected_adviser)
      //覚書IDを取得する
      var selected_memo_id = browser.getValue('//div[@class="row justify-content-center"]/div/div/div[last()-5]/div/input')
      console.log(selected_memo_id)

      //覚書変更画面に遷移
      browser.click('//div[@class="row justify-content-center"]/div/div/div[last()]/a/button[text() = "覚書変更追加"]')
      browser.waitUntil(function () {
            return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + selected_id + '/memo/' + selected_memo_id + '/create'
          }, 5000, 'expected text to be different after 5s');
      //表示内容の確認
      var displayed_memo_id = browser.getValue('//div[@class="form-group row"]/div[1]/div/input')
      expect(selected_memo_id).toEqual(displayed_memo_id)

      //値の入力
      browser.click('//select[@name="application_from"]/option[last()]');
      browser.setValue(content.selecter, content.value);
      browser.setValue(file_path.selecter, file_path.value);

      //入力完了後、送信
      browser.click('button[type="submit"]');
      browser.waitUntil(function () {
                  return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + selected_id + '/memo'
                }, 5000, 'expected text to be different after 5s');

      //表示内容の確認
      var displayed_content = browser.getText('//table/thead/tr/td[3]')
      expect(displayed_content).toEqual(content.value)

    });
});