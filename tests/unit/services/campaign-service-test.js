import { moduleFor, test } from 'ember-qunit';

moduleFor('service:campaign-service', 'Unit | Service | campaignService', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it sets an error message when the donation value is not divisible by 5', function(assert) {
  let errorMessage = 'Donations must be in increments of $5';
  let service = this.subject();

  service.addDonation(2);

  assert.equal(service.get('errorMessage'), errorMessage);
});

test('it sets an error message when the donation value is $0', function(assert) {
  let errorMessage = 'You need to enter an amount!';
  let service = this.subject();

  service.addDonation(0);

  assert.equal(service.get('errorMessage'), errorMessage);
});

test('it sets an error message when there\'s a donation after the campaign has met it\'s goal', function(assert) {
  let errorMessage = 'This campaign has already met it\'s goal!';
  let service = this.subject();

  service.set('remainingAmount', 0);
  service.addDonation(5);

  assert.equal(service.get('errorMessage'), errorMessage);
});

test('the remaining amount changes after a new donation', function(assert) {
  let service = this.subject();

  assert.equal(service.get('remainingAmount'), 5000);

  service.addDonation(5);

  assert.equal(service.get('remainingAmount'), 4995);
});

test('the campaign becomes complete when it meets it\'s goal', function(assert) {
  let service = this.subject();

  service.set('remainingAmount', 0);

  assert.equal(service.get('isComplete'), true);
});

test('the campaign tracks each new donor', function(assert) {
  let service = this.subject();

  assert.equal(service.get('totalDonors'), 0);

  service.addDonation(5);
  service.addDonation(5);

  assert.equal(service.get('totalDonors'), 2);
});

test('the campaign tracks the total amount donated', function(assert) {
  let service = this.subject();

  assert.equal(service.get('totalDonations'), 0);

  service.addDonation(5);
  service.addDonation(5);

  assert.equal(service.get('totalDonations'), 10);
});
