# Self-Host Bitwarden Password Manager on Raspberry Pi Zero
## Why?
Many people opt for simple or reused passwords when signing up for online services because they are easier to remember. While I used to do the same, I realized that storing passwords in web browsers is neither secure nor advisable.

To improve my security, I decided to set up a self-hosted password manager using **Bitwarden**. With features like Multi-Factor Authentication (MFA), backups, SSL certification, remote access, and enhanced security, I can better protect my credentials while maintaining full control over my data.

So,

I gathered the following **hardware**:

- **Raspberry Pi Zero 2 W**, compact and low-power makes it ideal for self-hosted applications.
- **MicroSD card**
- **Card reader**
- **Windows**

## Step 1: Flash Raspberry Pi OS Lite (64-bit)

The first step was to flash **Raspberry Pi OS Lite (64-bit)** onto the microSD card. I used the [Raspberry Pi Imager](https://www.raspberrypi.com/software/). tool to complete this process:


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
3. Enter the Raspberry Pi's **IP address** (found via my router or network scanner) in the **Host Name (or IP address)** field.
4. Ensure the **Port** is set to `22` and **Connection type** is **SSH**.
5. Click **Open** to initiate the connection.
6. When prompted, enter the **username** and **password** set during configuration.