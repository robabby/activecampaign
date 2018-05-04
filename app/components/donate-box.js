import Component from '@ember/component';
import { computed, get, set } from "@ember/object";

export default Component.extend({
  classNames: ['donate-box'],
  classNameBindings: ['isComplete:is-complete'],
  campaignGoal: 5000,
  donation: 5,
  donationTotal: 0,
  totalDonors: 0,
  errorMessage: '',
  buttonText: computed('remainingAmount', function() {
    return this.get('isComplete') ? 'All Done' : 'Give Now';
  }),
  isComplete: computed('remainingAmount', function() {
    return this.get('remainingAmount') === 0 ? true : false;
  }),
  remainingAmount: computed('donationTotal', function() {
    let remainingAmount = get(this, 'campaignGoal') - get(this, 'donationTotal');
    let displayTotal;
    if (remainingAmount <= 0) {
      displayTotal = 0;
    } else {
      displayTotal = remainingAmount;
    }
    return displayTotal;
  }),
  campaignPercent: computed('donationTotal', function() {
    return Math.ceil(get(this, 'donationTotal') / get(this, 'campaignGoal') * 100);
  }),
  didRender() {
    this.$('.donate-box__input').focus();
  },
  actions: {
    addDonation(donation) {
      let newDonation = parseInt(donation);

      if (newDonation === 0) {
        set(this, 'errorMessage', 'You need to enter an amount!');
      } else if (newDonation % 5 === 0) {
        let donationTotal = get(this, 'donationTotal');
        let newDonor = get(this, 'totalDonors');
        let newTotal = donationTotal + newDonation;
        set(this, 'donationTotal', newTotal);
        set(this, 'totalDonors', newDonor + 1);
        set(this, 'donation', 5);
        set(this, 'errorMessage', '');
      } else {
        set(this, 'errorMessage', 'Donations must be in increments of $5');
        set(this, 'donation', 5);
      }
    }
  }
});
