const initializeVideo = function() {
    const videoElement = document.getElementById('backgroundVideo');
    
    // 初始化 MinIO 客户端
    const minioClient = new Minio.Client({
        endPoint: '192.168.50.237',
        port: 9011,
        useSSL: false,
        accessKey: 'V9QD0L7hPQCGdOU0KhZ3',
        secretKey: '7iN6ZWK8VrhQ0kF2D8bp10nNfkEMqbWKQkCdlFdw'
    });

    // 生成预签名 URL
    minioClient.presignedGetObject('images', 'background1.mp4', 1094*24*60*60, function(err, presignedUrl) {
        if (err) {
            console.error('Error generating presigned URL:', err);
            return;
        }
        
        // 更新视频源为预签名 URL
        videoElement.src = presignedUrl;
    });

    // 错误处理
    videoElement.addEventListener('error', function(e) {
        console.error('Video error:', e);
    });
}