"use client";
import React from "react";
import { useUpload } from "./utilities/runtime-helpers";

function MainComponent() {
  const [scene, setScene] = React.useState(null);
  const [numPoints, setNumPoints] = React.useState(5000);
  const [image, setImage] = React.useState(null);
  const containerRef = React.useRef(null);
  const [zDepth, setZDepth] = React.useState(0.5);
  const [iterations, setIterations] = React.useState(3);
  const [upload, { loading }] = useUpload();
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [showUpload, setShowUpload] = React.useState(true);
  const [showInstructions, setShowInstructions] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const [showTips, setShowTips] = React.useState(true);
  const [isJapanese, setIsJapanese] = React.useState(true);
  const resetState = () => {
    setScene(null);
    setImage(null);
    setUploadedImage(null);
    setShowUpload(true);
    setZDepth(0.5);
    setIterations(3);
    setNumPoints(5000);
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
  };

  React.useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const loadThreeAndD3 = async () => {
      if (typeof window.THREE === "undefined") {
        const threeScript = document.createElement("script");
        threeScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        threeScript.async = true;
        document.body.appendChild(threeScript);
        await new Promise((resolve) => (threeScript.onload = resolve));
      }

      const orbitScript = document.createElement("script");
      orbitScript.src =
        "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js";
      orbitScript.async = true;
      document.body.appendChild(orbitScript);
      await new Promise((resolve) => (orbitScript.onload = resolve));

      if (typeof d3 === "undefined") {
        const d3Script = document.createElement("script");
        d3Script.src = "https://d3js.org/d3.v7.min.js";
        d3Script.async = true;
        document.body.appendChild(d3Script);
        await new Promise((resolve) => (d3Script.onload = resolve));
      }

      if (uploadedImage) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = uploadedImage;
        img.onload = () => {
          setImage(img);
          initVoronoiScene(img, numPoints);
          setShowUpload(false);
        };
      }
    };
    loadThreeAndD3();
  }, [uploadedImage]);

  React.useEffect(() => {
    if (image) {
      initVoronoiScene(image, numPoints);
    }
  }, [numPoints, image, zDepth, iterations]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") setZDepth((prev) => Math.min(prev + 0.1, 5));
      if (e.key === "ArrowDown") setZDepth((prev) => Math.max(prev - 0.1, 0));
      if (e.key === "]") setIterations((prev) => Math.min(prev + 1, 10));
      if (e.key === "[") setIterations((prev) => Math.max(prev - 1, 0));
      if (e.key === "h") setShowInstructions((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFileUpload = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const { url, error } = await upload({ file });
      if (error) {
        console.error(error);
        return;
      }
      setUploadedImage(url);
    }
  };

  const initVoronoiScene = (img, points) => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    let voronoiPoints = Array.from({ length: points }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
    }));
    let delaunay = d3.Delaunay.from(
      voronoiPoints,
      (d) => d.x,
      (d) => d.y
    );
    let voronoi = delaunay.voronoi([0, 0, width, height]);
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let iteration = 0; iteration < iterations; iteration++) {
      const newPoints = [];
      for (let i = 0; i < points; i++) {
        const cell = voronoi.cellPolygon(i);
        if (cell) {
          const centroid = d3.polygonCentroid(cell);
          newPoints.push({ x: centroid[0], y: centroid[1] });
        }
      }
      voronoiPoints.splice(0, voronoiPoints.length, ...newPoints);
      delaunay = d3.Delaunay.from(
        voronoiPoints,
        (d) => d.x,
        (d) => d.y
      );
      voronoi = delaunay.voronoi([0, 0, width, height]);
    }

    for (let i = 0; i < points; i++) {
      const cell = voronoi.cellPolygon(i);
      if (cell) {
        const centroid = d3.polygonCentroid(cell);
        const x = (centroid[0] / width - 0.5) * 10;
        const y = -(centroid[1] / height - 0.5) * 10;
        const pixelX = Math.floor(centroid[0]);
        const pixelY = Math.floor(centroid[1]);
        const pixelIndex = (pixelY * width + pixelX) * 4;
        const brightness =
          (imageData.data[pixelIndex] +
            imageData.data[pixelIndex + 1] +
            imageData.data[pixelIndex + 2]) /
          (3 * 255);
        const z = brightness * zDepth;
        vertices.push(x, y, z);
        colors.push(
          imageData.data[pixelIndex] / 255,
          imageData.data[pixelIndex + 1] / 255,
          imageData.data[pixelIndex + 2] / 255
        );
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    });
    const voronoiMesh = new THREE.Points(geometry, material);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 10);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    scene.add(voronoiMesh);

    camera.position.z = 8;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY;
    setNumPoints((prev) => {
      const newValue =
        delta > 0 ? Math.max(10, prev - 100) : Math.min(10000, prev + 100);
      return newValue;
    });
  };

  return (
    <div className="relative min-h-screen w-screen bg-black">
      {showUpload ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="bg-[#111111] p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">
                {isJapanese ? "3Dドットアート生成" : "3D Dot Art Generator"}
              </h2>
              <button
                onClick={() => setIsJapanese(!isJapanese)}
                className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
              >
                {isJapanese ? "English" : "日本語"}
              </button>
            </div>
            <div className="bg-black/50 p-4 rounded mb-6">
              <h3 className="text-white font-bold mb-2">
                {isJapanese ? "アプリについて:" : "About:"}
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <span className="font-semibold text-white">
                    {isJapanese ? "画像の3D化:" : "3D Image Conversion:"}
                  </span>
                  <br />
                  {isJapanese
                    ? "お好みの画像を美しい3Dドットアートに変換できます。"
                    : "Convert your images into beautiful 3D dot art."}
                </li>
                <li>
                  <span className="font-semibold text-white">
                    {isJapanese
                      ? "インタラクティブな操作:"
                      : "Interactive Controls:"}
                  </span>
                  <br />
                  {isJapanese
                    ? "マウスやタッチ操作で自由に視点を変更できます。"
                    : "Change viewpoint freely using mouse or touch controls."}
                </li>
                <li>
                  <span className="font-semibold text-white">
                    {isJapanese ? "カスタマイズ:" : "Customization:"}
                  </span>
                  <br />
                  {isJapanese
                    ? "ドット数や奥行き、解像度を調整して理想的な表現を作れます。"
                    : "Adjust dot count, depth, and resolution to create your ideal expression."}
                </li>
              </ul>
              <p className="mt-4 text-xs text-gray-400">
                {isJapanese
                  ? "※アップロードされた画像は一時的な表示のみで、サーバーには保存されません。"
                  : "※Uploaded images are only displayed temporarily and are not stored on the server."}
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  const img = new Image();
                  img.crossOrigin = "Anonymous";
                  img.src =
                    "https://ucarecdn.com/bd39773b-9eff-4168-8654-0b522b0dfd8c/-/format/auto/";
                  img.onload = () => {
                    setImage(img);
                    initVoronoiScene(img, numPoints);
                    setShowUpload(false);
                  };
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {isJapanese ? "サンプル画像を使用" : "Use Sample Image"}
              </button>
              <div className="text-white text-center text-sm">
                {isJapanese ? "または" : "or"}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
              />
            </div>
            {loading && (
              <p className="mt-2 text-white">
                {isJapanese ? "アップロード中..." : "Uploading..."}
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            ref={containerRef}
            className="min-h-screen w-screen"
            onWheel={handleWheel}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <button
              onClick={resetState}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors z-50"
            >
              {isJapanese ? "トップに戻る" : "Back to Top"}
            </button>
            <button
              onClick={() => setIsJapanese(!isJapanese)}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors z-50"
            >
              {isJapanese ? "English" : "日本語"}
            </button>
          </div>
          {showInstructions && (
            <div className="absolute bottom-4 left-4 bg-black/80 p-4 rounded text-white text-sm">
              <h3 className="font-bold mb-2">
                {isJapanese ? "操作方法:" : "Controls:"}
              </h3>
              <ul className="space-y-1">
                {isMobile ? (
                  <>
                    <li>
                      • {isJapanese ? "指でドラッグ: 回転" : "Drag: Rotate"}
                    </li>
                    <li>
                      •{" "}
                      {isJapanese ? "ピンチイン/アウト: ズーム" : "Pinch: Zoom"}
                    </li>
                    <li>
                      •{" "}
                      {isJapanese
                        ? "2本指でスワイプ: 移動"
                        : "Two-finger swipe: Move"}
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      •{" "}
                      {isJapanese
                        ? "マウスドラッグ: 回転"
                        : "Mouse drag: Rotate"}
                    </li>
                    <li>
                      •{" "}
                      {isJapanese
                        ? "スクロール: ドット数の調整"
                        : "Scroll: Adjust dot count"}
                    </li>
                    <li>
                      •{" "}
                      {isJapanese
                        ? "↑↓キー: 奥行きの調整"
                        : "↑↓ keys: Adjust depth"}
                    </li>
                    <li>
                      •{" "}
                      {isJapanese
                        ? "[ ]キー: 解像度の調整"
                        : "[ ] keys: Adjust resolution"}
                    </li>
                    <li>
                      •{" "}
                      {isJapanese
                        ? "Hキー: 説明の表示/非表示"
                        : "H key: Toggle instructions"}
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MainComponent;