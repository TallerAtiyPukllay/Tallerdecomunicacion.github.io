const fs = require('fs-extra');
const JavaScriptObfuscator = require('javascript-obfuscator');
const packager = require('electron-packager');
const path = require('path');

const BUILD_DIR = path.join(__dirname, 'dist_temp');
const DIST_DIR = path.join(__dirname, 'dist');

async function build() {
    console.log('--- Cleaning up ---');
    await fs.remove(BUILD_DIR);
    await fs.remove(DIST_DIR);

    console.log('--- Copying files ---');
    // Copy all necessary files/folders
    const filesToCopy = ['package.json', 'main.js', 'index.html', 'assets', 'css', 'js'];
    await fs.ensureDir(BUILD_DIR);

    for (const item of filesToCopy) {
        const src = path.join(__dirname, item);
        const dest = path.join(BUILD_DIR, item);
        if (await fs.pathExists(src)) {
            await fs.copy(src, dest);
        }
    }

    console.log('--- Obfuscating Code ---');
    // Define obfuscation options
    const obfuscationOptions = {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'mangled',
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: false,
        shuffleStringArray: true,
        splitStrings: false,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
    };

    // Obfuscate Main JS
    const mainJsPath = path.join(BUILD_DIR, 'main.js');
    const mainCode = await fs.readFile(mainJsPath, 'utf8');
    const obfuscatedMain = JavaScriptObfuscator.obfuscate(mainCode, obfuscationOptions).getObfuscatedCode();
    await fs.writeFile(mainJsPath, obfuscatedMain);

    // Obfuscate JS folder
    const jsDir = path.join(BUILD_DIR, 'js');
    if (await fs.pathExists(jsDir)) {
        const jsFiles = await fs.readdir(jsDir);
        for (const file of jsFiles) {
            if (file.endsWith('.js')) {
                const filePath = path.join(jsDir, file);
                const code = await fs.readFile(filePath, 'utf8');
                const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, obfuscationOptions).getObfuscatedCode();
                await fs.writeFile(filePath, obfuscatedCode);
                console.log(`Obfuscated: ${file}`);
            }
        }
    }

    console.log('--- Packaging ---');
    const appPaths = await packager({
        dir: BUILD_DIR,
        out: DIST_DIR,
        overwrite: true,
        platform: 'win32',
        arch: 'x64',
        prune: true,
        icon: path.join(__dirname, 'assets/icon.ico'), // Will warn if missing but succeed
        asar: true // Important for extra security
    });

    console.log(`Build complete! App located at: ${appPaths[0]}`);

    // Cleanup temp dir
    // await fs.remove(BUILD_DIR); 
}

build().catch(err => {
    console.error(err);
    process.exit(1);
});
