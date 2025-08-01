# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Hexo, a fast static site generator. The blog is titled "右舷" (Starboard) with the subtitle "宇宙，人类最后的边疆" (Space, the final frontier of humanity) and is authored by laihj.

## Architecture

- **Static Site Generator**: Hexo v5.4.2
- **Theme**: NexT v8.18.0 (Pisces scheme)
- **Language**: Chinese (zh-CN)
- **Deployment**: Git deployment to GitHub Pages (laihj.github.io)
- **Content Management**: Markdown posts in `source/_posts/` organized by year

## Common Development Commands

### Building and Development
```bash
# Clean generated files and cache
npx hexo clean

# Generate static files
npx hexo generate

# Start local development server
npx hexo server

# Deploy to GitHub Pages
npx hexo deploy

# Create a new post
npx hexo new "post-title"

# Create a new daily post (auto-generates title as YYYYMMDD with daily tag)
npx hexo daily

# Publish draft to posts
npx hexo publish "draft-title"
```

### Dependency Management
```bash
# Install dependencies
npm install

# Update dependencies
npm update
```

## Directory Structure

- `source/_posts/` - Blog posts organized by year (2010-2025)
- `source/_drafts/` - Draft posts
- `source/images/` - Image assets
- `source/_data/` - Custom data files and theme customizations
- `public/` - Generated static site (after `hexo generate`)
- `themes/` - Hexo themes (currently using NexT)
- `scaffolds/` - Post templates

## Configuration Files

- `_config.yml` - Main Hexo configuration
- `_config.next.yml` - NexT theme configuration
- `package.json` - Node.js dependencies and project metadata

## Content Organization

Posts are organized chronologically in `source/_posts/` with the naming convention:
`YYYY-MM-DD-title.md`

Posts often include associated asset folders for images and media files following the pattern:
`YYYY-MM-DD-title/`

## Theme Features

The blog uses NexT theme with:
- Pisces scheme
- Dark mode enabled
- Disqus comments
- Google Analytics integration
- Social links (GitHub, Email, Weibo, Twitter)
- RSS/Atom feeds
- Sitemap generation

## Deployment

The blog is configured to deploy to GitHub Pages via git deployment:
- Repository: `https://github.com/laihj/laihj.github.io.git`
- Branch: `gh-pages`
- Domain: `www.laihjx.com`

## Development Notes

- Posts support asset folders (`post_asset_folder: true`)
- Drafts are not rendered by default
- The blog includes custom CSS and JavaScript in `source/css/` and `source/js/`
- Custom head and post-body-end templates are used for additional functionality