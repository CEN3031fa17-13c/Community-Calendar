// event-spec-login.js
describe('event creation e2e tests', function() {

    var eventName="Protractor Event 2"
    var username="curtis2"

    beforeAll(function() { //sign up
      browser.get('http://commcal.herokuapp.com');
      browser.sleep(5000);
      element(by.css('[ng-click="$dismiss()"]')).click();
  	});

  	it('should be able to navigate to login', function() {
      element(by.css('[ui-sref="authentication.signin"]')).click();
      expect(browser.getCurrentUrl()).toEqual("http://commcal.herokuapp.com/authentication/signin");
  	});

  	it('should be able to login', function() {
      //browser.sleep(5000);
      //element(by.css('[ng-click="$dismiss()"]')).click();
      element(by.id('username')).sendKeys(username);
      element(by.id('password')).sendKeys("superultramegachicken");
      element(by.buttonText('Login')).click();
      expect(browser.getCurrentUrl()).toEqual("http://commcal.herokuapp.com/");
    });

  	it('should be able to navigate to create event page', function () {
      element(by.css('[href="/upcomingevents/create"]')).click();
      expect(browser.getCurrentUrl()).toEqual("http://commcal.herokuapp.com/upcomingevents/create");
  	});

  	it('should be able to create event', function () {
      element(by.id('name')).sendKeys(eventName);
      element(by.id('organization')).sendKeys("Protractor Organization");
      element(by.id('location')).sendKeys("Gainesville");
      //element(by.id('startDate')).sendKeys(""); //type date
      //element(by.id('startTime')).sendKeys(""); //type time
      element(by.css('[value="White Tie"]')).click(); //dropdown menu (entries keyed by 'value')
      element(by.css('[value="Parties"]')).click(); //dropdown menu (entries keyed by 'value')
      element(by.id('description')).sendKeys("Description"); //type text
      element(by.id('fileuploader')).sendKeys("C:/Users/curti/OneDrive/Java/Pictures");
      // browser.sleep(20000);
      // element(by.css('[ng-click="item.upload()"]')).click();

      // // Need to unhide flowjs's secret file uploader
      // // browser.executeScript(
      // //   "arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px'; arguments[0].style.opacity = 1",
      // //   fileElem.getWebElement();
      // // );

      element(by.className('contact-submit-button ng-binding')).click();
      browser.sleep(5000);
  	});

  	it('should display correct event information on the redirect page', function () {
      expect(element(by.binding('vm.upcomingevent.name')).getText()).toBe(eventName);
  	});

});