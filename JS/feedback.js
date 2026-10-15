function openFeedbackModal(teaName) {
    const selectedTeaEl = document.getElementById('selected-tea');
    const modalEl = document.getElementById('feedback-modal');
    if (selectedTeaEl) selectedTeaEl.textContent = teaName;
    if (modalEl) modalEl.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    emailjs.init({
        publicKey: 'iEGYNnR7a1w8dFjRm'
    });
});

function closeFeedbackModal() {
    const modalEl = document.getElementById('feedback-modal');
    if (modalEl) modalEl.style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('feedback-modal');
    if (event.target === modal) {
        closeFeedbackModal();
    }
};

function submitFeedback(e) {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const teaEl = document.getElementById('selected-tea');
    const tea = teaEl ? teaEl.textContent.trim() : '';

    if (!name || !phone) {
        alert('Пожалуйста, заполните имя и телефон');
        return;
    }

    // Передаём только переменные для шаблона
    emailjs.send('service_zg6wdio', 'template_vad56l9', {
        name: name,
        phone: phone,
        tea: tea
    })
        .then(() => {
            alert('Спасибо! Мы свяжемся с вами.');
            closeFeedbackModal();
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
        })
        .catch((err) => {
            console.error('Ошибка отправки:', err);
            alert('Не удалось отправить заявку. Попробуйте позже.');
        });
}
