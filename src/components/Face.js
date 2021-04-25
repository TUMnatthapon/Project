
import * as faceapi from 'face-api.js';

import { useState, useEffect } from 'react';
const lineNotify = require('line-notify-nodejs')('3y0LGAoVDB32nZ6HRPvq1Vto2OGkgpPtwxCBv7eapOu');
const Face = () => {
    useEffect(() => {
        Webcam()
    }, [])
    const [name, setName] = useState('');
    async function Webcam() {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
        ]).then(startVideo)
        const video = document.getElementById('video')
        function startVideo() {
            navigator.getUserMedia(
                { video: {} },
                stream => video.srcObject = stream,
                err => console.error(err)
            )
        }
        video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video)
            document.body.append(canvas)
            const displaySize = { width: video.width, height: video.height }
            faceapi.matchDimensions(canvas, displaySize)

            let labeledFaceDescriptors
            (async () => {
                labeledFaceDescriptors = await loadLabeledImages()
            })()

            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors()
                console.log(detections)
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                if (labeledFaceDescriptors) {
                    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
                    const results = resizedDetections.map(data => faceMatcher.findBestMatch(data.descriptor))
                    results.forEach((result, i) => {
                        setName(result.toString())
                    })
                }
                if (name === 'Tum') {
                    lineNotify.notify({message: 'ผลการตรวจสอบใบหน้าตรงกัน !!!'});
                  }
            }, 100)
        })
        function loadLabeledImages() {
            const labels = ['Affan','Arim','Ham','Iffan','Nut','Plaa','Tum']
            return Promise.all(
                labels.map(async label => {
                    const descriptions = []
                    for (let i = 1; i <= 9; i++) {
                        const img = await faceapi.fetchImage(`/images/${label}/${i}.jpg`)
                        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                        descriptions.push(detections.descriptor)
                    }
                    return new faceapi.LabeledFaceDescriptors(label, descriptions)
                })
            )
        }
    }
    return (
        <div>
            <video id="video" height="500px" width="500px" autoPlay muted />
            <h1>{name}</h1>
        </div>
    )
}
export default Face;
