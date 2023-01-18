(function () {
    const parent = document.querySelector(".m-info");
    if (!parent) return;

    const items = parent.querySelectorAll(".m-info__item");
    if (!items.length) return;

    const showBlock = parent.querySelector(".m-info__inner--manager-info");

    const itemObj = {};
    let btnShowListIndex = null;
    let targetItem = null;

    items.forEach((item) => {
        item.addEventListener("click", function () {
            removeClassForTargetItemElem();
            targetItem = this;
            targetItem.classList.add("active");

            const name = item.querySelector(".hide-block__name").innerHTML;
            const email = item.querySelector(".hide-block__email").innerHTML;
            const qr = item.querySelector(".hide-block__qr img").src;
            const phones = item.querySelectorAll(".hide-block__phone");

            itemObj.name = name;
            itemObj.email = email;
            itemObj.qr = qr;

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
        const phonesWrap = showBlock.querySelector(".manager__phones-wrap");

        name.innerHTML = obj.name;
        email.innerHTML = obj.email;
        qr.src = obj.qr;

        phonesWrap.innerHTML = "";
        email.innerHTML = "";

        email.insertAdjacentHTML("beforeend", `<a href="mailto:${obj.email}" class="manager__link">${obj.email}</a>`);

        obj.phones.forEach((phone) => {
            phonesWrap.insertAdjacentHTML("beforeend", `<a href="tel:+${phone.replace(/\D/g, "")}" class="manager__link">${phone}</a>`);
        });
    }

    const mInfoSubWrap = parent.querySelectorAll(".m-info__sub-wrap");
    if (!mInfoSubWrap.length) return;

    mInfoSubWrap.forEach((el, index) => {
        const btn = el.querySelector(".m-info__btn-show-list");

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
        arr.forEach((el) => {
            if (el.classList.contains("active")) el.classList.remove("active");
        });
    }

    function removeClassForTargetItemElem() {
        if (targetItem !== null && targetItem.classList.contains("active")) targetItem.classList.remove("active");
    }

    const checkClassShowBox = function () {
        if (showBlock.classList.contains("active")) {
            return true;
        }
        return false;
    };
})();
