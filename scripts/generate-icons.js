const fs = require('fs');
const path = require('path');

// Create a simple HTML file to generate icons using Canvas
const generateIconsHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Icon Generator</title>
</head>
<body>
    <canvas id="canvas" width="512" height="512"></canvas>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#a78bfa');
        gradient.addColorStop(0.5, '#22d3ee');
        gradient.addColorStop(1, '#34d399');
        
        // Draw background circle
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(256, 256, 240, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw white border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.stroke();
        
        // Draw certificate document
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4;
        ctx.fillRect(120, 140, 272, 200);
        ctx.strokeRect(120, 140, 272, 200);
        
        // Draw certificate border
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 3;
        ctx.strokeRect(140, 160, 232, 160);
        
        // Draw certificate title
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE', 256, 190);
        
        // Draw decorative line
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(160, 210);
        ctx.lineTo(352, 210);
        ctx.stroke();
        
        // Draw participant name
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('EventEye', 256, 240);
        
        // Draw event text
        ctx.font = '12px Arial';
        ctx.fillText('Certificate Management', 256, 270);
        
        // Draw decorative stars
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(180, 280, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(332, 280, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(200, 300, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(312, 300, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw QR code placeholder
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(220, 320, 32, 32);
        
        // QR pattern
        ctx.fillStyle = '#ffffff';
        const qrPattern = [
            [0,0,0,0,0,0,0,0],
            [0,1,0,1,0,1,0,1],
            [0,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [0,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [0,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1]
        ];
        
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (qrPattern[i][j] === 1) {
                    ctx.fillRect(220 + j * 4, 320 + i * 4, 4, 4);
                }
            }
        }
        
        // Function to download canvas as PNG
        function downloadCanvas(filename, width, height) {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = width;
            tempCanvas.height = height;
            tempCtx.drawImage(canvas, 0, 0, width, height);
            
            const link = document.createElement('a');
            link.download = filename;
            link.href = tempCanvas.toDataURL();
            link.click();
        }
        
        // Generate all required icons
        setTimeout(() => {
            downloadCanvas('favicon-16x16.png', 16, 16);
            setTimeout(() => downloadCanvas('favicon-32x32.png', 32, 32), 100);
            setTimeout(() => downloadCanvas('apple-touch-icon.png', 180, 180), 200);
            setTimeout(() => downloadCanvas('apple-touch-icon-152x152.png', 152, 152), 300);
            setTimeout(() => downloadCanvas('apple-touch-icon-167x167.png', 167, 167), 400);
            setTimeout(() => downloadCanvas('pwa-192x192.png', 192, 192), 500);
            setTimeout(() => downloadCanvas('pwa-512x512.png', 512, 512), 600);
            setTimeout(() => {
                alert('All icons generated! Please save them to the public folder.');
            }, 700);
        }, 1000);
    </script>
</body>
</html>
`;

// Write the HTML file
fs.writeFileSync('icon-generator.html', generateIconsHTML);

console.log('Icon generator HTML created: icon-generator.html');
console.log('Open this file in a browser to generate all required PWA icons.');
console.log('Save the generated icons to the public/ folder.');
