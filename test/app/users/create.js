//ユーザ登録
var webdriverio = require('webdriverio');
const testutils = require('../../util/testutils');

xdescribe('user/create', () => {
    beforeEach(function() {
      beforeEach = testutils.beforeEach();
      return beforeEach;
    });
    it('ログイン処理', () => {
        login = testutils.login(); 
        return login;
    });

    //正常系
    describe('ユーザ登録_正常系', () => {
        //入力する場所と値を指定
        var user_name = {
          selecter: '//input[@name="user_name"][last()]',
          value: '自動テスト君'
        };
        var mail = {
            selecter: '//input[@name="mail"]',
            value: 'autotest@dropsystem.co.jp'
        };
        var password = {
            selecter: '//input[@name="password"]',
            value: 'autotest'
        };
        it('値を入力して送信', () => {
            //ユーザ一覧画面に遷移
            browser.url('http://54.95.18.112:8084/user');
            browser.click('//button[text() = "登録"]');
            browser.waitUntil(function () {
                            return browser.getUrl() === 'http://54.95.18.112:8084/user/create'
                          }, 5000, 'expected text to be different after 5s');

            //値の入力
            browser.setValue(user_name.selecter, user_name.value);
            browser.click('//select[@name="authority"]/option[@value="User"]');
            browser.click('//select[@name="section"]/option[@value="1"]');
            browser.click('//select[@name="post"]/option[@value="1"]');
            browser.setValue(mail.selecter, mail.value);
            browser.setValue(password.selecter, password.value);

            //入力完了後、登録
            browser.click('button[type="submit"]').pause(1000);
            browser.waitUntil(function () {
                return browser.getUrl() === 'http://54.95.18.112:8084/user'
                }, 5000, 'expected text to be different after 5s');
        })
        it('ユーザ名が表示されること', () => {
            var user_name_confirm = browser.getText('//table/tbody/tr[1]/td[1]');
            expect(user_name_confirm).toEqual(user_name.value);
        })
        it('所属が表示されること', () => {
            var section_confirm = browser.getText('//table/tbody/tr[1]/td[2]');
            expect(section_confirm).toEqual("JK顧問ﾈｯﾄﾜｰｸ1ﾁｰﾑ");
        })
        it('役職が表示されること', () => {
            var post_confirm = browser.getText('//table/tbody/tr[1]/td[3]');
            expect(post_confirm).toEqual("メンバー");
        })
        it('メールアドレスが表示されること', () => {
            var mail_confirm = browser.getText('//table/tbody/tr[1]/td[4]');
            expect(mail_confirm).toEqual(mail.value);
        })
    })
    //異常系（必須）
    describe('ユーザ登録_異常系_必須', () => {
      it('入力せずに送信', () => {
          //ユーザ一覧画面に遷移
          browser.url('http://54.95.18.112:8084/user');
          browser.click('//button[text() = "登録"]');
          browser.waitUntil(function () {
                          return browser.getUrl() === 'http://54.95.18.112:8084/user/create'
                        }, 5000, 'expected text to be different after 5s');

          //入力完了後、登録
          browser.click('button[type="submit"]').pause(1000);
      })
      var path = '//div[@class="container"]/div/div/form/div/'
      it('ユーザ名のエラーメッセージ（必須）が表示されること', () => {
          var user_name_error = browser.getText(path + 'div[1]/div/span/strong');
          expect(user_name_error).toEqual("ユーザ名は必須です。");
      })
      it('権限のエラーメッセージ（必須）が表示されること', () => {
          var authority_error = browser.getText(path + 'div[2]/div/span/strong');
          expect(authority_error).toEqual("権限は必須です。");
      })
      it('所属のエラーメッセージ（必須）が表示されること', () => {
          var section_error = browser.getText(path + 'div[3]/div/span/strong');
          expect(section_error).toEqual("所属は必須です。");
      })
      it('役職のエラーメッセージ（必須）が表示されること', () => {
          var post_error = browser.getText(path + 'div[4]/div/span/strong');
          expect(post_error).toEqual("役職は必須です。");
      })
      it('メールアドレスのエラーメッセージ（必須）が表示されること', () => {
          var mail_error = browser.getText(path + 'div[5]/div/span/strong');
          expect(mail_error).toEqual("メールは必須です。");
      })
      it('パスワードのエラーメッセージ（必須）が表示されること', () => {
          var password_error = browser.getText(path + 'div[6]/div/span/strong');
          expect(password_error).toEqual("パスワードは必須です。");
      })
    })
    //異常系（型）
    describe('ユーザ登録_異常系_型', () => {
      //入力する場所と値を指定
      var user_name = {
        selecter: '//input[@name="user_name"][last()]',
        value: '自動テスト君'
      };
      var mail = {
          selecter: '//input[@name="mail"]',
          value: '自動テスト'
      };
      var password = {
          selecter: '//input[@name="password"]',
          value: '自動テスト'
      };
      it('想定される型と異なった型で送信', () => {
          //ユーザ一覧画面に遷移
          browser.url('http://54.95.18.112:8084/user');
          browser.click('//button[text() = "登録"]');
          browser.waitUntil(function () {
                          return browser.getUrl() === 'http://54.95.18.112:8084/user/create'
                        }, 5000, 'expected text to be different after 5s');
          //値の入力
          browser.setValue(user_name.selecter, user_name.value);
          browser.click('//select[@name="authority"]/option[@value="User"]');
          browser.click('//select[@name="section"]/option[@value="1"]');
          browser.click('//select[@name="post"]/option[@value="1"]');
          browser.setValue(mail.selecter, mail.value);
          browser.setValue(password.selecter, password.value);
          //入力完了後、登録
          browser.click('button[type="submit"]').pause(1000);
      })
      var path = '//div[@class="container"]/div/div/form/div/'
      it('メールアドレスのエラーメッセージ（型）が表示されること', () => {
          var mail_error = browser.getText(path + 'div[5]/div/span/strong');
          expect(mail_error).toEqual("メールを正しいメールアドレスにしてください。");
      })
      it('パスワードのエラーメッセージ（型）が表示されること', () => {
          var password_error = browser.getText(path + 'div[6]/div/span/strong');
          expect(password_error).toEqual("パスワードの書式が正しくありません。");
      })
    })
    //異常系（文字数）
    describe('ユーザ登録_異常系_文字数', () => {
      //入力する場所と値を指定
      var user_name = { // 21文字
        selecter: '//input[@name="user_name"][last()]',
        value: ' テストテストテストテストテストテストテスト'
      };
      var mail = { // 256文字
          selecter: '//input[@name="mail"]',
          value: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv'
      };
      var password = { // 256文字
          selecter: '//input[@name="password"]',
          value: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv'
      };
      it('想定される文字数を超えて送信', () => {
          //ユーザ一覧画面に遷移
          browser.url('http://54.95.18.112:8084/user');
          browser.click('//button[text() = "登録"]');
          browser.waitUntil(function () {
                          return browser.getUrl() === 'http://54.95.18.112:8084/user/create'
                        }, 5000, 'expected text to be different after 5s');
          //値の入力
          browser.setValue(user_name.selecter, user_name.value);
          browser.click('//select[@name="authority"]/option[@value="User"]');
          browser.click('//select[@name="section"]/option[@value="1"]');
          browser.click('//select[@name="post"]/option[@value="1"]');
          browser.setValue(mail.selecter, mail.value);
          browser.setValue(password.selecter, password.value);
          //入力完了後、登録
          browser.click('button[type="submit"]').pause(1000);
      })
      var path = '//div[@class="container"]/div/div/form/div/'
      it('ユーザ名のエラーメッセージ（文字数）が表示されること', () => {
          var user_name_error = browser.getText(path + 'div[1]/div/span/strong');
          expect(user_name_error).toEqual("ユーザ名は20文字以下にしてください。");
      })
      it('メールアドレスのエラーメッセージ（文字数）が表示されること', () => {
          var mail_error = browser.getText(path + 'div[5]/div/span/strong');
          expect(mail_error).toEqual("メールは255文字以下にしてください。");
      })
      it('パスワードのエラーメッセージ（文字数）が表示されること', () => {
          var password_error = browser.getText(path + 'div[6]/div/span/strong');
          expect(password_error).toEqual("パスワードは255文字以下にしてください。");
      })
    })
});    