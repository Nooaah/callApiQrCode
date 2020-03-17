$.ajax({
    url: "http://localhost:3000/createCode",
    type: 'POST',
    data: {
        link: 'http://noah-chatelain.fr'
    },
    success: function (result) {
        console.log(result);

        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: "http://192.168.0.36:3000/connect/" + result.code,
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        continu = true
        setInterval(() => {
            if (continu) {
                $.ajax({
                    url: "http://localhost:3000/json/" + result.code,
                    type: 'GET',
                    success: function (result) {
                        try {
                            if (result.result[0].good == 1) {
                                continu = false;
                                localStorage.pseudo = 'Noah';
                                document.getElementById('connectedButton').click();
                                setTimeout(() => {
                                    window.location = result.result[0].link;
                                }, 1000);
                            }
                        } catch {}
                    }
                });
            }
        }, 1000);

    }
});