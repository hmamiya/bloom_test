var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'safari'
    }
};
var By = webdriverio.By;

webdriverio
    .remote(options)
    .init()
    .url('http://localhost/formtest')
    .getTitle().then(function(title) {
        console.log('Title was: ' + title);
    })
    .setValue('input[name=text]', "test")
    .setValue('input[name=password]', "testpass")
    .setValue('textarea[name=textarea]', "test")
    .click('input[name=radio][value="選択肢2"]')
    .click('input[name=checkbox][value="選択肢1"]')
    .selectByValue('select[name=select]','選択肢2')
    .chooseFile('input[name=file]','/Users/harukamamiya/Desktop/hedgehog_20180305.jpeg')
    .click('input[name=submit]');
    // .end();
