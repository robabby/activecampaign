import Service from '@ember/service';
import { computed, get, set } from "@ember/object";

export default Service.extend({
  campaignGoal: 5000,
  donation: 5,
  totalDonations: 0,
  totalDonors: 0,
  errorMessage: '',
  isComplete: computed('remainingAmount', function() {
    return this.get('remainingAmount') === 0 ? true : false;
  }),
  remainingAmount: computed('totalDonations', function() {
    let remainingAmount = get(this, 'campaignGoal') - get(this, 'totalDonations');
    let displayTotal;
    if (remainingAmount <= 0) {
      displayTotal = 0;
    } else {
      displayTotal = remainingAmount;
    }
    return displayTotal;
  }),
  campaignPercent: computed('totalDonations', function() {
    return Math.ceil(get(this, 'totalDonations') / get(this, 'campaignGoal') * 100);
  }),
  addDonation(donation) {
    let newDonation = parseInt(donation);

    if (get(this, 'isComplete')) {
      set(this, 'errorMessage', 'This campaign has already met it\'s goal!');
    } else if (newDonation === 0) {
      set(this, 'errorMessage', 'You need to enter an amount!');
    } else if (newDonation % 5 === 0) {
      let totalDonations = get(this, 'totalDonations');
      let newDonor = get(this, 'totalDonors');
      let newTotal = totalDonations + newDonation;
      set(this, 'totalDonations', newTotal);
      set(this, 'totalDonors', newDonor + 1);
      set(this, 'donation', 5);
      set(this, 'errorMessage', '');
    } else {
      set(this, 'errorMessage', 'Donations must be in increments of $5');
      set(this, 'donation', 5);
    }
  }
});
