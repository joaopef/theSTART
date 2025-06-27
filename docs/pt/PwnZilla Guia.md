# PwnZilla
## 📌 Overview
This project documents my journey of setting up and customizing a Pwnagotchi from scratch.

The Pwnagotchi is an A2C-based “AI” powered by Bettercap. It learns from its surrounding WiFi environment to maximize the collection of crackable WPA key material. This can include material captured via passive sniffing or through deauthentication and association attacks.

Originally created by EvilSocket, the project wasn't actively maintained for a while, but it was later picked up and continued by Jayofelony. For more up-to-date information, you can refer to both the [new website](https://pwnagotchi.org) and the [original one](https://pwnagotchi.ai).

I’ll be using Jayofelony's image (v2.8.9), 64-bit, as I’m working with a Raspberry Pi Zero 2 W. If you’re using different hardware, you can check the available images and choose the one that matches your setup.

I’ve chosen to use jayofelony’s v2.8.9 image because the AI feature was removed in the later release.

For this setup, I’ll be using Windows as my main operating system, along with PuTTY for SSH access and 7-Zip to extract the image file. Additionally, I’ll need RNDIS drivers, which can be downloaded from ModCloud [here](https://modclouddownloadprod.blob.corwindows.net/shared/mod-rndis-driver-windows.zip)

If you’re looking for a deeper explanation of how the Pwnagotchi works, feel free to check out [in depth info](../docs/HOW_IT_WORKS.md).

![Pwnzilla Setup](images/pwnzilla-setup.jpg)  

## Hardware
- Raspberry Pi Zero 2W with headers 
- MicroSD Card 32Gb but 8Gb would be enough 
- Waveshare v4 2.13Inch e-Paper HAT
- Micro USB Data+Power Raspberry Pi cable  
- Power bank  

## Installation & Flashing  
1. **Downloaded v2.8.9** from [jayofelony's repo](https://github.com/jayofelony/pwnagotchi)
2. Flashing the image using the
**Raspberry Pi Imager**

## Configurations

🚧 **Writting in Progress** 🚧