# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-12-05

### Added
- New src directory structure following clean architecture principles
- Core module: config, search, constants, and path utilities
- Commands module: command handling with improved separation of concerns
- UI module: header display and interface components
- Printers module: table and plain output formats
- Utils module: common utilities and helpers
- .gitattributes and .editorconfig for consistent line ending handling
- Constants file for centralized configuration values

### Changed
- Moved all modules from lib/ to src/ with proper categorization
- Refactored command handling to use dependency injection pattern
- Improved separation of concerns with better module boundaries
- Updated all import paths to match new structure
- Changed package.json files array to include src/ instead of lib/
- Enhanced maintainability with clear module responsibilities
- Implemented clean architecture principles throughout codebase

### Removed
- Old lib/ directory structure
- Tightly coupled direct configuration manipulation in commands

### Fixed
- Line ending inconsistencies across different platforms
- Module import paths for better organization
- Command handling with dependency injection pattern