export const bootProcess = (form, isBooting) => {
  const btn = form.querySelector(".popup__button");
  btn.textContent = isBooting
    ? (btn.textContent = "Сохранение...")
    : (btn.textContent = "Сохранить");
};
