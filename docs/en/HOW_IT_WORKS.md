# Pwnagotchi: How it Works

Pwnagotchi is an **A2C-based** (“AI”) powered by **bettercap** that learns from its surrounding WiFi environment in order to maximize the crackable WPA key material it captures (either through passive sniffing or by performing **deauthentication** and **association attacks**). This material is collected on disk as **PCAP files** containing any form of crackable **handshake** supported by **hashcat**, including full and half WPA handshakes as well as **PMKIDs**.

### Key Terms

- **A2C**: This stands for **Advantage Actor-Critic**, which is an algorithm used in **reinforcement learning**. It combines both the **actor** (which decides what action to take) and the **critic** (which evaluates the action taken). A2C is used in the Pwnagotchi’s **AI** to help it adapt and improve its actions over time, based on the feedback from its environment.
  
- **Bettercap**: This is a tool used for **network attacks** and **packet manipulation**, which allows Pwnagotchi to interact with wireless networks and gather data for **Wi-Fi cracking**.
  
- **Deauthentication and Association Attacks**: These are types of attacks used to **disrupt the connection** between a device and a Wi-Fi network. Deauthentication causes a device to disconnect from a network, and Association attacks allow Pwnagotchi to intercept the process and capture **handshakes**.

- **PCAP files**: These are files used to store network traffic data, specifically **Wi-Fi handshakes** (critical for cracking WPA keys). Pwnagotchi collects these for later **hashcat** processing.

- **Handshakes**: These are pieces of data exchanged between a Wi-Fi client and an access point during the connection process. They are essential for **cracking WPA keys**.

- **Hashcat**: A **password cracking tool** used to **crack encrypted data** like WPA handshakes. It can use various techniques to try and break the encryption.

- **PMKID**: This is a specific type of data that can also be used to crack WPA encryption. PMKID is a **Pre-Shared Key** identifier used in WPA2 networks and is often targeted in **Wi-Fi hacking**.

### How does Pwnagotchi work?

Instead of merely playing Super Mario or Atari games like most **reinforcement learning-based AI** (yawn), Pwnagotchi tunes its own parameters over time to get better at pwning WiFi things in the environments you expose it to.

To be more precise, Pwnagotchi is using an **LSTM** with an **MLP feature extractor** as its policy network for the **A2C agent**. If you’re unfamiliar with **A2C**, here is a very good introductory explanation (in comic form!) of the basic principles behind how Pwnagotchi learns. Be sure to check out the Usage doc for more pragmatic details of how to help your Pwnagotchi learn as quickly as possible.

- **LSTM (Long Short-Term Memory)**: A type of **recurrent neural network (RNN)** used in machine learning. LSTM networks are great for learning from sequences of data (like Wi-Fi networks over time) because they can "remember" past events and adjust their actions accordingly.
  
- **MLP (Multilayer Perceptron)**: A type of **neural network** used for feature extraction, which helps the system analyze and process data more effectively. Pwnagotchi uses it to process information from the Wi-Fi environment and make better decisions.

Unlike the usual reinforcement learning simulations, Pwnagotchi actually learns at a human timescale because it is interacting with a real-world environment instead of a well-defined virtual environment (like playing Super Mario). Time for a Pwnagotchi is measured in **epochs**; a single epoch can last anywhere from a few seconds to many minutes, depending on how many **access points** and **client stations** are visible.

- **Epoch**: In machine learning, an epoch refers to one complete cycle through the entire dataset. For Pwnagotchi, this means a cycle of interaction with Wi-Fi networks.

Do not expect your Pwnagotchi to perform amazingly well at the very beginning, as it will be exploring several combinations of key parameters to determine ideal adjustments for pwning the particular environment you are exposing it to during its beginning epochs ... but definitely listen to your Pwnagotchi when it tells you it's bored! Bring it into novel WiFi environments with you and have it observe new networks and capture new handshakes—and you'll see. :)


### Multi-Unit Interaction

Multiple units within close physical proximity can “talk” to each other, advertising their own presence to each other by broadcasting custom information elements using a **parasite protocol** I’ve built on top of the existing **dot11** standard. Over time, two or more Pwnagotchi units trained together will learn to cooperate upon detecting each other’s presence by dividing the available channels among them for optimal pwnage.

- **Parasite protocol**: A custom protocol developed to allow multiple Pwnagotchi devices to communicate with each other, sharing information about their surrounding networks and synchronizing their activities for more efficient Wi-Fi cracking.
  
- **dot11 standard**: Refers to the IEEE **802.11 standard**, which defines the protocols for **wireless networking**, like Wi-Fi. This is the foundation for how Pwnagotchi interacts with Wi-Fi networks.

### Moods and States

Depending on the status of the unit, several states and state transitions are configurable and represented on the display as different **moods**, **expressions**, and sentences. Pwnagotchi speaks many languages, too!

- **Moods**: The "mood" refers to the way Pwnagotchi expresses its internal state visually and verbally. Moods can change based on how well it is performing or how "bored" it is with the environment.

Of course, it IS possible to run your Pwnagotchi with the AI disabled (configurable in `config.toml`). Why might you want to do this? Perhaps you simply want to use your own fixed parameters (instead of letting the AI decide for you), or maybe you want to save battery and CPU cycles, or maybe it’s just you have strong concerns about aiding and abetting baby Skynet. Whatever your particular reasons may be: an AI-disabled Pwnagotchi is still a simple and very effective automated **deauther**, **WPA handshake sniffer**, and portable **bettercap + webui** dedicated hardware.

- **Deauther**: A tool that performs **deauthentication attacks**, disrupting Wi-Fi connections and enabling the capture of **handshakes** for WPA cracking.
  
- **WebUI**: A **web user interface** that allows you to interact with Pwnagotchi through a browser for easier management and monitoring.


🚧 **Work in Progress** 🚧