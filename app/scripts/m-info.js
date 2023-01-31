(function () {
    const parent = document.querySelector(".m-info");
    if (!parent) return;

    const items = parent.querySelectorAll(".m-info__item");
    if (!items.length) return;

    const mInfoSubWrap = parent.querySelectorAll(".m-info__inner");
    if (!mInfoSubWrap.length) return;

    const showBlock = parent.querySelector(".m-info__inner--manager");

    const itemObj = {};
    let btnShowListIndex = null;
    let targetItem = null;

    items.forEach((item) => {
        item.addEventListener("click", function () {
            removeClassForTargetItemElem();
            targetItem = this;
            targetItem.classList.add("active");

            const name = item.querySelector(".hide-block__name");
            const textQr = item.querySelector(".hide-block__text-qr");
            const email = item.querySelector(".hide-block__email");
            const qr = item.querySelector(".hide-block__qr img");
            const phones = item.querySelectorAll(".hide-block__phone");

            name ? (itemObj.name = name.innerHTML) : (itemObj.textQr = "");
            email ? (itemObj.email = email.innerHTML) : (itemObj.email = "");
            textQr ? (itemObj.textQr = textQr.innerHTML) : (itemObj.textQr = "");
            if (qr) itemObj.qr = qr.src;

            const phonesArr = [];
            phones.forEach((phone) => {
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

        const name = showBlock.querySelector(".manager__name");
        const email = showBlock.querySelector(".manager__email-wrap");
        const qr = showBlock.querySelector(".manager__qr img");
        const textQr = showBlock.querySelector(".manager__desc--qr");
        const phonesWrap = showBlock.querySelector(".manager__phones-wrap");

        if (name) name.innerHTML = obj.name;
        if (email) email.innerHTML = obj.email;
        if (textQr) textQr.innerHTML = obj.textQr;
        if (qr) qr.src = obj.qr;

        phonesWrap.innerHTML = "";
        email.innerHTML = "";

        email.insertAdjacentHTML("beforeend", `<a href="mailto:${obj.email}" class="manager__link">${obj.email}</a>`);

        obj.phones.forEach((phone) => {
            phonesWrap.insertAdjacentHTML("beforeend", `<a href="tel:+${phone.replace(/\D/g, "")}" class="manager__link">${phone}</a>`);
        });
    }

    mInfoSubWrap.forEach((el, index) => {
        const btn = el.querySelector(".m-info__btn-show-list");

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
        arr.forEach((el) => {
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
