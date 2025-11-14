import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');

form.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();
  const delay = +form.elements.delay.value;
  const isSuccess = form.elements.state.value === 'fulfilled' ? true : false;
  createPromise(isSuccess, delay);
  form.reset();
}

function createPromise(isSuccess, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      isSuccess ? resolve(delay) : reject(delay);
    }, delay);
  });
  promise
    .then(value => showFullfilledMessage(value))
    .catch(error => showRejectedMessage(error));
}

function showFullfilledMessage(delay) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
    messageColor: '#FFFFFF',
    backgroundColor: '#59A10D',
  });
}
function showRejectedMessage(delay) {
  iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
    messageColor: '#FFFFFF',
    backgroundColor: '#EF4040',
  });
}
