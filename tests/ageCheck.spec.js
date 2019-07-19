import ageCheck from '../src/ageCheck';

describe('Form Validation: ageChecker', () => {
    describe('settings', () => {
        it ('should have default message', () => {
            const expectedVal = 'You must be of age to proceed.';
            const reqInst = ageCheck();
            const settings = reqInst.settings;

            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('message');
            expect(settings.message).toEqual(expectedVal);
		});

		it('should have default messageAttr', () => {
            const expectedVal = 'data-validation-agecheck-message';
            const ageCheckInst = ageCheck();
            const settings = ageCheckInst.settings;

            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('messageAttr');
            expect(settings.messageAttr).toEqual(expectedVal);
		});

		it('should have default events', () => {
            const ageCheckInst = ageCheck();
            const settings = ageCheckInst.settings;

            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('events');
            expect(settings.events).toHaveLength(2);
            expect(settings.events).toContain('focusout');
            expect(settings.events).toContain('submit');
        });

		it('should have default minAge', () => {
			const expectedVal = 0;
            const ageCheckInst = ageCheck();
            const settings = ageCheckInst.settings;

            expect(settings).toBeDefined();
            expect(settings).toHaveProperty('minAge');
            expect(settings.minAge).toEqual(expectedVal);
		});

		 it('should overwrite defaults, if values passed in', () => {
            const newSettings = {
				minAge: 1,
				message: 'You must be of age to continue'
            };
            const expectedVal = {
				message: 'You must be of age to continue',
				messageAttr: 'data-validation-agecheck-message',
				events: [
					'focusout',
					'submit'
				],
				minAge: 1
            };

            const ageCheckInst = ageCheck(newSettings);
            expect(ageCheckInst.settings).toEqual(expectedVal);
        });
	});
})