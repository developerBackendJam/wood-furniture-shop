

let isLoginMode = true;


function toggleAuthMode(event) {
  event.preventDefault();
  isLoginMode = !isLoginMode;

  const formTitle = document.getElementById('form-title');
  const formSubtitle = document.getElementById('form-subtitle');
  const nameField = document.getElementById('name-field');
  const submitBtn = document.getElementById('submit-btn');
  const toggleText = document.getElementById('toggle-text');
  const toggleBtn = document.getElementById('toggle-btn');
  const nameInput = document.getElementById('name');

  if (isLoginMode) {
    formTitle.textContent = 'Đăng Nhập';
    formSubtitle.textContent = 'Chào mừng bạn quay trở lại với An Mộc';
    nameField.classList.add('hidden');
    nameInput.required = false;
    submitBtn.textContent = 'Đăng Nhập';
    toggleText.textContent = 'Bạn chưa có tài khoản?';
    toggleBtn.textContent = 'Đăng ký ngay';
  } else {
    formTitle.textContent = 'Đăng Ký';
    formSubtitle.textContent = 'Tạo tài khoản mới để nhận nhiều ưu đãi.';
    nameField.classList.remove('hidden');
    nameInput.required = true;
    submitBtn.textContent = 'Đăng Ký';
    toggleText.textContent = 'Bạn đã có tài khoản?';
    toggleBtn.textContent = 'Đăng nhập';
  }
}

function handleAuthSubmit(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');


  if (!validateEmail(email)) {
    showError('Vui lòng nhập địa chỉ email hợp lệ.');
    return;
  }

  if (password.length < 6) {
    showError('Mật khẩu phải có ít nhất 6 ký tự.');
    return;
  }

  if (!isLoginMode) {
    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
      showError('Vui lòng nhập họ và tên hợp lệ.');
      return;
    }

    alert(`Đăng ký thành công tài khoản cho email: ${email}`);

    toggleAuthMode({ preventDefault: () => { } });
  } else {

    if (email === 'admin@stevejobvn.vn' && password === '123456') {
      alert('Đăng nhập thành công! Chào mừng admin.');
      window.location.href = 'index.html';
    } else {

      alert('Đăng nhập thành công!');
      window.location.href = 'index.html';
    }
  }
}

function showError(msg) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = msg;
  errorMessage.classList.remove('hidden');
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
