(function () {

    "use strict";

    function convertToCanvas (elementClass) {

        var html2Canvas = require("./html2canvas.js");

        var originalContents 	= document.body.innerHTML;
        var printContent 		= document.getElementsByClassName(elementClass)[0];
        printContent.style.width = '5px';
        printContent.style.height = '5px';
        document.body.innerHTML = printContent.innerHTML;
        document.body.style.width = '9in';
        document.body.style.height = '13in';

        function printCanvas () {

            window.print();
            window.close();
            document.body.innerHTML = originalContents;
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        }

        html2canvas(document.body, {
            onrendered: function(canvas) {

                document.body.innerHTML = "";
                document.body.appendChild(canvas);
                printCanvas();
            }
        });
    }

    module.exports = convertToCanvas;
})();
