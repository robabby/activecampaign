import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  campaignService: service(),
  classNames: ['donate-box'],
  classNameBindings: ['isComplete:is-complete'],

  campaignGoal: alias('campaignService.campaignGoal'),
  donation: alias('campaignService.donation'),
  totalDonations: alias('campaignService.totalDonations'),
  totalDonors: alias('campaignService.totalDonors'),
  errorMessage: alias('campaignService.errorMessage'),
  isComplete: alias('campaignService.isComplete'),
  remainingAmount: alias('campaignService.remainingAmount'),
  campaignPercent: alias('campaignService.campaignPercent'),

  buttonText: computed('campaignService.remainingAmount', function() {
    return this.get('campaignService.isComplete') ? 'All Done' : 'Give Now';
  }),

  didRender() {
    this.$('.donate-box__input').focus();
  },
  actions: {
    newDonation(donation) {
      this.get('campaignService').addDonation(donation);
    }
  }
});
