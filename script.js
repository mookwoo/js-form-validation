document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');
  const errorSummary = document.getElementById('error-summary');
  const errorList = document.getElementById('error-list');
  const passwordStrength = document.getElementById('password-strength');
  const successModal = document.getElementById('success-modal');
  const closeModal = document.getElementById('close-modal');

  // Real-time validation on input
  form.addEventListener('input', (e) => {
      validateInput(e.target);
  });

  // Form submission event
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm()) {
          showSuccessModal();
      }
  });

  // Close the success modal
  closeModal.addEventListener('click', () => {
      successModal.hidden = true;
  });

  // Validate each input field based on its type
  function validateInput(input) {
      const value = input.value.trim();
      let isValid = true;
      let errorMessage = '';

      switch (input.id) {
          case 'username':
              isValid = value.length >= 3;
              errorMessage = isValid ? '' : 'Username must be at least 3 characters long.';
              break;
          case 'email':
              isValid = /\S+@\S+\.\S+/.test(value);
              errorMessage = isValid ? '' : 'Email is not valid.';
              break;
          case 'password':
              isValid = value.length >= 6;
              updatePasswordStrength(value);
              errorMessage = isValid ? '' : 'Password must be at least 6 characters long.';
              break;
          case 'password2':
              isValid = value === password.value;
              errorMessage = isValid ? '' : 'Passwords do not match.';
              break;
      }

      updateUI(input, isValid, errorMessage);
  }

  // Update the UI with visual feedback
  function updateUI(input, isValid, errorMessage) {
      const formControl = input.parentElement;
      const small = formControl.querySelector('small');
      const iconSuccess = formControl.querySelector('.fa-circle-check');
      const iconError = formControl.querySelector('.fa-circle-exclamation');

      if (isValid) {
          formControl.classList.remove('error');
          formControl.classList.add('success');
          small.style.visibility = 'hidden';
          iconSuccess.style.visibility = 'visible';
          iconError.style.visibility = 'hidden';
      } else {
          formControl.classList.remove('success');
          formControl.classList.add('error');
          small.textContent = errorMessage;
          small.style.visibility = 'visible';
          iconError.style.visibility = 'visible';
          iconSuccess.style.visibility = 'hidden';
      }
  }

  // Update the password strength meter based on the password length
  function updatePasswordStrength(password) {
      const length = password.length;
      passwordStrength.style.width = `${Math.min(length * 10, 100)}%`;
  }

  // Validate the form before submission
  function validateForm() {
      const inputs = [username, email, password, password2];
      let formIsValid = true;
      errorList.innerHTML = '';

      inputs.forEach(input => {
          const isValid = input.parentElement.classList.contains('success');
          if (!isValid) {
              const errorMessage = input.nextElementSibling.nextElementSibling.textContent;
              errorList.innerHTML += `<li>${errorMessage}</li>`;
              formIsValid = false;
          }
      });

      errorSummary.hidden = formIsValid;
      return formIsValid;
  }

  // Display the success modal upon form submission
  function showSuccessModal() {
      successModal.hidden = false;
  }
});
