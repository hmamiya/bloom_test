const webdriverio = require('webdriverio');

// var driver = new webdriver.Builder()
//   .forBrowser('chrome')
//   .usingServer('http://localhost')  // ← この行 ※ localhost という記述のままでよい
//   .build();

// describe('bloomの入力テスト', () => {
//     var originalTimeout;
//   beforeEach(function() {
//     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//     // 20秒まで延ばす
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
//   });
//   it('ログインテスト', () => {
//     // browser.windowHandleFullscreen();
//     browser.url('http://54.95.18.112:8084/login');
//     browser.setValue('#email', 'dbuser');
//     browser.setValue('#password', 'dbpassword');
//     browser.click('//button[@class="btn btn-indigo waves-effect waves-light"]');
// });
// });

function beforeEach() {
    let originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    // 20秒まで延ばす
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    browser.windowHandleFullscreen();
}
exports.beforeEach = beforeEach;

function login() {
    browser.url('http://54.95.18.112:8084/login');
    browser.setValue('#email', 'dbuser');
    browser.setValue('#password', 'dbpassword');
    browser.click('//button[@class="btn btn-indigo waves-effect waves-light"]');
}
exports.login = login;