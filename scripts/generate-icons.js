import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

async function generateIcons() {
  const inputSvg = join(__dirname, 'icon.svg');
  const androidPath = join(__dirname, 'android');
  
  try {
    await fs.access(androidPath);
  } catch (error) {
    console.error('Androidプロジェクトが見つかりません。npx cap add android を実行してください。');
    return;
  }

  const baseOutputDir = join(androidPath, 'app', 'src', 'main', 'res');

  for (const [folder, size] of Object.entries(sizes)) {
    const outputDir = join(baseOutputDir, folder);
    await fs.mkdir(outputDir, { recursive: true });

    // Generate launcher icon
    await sharp(inputSvg)
      .resize(size, size)
      .toFile(join(outputDir, 'ic_launcher.png'));

    // Generate round icon
    await sharp(inputSvg)
      .resize(size, size)
      .toFile(join(outputDir, 'ic_launcher_round.png'));

    // Generate foreground icon (slightly larger for padding)
    const foregroundSize = Math.floor(size * 1.5);
    await sharp(inputSvg)
      .resize(foregroundSize, foregroundSize)
      .toFile(join(outputDir, 'ic_launcher_foreground.png'));
  }

  console.log('アイコンの生成が完了しました！');
}

generateIcons().catch(console.error);
