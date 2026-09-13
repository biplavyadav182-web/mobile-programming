/* ============================================================
   Profile Card – jQuery interactions
   ============================================================ */

$(document).ready(function () {

    /* ----- 1. CHANGE CARD COLOR EACH TIME THE PAGE IS VISITED ----- */

    // Palette of pleasant backgrounds (light + a few darker options)
    const palette = [
        "#ffffff",   // white
        "#fef9e7",   // cream
        "#e8f4f8",   // pale blue
        "#f0e6f6",   // lavender
        "#fde8e8",   // rose
        "#e6f7ec",   // mint
        "#fff1e0",   // peach
        "#eaeef7",   // periwinkle
        "#f5e6d3",   // bisque
        "#d9e9fa",   // sky
        "#2c2c3a",   // deep charcoal (dark)
        "#3a2e39"    // plum charcoal (dark)
    ];

    // Pick a random color
    const randomColor = palette[Math.floor(Math.random() * palette.length)];

    // Apply to card
    $("#profileCard").css("background", randomColor);

    // Also tint the body slightly for a nicer feel
    $("body").css("background", shadeColor(randomColor, 5));

    // Add/remove dark class based on perceived brightness
    if (isDark(randomColor)) {
        $("#profileCard").addClass("dark-bg");
    } else {
        $("#profileCard").removeClass("dark-bg");
    }

    /* ----- Helper: check if a hex color is dark ----- */
    function isDark(hex) {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        // perceived luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.55;
    }

    /* ----- Helper: lighten/darken a hex color by percent ----- */
    function shadeColor(hex, percent) {
        hex = hex.replace("#", "");
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        // If dark, lighten. If light, darken slightly.
        const amt = Math.round(2.55 * (isDark(hex) ? percent : -percent));
        r = Math.min(255, Math.max(0, r + amt));
        g = Math.min(255, Math.max(0, g + amt));
        b = Math.min(255, Math.max(0, b + amt));

        return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
    }

    /* ----- 2. QR POPUP OPEN / CLOSE ----- */

    const $popup = $("#qrPopup");

    // Open popup on QR button click
    $("#openQrBtn").on("click", function (e) {
        e.preventDefault();
        $popup.css("display", "flex").hide().fadeIn(200);
    });

    // Close popup via Close button
    $("#closeQrBtn").on("click", function () {
        closePopup();
    });

    // Close popup when clicking on the dark overlay (outside content)
    $popup.on("click", function (e) {
        if (e.target === this) {
            closePopup();
        }
    });

    // Close popup with ESC key
    $(document).on("keydown", function (e) {
        if (e.key === "Escape" && $popup.is(":visible")) {
            closePopup();
        }
    });

    // Shared close function (adds a subtle highlight to the card)
    function closePopup() {
        $popup.fadeOut(200, function () {
            $(this).css("display", "none");
        });

        // small highlight pulse on card when returning to it
        $("#profileCard").css("box-shadow",
            "0 20px 35px rgba(0,0,0,0.28), 0 6px 12px rgba(0,0,0,0.12)");
        setTimeout(function () {
            $("#profileCard").css("box-shadow",
                "0 20px 35px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.05)");
        }, 250);
    }
});