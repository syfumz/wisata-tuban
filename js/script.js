$(function () {

    // Fungsi potong otomatis
    function makeShort(text, max = 80) {
        if (text.length <= max) return text;
        return text.substring(0, max) + "...";
    }

    // Klik pin → tampilkan popup kecil
    $(document).on("click", ".pin", function (e) {
        e.stopPropagation();

        $(".pin-card").remove();

        const pin = $(this);
        const id = pin.data("id") || Math.random().toString(36).substr(2, 9);
        pin.attr("data-id", id);

        const fullInfo = pin.data("info") || "";
        const shortInfo = makeShort(fullInfo, 70);

        const small = $(`
            <div class="pin-card">
                <h4>${pin.data("title")}</h4>
                <p>${shortInfo}</p>
                <a href="#" class="see-more" data-id="${id}">See more</a>
            </div>
        `);

        pin.append(small);
        small.fadeIn(150);
    });

    // klik luar → tutup popup kecil
    $(document).on("click", function () {
        $(".pin-card").remove();
    });

    // SEE MORE → buka sidebar detail
    $(document).on("click", ".see-more", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const id = $(this).data("id");
        const pin = $(`.pin[data-id="${id}"]`);

        const fullInfo = pin.data("info") || "";

        openDetailCard({
            title: pin.data("title"),
            info: fullInfo, // versi lengkap
            location: pin.data("location"),
            type: pin.data("type"),
            img: pin.data("img")
        });
    });

});

$("#about-btn").on("click", function () {
    $("#about-card").addClass("show");
    $("#about-overlay").addClass("show");
});

$("#about-close, #about-overlay").on("click", function () {
    $("#about-card").removeClass("show");
    $("#about-overlay").removeClass("show");
});
