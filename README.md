# Electron Publisher Test

Test of [Electron Publisher](https://www.electronjs.org/docs/latest/tutorial/tutorial-publishing-updating) for GitHub [here](https://github.com/hamilton-labs/Electron-Publisher).

## Description

Testing Electron Publisher environment workflows for GitHub.

## Getting Started

1. Download the repo.
2. cd /Electron-Publisher
3. npm install
4. npm run dev
5. Dev...💻

## Try it out

1. Head over to the [Tagged Releases](https://github.com/hamilton-labs/Electron-Publisher/tags) section.
2. Download the package relative to your system's architecture.
3. Run it in your sandbox/vm/container if you don't trust me. (You have options)

- ### On Debian/Ubuntu

  - [dpkg](https://www.dpkg.org/) - ``` dpkg install path/to/electron-tutorial_1.0.0_amd64.deb ```
  - [apt](https://ubuntu.com/server/docs/package-management) - ``` apt install path/to/electron-tutorial_1.0.0_amd64.deb ```
  - [gdebi](https://manpages.ubuntu.com/manpages/bionic/man1/gdebi.1.html) - ``` gdebi install path/to/electron-tutorial_1.0.0_amd64.deb ```
  
- ### On Arch Linux

  - [debtap](https://github.com/helixarch/debtap?tab=readme-ov-file#) - ``` debtap path/to/electron-tutorial_1.0.0_amd64.deb ```
  - [pacman](https://wiki.archlinux.org/title/Pacman) - ``` pacman -U /path/to/electron-tutorial_1.0.0_amd64.pkg.tar.zst ```

- ### On Redhat/Fedora

  - [dnf](https://docs.fedoraproject.org/en-US/quick-docs/dnf/) - ``` dnf install path/to/electron-tutorial-1.0.0-1.x86_64.rpm ```
  - [rpm](https://rpm-software-management.github.io/rpm/man/rpm.8.html) ``` rpm install path/to/electron-tutorial-1.0.0-1.x86_64.rpm ```

- ### On Windows 10/11

  - [NuGet](https://fileinfo.com/extension/nupkg) - ``` electron_tutorial-1.0.0-full.nupkg ```
  - [Explorer](https://support.microsoft.com/en-us/windows/find-and-open-file-explorer-ef370130-1cca-9dc5-e0df-2f7416fe1cb1#WindowsVersion=Windows_10) - ``` "electron-tutorial-1.0.0 Setup.exe" ```

- ### On MacOS

  - [Terminal](https://support.apple.com/guide/terminal/compress-and-uncompress-file-archives-apdc52250ee-4659-4751-9a3a-8b7988150530/mac) - ``` unzip path/to/electron-tutorial-darwin-x64-1.0.0.zip ```
  - [Terminal](https://support.apple.com/guide/terminal/execute-commands-and-run-tools-apdb66b5242-0d18-49fc-9c47-a2498b7c91d5/mac) - ``` open path/to/electron-tutorial.app ```

### Dependencies

- (x86_64 --arch) Debian/Ubuntu for .deb file
- (x86_64 --arch) RedHat/Fedora for .rpm file
- (x86_64 --arch) Windows 10/11
- (x86_64 --arch) MacOS/Darwin

### Screenshots

<p style="text-align: center; margin-left: auto; margin-right: auto;">System (Auto), Light, and Dark modes.</p>

Linux 🐧

<img src ="assets\images\linux_screenshots\screenshot_system.png" alt="System Theme" width="30%" style="padding: 0.5%;"/> <img src ="assets\images\linux_screenshots\screenshot_light.png" alt="Light Theme" width="30%" style="padding: 0.5%;"/> <img src ="assets\images\linux_screenshots\screenshot_dark.png" alt="Dark Theme" width="30%" style="padding: 0.5%;"/>

Windows 🪟

<img src ="assets\images\windows_screenshots\w_system_screenshot.png" alt="System Theme" width="30%" style="padding: 0.5%;" /> <img src ="assets\images\windows_screenshots\w_light_screenshot.png" alt="Light Theme" width="30%" style="padding: 0.5%;"/> <img src ="assets\images\windows_screenshots\w_dark_screenshot.png" alt="Dark Theme" width="30%" style="padding: 0.5%;"/>

MacOS 🍏

<img src ="assets\images\mac_screenshots\m_system_screenshot.png" alt="System Theme" width="30%" style="padding: 0.02%;" /> <img src ="assets\images\mac_screenshots\m_light_screenshot.png" alt="Light Theme" width="30%" style="padding: 0.02%;"/> <img src ="assets\images\mac_screenshots\m_dark_screenshot.png" alt="Dark Theme" width="30%" style="padding: 0.02%;"/>
