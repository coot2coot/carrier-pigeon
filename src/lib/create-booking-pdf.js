(function () {

    "use strict";

    function convertToCanvas (elementClass, cb) {

        var html2Canvas = require("./html2canvas.js");

        var originalContents 	= document.body.innerHTML;
        var printContent 		= document.getElementsByClassName(elementClass)[0];

        html2canvas(printContent, {
            onrendered: function(canvas) {
                var imgData = canvas.toDataURL("image/jpeg", 1.0);
                var pdf = new jsPDF();

                pdf.addImage(imgData, 'JPEG', 0, 0);
                var out = pdf.output();
                var outBase64 = btoa(out);
                cb(outBase64);
            }
        });
    }

    module.exports = convertToCanvas;
})();
