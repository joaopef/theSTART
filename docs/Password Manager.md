# Self-Host Bitwarden Password Manager on Raspberry Pi Zero
## Why?
Many people opt for simple or reused passwords when signing up for online services because they are easier to remember. While I used to do the same, I realized that storing passwords in web browsers is neither secure nor advisable.

To improve my security, I decided to set up a self-hosted password manager using **Bitwarden**. With features like Multi-Factor Authentication (MFA), backups, SSL certification, remote access, and enhanced security, I can better protect my credentials while maintaining full control over my data.

So,

I gathered the following **hardware**:

- **Raspberry Pi Zero 2 W**, compact and low-power makes it ideal for self-hosted applications.
- **Waveshare 2.13 inch e-paper HAT v4**
- **MicroSD card**
- **Card reader**
- **Windows**

## Step 1: Flash Raspberry Pi OS Lite (64-bit)

The first step was to flash **Raspberry Pi OS Lite (64-bit)** onto the microSD card. I used the [Raspberry Pi Imager](https://www.raspberrypi.com/software/) tool to complete this process:


1. Insert the microSD card into the **card reader**.
2. Open **Raspberry Pi Imager** and **Choose OS** > **Raspberry Pi OS (Other)** > **Raspberry Pi OS Lite (64-bit)**.
3. Choose the microSD card as the storage device.
4. Click **Next** and **Edit Settings**:  
Enable **Set hostname**, set up a **username and password**, **Configure Wireless LAN** and  Enable **SSH** to allow remote access.
5. **Save** and click **Yes** to use the settings, then wait to **write**.

## Step 2: Connect Over SSH

Since SSH was enabled at the time of writing the OS, I can now connect to the Raspberry Pi over SSH using [PuTTY](https://www.putty.org/):

1. Insert the microSD card into the Raspberry Pi and power it on.
2. Open **PuTTY** on my Windows PC.
3. Enter the Raspberry Pi's **IP address** (found via **nmap**) in the **Host Name (or IP address)** field.
4. Ensure the **Port** is set to `22` and **Connection type** is **SSH**.
5. Click **Open** to initiate the connection.
6. When prompted, enter the **username** and **password** set during configuration.

## Step 3: On the terminal

To make sure everything runs smoothly, I started by updating and upgrading the software packages:
```sudo apt update && sudo apt upgrade -y ```

### Set Up the Waveshare e-Paper HAT

1. Enabled SPI on my Raspberry Pi by running:
``sudo raspi-config``
2. Navigated to Interfacing Options → SPI → Enable
3. After enabling SPI, I rebooted the system: ``sudo reboot``
4. Installing the necessary Python libraries:
```
sudo apt-get update
sudo apt-get install python3-pip python3-pil python3-numpy
sudo apt-get install python3-spidev python3-rpi.gpio
sudo apt-get install python3-psutil
```
5. Cloned the [waveshareteam repo](https://github.com/waveshareteam/e-Paper/) and moved into the correct directory: 
```
git clone https://github.com/waveshare/e-Paper.git
cd ~/e-Paper/RaspberryPi_JetsonNano/python
```
6. Since I'm using the Waveshare 2.13-inch v4 display, I grabbed the epd2in13_V4 module from
../lib/waveshare_epd and used ../examples/epd2in13_V4_test.py as a starting point.
From there, I built [system_monitor_v1.py](../docs/system_monitor_v1.py) to display system info like temperature, uptime, and IP address.
**inserir imagem e add more stuff when bitwarden is implemented.**

### Install Docker and Portainer

1. Install [Docker](https://docs.docker.com/desktop/setup/install/linux/): ``curl -sSL https://get.docker.com | sh``
2.