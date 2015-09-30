(function () {

    "use strict";

    function convertToCanvas (elementClass, funct) {

        var html2Canvas = require("./html2canvas.js");

        var originalContents 	= document.body.innerHTML;
        var printContent 		= document.getElementsByClassName(elementClass)[0];
        var outBase64;
        // printContent.style.width = '5px';
        // printContent.style.height = '5px';
        // document.body.innerHTML = printContent.innerHTML;
        // document.body.style.width = '9in';
        // document.body.style.height = '13in';

        html2canvas(printContent, {
            onrendered: function(canvas) {
                var imgData = canvas.toDataURL("image/jpeg", 1.0);
                var pdf = new jsPDF();

                pdf.addImage(imgData, 'JPEG', 0, 0);
                var out = pdf.output();
                var outs = btoa(out);
                funct(outs);
            }
        });
    }

    module.exports = convertToCanvas;
})();
