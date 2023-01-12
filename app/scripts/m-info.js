(function () {
    const parent = document.querySelector(".m-info");
    if (!parent) return;

    const items = parent.querySelectorAll(".m-info__item");
    if (!items.length) return;

    const showBlock = parent.querySelector(".m-info__inner--manager-info");

    const itemObj = {};

    items.forEach((item) => {
        item.addEventListener("click", function () {
            this.classList.toggle("active");

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
        if (!showBlock.classList.contains("active")) {
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

        email.insertAdjacentHTML("beforeend",
        `<a href="mailto:${obj.email}" class="manager__link">${obj.email}</a>`);

        obj.phones.forEach((phone) => {
            phonesWrap.insertAdjacentHTML("beforeend", `<a href="tel:${phone.replace(/\D/g, "")}" class="manager__link">${phone}</a>`);
        });
    }
})();
