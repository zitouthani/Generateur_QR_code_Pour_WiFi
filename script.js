function generateQrCode() {
    const ssid = document.getElementById('ssid').value;
    const password = document.getElementById('password').value;
    const encryption = document.getElementById('encryption').value;
    const qrcodeContainer = document.getElementById('qrcode-container');

    // Nettoie le conteneur du QR code précédent
    qrcodeContainer.innerHTML = '';

    if (!ssid) {
        alert('Veuillez entrer le nom du réseau (SSID).');
        return;
    }

    // Format du code QR pour le Wi-Fi (méthode standard)
    // Documentation : https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-for-android
    let wifiConfig = `WIFI:S:${ssid};`;

    if (encryption === 'nopass') {
        wifiConfig += `T:nopass;P:;`; // Aucun mot de passe
    } else {
        wifiConfig += `T:${encryption};P:${password};`;
    }

    wifiConfig += `H:false;`; // 'H' pour hidden (réseau caché), ici à 'false'

    // Crée une nouvelle instance du QR code
    new QRCode(qrcodeContainer, {
        text: wifiConfig,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    /**
 * Bascule la visibilité du mot de passe dans le champ de saisie.
 */
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    // Vérifie le type actuel de l'input
    if (passwordInput.type === 'password') {
        // Change le type en 'text' pour afficher le mot de passe
        passwordInput.type = 'text';
        // Change l'icône en œil barré (pour masquer)
        toggleIcon.textContent = '🔒'; // Vous pouvez utiliser 🙈 ou 🔒
    } else {
        // Change le type en 'password' pour masquer le mot de passe
        passwordInput.type = 'password';
        // Change l'icône en œil normal (pour afficher)
        toggleIcon.textContent = '👁️';
    }
}
}
