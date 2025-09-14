#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');

function ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
}

function getImageFiles(dir) {
    const files = [];
    
    function scan(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && item !== 'optimized') {
                scan(fullPath);
            } else if (stat.isFile()) {
                const ext = path.extname(item).toLowerCase();
                if (SUPPORTED_FORMATS.includes(ext)) {
                    files.push(fullPath);
                }
            }
        }
    }
    
    scan(dir);
    return files;
}

function getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function optimizeWithSharp(inputPath, outputPath) {
    try {
        const sharp = require('sharp');
        const ext = path.extname(inputPath).toLowerCase();
        
        let pipeline = sharp(inputPath);
        
        if (ext === '.png') {
            return pipeline
                .png({ quality: 80, compressionLevel: 8 })
                .toFile(outputPath);
        } else if (['.jpg', '.jpeg'].includes(ext)) {
            return pipeline
                .jpeg({ quality: 85, progressive: true })
                .toFile(outputPath);
        } else if (ext === '.webp') {
            return pipeline
                .webp({ quality: 80 })
                .toFile(outputPath);
        }
        
        return pipeline.toFile(outputPath);
    } catch (error) {
        console.warn('Sharp not available, using fallback method');
        return null;
    }
}

function optimizeWithImageMagick(inputPath, outputPath) {
    try {
        const ext = path.extname(inputPath).toLowerCase();
        let cmd;
        
        if (ext === '.png') {
            cmd = `magick "${inputPath}" -strip -quality 80 "${outputPath}"`;
        } else if (['.jpg', '.jpeg'].includes(ext)) {
            cmd = `magick "${inputPath}" -strip -quality 85 -interlace Plane "${outputPath}"`;
        } else if (ext === '.webp') {
            cmd = `magick "${inputPath}" -strip -quality 80 "${outputPath}"`;
        } else {
            cmd = `magick "${inputPath}" -strip "${outputPath}"`;
        }
        
        execSync(cmd);
        return true;
    } catch (error) {
        console.warn('ImageMagick not available');
        return false;
    }
}

function copyFile(src, dest) {
    fs.copyFileSync(src, dest);
}

async function optimizeImage(inputPath) {
    const relativePath = path.relative(PUBLIC_DIR, inputPath);
    const outputPath = path.join(OPTIMIZED_DIR, relativePath);
    const outputDir = path.dirname(outputPath);
    
    ensureDirectory(outputDir);
    
    const originalSize = getFileSize(inputPath);
    
    console.log(`Optimizing: ${relativePath}`);
    
    try {
        const sharpResult = await optimizeWithSharp(inputPath, outputPath);
        
        if (!sharpResult) {
            const imageMagickSuccess = optimizeWithImageMagick(inputPath, outputPath);
            
            if (!imageMagickSuccess) {
                console.log(`  Fallback: Copying original file`);
                copyFile(inputPath, outputPath);
            }
        }
        
        if (fs.existsSync(outputPath)) {
            const optimizedSize = getFileSize(outputPath);
            const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
            
            console.log(`  Original: ${formatBytes(originalSize)}`);
            console.log(`  Optimized: ${formatBytes(optimizedSize)}`);
            console.log(`  Savings: ${savings}%`);
        }
        
    } catch (error) {
        console.error(`  Error optimizing ${relativePath}:`, error.message);
        copyFile(inputPath, outputPath);
    }
}

async function generateWebP(inputPath) {
    const relativePath = path.relative(PUBLIC_DIR, inputPath);
    const ext = path.extname(relativePath);
    const webpPath = path.join(OPTIMIZED_DIR, relativePath.replace(ext, '.webp'));
    const outputDir = path.dirname(webpPath);
    
    ensureDirectory(outputDir);
    
    try {
        const sharp = require('sharp');
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(webpPath);
        
        const originalSize = getFileSize(inputPath);
        const webpSize = getFileSize(webpPath);
        const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        
        console.log(`  WebP: ${formatBytes(webpSize)} (${savings}% smaller)`);
    } catch (error) {
        try {
            const cmd = `magick "${inputPath}" -quality 80 "${webpPath}"`;
            execSync(cmd);
            
            const originalSize = getFileSize(inputPath);
            const webpSize = getFileSize(webpPath);
            const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
            
            console.log(`  WebP: ${formatBytes(webpSize)} (${savings}% smaller)`);
        } catch (fallbackError) {
            console.warn(`  Could not generate WebP for ${relativePath}`);
        }
    }
}

function createOptimizationReport(originalFiles, optimizedDir) {
    let originalTotal = 0;
    let optimizedTotal = 0;
    
    for (const file of originalFiles) {
        const relativePath = path.relative(PUBLIC_DIR, file);
        const optimizedPath = path.join(optimizedDir, relativePath);
        
        if (fs.existsSync(optimizedPath)) {
            originalTotal += getFileSize(file);
            optimizedTotal += getFileSize(optimizedPath);
        }
    }
    
    const totalSavings = ((originalTotal - optimizedTotal) / originalTotal * 100).toFixed(1);
    
    console.log('\n' + '='.repeat(50));
    console.log('OPTIMIZATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`Original total size: ${formatBytes(originalTotal)}`);
    console.log(`Optimized total size: ${formatBytes(optimizedTotal)}`);
    console.log(`Total savings: ${formatBytes(originalTotal - optimizedTotal)} (${totalSavings}%)`);
    console.log(`Files processed: ${originalFiles.length}`);
}

async function main() {
    console.log('Starting image optimization...\n');
    
    if (!fs.existsSync(PUBLIC_DIR)) {
        console.error('Public directory not found!');
        process.exit(1);
    }
    
    ensureDirectory(OPTIMIZED_DIR);
    
    const imageFiles = getImageFiles(PUBLIC_DIR);
    
    if (imageFiles.length === 0) {
        console.log('No images found to optimize.');
        return;
    }
    
    console.log(`Found ${imageFiles.length} images to optimize\n`);
    
    let processed = 0;
    for (const imagePath of imageFiles) {
        await optimizeImage(imagePath);
        
        const ext = path.extname(imagePath).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
            await generateWebP(imagePath);
        }
        
        processed++;
        console.log(`Progress: ${processed}/${imageFiles.length}\n`);
    }
    
    createOptimizationReport(imageFiles, OPTIMIZED_DIR);
    
    console.log('\nOptimization completed!');
    console.log(`Optimized images saved to: ${OPTIMIZED_DIR}`);
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { main };
