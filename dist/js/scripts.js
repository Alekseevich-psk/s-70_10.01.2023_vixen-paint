"use strict";

(function () {
  var parent = document.querySelector(".m-info");
  if (!parent) return;
  var items = parent.querySelectorAll(".m-info__item");
  if (!items.length) return;
  var showBlock = parent.querySelector(".m-info__inner--manager-info");
  var itemObj = {};
  var btnShowListIndex = null;
  var targetItem = null;
  items.forEach(function (item) {
    item.addEventListener("click", function () {
      removeClassForTargetItemElem();
      targetItem = this;
      targetItem.classList.add("active");
      var name = item.querySelector(".hide-block__name").innerHTML;
      var email = item.querySelector(".hide-block__email").innerHTML;
      var qr = item.querySelector(".hide-block__qr img").src;
      var phones = item.querySelectorAll(".hide-block__phone");
      itemObj.name = name;
      itemObj.email = email;
      itemObj.qr = qr;
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
    var phonesWrap = showBlock.querySelector(".manager__phones-wrap");
    name.innerHTML = obj.name;
    email.innerHTML = obj.email;
    qr.src = obj.qr;
    phonesWrap.innerHTML = "";
    email.innerHTML = "";
    email.insertAdjacentHTML("beforeend", "<a href=\"mailto:".concat(obj.email, "\" class=\"manager__link\">").concat(obj.email, "</a>"));
    obj.phones.forEach(function (phone) {
      phonesWrap.insertAdjacentHTML("beforeend", "<a href=\"tel:+".concat(phone.replace(/\D/g, ""), "\" class=\"manager__link\">").concat(phone, "</a>"));
    });
  }

  var mInfoSubWrap = parent.querySelectorAll(".m-info__sub-wrap");
  if (!mInfoSubWrap.length) return;
  mInfoSubWrap.forEach(function (el, index) {
    var btn = el.querySelector(".m-info__btn-show-list");
    btn.addEventListener("click", function () {
      if (index != btnShowListIndex) {
        resetWrappers(mInfoSubWrap);

        if (checkClassShowBox()) {
          removeClassForTargetItemElem();
          showBlock.classList.remove("active");
        }
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

  var checkClassShowBox = function checkClassShowBox() {
    if (showBlock.classList.contains("active")) {
      return true;
    }

    return false;
  };
})();