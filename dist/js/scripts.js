"use strict";

(function () {
  var parent = document.querySelector(".m-info");
  if (!parent) return;
  var items = parent.querySelectorAll(".m-info__item");
  if (!items.length) return;
  var mInfoSubWrap = parent.querySelectorAll(".m-info__inner");
  if (!mInfoSubWrap.length) return;
  var showBlock = parent.querySelector(".m-info__inner--manager");
  var itemObj = {};
  var btnShowListIndex = null;
  var targetItem = null;
  items.forEach(function (item) {
    item.addEventListener("click", function () {
      removeClassForTargetItemElem();
      targetItem = this;
      targetItem.classList.add("active");
      var name = item.querySelector(".hide-block__name");
      var textQr = item.querySelector(".hide-block__text-qr");
      var email = item.querySelector(".hide-block__email");
      var qr = item.querySelector(".hide-block__qr img");
      var phones = item.querySelectorAll(".hide-block__phone");
      name ? itemObj.name = name.innerHTML : itemObj.textQr = "";
      email ? itemObj.email = email.innerHTML : itemObj.email = "";
      textQr ? itemObj.textQr = textQr.innerHTML : itemObj.textQr = "";
      if (qr) itemObj.qr = qr.src;
      var phonesArr = [];
      phones.forEach(function (phone) {
        phonesArr.push(phone.innerHTML);
      });
      itemObj.phones = phonesArr;
      showData(itemObj);
    });
  });

  function showData(obj) {
    if (!checkClassShowBox()) {
      showBlock.classList.add("active");
    }

    var name = showBlock.querySelector(".manager__name");
    var email = showBlock.querySelector(".manager__email-wrap");
    var qr = showBlock.querySelector(".manager__qr img");
    var textQr = showBlock.querySelector(".manager__desc--qr");
    var phonesWrap = showBlock.querySelector(".manager__phones-wrap");
    if (name) name.innerHTML = obj.name;
    if (email) email.innerHTML = obj.email;
    if (textQr) textQr.innerHTML = obj.textQr;
    if (qr) qr.src = obj.qr;
    phonesWrap.innerHTML = "";
    email.innerHTML = "";
    email.insertAdjacentHTML("beforeend", "<a href=\"mailto:".concat(obj.email, "\" class=\"manager__link\">").concat(obj.email, "</a>"));
    obj.phones.forEach(function (phone) {
      phonesWrap.insertAdjacentHTML("beforeend", "<a href=\"tel:+".concat(phone.replace(/\D/g, ""), "\" class=\"manager__link\">").concat(phone, "</a>"));
    });
  }

  mInfoSubWrap.forEach(function (el, index) {
    var btn = el.querySelector(".m-info__btn-show-list");
    btn.addEventListener("click", function () {
      if (index == 0) {
        showBlock.classList.add("order");
      } else {
        showBlock.classList.remove("order");
      }

      removeClassForTargetItemElem();
      showBlock.classList.remove("active");

      if (index != btnShowListIndex) {
        resetWrappers(mInfoSubWrap);
      }

      btnShowListIndex = index;
      el.classList.toggle("active");
    });
  });

  function resetWrappers(arr) {
    arr.forEach(function (el) {
      if (el.classList.contains("active")) el.classList.remove("active");
    });
  }

  function removeClassForTargetItemElem() {
    if (targetItem !== null && targetItem.classList.contains("active")) targetItem.classList.remove("active");
  }

  function checkClassShowBox() {
    if (showBlock.classList.contains("active")) {
      return true;
    }

    return false;
  }
})();