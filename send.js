document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector('form.dr-form');

    function getFormElements(form) {
        const firstNameField = form.querySelector('.form__input.first-name');
        const lastNameField = form.querySelector('.form__input.last-name');
        const emailField = form.querySelector('.form__input.email');
        const phoneField = form.querySelector('.form__input.phone');
        const areaCodeField = form.querySelector('.form__input.area_code');

        return {
            firstNameField,
            lastNameField,
            emailField,
            phoneField,
            areaCodeField
        };
    }

    function sendLeadData(event, form, formElements) {
        event.preventDefault();
        const firstName = formElements.firstNameField.value;
        const lastName = formElements.lastNameField.value;
        const email = formElements.emailField.value;
        const phone = formElements.phoneField.value;
        // const areaCodeField = formElements.areaCodeField.value;
        const countryCode = '420';
        const fullNumber = `${countryCode}${phone}`;

        const data = {
            ApiKey: 'TnpFNE5GODFNVEJmTnpFNE5GOD0=',
            ApiPassword: 'GB46de0HCN',
            CampaignID: '10895',
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: fullNumber,
            Page: 'immediate-connect.app',
        };


        const apiUrl = 'https://tracker.pablo.partners/repost.php?act=register';

        function encodeFormData(data) {
            return Object.keys(data)
                .map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                })
                .join('&')
        }

        fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodeFormData(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Lead data sent successfully!');

                    return response.json();
                } else {
                    throw new Error('Failed to send lead data');
                }
            })
            .then(responseJson => {
                if (responseJson.ret_code !== '404') {
                    // window.location.href = 'thank-you.html';
                    // const redirectUrl = responseJson.url;
                    // window.location.href = redirectUrl;

                    localStorage.setItem('responseJson', JSON.stringify(responseJson));
                    window.location.href = 'thank-you.html';

                    new Promise(resolve => setTimeout(resolve, 1000))
                        .then(() => {
                            const redirectUrl = responseJson.url;
                            window.location.href = redirectUrl;
                        });
                } else {
                    console.log('Problem with redirect.');
                }
            })
            .catch(error => {
                console.error('An error occurred:', error.message);
            });
    }

    const formElements = getFormElements(form);

    const submitBtn = document.querySelector('.main-form-btn');
    submitBtn.addEventListener('click', (event) => {
        console.log('click');
        event.preventDefault();

        let isValid;
        ////////////////////////////
        const validForm = () => {
            const firstName = formElements.firstNameField.value;
            const lastName = formElements.lastNameField.value;
            const email = formElements.emailField.value;
            const phone = formElements.phoneField.value;

            const firstNameError = document.querySelector('.error.f-name');
            const lastNameError = document.querySelector('.error.l-name');
            const emailError = document.querySelector('.error.email');
            const phoneError = document.querySelector('.error.tel');

            const isNotEmpty = (value) => value.trim() !== '';
            const isMinLength = (value, minLength) => value.length >= minLength;
            const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            const isPhoneValid = (phone) => /^\d+$/.test(phone);

            const isValidFirstName = isNotEmpty(firstName) && isMinLength(firstName, 2);
            const isValidLastName = isNotEmpty(lastName) && isMinLength(lastName, 2);
            const isValidEmail = isNotEmpty(email) && isEmailValid(email);
            const isValidPhone = isNotEmpty(phone) && isPhoneValid(phone);

            if (!isValidFirstName) {
                firstNameError.style.display = 'block'
            }

            if (!isValidLastName) {
                lastNameError.style.display = 'block'
            }

            if (!isValidEmail) {
                emailError.style.display = 'block'
            }

            if (!isValidPhone) {
                phoneError.style.display = 'block';
            }


            isValid = isValidFirstName && isValidLastName && isValidEmail && isValidPhone;
            return isValid;
        };
        validForm();
        ////////////////////////////

        if (isValid) {
            document.querySelector(".loader-sub").style.display = "flex";
            const countdownElement = document.getElementById('countdown');
            let seconds = 2;

            // Disable back button
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = function () {
                window.history.pushState(null, null, window.location.href);
            };

            const updateCountdown = () => {
                countdownElement.textContent = seconds;
                if (seconds === 0) {
                    document.getElementById('loader-sub').style.display = 'none';
                    // Re-enable back button
                    window.onpopstate = null;
                } else {
                    seconds--;
                    setTimeout(updateCountdown, 1000);
                }
            };

            setTimeout(updateCountdown, 1000);


            event.preventDefault();
            sendLeadData(event, form, formElements);
        }
    });


    // form.addEventListener('submit', (event) => {
    //     document.querySelector(".loader-sub").style.display = "flex";
    //     const countdownElement = document.getElementById('countdown');
    //     let seconds = 3;
    //
    //     const updateCountdown = () => {
    //         countdownElement.textContent = seconds;
    //         if (seconds === 0) {
    //             document.getElementById('loader-sub').style.display = 'none';
    //         } else {
    //             seconds--;
    //             setTimeout(updateCountdown, 1000);
    //         }
    //     };
    //
    //     setTimeout(updateCountdown, 1000);
    //     console.log('click');
    //     event.preventDefault();
    //
    //     sendLeadData(event, form, formElements);
    // });

});


