const showBtn = document.querySelector(".btn");
const infosList = document.querySelector(".info_list");
const mapElement = document.querySelector(".map");

showBtn.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("https://ipinfo.io/json")
        .then(response => response.json())
        .then((data) => {
            console.log(data);

            if (!data.loc) {
                alert("Joylashuv ma'lumotlarini olishning iloji bo'lmadi.");
                return;
            }

            const location = data.loc.split(",");

            infosList.innerHTML = `
                <li>Kenglik: ${location[0] || "Noma'lum"}</li>
                <li>Uzunlik: ${location[1] || "Noma'lum"}</li>
                <li>Mamlakat: ${data.country || "Noma'lum"}</li>
                <li>Shahar: ${data.region || "Noma'lum"}</li>
                <li>IP manzil: ${data.ip || "Noma'lum"}</li>
                <li>Internet Provider: ${data.org || "Noma'lum"}</li>
            `;

            mapElement.innerHTML = `
                <iframe
                    width="100%"
                    height="300px"
                    frameborder="0"
                    style="border:0"
                    src="https://www.google.com/maps?q=${location[0]},${location[1]}&output=embed"
                    allowfullscreen
                ></iframe>
            `;
        })
        .catch((error) => {
            console.error("Xatolik:", error);
            alert(`Xatolik sodir bo'ldi: ${error.message}`);
        });
});
