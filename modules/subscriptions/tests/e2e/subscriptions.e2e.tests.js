// event-spec-login.js
describe('event creation e2e tests', function() {

  var testUsr = {
    username:'admin curtis',
    password:'adminultramegachicken'
  }

  var subscription = {
  	email: 'subscription@email.com'
  }

  	it('should be able to submit a subscription', function() {
	  browser.get('http://localhost:3000');
	  browser.sleep(7000);
	  element(by.model('email')).sendKeys(subscription.email);
	  element(by.css('[ng-click="submitted()"]')).click();
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

    it('should be able to navigate to pending subscriptions', function() {
    	element(by.css('[class="dropdown-toggle ng-binding ng-scope"]')).click();
    	element(by.css('[href="/admin/subscriptions"]')).click();
    	var listing = element.all(by.repeater('subscription in vm.subscriptions').column('subscription.email'));
    	expect(listing.last().getText()).toBe(subscription.email);
    });


    it('should be able to log out', function (){
      element(by.css('[ng-bind="authentication.user.displayName"]')).click();
      browser.sleep(5000)
      element(by.css('[href="/api/auth/signout"]')).click();
    });

});