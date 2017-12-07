// event-spec-login.js
describe('event creation e2e tests', function() {

  var testUsr = {
    username:'testusr',
    password:'superultramegachicken'
  }

    var eventName="Protractor Event"

    beforeAll(function() { //sign up
      browser.get('http://localhost:3000');
      browser.sleep(7000);
      element(by.css('[ng-click="$dismiss()"]')).click();
  	});

  	it('should be able to navigate to login', function() {
      element(by.css('[ui-sref="authentication.signin"]')).click();
      expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/authentication/signin");
  	});

  	it('should be able to login', function() {
      element(by.id('username')).sendKeys(testUsr.username);
      element(by.id('password')).sendKeys(testUsr.password);
      element(by.buttonText('Login')).click();
      expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/");
    });

  	it('should be able to navigate to create event page', function () {
      element(by.css('[href="/upcomingevents/create"]')).click();
      expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/upcomingevents/create");
  	});

  	it('should be able to create event', function () {
      element(by.id('name')).sendKeys(eventName);
      element(by.id('organization')).sendKeys("Protractor Organization");
      element(by.id('location')).sendKeys("Gainesville");
      element(by.css('[value="Parties"]')).click(); //dropdown menu (entries keyed by 'value')
      element(by.css('[value="White Tie"]')).click(); //dropdown menu (entries keyed by 'value')
      element(by.id('description')).sendKeys("Description"); //type text

      element(by.className('contact-submit-button ng-binding')).click();
      browser.sleep(5000);
  	});

  	it('should display correct event information on the redirect page', function () {
      expect(element(by.binding('vm.upcomingevent.name')).getText()).toBe(eventName);
  	});

    it('should be able to log out', function (){
      element(by.css('[ng-bind="authentication.user.displayName"]')).click();
      browser.sleep(5000)
      element(by.css('[href="/api/auth/signout"]')).click();
    });

});