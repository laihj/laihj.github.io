const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

hexo.extend.console.register('obsidian-publish', 'Publish an Obsidian note to Hexo blog.', {
  usage: '[obsidian_note_path]',
  arguments: [
    {name: 'obsidian_note_path', desc: 'Path to the Obsidian note file'}
  ]
}, function(args) {
  return (async () => {
  const obsidianVault = '/Users/laihj/Library/Mobile Documents/iCloud~md~obsidian/Documents/Laihj';
  const blogDir = '/Users/laihj/workspace/blog';

  // Get note path from argument or prompt
  let notePath = args._[0];

  if (!notePath) {
    this.log.error('Please provide the Obsidian note path');
    this.log.info('Usage: hexo obsidian-publish <note_path>');
    this.log.info('Example: hexo obsidian-publish 202505281358 VDOT，一种跑步能力指标.md');
    this.log.info('Example: hexo obsidian-publish /full/path/to/note.md');
    return;
  }

  // Handle relative or absolute path
  if (!path.isAbsolute(notePath)) {
    // Check if it's in the root of Obsidian vault
    const rootPath = path.join(obsidianVault, notePath);
    if (fs.existsSync(rootPath)) {
      notePath = rootPath;
    } else {
      this.log.error(`Note file not found: ${notePath}`);
      this.log.info(`Tried path: ${rootPath}`);
      return;
    }
  }

  if (!fs.existsSync(notePath)) {
    this.log.error(`Note file does not exist: ${notePath}`);
    return;
  }

  this.log.info(`Reading note from: ${notePath}`);

  // Read the note content
  let content = fs.readFileSync(notePath, 'utf8');

  // Parse frontmatter and extract metadata
  let title = '';
  let tags = [];
  let date = new Date();
  let bodyContent = content;

  // Check if note has YAML frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    bodyContent = content.slice(frontmatterMatch[0].length).trim();

    // Parse YAML frontmatter
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
    if (titleMatch) title = titleMatch[1].trim();

    const tagsMatch = frontmatter.match(/^tags:\s*\[(.+)\]$/m);
    if (tagsMatch) {
      tags = tagsMatch[1].split(',').map(t => t.trim());
    } else {
      const tagLinesMatch = frontmatter.match(/^tags:\n((?:  - .+\n?)+)/m);
      if (tagLinesMatch) {
        tags = tagLinesMatch[1].split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\s*-\s*/, '').trim());
      }
    }

    const dateMatch = frontmatter.match(/^date:\s*(.+)$/m);
    if (dateMatch) date = new Date(dateMatch[1].trim());
  }

  // Extract title from first heading if no title in frontmatter
  if (!title) {
    const headingMatch = bodyContent.match(/^#\s+(.+)$/m);
    if (headingMatch) {
      title = headingMatch[1].trim();
    }
  }

  // If still no title, use filename
  if (!title) {
    title = path.basename(notePath, '.md');
  }

  // Remove timestamp prefix from title (e.g., "202601261023 为什么我喜欢豆包输入法" -> "为什么我喜欢豆包输入法")
  const cleanTitle = title.replace(/^\d{12,}\s*/, '').trim();

  this.log.info(`Title: ${cleanTitle}`);
  this.log.info(`Tags: ${tags.length > 0 ? tags.join(', ') : 'none'}`);

  // Generate slug from title or filename
  const moment = require('moment');
  const dateStr = moment(date).format('YYYY-MM-DD');

  // Function to generate English slug from Chinese title
  function generateSlug(title) {
    // Common Chinese to English mappings
    const dictionary = {
      // Running/fitness terms
      'VDOT': 'vdot',
      '跑力值': 'running-power',
      '跑步': 'running',
      '能力': 'ability',
      '指标': 'metric',
      '一种': 'a',
      '训练': 'training',
      '时态': 'tense',
      '跑渣': 'beginner-runner',
      '工具': 'tools',
      '六边型': 'hexagon',
      'PaceGuru': 'paceguru',
      // Common words
      '为什么': 'why',
      '喜欢': 'like',
      '豆包': 'doubao',
      '输入法': 'input-method',
      '如何': 'how-to',
      '什么': 'what',
      '怎么': 'how',
      '使用': 'using',
      '方法': 'method',
      '教程': 'tutorial',
      '笔记': 'notes',
      '总结': 'summary',
      '体验': 'experience',
      '关于': 'about',
      '的': '',
      '是': 'is',
      '我': 'i',
      '在': 'at'
    };

    // Try to use words from dictionary first
    let slug = title;
    for (const [chinese, english] of Object.entries(dictionary)) {
      slug = slug.replace(new RegExp(chinese, 'g'), english);
    }

    // Remove special characters and spaces
    slug = slug
      .toLowerCase()
      .replace(/[，。！？、""''（）\[\]《》\s\-_,]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // If slug is too long or contains many Chinese characters, use a simpler approach
    if (slug.length > 50 || /[\u4e00-\u9fa5]/.test(slug)) {
      // Extract numbers and English words
      const matches = slug.match(/[a-z0-9]+/g);
      if (matches && matches.length > 0) {
        slug = matches.join('-');
      } else {
        // Fallback to timestamp if no usable characters
        slug = moment(date).format('YYYYMMDD');
      }
    }

    return slug || 'post';
  }

  const slug = generateSlug(cleanTitle);

  // Create new Hexo post
  this.log.info('Creating Hexo post...');
  try {
    const postDir = path.join(blogDir, 'source/_posts');
    const postFileName = `${dateStr}-${slug}.md`;
    const postPath = path.join(postDir, postFileName);

    // Check if post already exists
    if (fs.existsSync(postPath)) {
      this.log.warn(`Post already exists: ${postPath}`);
      this.log.info('Updating existing post...');
    }

    // Convert Obsidian image links to Markdown image links
    // ![[image.png]] -> ![](image.png)
    let processedContent = bodyContent.replace(/!\[\[([^\]]+)\]\]/g, (match, imagePath) => {
      const cleanPath = imagePath.split('|')[0].trim(); // Remove any size/width specs
      // Encode spaces and special characters in URLs
      const encodedPath = cleanPath.replace(/\s/g, '%20');
      return `![](${encodedPath})`;
    });

    // Find all image references
    const imageRegex = /!\[\]\(([^)]+)\)/g;
    const images = [];
    let match;
    while ((match = imageRegex.exec(processedContent)) !== null) {
      images.push(match[1]);
    }

    // Create Hexo frontmatter
    let hexoFrontmatter = '---\n';
    hexoFrontmatter += `title: ${cleanTitle}\n`;
    hexoFrontmatter += `date: ${moment(date).format('YYYY-MM-DD HH:mm:ss')}\n`;
    if (tags.length > 0) {
      hexoFrontmatter += `tags:\n`;
      tags.forEach(tag => {
        hexoFrontmatter += `  - ${tag}\n`;
      });
    }
    hexoFrontmatter += '---\n';

    const finalContent = hexoFrontmatter + processedContent;

    // Write the post
    fs.writeFileSync(postPath, finalContent, 'utf8');
    this.log.info(`Post created: ${postPath}`);

    // Handle images
    if (images.length > 0) {
      this.log.info(`Found ${images.length} image(s)`);

      // Create asset folder (post_asset_folder is enabled)
      const assetFolder = path.join(postDir, path.basename(postPath, '.md'));

      if (!fs.existsSync(assetFolder)) {
        fs.mkdirSync(assetFolder, { recursive: true });
        this.log.info(`Created asset folder: ${assetFolder}`);
      }

      // Process each image
      for (const imageName of images) {
        const sourceImage = path.join(obsidianVault, imageName);
        const targetImage = path.join(assetFolder, path.basename(imageName));

        if (fs.existsSync(sourceImage)) {
          try {
            // Get image metadata
            const metadata = await sharp(sourceImage).metadata();
            const width = metadata.width;
            const height = metadata.height;

            this.log.info(`Processing image: ${imageName} (${width}x${height})`);

            // Process image: resize if width > 800, compress
            let imageProcessor = sharp(sourceImage);

            if (width > 800) {
              // Resize to max 800px width, maintain aspect ratio
              imageProcessor = imageProcessor.resize(800, null, {
                withoutEnlargement: true
              });
              this.log.info(`  Resized to 800px width`);
            }

            // Compress image with quality 85 (good balance)
            // Use format based on source
            const format = metadata.format;
            if (format === 'jpeg' || format === 'jpg') {
              imageProcessor = imageProcessor.jpeg({ quality: 85 });
            } else if (format === 'png') {
              imageProcessor = imageProcessor.png({ quality: 85, compressionLevel: 9 });
            } else if (format === 'webp') {
              imageProcessor = imageProcessor.webp({ quality: 85 });
            }

            // Save processed image
            await imageProcessor.toFile(targetImage);

            // Show file size comparison
            const originalSize = fs.statSync(sourceImage).size;
            const newSize = fs.statSync(targetImage).size;
            const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
            this.log.info(`  Saved: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${reduction}% reduction)`);

          } catch (error) {
            this.log.warn(`  Error processing image, copying original: ${error.message}`);
            // Fallback to copy if processing fails
            fs.copyFileSync(sourceImage, targetImage);
          }
        } else {
          this.log.warn(`Image not found: ${sourceImage}`);
        }
      }
    }

    this.log.info('Post published successfully!');
    this.log.info('');
    this.log.info('Next steps:');
    this.log.info(`1. Review the post at: ${postPath}`);
    this.log.info('2. To deploy, run: hexo publish');

  } catch (error) {
    this.log.error(`Error creating post: ${error.message}`);
    throw error;
  }
  })();
});
