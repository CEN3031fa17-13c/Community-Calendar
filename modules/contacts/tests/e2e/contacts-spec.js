// contact-spec.js
describe('contact e2e tests', function() {

	beforeEach(function() {
 	   browser.get('http://localhost:3000/contact');
     browser.sleep(5000);
     element(by.css('[ng-click="$dismiss()"]')).click();
  	});

  	it('should have a title', function() {
   		expect(browser.getTitle()).toBe('Community Calendar');
  	});

  	it('should have a contact form', function() {
      expect(element(by.className('contact-jumbotron')).isPresent()).toBe(true);
    });

  	it('should link to landing page', function () {
  		element(by.css('[ui-sref="home"]')).click();
  		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/");
  	});

  	it('should link to contacts', function () {
  		element(by.css('[href="/contact"]')).click();
  		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/contact");
  	});

  	it('should link to upcoming events', function () {
  		element(by.css('[href="/upcomingevents/list"]')).click();
  		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/upcomingevents/list");
  	});

  	it('should not link to create upcoming events', function () {
  		expect(element(by.css('[href="/upcomingevents/create"]')).isPresent()).toBe(false);
  	});

  	it('should link to about page', function () {
  		element(by.css('[href="/about"]')).click();
  		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/about");
  	});

});