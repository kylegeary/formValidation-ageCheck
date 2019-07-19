const ageCheck = (options) => {

	const defaults = {
		message: 'You must be of age to proceed.',
		messageAttr: 'data-validation-agecheck-message',
		events: [
			'focusout',
			'submit'
		],
		minAge: 0
	};

	function getMinAge(el) {
		const minAge = parseInt(el.getAttribute('data-agecheck-min-age'));
		if (!isNaN(minAge) && minAge >= 0) {
			return minAge;
		}
		return settings.minAge;
	}
	function parseDate(birthDate) {
		const dob = birthDate.replace(/\D/g, '');
		const birthDay = dob.substring(2, 4);
		const birthMonth = dob.substring(0, 2);
		const birthYear = dob.substring(4, 8);

		return new Date(birthYear, birthMonth - 1, birthDay);
	}

	function isOfAge(birthDate, minAge) {
		const birthDay = birthDate.getDate();
		const birthMonth = birthDate.getMonth();
		const birthYear = birthDate.getFullYear();

		const currentDate = new Date();
		const currentDay = currentDate.getDate();
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();

		return (currentYear - birthYear > minAge) ||
			(currentYear - birthYear === minAge && currentMonth - birthMonth > 0) ||
			(currentYear - birthYear === minAge && currentMonth - birthMonth === 0 && currentDay >= birthDay);
	}

	const settings = Object.assign({}, defaults, options);

	function getSettings() {
		return settings;
	}

	function isRelevant(field) {
		return field.fieldEl.hasAttribute('data-agecheck');
	}

	function validate(field) {
		return new Promise(function (resolve, reject) {
			if (field.inputEls) {
				resolve({
					valid: field.inputEls.some(el => {
						const birthDate = parseDate(el.value);
						return isOfAge(birthDate, getMinAge(field.fieldEl));
					})
				});
			} else {
				reject('ageCheck: No inputs set.');
			}
		});
	}

	function postprocessMessage(msg) {
		if (settings.postprocessMessage && typeof settings.postprocessMessage === 'function') {
			return settings.postprocessMessage(msg);
		}
		return msg;
	}

	return {
		settings: getSettings(),
		isRelevant: isRelevant,
		validate: validate,
		postprocessMessage: postprocessMessage
	};

};

export default ageCheck;