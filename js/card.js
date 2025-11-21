/* ===========================================================
   card.js — Sidebar Detail Handler (modular)
   =========================================================== */

$(function(){

    // ==== OPEN CARD ====
    window.openDetailCard = function (data) {

        $("#card-title").text(data.title);
        $("#card-desc").text(data.info);
        $("#card-location").text("Lokasi: " + (data.location || "-"));
        $("#card-type").text("Tipe: " + (data.type || "-"));

        const imgContainer = $("#card-images");
        imgContainer.empty();

        if (data.img) {
            let images = [];

            if (typeof data.img === "string") {
                images = data.img.includes(",")
                    ? data.img.split(",").map(x => x.trim())
                    : [data.img.trim()];
            } else if (Array.isArray(data.img)) {
                images = data.img;
            }

            images.forEach(src => {
                imgContainer.append(`<img src="${src}" alt="Foto">`);
            });
        }

        $("#place-card").addClass("open");
        $("#card-overlay").addClass("show");
    };


    // ==== CLOSE CARD ====
    window.closeDetailCard = function () {
        $("#place-card").removeClass("open");
        $("#card-overlay").removeClass("show");
    };

    $("#card-close").on("click", closeDetailCard);
    $("#card-overlay").on("click", closeDetailCard);

    $(document).on("keydown", function (e) {
        if (e.key === "Escape") closeDetailCard();
    });

});
