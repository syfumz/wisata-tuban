/* === OPEN SIDEBAR === */
$("#filter-toggle").on("click", function () {
    $("#filter-sidebar").addClass("open");
});

/* === CLOSE SIDEBAR === */
$("#filter-close").on("click", function () {
    $("#filter-sidebar").removeClass("open");
});

/* === SHOW / HIDE CATEGORY === */
function toggleCategory(type, show) {
    $("." + type + "-pin").toggle(show);

    // highlight tombol
    const container = $(`button[data-type="${type}"]`).closest(".actions");

    container.find("button").removeClass("active");

    if (show) {
        container.find(".show-btn").addClass("active");
    } else {
        container.find(".hide-btn").addClass("active");
    }
}

$(".show-btn").click(function () {
    toggleCategory($(this).data("type"), true);
});

$(".hide-btn").click(function () {
    toggleCategory($(this).data("type"), false);
});

// SEMBUNYIKAN SEMUA PIN SAAT AWAL WEBSITE DIBUKA
$(document).ready(function () {
    $(".pin").hide(); // semua pin disembunyikan

    // set tombol Hide jadi aktif (karena semua hidden)
    $(".actions").each(function () {
        $(this).find(".hide-btn").addClass("active");
    });
});
