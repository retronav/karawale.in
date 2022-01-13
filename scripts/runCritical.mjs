import critical from 'critical';
import fg from 'fast-glob';
import path from 'path';

(await fg('./dist/**/*.html')).map(async (file) => {
  console.log(`Running critical on ${file}`);
  await critical.generate({
    inline: true,
    base: 'dist/',
    target: path.relative('./dist', file),
    src: file,
    ignore: ['@font-face', /url\(/],
  });
});
