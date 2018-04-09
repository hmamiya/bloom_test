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
    it('覚書登録入力テスト', () => {

      //入力する場所と値を指定
      var contract_content = {
        selecter: '//textarea[@name="contract_content"]',
        value: 'テスト契約書の内容を書くよ'
      };
      var contract_content_file = {
          selecter: '//input[@name="contract_content_file"]',
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

      //覚書登録の画面に遷移
      browser.click('//button[text() = "覚書登録"]')
      browser.waitUntil(function () {
        return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + selected_id + '/memo/create'
      }, 5000, 'expected text to be different after 5s');

      //表示内容の確認
      var displayed_id = browser.getValue('//div[@class="form-group row"]/div[1]/div/input')
      var displayed_client_id = browser.getValue('//div[@class="form-group row"]/div[3]/div/input')
      var displayed_client = browser.getValue('//div[@class="form-group row"]/div[4]/div/input')
      var displayed_adviser_id = browser.getValue('//div[@class="form-group row"]/div[5]/div/input')
      var displayed_adviser = browser.getValue('//div[@class="form-group row"]/div[6]/div/input')
      expect(selected_id).toEqual(displayed_id)
      expect(selected_client_id).toEqual(displayed_client_id)
      expect(selected_client).toEqual(displayed_client)
      expect(selected_adviser_id).toEqual(displayed_adviser_id)
      expect(selected_adviser).toEqual(displayed_adviser)

      //値の入力
      browser.click('//select[@name="draft_type"]/option[@value="1"]');
      //1 覚書
      //2 解約通知(1ヶ月前)
      //3 解約申出(自動更新しない+1ヶ月前)
      //4 解約合意(当月)
      //99 その他
      browser.setValue(contract_content.selecter, contract_content.value);
      browser.setValue(contract_content_file.selecter, contract_content_file.value);

      //入力完了後、送信
      browser.click('button[type="submit"]');
      browser.waitUntil(function () {
                  return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + selected_id
                }, 5000, 'expected text to be different after 5s');

      //TODO:入力内容と表示内容をどのように付き合わせるか/ページ遷移して確認する？
      //覚書一覧の画面に遷移
      browser.click('//button[text() = "関連覚書一覧"]')
      browser.waitUntil(function () {
        return browser.getUrl() === 'http://54.95.18.112:8084/contract/' + selected_id + '/memo'
      }, 5000, 'expected text to be different after 5s');
      //表示内容の確認
      var displayed_draft_type = browser.getValue('//div[@class="row justify-content-center"]/div/div/div[last()-4]/div/input')
      var displayed_contract_content = browser.getValue('//div[@class="row justify-content-center"]/div/div/div[last()-2]/div/input')
      expect(displayed_draft_type).toEqual("覚書")
      expect(displayed_contract_content).toEqual(contract_content.value)

    });
});