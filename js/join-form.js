document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("joinForm");
    const responseMessage = document.getElementById("responseMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const position = document.getElementById("position").value;
        const message = document.getElementById("message").value;

        const telegramToken = "";
        const chatId = "";
        const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

        const text = `📩 New Job Application!\n\n👤 Name: ${firstName} ${lastName}\n📧 Email: ${email}\n📞 Phone: ${phone}\n🏥 Position: ${position}\n📝 Message: ${message}`;

        fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: text })
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    responseMessage.textContent = "✅ Application sent successfully!";
                    responseMessage.style.color = "green";
                    form.reset();
                } else {
                    responseMessage.textContent = "❌ Error sending application!";
                    responseMessage.style.color = "red";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                responseMessage.textContent = "❌ Network error. Try again!";
                responseMessage.style.color = "red";
            });
    });
});
