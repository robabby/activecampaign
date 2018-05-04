import Controller from '@ember/controller';
import { computed } from "@ember/object";

export default Controller.extend({
  campaignGoal: 5000,
  donation: 0,
  donationTotal: 0,
  totalDonors: 0,
  errorMessage: '',
  remainingAmount: computed('donationTotal', function() {
    return this.get('campaignGoal') - this.get('donationTotal');
  }),
  campaignPercent: computed('donationTotal', function() {
    return Math.ceil(this.get('donationTotal') / this.get('campaignGoal') * 100);
  }),
  actions: {
    addDonation(donation) {
      let newDonation = parseInt(donation);

      if (newDonation === 0) {
        this.set('errorMessage', 'You need to enter an amount!');
      } else if (newDonation % 5 === 0) {
        let donationTotal = this.get('donationTotal');
        let newDonor = this.get('totalDonors');
        let newTotal = donationTotal + newDonation;
        this.set('donationTotal', newTotal);
        this.set('totalDonors', newDonor + 1);
        this.set('donation', 0);
        this.set('errorMessage', '');
      } else {
        this.set('errorMessage', 'Donations must be in increments of $5');
        this.set('donation', 0);
      }
    }
  }
});
